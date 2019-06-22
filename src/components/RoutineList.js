import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';

class RoutineList extends Component {
    constructor() {
        super();

        this.redirect = this.redirect.bind(this);

    }

    redirect() {
        window.location = "https://www.google.com/";
    }

    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Lista de rutinas</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-ceter">
                                <label className="form-control">Usuario: Jose Carlos Chavez Moran</label>
                            </div>
                            <div className="col-4 offset-1">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral" />
                                <h4 className="colorBlue" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 offset-1 mt-4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Tipo rutina</th>
                                    <th scope="col">Objetivo</th>
                                    <th scope="col">Frecuencia</th>
                                    <th scope="col">Intensidad</th>
                                    <th scope="col">Tiempo</th>
                                    <th scope="col">Densidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoutineList;