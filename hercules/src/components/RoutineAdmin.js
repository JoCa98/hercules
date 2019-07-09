/**
 * @fileoverview  RoutineAdmin page, shows the recent rutine of a user
 * 
 * @version 1.0
 *
 * @author    María Ester Molina Richmond <maria.molina@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of RoutineAdmin was written by Ester Molina.
 */

import React, { Component } from 'react';
import Carousel from './RoutineCarouselReadOnly';
import './UserHome.css';
import axios from "axios";


class RoutineAdmin extends Component {
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
            routineID: sessionStorage.getItem("routineID"),
            routine: [{}],
            userName: [{}],
            partyID: 1
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

        axios.get(`http://localhost:9000/User/getUserName`,
        {
            params: { partyID: this.state.partyID }
        }).then(response => {
            const userName = response.data[0];
            this.setState({ userName });
        });
    }

    render() {
        const name = this.state.userName.map((userName, i) => {
            return(
                <label className="form-control">Usuario: {userName.fullName}</label>
            )
        })

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                        <form className="RoutineAdminForm">
                            <h2 className="text-left colorBlue mb-4">Rutina actual del usuario</h2>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                   {name}
                                   <br/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tipo de rutina: </p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRutineType" className="form-control" disabled="disabled"  value={this.state.routine[0].rtDescription}  />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Objetivo:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textObjective" className="form-control" disabled="disabled" value={this.state.routine[0].otDescription}/>
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
                                                    <input type="text" name="textFrecuency" className="form-control" disabled="disabled" value={this.state.routine[0].frecuency}/>
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
                                                    <input type="text" name="textDensity" className="form-control" disabled="disabled" value={this.state.routine[0].density}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tiempo de descanso:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRestTime" className="form-control" disabled="disabled" value={this.state.routine[0].timeLapse}/>
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

export default RoutineAdmin;