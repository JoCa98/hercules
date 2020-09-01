/**
 * @fileoverview Career page, this page shows a menu to configure different aspects of the system.
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

class ConfigurationRutine extends Component {
    constructor(props) {
        super(props);
        /**
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            userTypeID: "3",
            show: false,
            isExit: false
        };

        this.excerciseConfiguration = this.excerciseConfiguration.bind(this);
        this.addRoutineType = this.addRoutineType.bind(this);
        this.addExerciseType = this.addExerciseType.bind(this);
        this.addObjectiveType = this.addObjectiveType.bind(this);


    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            //this.getAdminUserType();
        }
    }

    /**
    * Methods that redirect to the requested page
    */
    excerciseConfiguration() {
        this.props.history.push(`/ExercisesList`);
    }

    addExerciseType() {
        this.props.history.push(`/ExerciseTypeList`);
    }

    addRoutineType() {
        this.props.history.push(`/RoutineTypeList`);
    }

    addObjectiveType() {
        this.props.history.push(`/ObjectiveTypeList`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item >Configuración de rutina</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 className="text-left colorBlue">Configuración de rutina</h1>
                            <br />
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.excerciseConfiguration}>Ejercicios</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.addExerciseType}>Tipo de ejercicio</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.addRoutineType}>Tipo de rutina</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.addObjectiveType}>Objetivos de rutina</button>

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
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConfigurationRutine;