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
      userTypeID: sessionStorage.getItem('userTypeID'),
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
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
    console.log(
      "id " + sessionStorage.getItem('identificationID') + "  " +
      "nom1 " + sessionStorage.getItem('firstName') + "  " +
      "nom2 " + sessionStorage.getItem('secondName') + "  " +
      "ape1 " + sessionStorage.getItem('lastName') + "  " +
      "ape2 " + sessionStorage.getItem('secondLastName') + "  " +
      "carnet " + sessionStorage.getItem('carnet') + "  " +
      "car " + sessionStorage.getItem('career') + "  " +
      "nac " + sessionStorage.getItem('birthDate') + "  " +
      "gener " + sessionStorage.getItem('genderID') + "  " +
      "userTy " + sessionStorage.getItem('userTypeID') + "  " +
      "email " + sessionStorage.getItem('email') + "  " +
      "pass " + sessionStorage.getItem('password') + "  " +
      "num2 " + sessionStorage.getItem('phoneNumber1') + "  " +
      "num1 " + sessionStorage.getItem('phoneNumber2') + "  " +
      "fechaIni " + sessionStorage.getItem('startDate') + "  " +
      "distrito " + sessionStorage.getItem('districtID') + "  " +
      "linea " + sessionStorage.getItem('addressLine') + "  " +
      "ecNombre " + sessionStorage.getItem('contactName') + "  " +
      "rel " + sessionStorage.getItem('relationTypeID') + "  " +
      "ecNum " + sessionStorage.getItem('emergencyContactPhoneNumber')
    );
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
    console.log("props: " + JSON.stringify(this.props));
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
          console.log(data);
        })
        .catch(err => console.error(err));
    } else {
    }
  }

  resendCode(){
    console.log("jason: " + JSON.stringify({ email: this.state.email, activationCode: this.state.activationCode }))
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
  }



  render() {
    return (
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-6 offset-3 card p-5">

            <form className="activationCodeForm" onSubmit={this.handleSubmit}>
              <h2 className="text-left colorBlue">Activación de cuenta</h2>

              <div className="form-group">
                <p align="left">Ingrese el código de activación enviado a su correo</p>
                <input type="text" name="actCode" className="form-control" onChange={this.handleInputChange} />
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <button type="button" align="left" name="actCodeButton" className="cssCodeButtonResend"onClick={this.resendCode}> Reenviar código </button>
                </div>
                <div className="col-4 offset-4">
                  <button type="button" align="right" name="actCodeButton" className="cssCodeButtonConfirm" onClick={this.completeSignUp}> Confirmar </button>
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