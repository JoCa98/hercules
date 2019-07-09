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
import './UserHome.css';
import axios from "axios";


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
            routineID: 1,
            routine: [{}]
        };

    }

    /**
    * Method that can be sent to load the routine info
    * when loading the page for the first time
    */
    componentDidMount() {
        axios.get("http://localhost:9000/RoutineRoute/getRoutineInfo", {
            params: {
                routineID: this.state.routineID,
            }
        }).then(response => {

            if (response) {
                this.setState({
                    routine: response.data[0]
                });
            }

        })

    }
    
    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                        <form className="userHomeForm">
                            <h2 className="text-center colorBlue mb-4">Rutina actual</h2>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tipo de rutina: </p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRutineType" className="form-control" disabled="disabled" value={this.state.routine[0].rtDescription} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Objetivo:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textObjective" className="form-control" disabled="disabled" value={this.state.routine[0].otDescription} />
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
                                                    <input type="text" name="textFrecuency" className="form-control" disabled="disabled" value={this.state.routine[0].frecuency} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Intensidad:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textIntensity" className="form-control" disabled="disabled" value={this.state.routine[0].intensity} />
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
                                                    <p className="cssPText">Densidad:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textDensity" className="form-control" disabled="disabled" value={this.state.routine[0].density} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tiempo de descanso:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRestTime" className="form-control" disabled="disabled" value={this.state.routine[0].timeLapse} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Carousel />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default UserHome;