/**
 * @fileoverview ConsultCareer, this page allows to consult a career.
 * @version 1.0
 *
 * @author Victor Bolaños <victor.bolanos@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class ConsultCareer extends Component {
    constructor(props) {
        super(props);
        /**
        * careerInfo:
        * @type {Array}
        * Property that stores the career information that comes from the database.
        * 
        * careerList:
        * @type {Array}
        * Property that stores the list of careers that comes from the database.
        * 
        * careerID:
        * @type {integer}
        * Property that indicates the career id.
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            careerID: sessionStorage.getItem("careerID"),
            careerInfo: [{}],
            show: false,
            modalTittle: "",
            modalChildren: "",
            status: 0,
            careerList: []
        };

        this.backButton = this.backButton.bind(this);
        this.editCareer = this.editCareer.bind(this);
        this.deleteCareer = this.deleteCareer.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getCareerInfo = this.getCareerInfo.bind(this);
        this.getCareersToDeleteList = this.getCareersToDeleteList.bind(this);
        this.validateDeleteCareer = this.validateDeleteCareer.bind(this);

    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getCareerInfo();
            this.getCareersToDeleteList();
        }
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

    /**
     * This method closes the modal.
     */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            this.backButton();
        }
        event.preventDefault();
    };

    /**
    * Method that can get the basic information of a specifc career when the page is loaded.
    */
    getCareerInfo() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/GetCareerByID`,
                {
                    params: { careerID: this.state.careerID }
                }).then(response => {
                    const careerInfo = response.data[0];
                    this.setState({ careerInfo });
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that can get the list of careers that can be deleted.
    */
    getCareersToDeleteList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/GetCareersWithoutStudents`).then(response => {
                const careerList = response.data[0];
                this.setState({ careerList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * Validates if the career can be deleted.
     */
    validateDeleteCareer() {
        for (var i = 0; i < this.state.careerList.length; i++) {
            if (this.state.careerID == this.state.careerList[i].careerID) {
                return true;
            }
        }
        return false;
    }

    /**
     * Deletes the career selected, if it's valid.
     * @param {*} event 
     */
    deleteCareer(event) {
        if (this.validateDeleteCareer()) {
            fetch(`http://localhost:9000/ConfigurationRoute/DeleteCareer`, {
                method: "post",
                body: JSON.stringify({
                    careerID: this.state.careerID
                }),
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
                    this.modalTrigger(event, 'Carrera eliminada', 'Se ha eliminado correctamente la carrera');
                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
        } else {
            this.modalTrigger(event, 'Carrera no eliminada', 'No se puede eliminar una carrera con estudiantes asociados');
        }
    }

    /**
     * Reddirects to a page where a career can be edited.
     */
    editCareer() {
        sessionStorage.setItem("careerID", sessionStorage.getItem("careerID"));
        this.props.history.push(`/CareerUpdate`);
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        sessionStorage.removeItem("careerID");
        this.props.history.push(`/CareerConfiguration`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/CareerConfiguration'>Configuración de Carrera</Breadcrumb.Item>
                        <Breadcrumb.Item>Consulta de carrera</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left">Carrera</h1>
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="text-left">Nombre:&nbsp;{this.state.careerInfo[0].name}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h2 className="text-left">Acciones</h2>
                                <div className="form-group" align="left">
                                    <br></br>
                                    <button className="circularButton w-100" id="editCareer" name="editCareer" onClick={this.editCareer}>Editar</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="deleteCareer" name="deleteCareer" onClick={this.deleteCareer}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" mt-3 col-md-3">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
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
export default ConsultCareer;