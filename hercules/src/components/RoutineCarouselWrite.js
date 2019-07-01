import React, { Component } from 'react';
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';

class RoutineCarouselWrite extends Component {

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
                            <table className="table">
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
                                        <td className="exercise"><div suppressContentEditableWarning={true} contentEditable={true}/></td>
                                        <td><input type="text" name="charge"/></td>
                                        <td><input type="text" name="series"/></td>
                                        <td><input type="text" name="repetitions"/></td>
                                        <td><input type="text" name="minutes"/></td>
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

export default RoutineCarouselWrite;