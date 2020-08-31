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

class ConsultExercise extends Component {
    constructor(props) {
        super(props);
        /**
        *exerciseInfo:
        * @type {Array}
        * Property that stores the user information that comes from the database
        * 
        * exerciseID:
        * @type {integer}
        * Property that indicates the user id
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            exerciseID: sessionStorage.getItem("exerciseID"),
            exerciseInfo: [{}],
            show: false,
            modalTittle: "",
            modalChildren: "",
            status: 0,
        };
        this.getExerciseInfo = this.getExerciseInfo.bind(this);
        this.backButton = this.backButton.bind(this);
        this.editExercise = this.editExercise.bind(this);
        this.changeExerciseStatus = this.changeExerciseStatus.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
    }

    componentDidMount() {

        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getExerciseInfo();
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


    editExercise(event) {
        sessionStorage.setItem('name', this.state.exerciseInfo[0].description);
        sessionStorage.setItem('link', this.state.exerciseInfo[0].link);
        sessionStorage.setItem('type', this.state.exerciseInfo[0].typeID);
        sessionStorage.setItem('status', this.state.status);
        this.props.history.push(`/AddExercise`);
    }

    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };
    changeExerciseStatus(event) {
        var accountState;
        if (document.getElementById("status").textContent === "Inactivo") {
            accountState = 1;
            this.state.status = 1;
        } else {
            accountState = 0;
            this.state.status = 0;
        }
        fetch("http://localhost:9000/ConfigurationRoute/changeExerciseStatus", {
            method: "post",
            body: JSON.stringify({
                exerciseID: this.state.exerciseInfo[0].exerciseID,
                status: accountState
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {

            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
        this.modalTrigger(event, 'Estado', 'El estado del ejercicio fue cambiado con éxito');
        if (accountState === 0) {
            document.getElementById('status').textContent = "Inactivo";
            document.getElementById('changeExerciseStatus').textContent = "Activar";
        } else {
            document.getElementById('status').textContent = "Activo";
            document.getElementById('changeExerciseStatus').textContent = "Desactivar";
        }
    }

    /**
    * Method that can get the basic information a specific user 
    * when the page is load
    */
    getExerciseInfo() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/getExerciseByID`,
                {
                    params: { exerciseID: this.state.exerciseID }
                }).then(response => {
                    const exerciseInfo = response.data[0];
                    this.setState({ exerciseInfo });
                    if (exerciseInfo[0].status === "Inactivo") {
                        document.getElementById('changeExerciseStatus').textContent = "Activar";
                        this.state.status = 0;
                    } else {
                        document.getElementById('changeExerciseStatus').textContent = "Desactivar";
                        this.state.status = 1;
                    }
                });

        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        sessionStorage.removeItem("exerciseID");
        this.props.history.push(`/ExercisesList`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConfigurationRoutine">Configuración de rutina</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ExerciseList">Lista de ejercicios</Breadcrumb.Item>
                        <Breadcrumb.Item>Consulta de ejercicio</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left">Consulta de ejercicio</h1>
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Nombre:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="name">{this.state.exerciseInfo[0].description}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Tipo de ejercicio:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="exerciseType">{this.state.exerciseInfo[0].type}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Link del vídeo:&nbsp;&nbsp;</label>
                                            <a href={this.state.exerciseInfo[0].link}>
                                                <label fontSize="18px" id="link">{this.state.exerciseInfo[0].link}</label>
                                            </a>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Estado:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="status">{this.state.exerciseInfo[0].status}</label>
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
                                    <button className="circularButton w-100" id="Edit" name="Edit" onClick={this.editExercise}>Editar</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="changeExerciseStatus" name="changeExerciseStatus" onClick={this.changeExerciseStatus}>Desactivar</button>

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
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.modalTrigger} >
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

export default ConsultExercise;