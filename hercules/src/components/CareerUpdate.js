/**
 * @fileoverview CareerUpdate page, this page allows to update a career.
 * @version 1.0
 *
 * @author Victor Bolaños <victor.bolanos@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class CareerUpdate extends Component {
    constructor(props) {
        super(props);
        /**
        * careerInfo:
        * @type {Array}
        * Property that stores the career information that comes from the database.
        * 
        * careerID:
        * @type {integer}
        * Property that indicates the career id.
        * 
        * careerName:
        * @type {String}
        * Property that indicates the name of the updated career.
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            careerID: sessionStorage.getItem("careerID"),
            careerInfo: [{}],
            careerName: null,
            show: false,
            modalTittle: "",
            modalChildren: "",
            status: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCareerInfo = this.getCareerInfo.bind(this);
        this.backButton = this.backButton.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.empty = this.empty.bind(this);

    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getCareerInfo();
        }
    }

    /**
    * Method that submit all the information in the form to the database.
    */
    handleSubmit = event => {
        if (this.empty()) {
            this.modalTrigger(event, 'Campos obligatorios', 'No puede dejar el nombre de la carrera en blanco');
        } else if (!this.state.validations.validateTextField(this.state.careerName.trim())) {
            this.modalTrigger(event, 'Nombre de la carrera', 'El nombre de la carrera solo pueden estar compuesto por letras');
        } else {
            fetch(`http://localhost:9000/ConfigurationRoute/UpdateCareerName`, {
                method: "post",
                body: JSON.stringify({
                    careerID: this.state.careerID,
                    name: this.state.careerName
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
                    this.modalTrigger(event, 'Ingreso Carrera', 'Se ha editado correctamente la carrera');
                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
        }
        event.preventDefault();
    }

    /**
     * This method takes care of show a modal with useful information.
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
            this.props.history.push(`/CareerConfiguration`);
        }
        event.preventDefault();
    };

    /**
    * This method set the prop attributes.
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    /**
    * Gets the career info that is stored in the database.
    */
    getCareerInfo() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/GetCareerByID`,
                {
                    params: { careerID: this.state.careerID }
                }).then(response => {
                    const careerInfo = response.data[0];
                    this.setState({ careerInfo });
                    this.state.careerName = this.state.careerInfo[0].name;
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that verify that the require inputs are not empty.
    */
    empty() {
        if (this.state.careerName == "" || this.state.careerName == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Go to previous page.
    */
    backButton() {
        this.props.history.push(`/ConsultCareer`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/CareerConfiguration'>Configuración de Carrera</Breadcrumb.Item>
                        <Breadcrumb.Item>Edicion de carrera</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left">Editar</h1>
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Nombre:&nbsp;&nbsp;</label>
                                            <input type="text" name="careerName" className="form-control" fontSize="18px" defaultValue={this.state.careerInfo[0].name} onChange={this.handleInputChange} required></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" mt-3 col-md-3">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                            <div className=" mt-3 col-md-3 offset-6" align="right">
                                <button align="rigth" className="buttonSizeGeneral" onClick={this.handleSubmit}>Guardar</button>
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
export default CareerUpdate;