import React, { Component } from 'react';
import axios from "axios";
import Hash from './Hash';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class LogIn extends Component {
    constructor(props) {
        super(props);
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

    componentDidMount() {
        window.scrollTo(0, 0);

        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            sessionStorage.clear();
        }
    }

    showPasswordFields() {
        var show = document.getElementById('showPasswordFields').checked;
        if (show == true) {
            document.getElementById('password').type = "text";
        } else {
            document.getElementById('password').type = "password";
        }
    }

    tryLogin(event) {
        axios.get(`http://localhost:9000/User/isEmailValid`, { params: { email: this.state.email.trim() } }).then(response => {
            this.setState({ isUserValid: JSON.parse(JSON.stringify(response.data))[0]['isEmailValid'].data[0] });
            if (this.state.isUserValid == 1) {
                axios.get(`http://localhost:9000/User/getHashPassword`, { params: { email: this.state.email.toLowerCase().trim() } }).then(response => {
                    var hashPasswordDB = JSON.parse(JSON.stringify(response.data[0]))[0]['hashPassword']
                    if (this.state.hash.comparePassword(this.state.password, hashPasswordDB) == true) {
                        sessionStorage.setItem('email', this.state.email);
                        sessionStorage.setItem('password', hashPasswordDB);
                        axios.get(`http://localhost:9000/User/getDataForLogin`, { params: { email: this.state.email, password: this.state.password } }).then(response => {
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
                                        axios.get("http://localhost:9000/RoutineRoute/getRoutineID", {
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
                                        || sessionStorage.getItem('userTypeID') == 5 || sessionStorage.getItem('userTypeID') == 6 ) {
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

    goSignUp() {
        this.props.history.push(`/Terms`);
    }

    goPasswordRecovery() {
        this.props.history.push(`/PasswordRecovery`);
    }

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
//export default withRouter(LogIn);
export default LogIn;