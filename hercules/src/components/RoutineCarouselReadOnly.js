import React, { Component } from 'react';
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';
import axios from "axios";
import Select from "react-select";



class RoutineCarouselReadOnly extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exerciseType: [{}],
            exercise:[{}],
            typeID: 0,
            id: 1,
            name: "Tipo de ejercicio"
        };
        this.exerciseTypeSelect = this.exerciseTypeSelect.bind(this);
        this.valueID = this.valueID.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:9000/RoutineType/getExerciseType`).then(response => {
            this.state.exerciseType = response.data;
            this.setState({ exerciseType: response.data });
        });
 
    }

    exerciseTypeSelect(event){
        this.state.typeID = event.value;
        this.state.name = event.label;
        this.setState({ typeID: event.value, name:event.label });
        console.log(this.state.typeID);
          axios.get(`http://localhost:9000/RoutineType/getExercise`, {
        params: {
           routineID: this.state.id,
           id: this.state.typeID
           }
        }).then(response => {
          this.state.exercise = response.data[0];
         this.setState({ exercise: response.data[0]});
        });
    }

    valueID(event) {
        this.state.typeID = event.target.value;
        this.setState({ typeID: event.target.value });
      }

    

    render() {
        const exerciseVisual = this.state.exercise.map((exercise,i) => {
            return(
                <tr className="pointer" key={i}>
                    <td>{exercise.description}</td>
                    <td>{exercise.charge}</td>
                    <td>{exercise.series}</td>
                    <td>{exercise.repetitions}</td>
                    <td>{exercise.minutes}</td>
                </tr>
            )
        })
        return (
            <div className="container card">
                <div className="row mt-4">
                    <div className="col-2 col-md-4">
                        <img src={leftArrowImage} className="buttonSizeGeneral" />
                    </div>
                    <div className="col-8 col-md-4">
                        <Select placeholder={this.state.name} onChange={this.exerciseTypeSelect} value={this.state.typeID}
                         options={this.state.exerciseType.map(function (json) {
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
                            <table className="table tabe-sm table-hover"> 
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
                                    {exerciseVisual}
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