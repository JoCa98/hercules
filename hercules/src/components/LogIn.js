import React, { Component } from 'react';
import axios from "axios";
import Hash from './Hash';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';
import {baseUrl} from "./baseUrl";
/**
 * @fileoverview LogIn page, where users can log in or request to sign up.
 * 
 * @version 1.0
 *
 * @author Kevin Loria Paniagua <kevin.loria@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of LogIn was written by Kevin Loria.
 */
class LogIn extends Component {
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
   * email:
   * @type {String}
   * Property that stores the email of the user.
   * 
   * password:
   * @type {String}
   * Property that stores the password of the user account.
   * 
   * userTypeID:
   * @type {integer}
   * Property that indicates the type of user and his behavior in the web site 
   * 
   * partyID:
   * @type {integer}
   * Property that indicates the user id
   * 
   * isUserValid:
   * @type {integer}
   * Property that indicates if the input data is from an existing user or not
   */
        this.state = {
            hash: new Hash(),
            permissionsManager: new PermissionsManager(),
            email: "",
            password: "",
            userTypeID: "",
            partyID: "",
            isUserValid: "",
            show: false,
            modalTittle: "",
            modalChildren: ""
        };
        this.goSignUp = this.goSignUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
        this.goPasswordRecovery = this.goPasswordRecovery.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
        this.onKeyEvent = this.onKeyEvent.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
    }

    /**
    * Method that validate the page permissions. Then, loads all the address select elements.
    */
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            sessionStorage.clear();
        }
    }

    /**
    * Method that hides and shows the password fields.
    * 
    */
    showPasswordFields() {
        var show = document.getElementById('showPasswordFields').checked;
        if (show == true) {
            document.getElementById('password').type = "text";
        } else {
            document.getElementById('password').type = "password";
        }
    }

    /**
    * Method that authenticates the input data and try to log in the user.
    * Depending of the user types, it goes to admin or user site, and displays or shows
    * certains fields and options to each user subtype.
    * If the data in wrong or invalid, it will display and error message.
    */
    tryLogin(event) {
        axios.get(baseUrl + `User/isEmailValid`, { params: { email: this.state.email.trim() } }).then(response => {
            this.setState({ isUserValid: JSON.parse(JSON.stringify(response.data))[0]['isEmailValid'].data[0] });
            if (this.state.isUserValid == 1) {
                axios.get(baseUrl + `User/getHashPassword`, { params: { email: this.state.email.toLowerCase().trim() } }).then(response => {
                    var hashPasswordDB = JSON.parse(JSON.stringify(response.data[0]))[0]['hashPassword']
                    if (this.state.hash.comparePassword(this.state.password, hashPasswordDB) == true) {
                        sessionStorage.setItem('email', this.state.email);
                        sessionStorage.setItem('password', hashPasswordDB);
                        axios.get(baseUrl + `User/getDataForLogin`, { params: { email: this.state.email, password: this.state.password } }).then(response => {
                            sessionStorage.setItem('partyID', JSON.parse(JSON.stringify(response.data[0]))[0]['partyID']);
                            sessionStorage.setItem('userTypeID', JSON.parse(JSON.stringify(response.data[0]))[0]['userTypeID']);
                            var tempPassword = JSON.parse(JSON.stringify(response.data[0]))[0]['tempPassword'].data[0];
                            var status = JSON.parse(JSON.stringify(response.data[0]))[0]['status'].data[0];
                            if (status == 1) {
                                if (tempPassword == 1) {
                                    sessionStorage.setItem("changeTempPassword", "true");
                                    this.props.history.push(`/ChangeTempPassword`);
                                } else {
                                    if (sessionStorage.getItem('userTypeID') == 1 || sessionStorage.getItem('userTypeID') == 2) {
                                        var res = 0;
                                        axios.get(baseUrl + "RoutineRoute/getRoutineID", {
                                            params: {
                                                partyID: sessionStorage.getItem('partyID')
                                            }
                                        }).then(response => {
                                            if (response) {

                                                res = response.data[0];
                                                if (res[0] != null) {
                                                    sessionStorage.setItem("routineID", res[0].routineID);
                                                    this.props.history.push(`/UserHome`);
                                                    window.location.reload();
                                                } else {
                                                    this.props.history.push(`/UserHomeWithOut`);
                                                    window.location.reload();
                                                }
                                            }
                                        })

                                    } else if (sessionStorage.getItem('userTypeID') == 3 || sessionStorage.getItem('userTypeID') == 4
                                        || sessionStorage.getItem('userTypeID') == 5 || sessionStorage.getItem('userTypeID') == 6) {
                                        this.props.history.push(`/HomeAdmin`);
                                        window.location.reload();
                                    }
                                }
                            } else {
                                sessionStorage.clear();
                                this.modalTrigger(event, 'LogIn', 'Contraseña y/o correo ingresados no son correctos o este usuario no está activo');
                            }
                        });
                    } else {
                        this.modalTrigger(event, 'LogIn', 'Contraseña y/o correo ingresados no son correctos o este usuario no está activo');
                    }
                });
            } else {
                this.modalTrigger(event, 'LogIn', 'Contraseña y/o correo ingresados no son correctos o este usuario no está activo');
            }
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
    * Method that redirect the user to the Terms page.
    * 
    */
    goSignUp() {
        this.props.history.push(`/Terms`);
    }

    /**
    * Method that redirect the user to the password recovery page.
    * 
    */
    goPasswordRecovery() {
        this.props.history.push(`/PasswordRecovery`);
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
       * Method that executes the search method by pressing enter in the input.
       * 
       * Receive an object that contains the element that called the method
       *  @param {Object} 
       */
    onKeyEvent(e) {
        if (e.key == "Enter") {
            this.tryLogin(e);
        }
    }

    render() {

        return (

            <div className="container">
                <div className="row mt-4 " >
                    <div className="col-12 col-lg-6 offset-lg-3 card p-5">
                        <h1 className="text-center">Ingreso al sistema del gimnasio</h1>
                        <br></br>
                        <div className="row mt-4 " ></div>
                        <div className="form-group" align="left">
                            <p>Correo institucional</p>
                            <input fontSize="18px" type="email" name="email" onKeyPress={this.onKeyEvent} value={this.state.email} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <br></br>
                            <p>Contraseña</p>
                            <input fontSize="18px" type="password" name="password" id="password" onKeyPress={this.onKeyEvent} value={this.state.password} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <input type="checkbox" id="showPasswordFields" required name="showPasswordFields" onChange={this.showPasswordFields} ></input>Mostrar contraseña
                            <br></br>
                            <br></br>
                            <button align="left" name="logIn" className="buttonSizeGeneral w-100" onClick={this.tryLogin}>Ingresar</button>
                            <br></br>
                            <br></br>
                            <a href="javascript:void(0);" onClick={this.goPasswordRecovery}>Recuperar contraseña</a>
                            <br></br>
                            <a href="javascript:void(0);" onClick={this.goSignUp} >Registrarse</a>
                            <br></br>

                        </div>
                    </div>
                    <div className="col-3">
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
        )
    }
}

export default LogIn;