import React, { Component } from 'react';
import axios from "axios";
import Hash from './Hash';
import NavbarUserHome from './NavbarUserHome';
class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hash: new Hash(),
            email: "",
            password: "",
            userTypeID: "",
            partyID: "",
            isUserValid: "",
        };
        this.goSignUp = this.goSignUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
        this.goPasswordRecovery = this.goPasswordRecovery.bind(this);

    }

    tryLogin() {
        //console.log(this.props.location.pathname);
        //window.location.reload();
        axios.get(`http://localhost:9000/User/isEmailValid`, { params: { email: this.state.email } }).then(response => {
            this.setState({ isUserValid: JSON.parse(JSON.stringify(response.data))[0]['isEmailValid'].data[0] });
            if (this.state.isUserValid == 1) {
                axios.get(`http://localhost:9000/User/getHashPassword`, { params: { email: this.state.email } }).then(response => {
                    var hashPasswordDB = JSON.parse(JSON.stringify(response.data[0]))[0]['hashPassword']
                    if (this.state.hash.comparePassword(this.state.password, hashPasswordDB) == true) {
                        sessionStorage.setItem('email', this.state.email);
                        sessionStorage.setItem('password', hashPasswordDB);
                        axios.get(`http://localhost:9000/User/getDataForLogin`, { params: { email: this.state.email, password: this.state.password } }).then(response => {
                            sessionStorage.setItem('partyID', JSON.parse(JSON.stringify(response.data[0]))[0]['partyID']);
                            sessionStorage.setItem('userTypeID', JSON.parse(JSON.stringify(response.data[0]))[0]['userTypeID']);
                            if (sessionStorage.getItem('userTypeID') == 1 || sessionStorage.getItem('userTypeID') == 2) {
                                this.props.history.push(`/UserHome`);
                                window.location.reload();
                            } else if (sessionStorage.getItem('userTypeID') == 3 || sessionStorage.getItem('userTypeID') == 4){
                                this.props.history.push(`/HomeAdmin`);
                                window.location.reload();
                            }
                        });
                    } else {
                        alert("La contraseña ingresada no es correcta.")
                    }
                });
            }else {
                alert("El correo ingresado no corresponde a ningún usuario registrado")
            }
        });
    }

    goSignUp() {
        this.props.history.push(`/SignUp`);
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
                            <input type="text" name="email" value={this.state.email} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <br></br>
                            <p>Contraseña</p>
                            <input type="password" name="password" value={this.state.password} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <br></br>
                            <button align="left" name="logIn" className="buttonSizeGeneral w-100" onClick={this.tryLogin}>Ingresar</button>
                            <br></br>
                            <br></br>
                            <a href="javascript:void(0);" onClick={this.goPasswordRecovery}>Recuperar contraseña</a>
                            <br></br>
                            <a href="javascript:void(0);" onClick={this.goSignUp}>Registrarse</a>
                            <br></br>

                        </div>
                    </div>
                    <div className="col-3">

                    </div>
                </div>
            </div>
        )
    }
}
//export default withRouter(LogIn);
export default LogIn;