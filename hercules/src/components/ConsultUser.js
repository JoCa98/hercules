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
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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
        this.changeUserStatus = this.changeUserStatus.bind(this);
    }

    componentDidMount() {
        this.getUserBasicInfo();

 
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

    changeUserStatus() {
        if (window.confirm("¿Está seguro que desea cambiar el estado del usuario?") === true) {
            var accountState;
            if (document.getElementById("status").textContent === "Inactivo") {
                accountState = 1;
            } else {
                accountState = 0;
            }
            fetch("http://localhost:9000/User/changeUserStatus", {
                method: "post",
                body: JSON.stringify({
                    email: this.state.userInfo[0].email,
                    status: accountState
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => console.error(err));
            alert("El estado del usuario fue cambiado con éxito")
            if (accountState === 0) {
                document.getElementById('status').textContent = "Inactivo";
                document.getElementById('changeUserStatus').textContent = "Activar";
            } else {
                document.getElementById('status').textContent = "Activo";
                document.getElementById('changeUserStatus').textContent = "Desactivar";
            }
        }

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
                    if (userInfo[0].status === "Inactivo") {
                        document.getElementById('changeUserStatus').textContent = "Activar";
                    } else {
                        document.getElementById('changeUserStatus').textContent = "Desactivar";
                    }
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
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Consulta de usuario</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left">Consulta de usuario</h1>
                        <div className="row">
                            <div className="col-8">
                                <h2 className="text-left">Datos del usuario</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Nombre completo:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="fullName">{this.state.userInfo[0].fullName}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Número de cédula:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="identificationNumer">{this.state.userInfo[0].identificationID}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Número de carné:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="carnet">{this.state.userInfo[0].carnet}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Dirección:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="address">{this.state.userInfo[0].local_geo}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Otras señas:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="otherSigns">{this.state.userInfo[0].addressLine}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Correo institucional:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="email">{this.state.userInfo[0].email}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Teléfono 1:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="phoneNumber1">{this.state.userInfo[0].phone1}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Teléfono 2:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="phoneNumber2">{this.state.userInfo[0].phone2}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Estado:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="status">{this.state.userInfo[0].status}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Fecha de registro:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="signUpDate">{this.state.userInfo[0].startDate}</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <h2 className="text-left">Contacto de emergencia</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Nombre:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="contactName">{this.state.userInfo[0].contactName}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Teléfono:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="contactPoneNumber">{this.state.userInfo[0].emergencyPhone}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Parentesco:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="relation">{this.state.userInfo[0].relationship}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h2 className="text-left">Otros datos</h2>
                                <div className="form-group" align="left">
                                    <br></br>
                                    <button className="circularButton w-100" name="medicalInfo" onClick={this.redirectMedical}>Valoración médica</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="physicalInfo" name="physicalInfo" onClick={this.redirectPhysical}>Composición Corporal</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="Routine" name="Routine" onClick={this.redirectRoutines}>Rutina</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="changeUserStatus" onClick={this.changeUserStatus}>Desactivar</button>

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
                    </div>
                </div>
            </div>
        )
    }
}
export default ConsultUser;