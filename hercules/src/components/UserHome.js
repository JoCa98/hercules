/**
 * @fileoverview  UserHome page, Home of the user that shows the recent rutine 
 * 
 * @version 1.0
 *
 * @author    María Ester Molina Richmond <maria.molina@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of UserHome was written by Ester Molina.
 */

import React, { Component } from 'react';
import Carousel from './RoutineCarouselReadOnly';
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";


class UserHome extends Component {
    constructor(props) {
        super(props);
        /**
        * routineID:
        * @type {integer}
        * Property that stores the routine id that comes from other page
        * 
        * routine:
        * @type {Array}
        * Property that stores the routine info that comes from de database
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            partyID: sessionStorage.getItem("partyID"),
            routine: [{}]
        };

    }

    /**
    * Method that can be sent to load the routine info
    * when loading the page for the first time
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            axios.get("http://localhost:9000/RoutineRoute/getRoutineInfo", {
                params: {
                    routineID: sessionStorage.getItem("routineID"),
                }
            }).then(response => {
                if (response) {
                    
                    this.setState({
                        routine: response.data[0]
                    });
                }
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-12 card p-5">
                        <h1 className="text-left colorBlue mb-4">Rutina actual</h1>
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="cssPText">Tipo de rutina: </p>
                                            </div>
                                            <div className="col-6">
                                                <input fontSize="18px" type="text" name="textRutineType" className="form-control" disabled="disabled" value={this.state.routine[0].rtDescription} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="cssPText">Objetivo:</p>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" fontSize="18px" name="textObjective" className="form-control" disabled="disabled" value={this.state.routine[0].otDescription} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="cssPText">Frecuencia Cardíaca:</p>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" fontSize="18px" name="textHeartRatePerMinute" className="form-control" disabled="disabled" value={this.state.routine[0].heartRatePerMinute} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="cssPText">Frecuencia:</p>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" fontSize="18px" name="textFrecuency" className="form-control" disabled="disabled" value={this.state.routine[0].frecuency} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="cssPText">Intensidad:</p>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" fontSize="18px" name="textIntensity" className="form-control" disabled="disabled" value={this.state.routine[0].intensity} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="cssPText">Descanso entre serie:</p>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" fontSize="18px" name="textRestBetweenSerie" className="form-control" disabled="disabled" value={this.state.routine[0].restBetweenSerie} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="cssPText">Descanso entre ejercicios:</p>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" fontSize="18px" name="textrestBetweenExercises" className="form-control" disabled="disabled" value={this.state.routine[0].restBetweenExercises} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Carousel />
                    </div>
                </div>
            </div >
        );
    }
}

export default UserHome;