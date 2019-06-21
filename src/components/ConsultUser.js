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
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <br></br>
                                            <p>Nombre completo:</p>
                                            <p>Número de cédula:</p>
                                            <p>Número de carné:</p>
                                            <p>Dirección:</p>
                                            <p>Otras señas:</p>
                                            <p>Correo institucional:</p>
                                            <p>Teléfono 1:</p>
                                            <p>Teléfono 2:</p>
                                            <p>Estado:</p>
                                            <p>Fecha de registro:</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <label id="fullName"></label>
                                            <label id="identificationNumer"></label>
                                            <label id="carnet"></label>
                                            <label id="address"></label>
                                            <label id="otherSigns"></label>
                                            <label id="email"></label>
                                            <label id="phoneNumber1"></label>
                                            <label id="phoneNumber2"></label>
                                            <label id="state"></label>
                                            <label id="signUpDate"></label>
                                            <label id="fullName"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <h1 className="text-left">Contacto de emergencia</h1>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <br></br>
                                            <p>Nombre:</p>
                                            <p>Teléfono:</p>
                                            <p>Parentesco:</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <label id="contactName"></label>
                                            <label id="contactPoneNumber"></label>
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