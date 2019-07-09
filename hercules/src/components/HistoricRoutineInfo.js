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
            userName: [{}],
            partyID: 1,
            routineHist: [{}]
        }

        this.redirect = this.redirect.bind(this);
        this.rowEvent =this.rowEvent.bind(this);

    }

    redirect() {
        this.props.history.push(`/AddRoutine`);
    }

    /**
    * Method that can get full name of the user and their historic of the routines
    * when the page is load
    */
    componentDidMount() {
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
            console.error(err);
        }
    }

    rowEvent(event){
        try{
            var id = document.getElementById("routineTable").rows[event.target.parentNode.rowIndex].cells[0].innerHTML;
            sessionStorage.setItem("routineID", id);
            this.props.history.push(`/RoutineAdmin`);
        }catch(err){
            console.error(err);
        }

    }

    render() {

        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-label">Usuario: {userName.fullName}</label>
            )
        })

        const indexRoutineHist = this.state.routineHist.map((routineHist, i) => {
            return (
                <tr className="pointer" onClick={this.rowEvent} key={i}>
                    <td className="diplayNone" >{routineHist.routineID}</td>
                    <td>{routineHist.date}</td>
                    <td>{routineHist.frecuency}</td>
                    <td>{routineHist.intensity}</td>
                    <td>{routineHist.timeLapse}</td>
                    <td>{routineHist.rtDescription}</td>
                    <td>{routineHist.otDescription}</td>
                </tr>
            )
        })

        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Lista de rutinas</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-ceter">
                                {name}
                            </div>
                            <div className="col-4 offset-1">
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
                                </tr>
                            </thead>
                            <tbody>
                                {indexRoutineHist}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricRoutineInfo;