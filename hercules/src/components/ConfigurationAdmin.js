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
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class ConfigurationAdmin extends Component {
    constructor(props) {
        super(props);
        /**      
      * partyID:
      * @type {integer}
      * Property that indicates the partyID of a specific user
      * 
      * hash:
      * @type {String}
      * Property that will contain the encrypted password
      */

        this.state = {
            permissionsManager: new PermissionsManager(),
            hash: new Hash(),
            validations: new validations(),
            partyID: sessionStorage.getItem("partyID"),
            password: "",
            confirmPassword: "",
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
        this.backButton = this.backButton.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
    }

    /**
        * Method that submit the information in the form of password configuration to the database
        */
    changePassword = event => {

        if (this.state.password == "" || this.state.confirmPassword == "") {
            this.modalTrigger(event, 'Campos obligatorios', 'Los campos de texto con un * no se pueden dejar en blanco');
        } else if (this.state.password != this.state.confirmPassword) {
            this.modalTrigger(event, 'Contraseña', 'Los campos de contraseña no coinciden');
        } if (!this.state.validations.validatePasswordField(this.state.password) || !this.state.validations.validatePasswordField(this.state.confirmPassword)) {
            this.modalTrigger(event, 'Contraseña', 'La contraseña debe contar con una extensión mínima de 8 caracteres y estar compuesta al menos por números y letras');
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
                    this.setState({
                        isExit: true
                    });
                    this.modalTrigger(event, 'Contraseña', 'La contraseña fue cambiada con éxito');
                })
                .catch(err => console.error(err));
        }
        event.preventDefault();
    }

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
                        <Breadcrumb.Item>Configuraciones</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-12 card">
                        <br />
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-left colorBlue mb-4">Configuraciones</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10 offset-1 mb-4 card p-5">
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
                                                <input type="password" fontSize="18px" id="password" placeholder="Contraseña" name="password" className="form-control" onChange={this.handleInputChange} required></input>
                                                <br></br>
                                                <p align="justify">Confirmar contraseña<font color="red">*</font></p>
                                                <input type="password" fontSize="18px" id="confirmPassword" placeholder="Confirmar contraseña" name="confirmPassword" className="form-control" onChange={this.handleInputChange} required></input>
                                                <input type="checkbox" fontSize="18px" id="showPasswordFields" placeholder="Contraseña" name="showPasswordFields" onChange={this.showPasswordFields} ></input>Mostrar campos
                                                <br />
                                                <br />
                                                <button align="right" className="buttonSizeGeneral offset-9">Guardar</button>
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
                        <div className="row">
                            <div className="col-md-1">
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
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
export default ConfigurationAdmin;