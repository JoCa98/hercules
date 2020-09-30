import React, { Component } from 'react';
import axios from "axios";
import Hash from './Hash';
import validations from './validations';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';
import {baseUrl} from "./baseUrl";

class ChangeTempPassword extends Component {
    constructor(props) {
        super(props);
        /**
        *permissionsManager:
        * @type {PermissionsManager}
        * Instance of PermissionManager to grant or deny permission to the user to access certain pages from the current one
        * and depending of the user type.
        * 
        * hash
        * @type {hash}
        * Instance of Hash which encrypts the password.
        * 
        * tempPassword:
        * @type {String}
        * Property that stores the temporal password.
        * 
        * tempPassword:
        * @type {String}
        * Property that stores the new password.
        * 
        * confirmPassword:
        * @type {String}
        * Property that stores the comfirmation new password.
        * 
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            hash: new Hash(),
            validations: new validations(),
            tempPassword: "",
            newPassword: "",
            confirmPassword: "",
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.changeTempPassword = this.changeTempPassword.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
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
    * Method that allows to show or hide the password fields content.
    */
    showPasswordFields() {
        var show = document.getElementById('showPasswordFields').checked;
        if (show == true) {
            document.getElementById('tempPassword').type = "text";
            document.getElementById('newPassword').type = "text";
            document.getElementById('confirmPassword').type = "text";
        } else {
            document.getElementById('tempPassword').type = "password";
            document.getElementById('newPassword').type = "password";
            document.getElementById('confirmPassword').type = "password";
        }
    }

    /**
    * Method that updates the temporal password with a new one. Notifies the user when the update is done and
    * redirects them to their home page.
    */
    updatePassword(event) {
        var newPassword = this.state.hash.encode(this.state.newPassword);
        fetch(baseUrl + "User/updatePassword", {
            method: "post",
            body: JSON.stringify({
                email: sessionStorage.getItem('email'),
                password: newPassword,
                tempPassword: 0
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
        sessionStorage.setItem('password', newPassword);
        this.setState({
            isExit: true
        });
        this.modalTrigger(event, 'Contraseña', 'La contraseña fue cambiada con éxito. Ahora será redirigido a la página principal');
        sessionStorage.removeItem("changeTempPassword");
    }

    /**
    * Method that validates the password field before update the password.
    */
    changeTempPassword(event) {
        if (document.getElementById('tempPassword').value.length == 0 || document.getElementById('newPassword').value.length == 0
            || document.getElementById('confirmPassword').value.length == 0) {
            this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos deben estar llenos');
        } else if (!this.state.hash.comparePassword(this.state.tempPassword, sessionStorage.getItem('password'))) {
            this.modalTrigger(event, 'Contraseña', 'La contraseña temporal es incorrecta');
        } else if (!this.state.validations.validatePasswordField(this.state.newPassword) || !this.state.validations.validatePasswordField(this.state.confirmPassword)) {
            this.modalTrigger(event, 'Contraseña', 'La contraseña debe contar con una extensión mínima de 8 caracteres y estar compuesta al menos por números y letras');
        } else if (this.state.newPassword != this.state.confirmPassword) {
            this.modalTrigger(event, 'Contraseña', 'Los campos de nueva contraseña no coinciden');
        } else {
            this.updatePassword(event);
        }
    }

    /**
    * Method that changes the value of the state variable using the object that triggers the event.
    * To do this the element must have the property name defined as the state variable
    * 
    * Receive an object that contains the element that called the method
    * @param {Object} 
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
            if (sessionStorage.getItem('userTypeID') == 1 || sessionStorage.getItem('userTypeID') == 2) {
                this.props.history.push(`/UserHome`);
                window.location.reload();
            } else if (sessionStorage.getItem('userTypeID') == 3 || sessionStorage.getItem('userTypeID') == 4) {
                this.props.history.push(`/HomeAdmin`);
                window.location.reload();
            }
        }
        event.preventDefault();
    };

    render() {
        return (
            <div className="container">
                <div className="row mt-4 " >
                    <div className="col-12 col-lg-6 offset-lg-3 card p-5">
                        <h1 className="text-left colorBlue">Cambio de contraseña temporal</h1>
                        <br></br>
                        <div className="row mt-4 " ></div>
                        <div className="form-group" align="left">
                            <p>Contraseña temporal</p>
                            <input type="password" fontSize="18px" name="tempPassword" id="tempPassword" value={this.state.tempPassword} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <br></br>
                            <p>Contraseña nueva</p>
                            <input type="password" fontSize="18px" name="newPassword" id="newPassword" value={this.state.newPassword} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <br></br>
                            <p>Confirma contraseña nueva</p>
                            <input type="password" fontSize="18px" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <input type="checkbox" id="showPasswordFields" required name="showPasswordFields" onChange={this.showPasswordFields} ></input>Mostrar contraseña
                            <br></br>
                            <br></br>
                            <button align="left" name="changeTempPassword" className="buttonSizeGeneral w-100" onClick={this.changeTempPassword}>Ingresar</button>
                            <br></br>

                        </div>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                            <br />{this.state.modalChildren}
                        </ModalComponent>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChangeTempPassword;