import React, { Component } from 'react';
import RandomPassword from './RandomPassword';
import Hash from './Hash';
import PermissionsManager from "./PermissionsManager";



class PasswordRecovery extends Component {
    constructor() {
        super();
        this.state = {
            permissionsManager: new PermissionsManager(),
            randomPassword: new RandomPassword(),
            hash: new Hash(),
            email: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendTempPasswordEmail = this.sendTempPasswordEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
    }

    updatePassword() {
        var tempPassword = this.state.randomPassword.generatePassword();
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
            alert(tempPassword);
        this.sendTempPasswordEmail(tempPassword);
        alert("Se ha enviado una contraseña temporal al correo ingresado. Ahora será redirigido a la pantalla de ingreso");
        this.props.history.push(`/`);
    }

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

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

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
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default PasswordRecovery;