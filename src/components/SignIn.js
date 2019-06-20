import React, { Component } from 'react';

class SignIn extends Component {

    render() {
        return (
            <div className="container">
                <div className="row mt-4 card p-5" >
                    <div className="col-12">
                    <h1 className="text-center">Formulario de registro</h1>
                    <br></br>
                        <div className="row">
                            
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="text-left">Información de usuario</h2>
                                        <div class="form-group" align="left">
                                            <p align="left">Tipo de administrador</p>
                                            <select align="justify" className="form-control w-50">
                                                <option value="gimnasio">Gimnasio</option>
                                                <option value="medico">Médico</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">

                                        <div class="form-group" align="left">
                                            <p align="justify">Primer nombre</p>
                                            <input type="text" name="firstName" className="form-control"></input>
                                            <br></br>
                                            <p align="justify">Primer Apellido</p>
                                            <input type="text" name="firstLastName" className="form-control"></input>
                                            <br></br>
                                            <p align="justify">Teléfono 1</p>
                                            <input type="text" name="phoneNumber1" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p align="justify">Segundo nombre</p>
                                            <input type="text" name="secondName" className="form-control"></input>
                                            <br></br>
                                            <p align="justify">Segundo Apellido</p>
                                            <input type="text" name="secondLastName" className="form-control"></input>
                                            <br></br>
                                            <p align="justify">Teléfono 2</p>
                                            <input type="text" name="phoneNumber2" className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left">
                                            <p align="">Tipo de usuario</p>
                                            <input type="radio" name="userType" value="worker"></input>Funcionario
                                    <br></br>
                                            <input type="radio" name="userType" value="student"></input>Estudiante
                                        <br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left"></div>
                                        <p align="justify">Dirección</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p align="justify">Provincia</p>
                                            <select align="justify" className="form-control">
                                                <option value=" ">Provincia</option>
                                            </select>
                                            <br></br>
                                            <p align="justify">Distrito</p>
                                            <select align="justify" className="form-control">
                                                <option value=" ">Distrito</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p align="justify">Cantón</p>
                                            <select align="justify" className="form-control">
                                                <option value=" ">Canton</option>
                                            </select>
                                            <br></br>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left"></div>
                                        <p align="justify">Otras señas</p>
                                        <input type="text" name="otherSigns" className="w-100 form-control bigInputText"></input>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <h2 className="text-left">Información de cuenta</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left">
                                            <p align="justify">Email</p>
                                            <input type="text" name="email" className="inputText w-100"></input>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="row">
                                            <div className="col-6">
                                                <div class="form-group" align="left">
                                                    <p align="justify">Contraseña</p>
                                                    <input type="text" name="password" className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div class="form-group" align="left">
                                                    <p align="justify">Confirmar contraseña</p>
                                                    <input type="text" name="confirmPassword" className="form-control"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-left">Contacto de emergencia</h2>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p align="justify">Nombre</p>
                                            <input type="text" name="contactName" className="form-control"></input>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p align="justify">Parentesco</p>
                                            <input type="text" name="relation" className="form-control"></input>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p align="justify">Teléfono</p>
                                            <input type="text" name="phoneNumber" className="form-control"></input>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 offset-md-7">
                                        <button align="left" className="buttonSizeGeneral">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
export default SignIn;