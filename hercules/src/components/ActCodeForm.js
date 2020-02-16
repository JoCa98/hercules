import React, { Component } from 'react';
import PermissionsManager from "./PermissionsManager";
import './ActCodeForm.css';
import ModalComponent from './ModalComponent';


class ActCodeForm extends Component {
  constructor() {
    super();
    this.state = {
      permissionsManager: new PermissionsManager(),
      identificationID: sessionStorage.getItem('identificationID'),
      firstName: sessionStorage.getItem('firstName'),
      secondName: sessionStorage.getItem('secondName'),
      lastName: sessionStorage.getItem('lastName'),
      secondLastName: sessionStorage.getItem('secondLastName'),
      carnet: sessionStorage.getItem('carnet'),
      career: sessionStorage.getItem('career'),
      birthDate: sessionStorage.getItem('birthDate'),
      genderID: sessionStorage.getItem('genderID'),
      userTypeID: sessionStorage.getItem('userTypeIDRegister'),
      email: sessionStorage.getItem('emailRegister'),
      password: sessionStorage.getItem('passwordRegister'),
      phoneNumber1: sessionStorage.getItem('phoneNumber1'),
      phoneNumber2: sessionStorage.getItem('phoneNumber2'),
      startDate: sessionStorage.getItem('startDate'),
      districtID: sessionStorage.getItem('districtID'),
      addressLine: sessionStorage.getItem('addressLine'),
      contactName: sessionStorage.getItem('contactName'),
      relationTypeID: sessionStorage.getItem('relationTypeID'),
      emergencyContactPhoneNumber: sessionStorage.getItem('emergencyContactPhoneNumber'),
      activationCode: sessionStorage.getItem('activationCode'),
      actCode: "",
      show: false,
      modalTittle: "",
      modalChildren: "",
      isExit: false

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeSignUp = this.completeSignUp.bind(this);
    this.resendCode = this.resendCode.bind(this);
    this.sendNotificationEmail = this.sendNotificationEmail.bind(this);
    this.modalTrigger = this.modalTrigger.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  modalTrigger(event, mdTittle, mdChildren) {
    this.setState({
      show: !this.state.show,
      modalTittle: mdTittle,
      modalChildren: mdChildren
    });
    event.preventDefault();
  };

  closeModal(event) {
    this.setState({
      show: !this.state.show
    });
    if (this.state.isExit) {
      this.props.history.push(`/`);
    }
    event.preventDefault();
  };

  componentDidMount() {
    console.log(this.state.activationCode);
    this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
    window.scrollTo(0, 0);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.actCode.trim().length != 0) {
      this.completeSignUp(event);
    } else {
      this.modalTrigger(event, 'Campo Obligatorio', 'El código de activación es obligatorio');
    }
  }

  completeSignUp(event) {
    if (this.state.actCode == this.state.activationCode) {
      fetch("http://localhost:9000/User/addUser", {
        method: "post",
        body: JSON.stringify(this.state),

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
        })
        .catch(err => console.error(err));
      this.sendNotificationEmail();
      this.modalTrigger(event, 'Registro exitoso', 'El registro fue completado con éxito. Permanecerá inactivo y no podrá ingresar al sistema hasta que el encargado (a) del gimnasio lo active. Se le ha enviado un correo con más detalles. Ahora será redirigido a la pantalla de ingreso');
      sessionStorage.clear();
    } else {
      this.modalTrigger(event, 'Código incorrecto', 'El código ingresado es incorrecto');
    }
  }

  resendCode(event) {
    fetch("http://localhost:9000/User/sendEmail", {
      method: "post",
      body: JSON.stringify({ email: this.state.email, activationCode: this.state.activationCode }),
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
    this.modalTrigger(event, 'Reenvio', 'Se reenvió el código de activación, por favor revise su correo institucional');
  }

  sendNotificationEmail() {
    fetch("http://localhost:9000/User/sendNotificationEmail", {
      method: "post",
      body: JSON.stringify({ email: this.state.email }),
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

  render() {
    return (
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-6 offset-3 card p-5">
            <form className="activationCodeForm" >
              <h1 className="text-left colorBlue">Activación de cuenta</h1>
              <div className="form-group">
                <p align="left">Ingrese el código de activación enviado a su correo</p>
                <input type="text" name="actCode" className="form-control" fontSize="18px" onChange={this.handleInputChange} />
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <button type="button" align="left" name="resendButton" className="cssCodeButtonResend" onClick={this.resendCode}> Reenviar código </button>
                </div>
                <div className="col-4 offset-4">
                  <button type="button" align="right" name="confirmButton" className="cssCodeButtonConfirm" onClick={this.handleSubmit}> Confirmar </button>
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
    );
  }
}

export default ActCodeForm;