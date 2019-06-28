import React, { Component } from 'react';

class LogIn extends Component {

    render() {
        return (
            <div className="container">
                <div className="row mt-4 " >
                    <div className="col-3">
                    </div>
                    <div className="col-6 card p-5">
                        <h1 className="text-center">Ingreso al sistema del gimnasio</h1>
                        <br></br>
                        <div className="row mt-4 " ></div>
                        <div class="form-group" align="left">
                            <p>Correo institucional</p>
                            <input type="text" name="email" className="form-control inputText w-100"></input>
                            <br></br>
                            <p>Contraseña</p>
                            <input type="text" name="password" className="form-control inputText w-100"></input>
                            <br></br>
                            <button align="left" name="logIn" className="buttonSizeGeneral w-100">Ingresar</button>
                            <br></br>
                            <br></br>
                            <a href="url">Recuperar contraseña</a>
                            <br></br>
                            <a href="url">Registrarse</a>
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
export default LogIn;