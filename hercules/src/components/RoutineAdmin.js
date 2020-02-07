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
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";


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
            permissionsManager: new PermissionsManager(),
            routineID: sessionStorage.getItem("routineID"),
            routine: [{}],
            userName: [{}],
            partyID: sessionStorage.getItem("userPartyID")
        };
        this.backButton = this.backButton.bind(this);
    }

    /**
   * Method that can be sent to load the routine info
   * when loading the page for the first time
   */
    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
        
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

    /**
* Method that redirect to the previous page
*/
    backButton() {
        this.props.history.push(`/HistoricRoutineInfo`);
    }

    render() {
        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-label">Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/HistoricRoutineInfo">Lista de rutinas</Breadcrumb.Item>
                        <Breadcrumb.Item>Rutina actual</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-12 card p-5">
                        <form className="RoutineAdminForm">
                            <h1 className="text-left colorBlue mb-4">Rutina actual del usuario</h1>
                            <div className="row">
                                <div className="col-12 col-md-4 text-right">
                                    {name}
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tipo de rutina: </p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" font-size="18px" name="textRutineType" className="form-control" disabled="disabled" value={this.state.routine[0].rtDescription} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Objetivo:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" font-size="18px" name="textObjective" className="form-control" disabled="disabled" value={this.state.routine[0].otDescription} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Frecuencia Cardíaca:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" font-size="18px" name="textHeartRatePerMinute" className="form-control" disabled="disabled" value={this.state.routine[0].heartRatePerMinute} />
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
                                                    <input type="text" font-size="18px" name="textFrecuency" className="form-control" disabled="disabled" value={this.state.routine[0].frecuency} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Intensidad:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" font-size="18px" name="textIntensity" className="form-control" disabled="disabled" value={this.state.routine[0].intensity} />
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
                                                    <input type="text" font-size="18px" name="textDensity" className="form-control" disabled="disabled" value={this.state.routine[0].density} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tiempo de descanso:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" font-size="18px" name="textRestTime" className="form-control" disabled="disabled" value={this.state.routine[0].timeLapse} />
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
                            <div className="row mt-4">
                                <div className="col-12">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
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