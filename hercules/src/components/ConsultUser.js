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
        *userInfo:
        * @type {Array}
        * Property that stores the user information that comes from the database
        * 
        * partyID:
        * @type {integer}
        * Property that indicates the user id
        */
        this.state = {
            userInfo: [{}],
            partyID: sessionStorage.getItem("userPartyID")
        };
        this.getUserBasicInfo = this.getUserBasicInfo.bind(this);
        this.redirectMedical = this.redirectMedical.bind(this);
        this.redirectPhysical = this.redirectPhysical.bind(this);
        this.redirectRoutines = this.redirectRoutines.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    componentDidMount() {
        this.getUserBasicInfo();
        console.log(this.state.userInfo[0]);
        if (sessionStorage.getItem('userTypeID') != 4) {
            this.hideAdminBtns();
        }
    }

    /**
    * method that hides the buttons that only the main administrator has access to
    */
    hideAdminBtns() {
        document.getElementById("physicalInfo").style.display = 'none';
        document.getElementById("Routine").style.display = 'none';
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

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/HomeAdmin`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4 card p-5" >
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <h1 className="text-left colorBlue">Datos del usuario</h1>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <label>Nombre completo:&nbsp;&nbsp;</label>
                                            <label id="fullName">{this.state.userInfo[0].fullName}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Número de cédula:&nbsp;&nbsp;</label>
                                            <label id="identificationNumer">{this.state.userInfo[0].identificationID}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Número de carné:&nbsp;&nbsp;</label>
                                            <label id="carnet">{this.state.userInfo[0].carnet}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Dirección:&nbsp;&nbsp;</label>
                                            <label id="address">{this.state.userInfo[0].local_geo}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Otras señas:&nbsp;&nbsp;</label>
                                            <label id="otherSigns">{this.state.userInfo[0].addressLine}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Correo institucional:&nbsp;&nbsp;</label>
                                            <label id="email">{this.state.userInfo[0].email}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Teléfono 1:&nbsp;&nbsp;</label>
                                            <label id="phoneNumber1">{this.state.userInfo[0].phone1}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Teléfono 2:&nbsp;&nbsp;</label>
                                            <label id="phoneNumber2">{this.state.userInfo[0].phone2}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Estado:&nbsp;&nbsp;</label>
                                            <label id="state">{this.state.userInfo[0].status}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Fecha de registro:&nbsp;&nbsp;</label>
                                            <label id="signUpDate">{this.state.userInfo[0].startDate}</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <h1 className="text-left">Contacto de emergencia</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <label>Nombre:&nbsp;&nbsp;</label>
                                            <label id="contactName">{this.state.userInfo[0].contactName}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Teléfono:&nbsp;&nbsp;</label>
                                            <label id="contactPoneNumber">{this.state.userInfo[0].emergencyPhone}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Parentesco:&nbsp;&nbsp;</label>
                                            <label id="relation">{this.state.userInfo[0].relationship}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h1 className="text-center">Otros datos</h1>
                                <div className="form-group" align="left">
                                    <br></br>
                                    <button className="circularButton w-100" name="medicalInfo" onClick={this.redirectMedical}>Valoración médica</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="physicalInfo" name="physicalInfo" onClick={this.redirectPhysical}>Composición Corporal</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="Routine" name="Routine" onClick={this.redirectRoutines}>Rutina</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" mt-3 col-md-8">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConsultUser;