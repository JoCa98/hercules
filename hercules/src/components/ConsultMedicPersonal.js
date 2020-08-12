/**
 * @fileoverview ConsultMedicPersonal page, this page allows to consult an medical account.
 * @version 1.0
 *
 * @author Victor Bolaños <victor.bolanos@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class ConsultMedicalPersonal extends Component {
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
            permissionsManager: new PermissionsManager(),
            userInfo: [{}],
            partyID: sessionStorage.getItem("userPartyID"),
            show: false,
            modalTittle: "",
            modalChildren: ""
        };
        
        this.getUserBasicInfo = this.getUserBasicInfo.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.backButton = this.backButton.bind(this);

    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
        window.scrollTo(0, 0);
        this.getUserBasicInfo();
        }
    }

    changeUserStatus(event) {
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
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
        this.modalTrigger(event, 'Estado', 'El estado del usuario fue cambiado con éxito');
        if (accountState === 0) {
            document.getElementById('status').textContent = "Inactivo";
            document.getElementById('ChangeUserStatus').textContent = "Activar";
        } else {
            document.getElementById('status').textContent = "Activo";
            document.getElementById('ChangeUserStatus').textContent = "Desactivar";
        }
    }

    getUserBasicInfo() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/MedicalAccounts`,
                {
                    params: { partyID: this.state.partyID }
                }).then(response => {
                    const userInfo = response.data[0];
                    this.setState({ userInfo });
                    if (userInfo[0].status === "Inactivo") {
                        document.getElementById('ChangeUserStatus').textContent = "Activar";
                    } else {
                        document.getElementById('ChangeUserStatus').textContent = "Desactivar";
                    }
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };

    backButton() {
        sessionStorage.removeItem("userPartyID");
        this.props.history.push(`/AccountConfiguration`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/AccountConfiguration">Configuración de cuentas</Breadcrumb.Item>
                        <Breadcrumb.Item>Consultar personal médico</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left">Consulta de personal médico</h1>
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
                                            <label fontSize="18px" id="identificationNumber">{this.state.userInfo[0].identificationID}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Correo:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="email">{this.state.userInfo[0].email}</label>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label fontSize="18px">Estado:&nbsp;&nbsp;</label>
                                            <label fontSize="18px" id="status">{this.state.userInfo[0].status}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group" align="left">
                                    <br></br>
                                    <button className="circularButton w-100" id="ChangeUserStatus" name="ChangeUserStatus" onClick={this.changeUserStatus}>Desactivar</button>
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
                        <div className="row">
                            <div className="col-md-1">
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.modalTrigger} >
                                    <br />{this.state.modalChildren}
                                </ModalComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConsultMedicalPersonal;