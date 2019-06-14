import React, { Component } from 'react';
import './PasswordRecovery.css';


class PasswordRecovery extends Component {

    render() {
        return (
            <div className="div-container">
                
                <div className="row mt-4">
                    <div className="col-4 offset-4 card">
                        <form>
                            <h1>Recuperación de Contraseña</h1>
                            <div class="form-group">
                                <p align="justify">Ingrese el correo del usuario para recibir<br/>
                                 una contraseña nueva temporal</p>
                                <input type="text" name="emailText" className="form-control"></input>
                            </div>
                            <button align="left" className="ConfirmButton">Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default PasswordRecovery;