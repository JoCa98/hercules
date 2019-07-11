/**
 * @fileoverview AddAdmin page, this page create a new administer or edit an existing admin
 * this form can create a medical admin and a general admin, this general
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

class AddAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userTypeID: 3,
            identificationID: 0,
            firstName: "",
            secondName: "",
            firstLastName: "",
            secondLastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            emailExist: 1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.empty = this.empty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
        this.inputNumberValidator = this.inputNumberValidator.bind(this);
        this.emailValidator = this.emailValidator.bind(this);
        this.validateIfUserExistByEmail = this.validateIfUserExistByEmail.bind(this);
        this.loadIfUserExistByEmail = this.loadIfUserExistByEmail.bind(this);
    }

    componentDidMount() {
        this.loadIfUserExistByEmail();
    }

    /**
        * Method that submit all the information in the form
        */
    handleSubmit = event => {
        if (!this.empty()) {
            if (this.emailValidator()) {
                if (this.handlePasswordValidation()) {
                    if (!this.validateIfUserExistByEmail()) {

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
                            })
                            .catch(err => console.error(err));

                    } else {
                        document.getElementById("email").value = "";
                        alert("El email ingresado ya existe");
                    }
                } else {
                    alert("Las contraseñas deben ser iguales");
                }
            } else {
                alert("El email no tiene el formato correcto");
            }
        } else {
            alert("Los campos con * son obligatorios");
        }
        event.preventDefault();
    }

    validateIfUserExistByEmail() {

        console.log(this.state.emailExist[0].exist);

        this.loadIfUserExistByEmail();

        console.log(this.state.emailExist[0].exist);

        if (this.state.emailExist[0].exist === 1) {
            return true;
        } else {
            return false;
        }

    }

    loadIfUserExistByEmail() {
        try {

            axios.get(`http://localhost:9000/AdminRoute/userExistByEmail`,
                {
                    params: { email: this.state.email }
                }).then(response => {
                    const emailExist = response.data[0];
                    this.setState({ emailExist });
                });

        } catch (err) {
            console.error(err);
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    /**
    * Method that verify that the input password in a input type decimal is a number
    */
    handlePasswordValidation() {
        if (this.state.password !== this.state.confirmPassword) {
            return false;
        } else {
            return true;
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
            alert("La cédula no puede contener letras");
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
        if (this.state.identificationID == "" || this.state.firstName == "" || this.state.firstLastName == "" || this.state.email == ""
            || this.state.password == "" || this.state.confirmPassword == "") {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-6 offset-3 card p-5">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <h2 ><font color="#41ade7">Agregar Administrador</font></h2>
                            <br />
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Tipo de administrador</p>
                                        <select value={this.state.userTypeID} align="justify" name="userTypeID" className="form-control" onChange={this.handleInputChange}>
                                            <option defaultValue="3" >Médico</option>
                                            <option value="4">Gimnasio</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Cédula*</p>
                                        <input type="text" name="identificationID" className="form-control" onChange={this.inputNumberValidator} required></input>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Primer nombre*</p>
                                        <input type="text" name="firstName" className="form-control" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Primer Apellido*</p>
                                        <input type="text" name="firstLastName" className="form-control" onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group" align="left">
                                        <p align="justify">Segundo nombre</p>
                                        <input type="text" name="secondName" className="form-control" onChange={this.handleInputChange}></input>
                                        <br></br>
                                        <p align="justify">Segundo Apellido</p>
                                        <input type="text" name="secondLastName" className="form-control" onChange={this.handleInputChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="left">
                                        <p align="justify">Email*</p>
                                        <input type="email" id="email" name="email" className="form-control" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Contraseña*</p>
                                        <input type="password" name="password" className="form-control" onChange={this.handleInputChange} required></input>
                                        <br></br>
                                        <p align="justify">Confirmar contraseña*</p>
                                        <input type="password" name="confirmPassword" className="form-control" onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 offset-md-7">
                                    <button align="left" className="buttonSizeGeneral">Guardar</button>
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