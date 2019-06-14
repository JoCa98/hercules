import React, { Component } from 'react';
import './PasswordRecovery.css';


class PasswordRecovery extends Component {

    render() {
        return (
            <div className="div-container">
                
                <div className="row mt-4">
                    <div className="col-4 offset-4 card">
                        <form>
                            <h2 ><font color="#41ade7">Recuperación de Contraseña</font></h2>
                            <br/>
                            <div class="form-group">
                                <p align="justify">Ingrese el correo del usuario para recibir
                                 una contraseña<br/> nueva temporal</p>
                                <input type="text" name="emailText" className="form-control"></input>
                            </div>
                            <div className="row">
                                <div className="col-md-5 offset-md-7">
                                <button align="left" className="ConfirmButton">Confirmar</button>
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