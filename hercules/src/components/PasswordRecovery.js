import React, { Component } from 'react';
import RandomPassword from './RandomPassword';
import Hash from './Hash';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class PasswordRecovery extends Component {
    constructor() {
        super();
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

    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
    }

    updatePassword(event) {
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


    /**
     * This method takes care of show a modal with useful information
     */
    modalTrigger(event,mdTittle,mdChildren) {
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
        if(this.state.isExit){
            this.props.history.push(`/`);
        }    
        event.preventDefault();      
    };

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