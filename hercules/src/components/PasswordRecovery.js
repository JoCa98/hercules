/**
 * @fileoverview PasswordRecovery page, in this page, the user enters their email if the want to request a 
 * new pasword in case they lost the current one. Then a temporal password is generated and sent to the given email.
 *
 * @version 1.0
 *
 * @author Kevin Loria Paniagua <kevin.loria@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of PasswordRecovery was written by Kevin Loría.
 */

import React, { Component } from 'react';
import RandomPassword from './RandomPassword';
import Hash from './Hash';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class PasswordRecovery extends Component {
    constructor() {
        super();
        /**
        *permissionsManager:
        * @type {PermissionsManager}
        * Instance of PermissionManager to grant or deny permission to the user to access certain pages from the current one
        * and depending of the user type.
        * 
        * randomPassword:
        * @type {RandomPassword}
        * Instance of RandomPassword which generates a random password.
        * 
        * hash
        * @type {hash}
        * Instance of Hash which encrypts the temporal password.
        * 
        * email
        * @type {String}
        * Property that stores the user email.
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            randomPassword: new RandomPassword(),
            hash: new Hash(),
            email: "",
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendTempPasswordEmail = this.sendTempPasswordEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.backButton = this.backButton.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
    * Method that validate the page permissions.
    */
    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
    }

    /**
    * Method that updates the current user password with a new one.
    */
    updatePassword() {
        var tempPassword = this.state.randomPassword.generatePassword();
        alert(tempPassword);
        fetch("http://localhost:9000/User/updatePassword", {
            method: "post",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.hash.encode(tempPassword),
                tempPassword: 1
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
        this.sendTempPasswordEmail(tempPassword);
        this.setState({ 
            isExit: true
         }); 
        this.modalTrigger(event,'Contraseña','Se ha enviado una contraseña temporal al correo ingresado. Ahora será redirigido a la pantalla de ingreso');                                            
    }

    /**
    * Method that send an email to the user email with a temporal password.
    */
    sendTempPasswordEmail(tempPassword) {
        fetch("http://localhost:9000/User/sendTempPasswordEmail", {
            method: "post",
            body: JSON.stringify({ email: this.state.email, tempPassword: tempPassword }),
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
    }

    /**
    * Method that changes the value of the state variable using the object that triggers the event.
    *  To do this the element must have the property name defined as the state variable
    * 
    * Receive an object that contains the element that called the method
    *  @param {Object} 
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    /**
    * Method that redirect the user to the previous page.
    * 
    */
    backButton() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-6 offset-3 p-5 card">
                        <form>
                            <h1 className="text-left colorBlue">Recuperación de Contraseña</h1>
                            <br />
                            <div class="form-group">
                                <p align="justify">Ingrese el correo del usuario para recibir
                                 una contraseña<br /> nueva temporal</p>
                                <input type="text" fontSize="18px" name="email" className="form-control" onChange={this.handleInputChange}></input>
                            </div>
                            <div className="row mt-4">
                                <div className="col-6 text-left">
                                    <button type="button" name="cancel" className="buttonSizeGeneral" onClick={this.backButton}>Cancelar</button>
                                </div>
                                <div className="col-6 text-right">
                                    <button type="button" name="sendTempPassword" className="buttonSizeGeneral" onClick={this.updatePassword}>Enviar</button>
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
export default PasswordRecovery;