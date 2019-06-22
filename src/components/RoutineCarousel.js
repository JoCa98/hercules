import React, { Component } from 'react';

class RoutineCarousel extends Component {
    render() {
        return (
            <div className="container card">
                <div className="row mt-4">
                    <div className="col-12">
                        <select name="exerciseTypeDropDown" className="form-control" float="center">
                            <option value="1">Piernas</option>
                            <option value="2">Antebrazo</option>
                            <option value="3">Espalda</option>
                            <option value="4">Etc</option>
                        </select>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-1">
                        <button className="" align="left">Izq</button>
                    </div>
                    <div className="col-10">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Ejercicio</th>
                                    <th scope="col">Carga/Peso</th>
                                    <th scope="col">Series</th>
                                    <th scope="col">Repeticiones</th>
                                    <th scope="col">Minutos</th>
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
                    <div className="col-1">
                        <button className="" align="right">Der</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoutineCarousel;