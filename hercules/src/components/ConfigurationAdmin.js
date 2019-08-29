/**
 * @fileoverview ConfigurationAdmin page, this page is used to configure the main
 * aspects of a administer
 * @version 1.0
 *
 * @author  Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of ConfigurationAdmin was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import validations from './validations';
import Hash from './Hash';

class ConfigurationAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: new Hash(),
            validations: new validations(),
            partyID: sessionStorage.getItem("partyID"),
            password: "",
            confirmPassword: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    /**
        * Method that submit the information in the form of password configuration 
        */
    changePassword = event => {

        if (this.state.password == "" || this.state.confirmPassword == "") {
            alert("Los campos con * son obligatorios");
        } else if (this.state.password != this.state.confirmPassword) {
            alert("Los campos de contraseña no coinciden");
        } else {
            fetch("http://localhost:9000/AdminRoute/updateAdminPassword", {
                method: "post",
                body: JSON.stringify({
                    partyID: this.state.partyID,
                    password: this.state.hash.encode(this.state.password)
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    alert("La contraseña fue cambiada con éxito");
                    this.props.history.push(`/HomeAdmin`);
                })
                .catch(err => console.error(err));
        }
        event.preventDefault();
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4 card">
                        <br />
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-left colorBlue mb-4">Configuraciones</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10 offset-1 mb-5 card p-5">
                                <div className="row">
                                    <div className="col-12 offset-2">
                                        <h2 className="text-left">Cambio de contraseña</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8 offset-2 mt-4">

                                        <form className="form-horizontal" onSubmit={this.changePassword}>

                                            <div className="form-group" align="left" >
                                                <p align="justify">Contraseña<font color="red">*</font></p>
                                                <input type="password" id="password" placeholder="Contraseña" name="password" className="form-control" onChange={this.handleInputChange} required></input>
                                                <br></br>
                                                <p align="justify">Confirmar contraseña<font color="red">*</font></p>
                                                <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" name="confirmPassword" className="form-control" onChange={this.handleInputChange} required></input>
                                                <input type="checkbox" id="showPasswordFields" placeholder="Contraseña" name="showPasswordFields" onChange={this.showPasswordFields} ></input>Mostrar campos
                                                <br />
                                                <br />
                                                <button align="left" className="buttonSizeGeneral">Guardar</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 offset-1">
                                <button className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConfigurationAdmin;