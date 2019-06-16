import React, { Component } from 'react';


class PasswordRecovery extends Component {

    render() {
        return (
            <div className="container">

                <div className="row mt-4">
                    <div className="col-6 offset-3 p-5 card">
                        <form>
                            <h2 className="text-left colorBlue">Recuperación de Contraseña</h2>
                            <br />
                            <div class="form-group">
                                <p align="justify">Ingrese el correo del usuario para recibir
                                 una contraseña<br /> nueva temporal</p>
                                <input type="text" name="emailText" className="form-control"></input>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 text-right">
                                    <button type="submit" className="buttonSizeGeneral">Confirmar</button>
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