/**
 * @fileoverview AddObjectiveType page, this page allows to add a objectives of the routine.
 * @version 1.0
 *
 * @author Ester Molina <maria.molina@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class AddObjectiveType extends Component {
    constructor(props) {
        super(props);
        /**
        * objectiveDescription:
        * @type {String}
        * Property that indicates the name of the type of objective to be added.
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            objetiveDescription: null,
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.empty = this.empty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backButton = this.backButton.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
        }
    }

    /**
    * Method that submit all the information in the form to the database.
    */
    handleSubmit = event => {
        if (this.empty()) {
            this.modalTrigger(event, 'Campos obligatorios', 'Los campos de texto con un * no se pueden dejar en blanco');
        } else {
            fetch(`http://localhost:9000/ConfigurationRoute/AddObjectiveType`, {
                method: "post",
                body: JSON.stringify({
                    description: this.state.objectiveDescription
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
                    this.modalTrigger(event, 'Ingreso objetivo de rutine', 'Se ha agregado correctamente el objetivo de rutina');
                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
        }
        event.preventDefault();
    }

    /**
    * This method takes care of showing a modal with useful information.
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
            this.props.history.push(`/ObjectiveTypeList`);
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
    * Method that verify that the require inputs are not empty.
    */
    empty() {
        if (this.state.objectiveDescription == "" || this.state.objectiveDescription == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Method that redirect to the previous page.
    */
    backButton() {
        this.props.history.push(`/ObjectiveTypeList`);
    }

    render() {
   

        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/ConfigurationRoutine'>Configuración de rutina</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/ExerciseTypeList'>Lista objetivos de rutina</Breadcrumb.Item>
                        <Breadcrumb.Item>Agregar objetivo de rutina</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <div className="row p-3">
                                <h1 className="text-left colorBlue">Agregar objetivo de rutina</h1>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                        <p align="justify">Ingrese el objetivo<font color="red">*</font></p>
                                        <input type="text" name="objectiveDescription" placeholder="Ej: Potencia" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
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
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddObjectiveType;