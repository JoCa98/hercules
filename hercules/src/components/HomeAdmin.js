import React, { Component } from 'react';

class HomeAdmin extends Component {
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Lista de usuarios</h1>
                        <div className="row">
                            <div className="col-2 offset-1">
                                <select className="form-control">
                                    <option>Carnet</option>
                                    <option>Nombre</option>
                                    <option>Cedula</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <input type="text" className="w-100 inputText" placeholder="Buscar"></input>
                                <i class="fas fa-search" aria-hidden="true"></i>
                            </div>
                            <div className="col-2">
                                <button className="buttonSizeGeneral">Buscar</button>
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

export default HomeAdmin;