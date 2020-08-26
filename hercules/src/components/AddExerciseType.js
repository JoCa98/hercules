/**
 * @fileoverview AddExerciseType page, this page allows to add a exercise type.
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
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class AddExerciseType extends Component {
    constructor(props) {
        super(props);
        /**
        * userTypeList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database.
        * 
        * exerciseDescription:
        * @type {String}
        * Property that indicates the name of the type of exercise to be added.
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            userTypeID: "3",
            exerciseDescription: null,
            userTypeList: [],
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false,
            exerciseList: [],
            exerciseListID: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.empty = this.empty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backButton = this.backButton.bind(this);
        this.getAdminUserType = this.getAdminUserType.bind(this);
        this.getExercisesType = this.getExercisesType.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getAdminUserType();
            this.getExercisesType();
        }
    }

    /**
    * Method that submit all the information in the form to the database.
    */
    handleSubmit = event => {
        if (this.empty()) {
            this.modalTrigger(event, 'Campos obligatorios', 'Los campos de texto con un * no se pueden dejar en blanco');
        } else {
            fetch(`http://localhost:9000/ConfigurationRoute/AddExerciseType`, {
                method: "post",
                body: JSON.stringify({
                    description: this.state.exerciseDescription
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
                    this.modalTrigger(event, 'Ingreso tipo ejercicio', 'Se ha agregado correctamente el tipo de ejercicio');
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
            this.props.history.push(`/HomeAdmin`);
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
    * This method loads the information in the dropdownlist.
    */
    getAdminUserType() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getAdminUserType`).then(response => {
                const userTypeList = response.data[0];
                this.setState({ userTypeList });
            });
        } catch (err) {
            console.error("Un error inesperado a ocurrido");
        }
    }

    /**
     * Gets the exercise types from the database.
     */
    getExercisesType() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/getExercisesType`).then(response => {
                const exerciseList = response.data[0];
                this.setState({ exerciseList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that verify that the require inputs are not empty.
    */
    empty() {
        if (this.state.exerciseDescription == "" || this.state.exerciseDescription == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Method that redirect to the previous page.
    */
    backButton() {
        this.props.history.push(`/ConfigurationRoutine`);
    }

    render() {
        /**
        *The exerciseList.map is used to create the rows of the table and to structure the html,
        *this is stored in a constant that is used in the code of the page
        */
        const exerciseListVisual = this.state.exerciseList.map((exerciseList, i) => {
            this.state.exerciseListID.push(exerciseList.exerciseID);
            return (
                <tr className="pointer" key={i}>
                    <td>{exerciseList.description}</td>
                </tr>
            )
        })

        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/ConfigurationRoutine'>Configuración de rutina</Breadcrumb.Item>
                        <Breadcrumb.Item>Tipo de ejercicio</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <div className="row p-3">
                                <h1 className="text-left colorBlue">Agregar tipo de ejercicio</h1>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                        <p align="justify">Ingrese el tipo de ejercicio<font color="red">*</font></p>
                                        <input type="text" name="exerciseDescription" placeholder="Ej: Espalda" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                <h1 className="text-left colorBlue">Tipos de ejercicios agregados</h1>
                                    <div className="col-12 mt-4" >
                                        <table className="table table-sm table-hover" id="myTable">
                                            <thead>
                                                <tr class="header">
                                                    <th scope="col">Tipo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {exerciseListVisual}
                                            </tbody>
                                        </table>
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
export default AddExerciseType;