import React, { Component } from 'react';

class UserConfiguration extends Component {

    render() {
        return (
            <div className="container">
                <div className="row mt-4 card p-5" >
                    <div className="col-12">
                        <h1 className="text-center">Configuración del perfil
                        </h1>
                        <br></br>
                        <div className="row">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="text-left">Información de usuario</h2>
                                        <br></br>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Primer nombre</p>
                                            <input type="text" name="firstName" className="form-control inputText"></input>
                                            <br></br>
                                            <p>Primer Apellido</p>
                                            <input type="text" name="firstLastName" className="form-control inputText"></input>
                                            <br></br>
                                            <p>Teléfono 1</p>
                                            <input type="text" name="phoneNumber1" className="form-control inputText"></input>
                                            <br></br>
                                            <p>Número de cédula</p>
                                            <input type="text" name="identificationNumber" className="form-control InputText"></input>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input type="text" name="secondName" className="form-control inputText"></input>
                                            <br></br>
                                            <p>Segundo Apellido</p>
                                            <input type="text" name="secondLastName" className="form-control inputText"></input>
                                            <br></br>
                                            <p>Teléfono 2</p>
                                            <input type="text" name="phoneNumber2" className="form-control inputText"></input>
                                            <br></br>
                                            <p>Número de cédula</p>
                                            <input type="text" name="identificationNumber" className="form-control InputText"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left"></div>
                                        <h2 align="left">Dirección</h2>
                                        <br></br>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div class="form-group" align="left">
                                            <p>Provincia</p>
                                            <select align="left" className="form-control">
                                                <option value=" ">Provincia</option>
                                            </select>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="left">
                                            <p>Cantón</p>
                                            <select align="left" className="form-control">
                                                <option value=" ">Canton</option>
                                            </select>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="left">
                                            <p>Distrito</p>
                                            <select align="left" className="form-control">
                                                <option value=" ">Distrito</option>
                                            </select>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group" align="left"></div>
                                        <p align="left">Otras señas</p>
                                        <input type="text" name="otherSigns" className="w-100 form-control bigInputText"></input>
                                        <br></br>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div class="form-group" align="left">
                                            <button align="left" name="SaveUserInfo" className="buttonSizeGeneral">Guardar</button>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="center">
                                            <button align="left" name="editUserInfo" className="buttonSizeGeneral">Editar</button>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="right">
                                            <button align="left" name="cancelUserInfo" className="buttonSizeGeneral">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <h2 className="text-left">Cambiar contraseña</h2>
                                <br></br>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Constraseña actual</p>
                                            <input type="text" name="currentPassword" className="form-control inputText"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="row">
                                            <div className="col-6">
                                                <div class="form-group" align="left">
                                                    <p>Contraseña nueva</p>
                                                    <input type="text" name="newPassword" className="inputText form-control"></input>
                                                    
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div class="form-group" align="left">
                                                    <p>Confirmar contraseña nueva</p>
                                                    <input type="text" name="confirmNewPassword" className="inputText form-control"></input>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div class="form-group" align="left">
                                            <button align="left" name="ChangePassword" className="buttonSizeGeneral">Guardar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="center">
                                            <button align="left" name="editPassword" className="buttonSizeGeneral">Cambiar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="right">
                                            <button align="left" name="cancelPassword" className="buttonSizeGeneral">Cancelar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <h2 className="text-left">Contacto de emergencia</h2>
                                <br></br>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Nombre</p>
                                            <input type="text" name="contactName" className="inputText form-control"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Parentesco</p>
                                            <input type="text" name="relation" className="inputText form-control"></input>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div class="form-group" align="left">
                                            <p>Teléfono</p>
                                            <input type="text" name="phoneNumber" className="inputText form-control"></input>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div class="form-group" align="left">
                                            <button align="left" name="SaveContact" className="buttonSizeGeneral">Guardar</button>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="center">
                                            <button align="left" name="editContact" className="buttonSizeGeneral">Editar</button>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group" align="right">
                                            <button align="left" name="cancelContact" className="buttonSizeGeneral">Cancelar</button>
                                        </div>
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
export default UserConfiguration;