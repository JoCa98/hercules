import React, { Component } from 'react';
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';

class RoutineCarousel extends Component {
    render() {
        return (
            <div className="container card">
                <div className="row mt-4">
                    <div className="col-2 col-md-4">
                        <img src={leftArrowImage} className="buttonSizeGeneral" />
                    </div>
                    <div className="col-8 col-md-4">
                        <select name="exerciseTypeDropDown" className="form-control" float="center">
                            <option value="1">Piernas</option>
                            <option value="2">Antebrazo</option>
                            <option value="3">Espalda</option>
                            <option value="4">Etc</option>
                        </select>
                    </div>
                    <div className="col-2 col-md-4">
                        <img src={rightArrowImage} className="buttonSizeGeneral" />
                    </div>

                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="table-responsive">
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
                    </div>
                </div>
            </div>
        )
    }
}

export default RoutineCarousel;