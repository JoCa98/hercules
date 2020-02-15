/**
 * @fileoverview HistoricRoutineInfo page, shows the list 
 *of all routines of one specific user
 *
 * @version 1.0
 *
 * @author    Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of HistoricRoutineInfo was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";



class HistoricRoutineInfo extends Component {
    constructor() {
        super();
        /**
        * userName
        * @type {String}
        * Property that contains the name of the user
        * partyID
        * @type {Integer}
        * Property that contains the id of the user
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            userName: [{}],
            partyID: sessionStorage.getItem("userPartyID"),
            routineHist: [{}]
        }

        this.redirect = this.redirect.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    redirect() {
        this.props.history.push(`/AddRoutine`);
    }

    /**
    * Method that can get full name of the user and their historic of the routines
    * when the page is load
    */
    componentDidMount() {


        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            
            try {
                axios.get(`http://localhost:9000/User/getUserName`,
                    {
                        params: { partyID: this.state.partyID }
                    }).then(response => {
                        const userName = response.data[0];
                        this.setState({ userName });
                    });

                axios.get(`http://localhost:9000/RoutineRoute/getRoutineHistoric`,
                    {
                        params: { partyID: this.state.partyID }
                    }).then(response => {
                        const routineHist = response.data[0];
                        this.setState({ routineHist });
                    });
            } catch (err) {
                console.error("Un error inesperado ha ocurrido");
            }
        }

    }

    rowEvent(event) {
        try {
            var id = document.getElementById("routineTable").rows[event.target.parentNode.rowIndex].cells[0].innerHTML;
            sessionStorage.setItem("routineID", id);
            this.props.history.push(`/RoutineAdmin`);
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }

    }

    /**
 * Method that redirect to the previous page
 */
    backButton() {
        this.props.history.push(`/ConsultUser`);
    }

    render() {

        const name = this.state.userName.map((userName, i) => {
            return (
                <label fontSize="18px" className="form-label">Usuario: {userName.fullName}</label>
            )
        })

        const indexRoutineHist = this.state.routineHist.map((routineHist, i) => {
            return (
                <tr className="pointer" onClick={this.rowEvent} key={i}>
                    <td className="diplayNone" >{routineHist.routineID}</td>
                    <td align="center">{routineHist.date}</td>
                    <td align="center">{routineHist.frecuency}</td>
                    <td align="center">{routineHist.intensity}</td>
                    <td align="center">{routineHist.timeLapse}</td>
                    <td>{routineHist.rtDescription}</td>
                    <td>{routineHist.otDescription}</td>
                    <td align="center">{routineHist.heartRatePerMinute}</td>
                </tr>
            )
        })

        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item>Lista de rutinas</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Lista de rutinas</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-center">
                                {name}
                            </div>
                            <div className="col-4 offset-1 text-center">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 offset-1 mt-4">
                        <table className="table table-sm table-hover" id="routineTable">
                            <thead>
                                <tr>
                                    <th scope="col" className="align-middle">Fecha</th>
                                    <th scope="col" className="align-middle">Frecuencia</th>
                                    <th scope="col" className="align-middle">Intensidad</th>
                                    <th scope="col" className="align-middle">Lapso de descanso</th>
                                    <th scope="col" className="align-middle">Tipo de rutina</th>
                                    <th scope="col" className="align-middle">Objetivo</th>
                                    <th scope="col" className="align-middle">Frecuencia Cardíaca</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indexRoutineHist}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className=" mt-3 col-md-8">
                            <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricRoutineInfo;