import React, { Component } from 'react';
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';
import axios from "axios";
import Select from "react-select";

class RoutineCarouselReadOnly extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercise: [{}]
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:9000/GetExerciseType/getExerciseType`).then(response => {
            this.state.exercise = response.data;
            this.setState({ exercise: response.data });
        });
        
    }

    render() {
        return (
            <div className="container card">
                <div className="row mt-4">
                    <div className="col-2 col-md-4">
                        <img src={leftArrowImage} className="buttonSizeGeneral" />
                    </div>
                    <div className="col-8 col-md-4">
                        <Select placeholder="Tipo de ejercicio" options={this.state.exercise.map(function (json) {
                            return {
                                label: json.description,
                                value: json.exerciseTypeID
                            };
                        })}>
                        </Select>
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

export default RoutineCarouselReadOnly;