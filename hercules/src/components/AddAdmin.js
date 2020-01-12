/**
 * @fileoverview AddAdmin page, this page create a new administer or edit an existing admin
 * this form can create a medical admin and/or a general admin, this general
 * admin its the only who can create admins
 * @version 1.0
 *
 * @author  Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AddAdmin was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Hash from './Hash';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';

class AddAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: new Hash(),
            validations: new validations(),
            userTypeID: "3",
            identificationID: "0",
            firstName: null,
            secondName: null,
            firstLastName: null,
            secondLastName: null,
            email: null,
            password: null,
            confirmPassword: null,
            medicalCod: null,
            userTypeList: [],
            show: false
        };

        this.showMedicalCod = this.showMedicalCod.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.empty = this.empty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputNumberValidator = this.inputNumberValidator.bind(this);
        this.emailValidator = this.emailValidator.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
        this.backButton = this.backButton.bind(this);
        this.getAdminUserType = this.getAdminUserType.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);

    }

    componentDidMount() {
        this.getAdminUserType();
    }

    /**
        * Method that submit all the information in the form
        */
    handleSubmit = event => {

        axios.get(`http://localhost:9000/User/isEmailValid`, { params: { email: this.state.email } }).then(response => {
            var isEmailValid = JSON.parse(JSON.stringify(response.data))[0]['isEmailValid'].data[0];

            if (this.empty()) {
                alert("Los campos con * son obligatorios");
            } else if (!this.state.validations.validateTextField(this.state.firstName.trim())
                || (this.state.secondName != null && (this.state.secondName.trim() != "") && (!this.state.validations.validateTextField(this.state.secondName.trim())))
                || !this.state.validations.validateTextField(this.state.firstLastName.trim())
                || (this.state.secondLastName != null && (this.state.secondLastName.trim() != "") && (!this.state.validations.validateTextField(this.state.secondLastName.trim())))
            ) {
                alert("Los datos del nombre solo pueden estar compuestos por letras y extensión mínima de 2 caracteres");
            } else if (!this.state.validations.validateIdentification(this.state.identificationID)) {
                alert("El formato de la cédula ingresada es incorrecto");
            } else if (!this.state.validations.validateAdminEmailField(this.state.email)) {
                alert("El email no tiene el formato correcto");
            } else if (this.state.password != this.state.confirmPassword) {
                alert("Los campos de contraseña no coinciden");
            } else if (isEmailValid == 1) {
                document.getElementById("email").value = null;
                alert("El correo ingresado ya corresponde a otro administrador registrado");
            } else {
                this.setState({
                    password: this.state.hash.encode(this.state.password)
                })

                fetch("http://localhost:9000/AdminRoute/addAdmin", {
                    method: "post",
                    body: JSON.stringify(this.state),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        alert("El nuevo administrador ha sido agregado");
                        this.props.history.push(`/HomeAdmin`);
                    })
                    .catch(err => console.error(err));
            }
        });

        event.preventDefault();

    }

    modalTrigger(event) {
        this.setState({ show: !this.state.show });
        event.preventDefault();
    };

    /**
    * This method set the prop attributes
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    }

    getAdminUserType() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getAdminUserType`).then(response => {
                const userTypeList = response.data[0];
                this.setState({ userTypeList });
            });
        } catch (err) {
            console.error(err);
        }
    }



    /**
    * Method set the userTypeID value and shows or hide the medicalCod input field
    */
    showMedicalCod(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        if (event.target.value != "3") {
            document.getElementById("medicalCodInput").value = null;
            document.getElementById("medicalCodDiv").style.display = 'none';
        } else {
            document.getElementById("medicalCodDiv").style.display = 'block';
        }
    }

    /**
    * Method that verify that the input text in a input type decimal is a number
    */
    inputNumberValidator(event) {
        const re = /^[0-9\b]+$/;
        const { name, value } = event.target;

        if (value === "" || re.test(value)) {
            this.setState({
                [name]: value
            });
        } else {
            this.showModal(event);
        }
    }

    /**
    * Method that verify that the input text in a input type email is a valid email
    */
    emailValidator() {
        const re = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*[.][a-z]{2,4}$/;
        if (re.test(this.state.email)) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Method that verify that the require inputs are not empty
    */
    empty() {
        if (this.state.userTypeID == "3") {
            if (this.state.identificationID == "" || this.state.firstName == "" || this.state.firstLastName == "" || this.state.email == ""
                || this.state.password == "" || this.state.confirmPassword == "" || this.state.medicalCod == "") {
                return true;
            }
        } else {
            if (this.state.identificationID == "" || this.state.firstName == "" || this.state.firstLastName == "" || this.state.email == ""
                || this.state.password == "" || this.state.confirmPassword == "") {
                return true;
            }
        }
        return false;
    }

    /**
   * Method that allows that the password can be shown
   */
    showPasswordFields() {
        var show = document.getElementById('showPasswordFields').checked;
        if (show == true) {
            document.getElementById('password').type = "text";
            document.getElementById('confirmPassword').type = "text";
        } else {
            document.getElementById('password').type = "password";
            document.getElementById('confirmPassword').type = "password";
        }
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    /**
* Method that redirect to the previous page
*/
    backButton() {
        this.props.history.push(`/HomeAdmin`);
    }

    render() {
        const selectUserType = this.state.userTypeList.map((userTypeList, i) => {
            if (i == 0) {
                return (

                    <option defaultValue={userTypeList.userTypeID}
                        value={userTypeList.userTypeID}>{userTypeList.description}</option>

                )
            } else {
                return (
                    <option value={userTypeList.userTypeID}>{userTypeList.description}</option>

                )
            }

        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Agregar administrador</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 className="text-left colorBlue">Agregar Administrador</h1>
                            <br />
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Tipo de administrador<font color="red">*</font></p>
                                        <select align="justify" name="userTypeID" className="form-control" font-size="18px" onChange={this.showMedicalCod}>
                                            {selectUserType}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Cédula<font color="red">*</font></p>
                                        <input type="text" name="identificationID" placeholder="#########" font-size="18px" className="form-control" onChange={this.inputNumberValidator} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Primer nombre<font color="red">*</font></p>
                                        <input type="text" name="firstName" placeholder="Ej: Kevin" className="form-control" font-size="18px" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Primer Apellido<font color="red">*</font></p>
                                        <input type="text" name="firstLastName" placeholder="Ej: Jiménez" className="form-control" font-size="18px" onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Segundo nombre</p>
                                        <input type="text" name="secondName" placeholder="Ej: José" className="form-control" font-size="18px" onChange={this.handleInputChange}></input>
                                        <br></br>
                                        <p align="justify">Segundo Apellido</p>
                                        <input type="text" name="secondLastName" placeholder="Ej: Molina" className="form-control" font-size="18px" onChange={this.handleInputChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="left">
                                        <p align="justify">Email<font color="red">*</font></p>
                                        <input type="email" id="email" name="email" placeholder="Ej: correo@mail.com" className="form-control" font-size="18px" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Contraseña<font color="red">*</font></p>
                                        <input type="password" id="password" placeholder="Contraseña" name="password" className="form-control" font-size="18px" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Confirmar contraseña<font color="red">*</font></p>
                                        <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" name="confirmPassword" className="form-control" font-size="18px" onChange={this.handleInputChange} required></input>
                                        <input type="checkbox" id="showPasswordFields" placeholder="Contraseña" name="showPasswordFields" font-size="18px" onChange={this.showPasswordFields} ></input>Mostrar campos
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="left" id="medicalCodDiv">
                                        <p align="justify">Código de Médico<font color="red">*</font></p>
                                        <input type="text" id="medicalCodInput" name="medicalCod" placeholder="#########" font-size="18px" className="form-control" onChange={this.handleInputChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" mt-3 col-md-3">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                                <div className=" mt-3 col-md-3 offset-6">
                                    <button align="rigth" className="buttonSizeGeneral" onClick={this.modalTrigger}>Guardar</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <ModalComponent tittle="Administrador agregado" show={this.state.show} onClose={this.modalTrigger} >
                                        <br />{this.state.firstName} {this.state.firstLastName}
                                    </ModalComponent>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddAdmin;