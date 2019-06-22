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
                                <div className="row">
                                    <div className="col-4">
                                        <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral" />
                                    </div>
                                    <div className="col-8 text-left">
                                        <h4 className="colorBlue" onClick={this.redirect}>Agregar nuevo</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 offset-1 mt-4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Cedula</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Carnet</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
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