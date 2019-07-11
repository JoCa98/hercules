/**
 * @fileoverview ConsultUser page, this page shows all the basic information of
 * a specific user and redirect to the diferents forms
 * @version 1.0
 *
 * @author  Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of ConsultUser was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import axios from 'axios';

class ConsultUser extends Component {
    constructor(props) {
        super(props);
        /**
        *userList:
        * @type {Array}
        * Property that stores the list of medical registers that comes from the database
        * 
        * searchType:
        * @type {integer}
        * Property that indicates the user id,
        */
        this.state = {
            userInfo: [{}],
            partyID: sessionStorage.getItem("partyID")
        };
        this.getUserBasicInfo = this.getUserBasicInfo.bind(this);
        this.redirectMedical = this.redirectMedical.bind(this);
        this.redirectPhysical = this.redirectPhysical.bind(this);
        this.redirectRoutines = this.redirectRoutines.bind(this);
    }

    componentDidMount() {
        this.getUserBasicInfo();
    }

    /**
    * Method that can get the basic information a specific user 
    * when the page is load
    */
    getUserBasicInfo() {
        try {
            axios.get(`http://localhost:9000/User/getUserBasicInfo`,
                {
                    params: { partyID: this.state.partyID }
                }).then(response => {
                    const userInfo = response.data[0];
                    this.setState({ userInfo });
                });
        } catch (err) {
            console.error(err);
        }
    }

    /**
   * Method that can redirect to the page of HistoricMedicalInfo
   * when the user click the addButton
   */
    redirectMedical() {
        this.props.history.push(`/HistoricMedicalInfo`);
    }

    /**
    * Method that can redirect to the page of TablePhysical
    * when the user click the addButton
     */
    redirectPhysical() {
        this.props.history.push(`/HistoricPhysicalInfoAdmin`);
    }

    /**
     * Method that can redirect to the page of AddMedicalForm
     * when the user click the addButton
     */
    redirectRoutines() {
        this.props.history.push(`/HistoricRoutineInfo`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4 card p-5" >
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <h1 className="text-left">Datos del usuario</h1>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left">
                                            <label>Nombre completo:&nbsp;&nbsp;</label>
                                            <label id="fullName">{this.state.userInfo[0].fullName}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Número de cédula:&nbsp;&nbsp;</label>
                                            <label id="identificationNumer">{this.state.userInfo[0].identificationID}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Número de carné:&nbsp;&nbsp;</label>
                                            <label id="carnet">{this.state.userInfo[0].carnet}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Dirección:&nbsp;&nbsp;</label>
                                            <label id="address">{this.state.userInfo[0].local_geo}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Otras señas:&nbsp;&nbsp;</label>
                                            <label id="otherSigns">{this.state.userInfo[0].addressLine}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Correo institucional:&nbsp;&nbsp;</label>
                                            <label id="email">{this.state.userInfo[0].email}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Teléfono 1:&nbsp;&nbsp;</label>
                                            <label id="phoneNumber1">{this.state.userInfo[0].phone1}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Teléfono 2:&nbsp;&nbsp;</label>
                                            <label id="phoneNumber2">{this.state.userInfo[0].phone2}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Estado:&nbsp;&nbsp;</label>
                                            <label id="state">{this.state.userInfo[0].status}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Fecha de registro:&nbsp;&nbsp;</label>
                                            <label id="signUpDate">{this.state.userInfo[0].startDate}</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left">
                                            <h1 className="text-left">Contacto de emergencia</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left">
                                            <label>Nombre:&nbsp;&nbsp;</label>
                                            <label id="contactName">{this.state.userInfo[0].contactName}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Teléfono:&nbsp;&nbsp;</label>
                                            <label id="contactPoneNumber">{this.state.userInfo[0].emergencyPhone}</label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label>Parentesco:&nbsp;&nbsp;</label>
                                            <label id="relation">{this.state.userInfo[0].relationship}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h1 className="text-center">Otros datos</h1>
                                <div class="form-group" align="left">
                                    <br></br>
                                    <button className="circularButton w-100" name="medicalInfo" onClick={this.redirectMedical}>Valoración médica</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" name="physicalInfo" onClick={this.redirectPhysical}>Composición Corporal</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" name="Routine" onClick={this.redirectRoutines}>Rutina</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        )
    }
}
export default ConsultUser;