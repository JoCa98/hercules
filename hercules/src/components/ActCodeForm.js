import React, { Component } from 'react';
import './ActCodeForm.css';

import axios from "axios";

class ActCodeForm extends Component {
  constructor() {
    super();
    this.state = {
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

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeSignUp = this.completeSignUp.bind(this);
    this.resendCode = this.resendCode.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {

    e.preventDefault();
    if (this.state.actCode.trim() !== "") {
      alert(this.state.actCode.trim());
    } else {
      alert('El código de activación es obligatorio');
    }
  }

  completeSignUp() {
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
        })
        .catch(err => console.error(err));
        alert("El registro fue completado con éxito. Ahora será redirigido a la pantalla de ingreso")
        sessionStorage.clear();
        this.props.history.push(`/`);
    } else {
      alert("El código ingresado es incorrecto");
    }
  }

  resendCode(){
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
            alert("Se reenvió el código de activación, por favor revise su correo institucional.");
  }



  render() {
    return (
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-6 offset-3 card p-5">
            <form className="activationCodeForm" onSubmit={this.handleSubmit}>
              <h1 className="text-left colorBlue">Activación de cuenta</h1>
              <div className="form-group">
                <p align="left">Ingrese el código de activación enviado a su correo</p>
                <input type="text" name="actCode" className="form-control" onChange={this.handleInputChange} />
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <button type="button" align="left" name="resendButton" className="cssCodeButtonResend"onClick={this.resendCode}> Reenviar código </button>
                </div>
                <div className="col-4 offset-4">
                  <button type="button" align="right" name="confirmButton" className="cssCodeButtonConfirm" onClick={this.completeSignUp}> Confirmar </button>
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