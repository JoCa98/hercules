/**
 * @fileoverview AddTip, this page create a new tip or edit an existing tip

 * @version 1.0
 *
 * @author  Jermy Calvo <jermy.calvo@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AddTip was written by Jermy Calvo.
 */

import React, { Component } from 'react';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";
import {baseUrl} from "./baseUrl";

class AddTip extends Component {
    constructor(props) {
        super(props);
        /**
        *userTypeList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database
        * 
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site
        * 
        * hash:
        * @type {String}
        * Property that will contain the encrypted password
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            tipID: 0,
            description: '',
            link: '',
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.getTipInfo = this.getTipInfo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.backButton = this.backButton.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addNewTip = this.addNewTip.bind(this);
        this.showEditMode = this.showEditMode.bind(this);
        this.editTip = this.editTip.bind(this);
    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            if (sessionStorage.getItem("tipID") != null) {
                this.getTipInfo();
                this.showEditMode();
            } else {
                document.getElementById("editTip").style.display = 'none';
            }
        }

    }

    /**This method is responsible for closing the modal and cleaning the session variables */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            sessionStorage.removeItem("tipID");
            sessionStorage.removeItem("description");
            sessionStorage.removeItem("link");
            this.props.history.push(`/TipsAdmin`);
        }
        event.preventDefault();
    };

    /**
    * Save the change of some element in the corresponding variable
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

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

    /**this method redirects us to the previous page and clear the session variables
    *
    */
    backButton() {
        sessionStorage.removeItem("tipID");
        sessionStorage.removeItem("description");
        sessionStorage.removeItem("link");
        this.props.history.push(`/TipsAdmin`);
    }

    /**This method validates the information to be able to add a new tip */
    addNewTip(event) {
        if (this.state.description.trim().length == 0
            || this.state.link.trim().length == 0) {

            this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos obligatorios  deben estar llenos');

        } else if (!this.state.validations.validateURLField(this.state.link.trim())) {
                this.modalTrigger(event, 'URL', 'El link del video no es correcto');
            } else {

                fetch(baseUrl + "ConfigurationRoute/AddNewTip", {
                    method: "post",
                    body: JSON.stringify(this.state),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            isExit: true
                        });
                    })
                    .catch(err => console.error("Un error inesperado a ocurrido"));
                this.modalTrigger(event, 'Notificación',
                    'El consejo fue agregado con éxito.');
            }
    }

    /**
     * This method validates the information to be able to edit a tip
     */
    editTip(event) {

        if (this.state.description.trim().length == 0
            || this.state.link.trim().length == 0) {

            this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos obligatorios  deben estar llenos');

        } else if (!this.state.validations.validateTextField(this.state.description.trim())) {
            this.modalTrigger(event, 'Nombre', 'Los datos del nombre solo pueden estar compuestos por letras y extensión mínima de 2 caracteres');

        } else if (!this.state.validations.validateURLField(this.state.link.trim())) {
            this.modalTrigger(event, 'URL', 'El link del video no es correcto');
        } else {

            fetch(baseUrl + "ConfigurationRoute/EditTip", {
                method: "post",
                body: JSON.stringify(this.state),

                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        isExit: true
                    });
                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
            this.modalTrigger(event, 'Notificación',
                'El consejo fue editado con éxito.');
        }
    }

    /**
     * This method is responsible for enabling what is necessary to be able to edit a tip
     */
    showEditMode() {
        document.getElementById("addExercise").style.display = 'none';
        document.getElementById("title").textContent = "Editar consejo";
        document.getElementById("breadcrumb").textContent = "Editar consejo";
    }

    /**
    * Method that can get the basic information a specific tip
    * when the page is load
    */
    getTipInfo() {
        this.setState({
            tipID: sessionStorage.getItem("tipID")
            , description: sessionStorage.getItem("description")
            , link: sessionStorage.getItem("link")
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/TipsAdmin">Lista de consejos</Breadcrumb.Item>
                        <Breadcrumb.Item id="breadcrumb"> Agregar consejo</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 id="title" className="text-left colorBlue">Agregar consejo</h1>
                            <br />
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Nombre<font color="red">*</font></p>
                                        <input type="text" name="description" placeholder="Ej: Alimentación" fontSize="18px" className="form-control" defaultValue={this.state.description} onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group" align="left">
                                                <p align="justify">Link<font color="red">*</font></p>
                                                <input type="text" name="link" placeholder="Ej: https://www.youtube.com/" className="form-control" fontSize="18px" defaultValue={this.state.link} onChange={this.handleInputChange} required></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 col-md-2 text-left mt-4">
                                            <button className="buttonSizeGeneral w-100" onClick={this.backButton}>Cancelar</button>
                                        </div>
                                        <div className="col-12 col-sm-3 offset-sm-6 col-md-2 offset-md-8  text-right mt-4" >
                                            <button id="addExercise" className="buttonSizeGeneral w-100" onClick={this.addNewTip}>Guardar</button>
                                            <button id="editTip" className="buttonSizeGeneral w-100" onClick={this.editTip}> Guardar</button>
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
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}
export default AddTip;