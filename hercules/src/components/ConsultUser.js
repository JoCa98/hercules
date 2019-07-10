import React, { Component } from 'react';

class ConsultUser extends Component {

    render() {
        return (
            <div className="container">
                <div className="row mt-4 card p-5" >
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <h1 className="text-left">Datos del usuario</h1>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Nombre completo:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Número de cédula:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Número de carné:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Dirección:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Otras señas:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Correo institucional:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Teléfono 1:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Teléfono 2:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Estado:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Fecha de registro:</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <label id="fullName"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="identificationNumer"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="carnet"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="address"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="otherSigns"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="email"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="phoneNumber1"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="phoneNumber2"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="state"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="signUpDate"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="fullName"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left">
                                            <h1 className="text-left">Contacto de emergencia</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Nombre:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Teléfono:</p>
                                        </div>
                                        <div class="form-group" align="left">
                                            <p>Parentesco:</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <label id="contactName"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="contactPoneNumber"></label>
                                        </div>
                                        <div class="form-group" align="left">
                                            <label id="relation"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                            <h1 className="text-center">Otros datos</h1>
                            <div class="form-group" align="left">
                                <br></br>
                                <button className="circularButton w-100" name="medicalInfo">Valoración médica</button>
                                <br></br>
                                <br></br>
                                <button className="circularButton w-100" name="physicalInfo">Composición Corporal</button>
                                <br></br>
                                <br></br>
                                <button className="circularButton w-100" name="Routine">Rutina</button>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>


        )
    }
}
export default ConsultUser;