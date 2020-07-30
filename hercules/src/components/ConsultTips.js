/**
 * @fileoverview ConsultUser page, this page shows all the basic information of
 * a specific user and redirect to the diferents forms
 * @version 1.0
 *
 * @author  Jermy Calvo <jermy.calvo@ucrso.info>
 * History
 * v1.0 – Initial Release
 */

import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class ConsultTips extends Component {
    constructor(props) {
        super(props);
        /**
        *tipInfo:
        * @type {Array}
        * Property that stores the user information that comes from the database
        * 
        * tipID:
        * @type {integer}
        * Property that indicates the user id
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            tipID: sessionStorage.getItem("tipID"),
            tipInfo: [{}],
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.getTipInfo = this.getTipInfo.bind(this);
        this.backButton = this.backButton.bind(this);
        this.editTip = this.editTip.bind(this);
        this.deleteTip = this.deleteTip.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {

        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getTipInfo();
        }
    }

    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            console.log("Diana me abandono");
            sessionStorage.removeItem("tipID");
            sessionStorage.removeItem("description");
            sessionStorage.removeItem("link");
            this.props.history.push(`/TipsAdmin`);
        }
        event.preventDefault();
    };

    /**
     * This method takes care of show a modal with useful information
     */
    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };


    editTip(event) {
        sessionStorage.setItem('tipID', this.state.tipInfo[0].tipsID);
        sessionStorage.setItem('description', this.state.tipInfo[0].description);
        sessionStorage.setItem('link', this.state.tipInfo[0].link);
        this.props.history.push(`/AddTip`);
    }

    deleteTip(event) {
        fetch(`http://localhost:9000/ConfigurationRoute/DeleteTip`, {
            method: "post",
            body: JSON.stringify({
                tipID: this.state.tipID
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                this.setState({
                    isExit: true
                });
                this.modalTrigger(event, 'Consejo eliminado', 'Se ha eliminado correctamente el consejo');
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
    }


    /**
    * Method that can get the basic information a specific user 
    * when the page is load
    */
    getTipInfo() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/getTipID`,
                {
                    params: { tipID: this.state.tipID }
                }).then(response => {
                    const tipInfo = response.data[0];
                    this.setState({ tipInfo });
                });

        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        sessionStorage.removeItem("tipID");
        sessionStorage.removeItem("description");
        sessionStorage.removeItem("link");
        this.props.history.push(`/TipsAdmin`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/TipsAdmin">Lista de consejos</Breadcrumb.Item>
                        <Breadcrumb.Item>Consulta de consejo</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left">Consulta de consejo</h1>
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Descripción:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="name">{this.state.tipInfo[0].description}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Link:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="link">{this.state.tipInfo[0].link}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4">
                                <h2 className="text-left">Otros datos</h2>
                                <div className="form-group" align="left">
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="Edit" name="Edit" onClick={this.editTip}>Editar</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="Delete" name="Delete" onClick={this.deleteTip}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group" align="left">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                                    <br />{this.state.modalChildren}
                                </ModalComponent>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ConsultTips;