/**
 * @fileoverview AddExercise page, this page create a new exercise or edit an existing exercise

 * @version 1.0
 *
 * @author  Jermy Calvo <jermy.calvo@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AddExercise was written by Jermy Calvo.
 */

import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class AddExercise extends Component {
    constructor(props) {
        super(props);
        /**
        *userTypeList:
        * @type {Array}
        * Property that stores the list of exercises that comes from the database
        * 
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of exercise and his behavior in the web site
        * 
        * hash:
        * @type {String}
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            exerciseTypes: [{}],
            typeID: 1,
            exerciseID: '',
            name: '',
            status: 1,
            link: '',
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.getExerciseInfo = this.getExerciseInfo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.backButton = this.backButton.bind(this);
        this.selectEnable = this.selectEnable.bind(this);
        this.selectDisable = this.selectDisable.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addNewExercise = this.addNewExercise.bind(this);
        this.showEditMode = this.showEditMode.bind(this);
        this.editExercise = this.editExercise.bind(this);
    }
    /**
     * This method is in charge of loading the page and 
     * displaying the necessary data to edit an exercise or add a new one.
     */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getexerciseTypes();
            if (sessionStorage.getItem("exerciseID") != null) {
                this.getExerciseInfo();
                this.showEditMode();
            } else {
                document.getElementById("editExercise").style.display = 'none';
                this.selectDisable();
                document.getElementById("statusSet").style.display = 'none';
            }
        }

    }
    /**
     * This method is responsible for closing the modal and cleaning the session variables
     */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            sessionStorage.removeItem("exerciseID");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("link");
            sessionStorage.removeItem("type");
            sessionStorage.removeItem("status");
            this.props.history.push(`/ExercisesList`);
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
    /**Save the change if a state change is made
     * 
     */
    handleChange(event) {
        this.setState({ typeID: event.target.value });
    }
    /**This method is responsible for displaying the modal
     * 
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
     * Load the list of existing types of exercises from the database
     */
    getexerciseTypes() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/getExerciseType`).then(response => {
                const exerciseTypes = response.data[0];
                this.setState({ exerciseTypes });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }
    /**this method redirects us to the previous page and clear the session variables
     * 
     */
    backButton() {
        sessionStorage.removeItem("exerciseID");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("link");
        sessionStorage.removeItem("type");
        sessionStorage.removeItem("status");
        this.props.history.push(`/ExercisesList`);
    }
    /** 
     * This method is responsible for 
     * validating all the necessary fields to add a new exercise and then sends the data to the database*/
    addNewExercise(event) {
        if (this.state.name.trim().length == 0) {

            this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos obligatorios  deben estar llenos');

        } else if (!this.state.validations.validateTextField(this.state.name.trim())) {
            this.modalTrigger(event, 'Nombre', 'Los datos del nombre solo pueden estar compuestos por letras y extensión mínima de 2 caracteres');

        } else {

            fetch("http://localhost:9000/ConfigurationRoute/AddNewExcercise", {
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
                'El ejercicio fue agregado con éxito.');
        }
    }
    /**
     * This method is responsible for validating all the necessary fields to edit 
     * an exercise and then sends the data to the database
     */
    editExercise(event) {
        if (this.state.name.trim().length == 0) {

            this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos obligatorios  deben estar llenos');

        } else if (!this.state.validations.validateTextField(this.state.name.trim())) {
            this.modalTrigger(event, 'Nombre', 'Los datos del nombre solo pueden estar compuestos por letras y extensión mínima de 2 caracteres');


        } else {

            fetch("http://localhost:9000/ConfigurationRoute/EditExcercise", {
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
                'El ejercicio fue editado con éxito.');
        }
    }

    selectDisable() {
        if (document.getElementById('cbDisable').checked == true) {
            document.getElementById('cbEnable').checked = false;
            this.state.status = 0;
        } else {
            document.getElementById('cbEnable').checked = true;
            this.state.status = 1;
        }
    }

    showEditMode() {
        document.getElementById("addExercise").style.display = 'none';
        document.getElementById("title").textContent = "Editar Ejercicio";
        document.getElementById("breadcrumb").textContent = "Editar Ejercicio";
    }

    /**This method is responsible for loading the exercise data to show them when editing them */
    getExerciseInfo() {
        this.state.exerciseID = sessionStorage.getItem("exerciseID");
        this.state.name = sessionStorage.getItem("name");
        this.state.link = sessionStorage.getItem("link");
        this.state.typeID = sessionStorage.getItem("type");
        if (sessionStorage.getItem("status") == 0) {
            this.selectEnable();
        } else {
            this.selectDisable();
        }
    }
    /**This method automatically selects the active state of the exercise */
    selectEnable() {
        if (document.getElementById('cbEnable').checked == true) {
            document.getElementById('cbDisable').checked = false;
            this.state.status = 0;
        } else {
            document.getElementById('cbDisable').checked = true;
            this.state.status = 1;
        }
    }

    render() {
        const exerciseTypeListVisual = this.state.exerciseTypes.map((exerciseTypes, i) => {
            return (
                <option value={exerciseTypes.exerciseTypeID} key={i}>{exerciseTypes.description}</option>
            )
        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConfigurationRoutine">Configuración de rutina</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ExercisesList">Lista de ejercicios</Breadcrumb.Item>
                        <Breadcrumb.Item id="breadcrumb"> Agregar ejercicio</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 id="title" className="text-left colorBlue">Agregar Ejercicio</h1>
                            <br />
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Tipo de ejercicio<font color="red">*</font></p>
                                        <select align="justify" className="form-control" fontSize="18px" value={this.state.typeID} onChange={this.handleChange}>
                                            {exerciseTypeListVisual}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Nombre<font color="red">*</font></p>
                                        <input type="text" name="name" placeholder="Ej: Press" fontSize="18px" className="form-control" value={this.state.name} onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group" align="left">
                                                <p align="justify">Link<font color="red">*</font></p>
                                                <input type="text" name="link" placeholder="Ej: https://www.youtube.com/" className="form-control" fontSize="18px" value={this.state.link} onChange={this.handleInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="col-6 col-sm-6">
                                            <div id="statusSet" className="form-group" align="left">
                                                <p title="Campo obligatorio">Estado<font color="red">*</font></p>
                                                <input type="checkbox" id="cbEnable" name="cbEnable" onClick={this.selectEnable} ></input> Activo
                                            <br></br>
                                                <input type="checkbox" id="cbDisable" name="cbDisable" onClick={this.selectDisable} ></input> Desactivado

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
                                            <button id="addExercise" className="buttonSizeGeneral w-100" onClick={this.addNewExercise}>Guardar</button>
                                            <button id="editExercise" className="buttonSizeGeneral w-100" onClick={this.editExercise}> Guardar</button>
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
export default AddExercise;