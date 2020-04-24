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
import PermissionsManager from "./PermissionsManager";

class AddAdmin extends Component {
    constructor(props) {
        super(props);
        /**
        *userTypeList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database
        * 
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site
        * 
        * hash:
        * @type {String}
        * Property that will contain the encrypted password
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
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
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.showMedicalCod = this.showMedicalCod.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.empty = this.empty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
        this.backButton = this.backButton.bind(this);
        this.getAdminUserType = this.getAdminUserType.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getAdminUserType();
        }
    }

    /**
        * Method that submit all the information in the form to the database
        */
    handleSubmit = event => {

        axios.get(`http://localhost:9000/User/isEmailValid`, { params: { email: this.state.email } }).then(response => {
            var isEmailValid = JSON.parse(JSON.stringify(response.data))[0]['isEmailValid'].data[0];

            if (this.empty()) {
                this.modalTrigger(event, 'Campos obligatorios', 'Los campos de texto con un * no se pueden dejar en blanco');
            } else if (!this.state.validations.validateTextField(this.state.firstName.trim())
                || (this.state.secondName != null && (this.state.secondName.trim() != "") && (!this.state.validations.validateTextField(this.state.secondName.trim())))
                || !this.state.validations.validateTextField(this.state.firstLastName.trim())
                || (this.state.secondLastName != null && (this.state.secondLastName.trim() != "") && (!this.state.validations.validateTextField(this.state.secondLastName.trim())))
            ) {
                this.modalTrigger(event, 'Nombre', 'Los datos del nombre solo pueden estar compuestos por letras');
            } else if (!this.state.validations.validateIdentification(this.state.identificationID)) {
                this.modalTrigger(event, 'Cédula', 'El formato de la cédula ingresada es incorrecto');
            } else if (!this.state.validations.validateAdminEmailField(this.state.email)) {
                this.modalTrigger(event, 'Email', 'El email no tiene el formato correcto');
            } else if (!this.state.validations.validatePasswordField(this.state.password) || !this.state.validations.validatePasswordField(this.state.confirmPassword)) {
                this.modalTrigger(event, 'Contraseña', 'La contraseña debe contar con una extensión mínima de 8 caracteres y estar compuesta al menos por números y letras');
            } else if (this.state.password != this.state.confirmPassword) {
                this.modalTrigger(event, 'Contraseña', 'Los campos de la contraseña no coinciden');
            } else if (isEmailValid == 1) {
                document.getElementById("email").value = null;
                this.modalTrigger(event, 'Email', 'El correo ingresado ya corresponde a otro administrador registrado');
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
                        this.setState({
                            isExit: true
                        });
                        this.modalTrigger(event, 'Administrador agregado', this.state.firstName + ' ' + this.state.firstLastName);
                    })
                    .catch(err => console.error("Un error inesperado a ocurrido"));
            }
        });
        event.preventDefault();
    }

    /**
     * This method takes care of show a modal with useful information
     */
    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };

    /**
     * This method close the modal  
     */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            this.props.history.push(`/HomeAdmin`);
        }
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

    /**
    * This method load the information in the dropdownlist
    */
    getAdminUserType() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getAdminUserType`).then(response => {
                const userTypeList = response.data[0];
                this.setState({ userTypeList });
            });
        } catch (err) {
            console.error("Un error inesperado a ocurrido");
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
    * Method that verify that the require inputs are not empty
    */
    empty() {
        if (this.state.identificationID == "" || this.state.identificationID == null ||
            this.state.firstName == "" || this.state.firstName == null ||
            this.state.firstLastName == "" || this.state.firstLastName == null ||
            this.state.email == "" || this.state.email == null ||
            this.state.password == "" || this.state.password == null ||
            this.state.confirmPassword == "" || this.state.confirmPassword == null) {
            if (this.state.userTypeID == "3") {
                if (this.state.medicalCod == "" || this.state.medicalCod == null) {
                    return true
                }
            }
            return true;
        } else {
            return false;
        }
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
                                        <select align="justify" name="userTypeID" className="form-control" fontSize="18px" onChange={this.showMedicalCod}>
                                            {selectUserType}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Cédula<font color="red">*</font></p>
                                        <input type="text" name="identificationID" placeholder="#########" fontSize="18px" className="form-control" onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group" align="left">
                                                <p align="justify">Primer nombre<font color="red">*</font></p>
                                                <input type="text" name="firstName" placeholder="Ej: Kevin" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group" align="left">
                                                <p align="justify">Segundo nombre</p>
                                                <input type="text" name="secondName" placeholder="Ej: José" className="form-control" fontSize="18px" onChange={this.handleInputChange}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group" align="left">
                                                <p align="justify">Primer Apellido<font color="red">*</font></p>
                                                <input type="text" name="firstLastName" placeholder="Ej: Jiménez" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group" align="left">
                                                <p align="justify">Segundo Apellido</p>
                                                <input type="text" name="secondLastName" placeholder="Ej: Molina" className="form-control" fontSize="18px" onChange={this.handleInputChange}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="left">
                                        <p align="justify">Email<font color="red">*</font></p>
                                        <input type="email" id="email" name="email" placeholder="Ej: correo@mail.com" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Contraseña<font color="red">*</font></p>
                                        <input type="password" id="password" placeholder="Contraseña" name="password" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Confirmar contraseña<font color="red">*</font></p>
                                        <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" name="confirmPassword" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
                                        <input type="checkbox" id="showPasswordFields" placeholder="Contraseña" name="showPasswordFields" fontSize="18px" onChange={this.showPasswordFields} ></input>Mostrar campos
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="left" id="medicalCodDiv">
                                        <p align="justify">Código de Médico<font color="red">*</font></p>
                                        <input type="text" id="medicalCodInput" name="medicalCod" placeholder="#########" fontSize="18px" className="form-control" onChange={this.handleInputChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" mt-3 col-md-3">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                                <div className=" mt-3 col-md-3 offset-6">
                                    <button align="rigth" className="buttonSizeGeneral" onClick={this.handleSubmit}>Guardar</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                                        <br />{this.state.modalChildren}
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