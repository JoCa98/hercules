import React, { Component } from 'react';
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';
import axios from "axios";

class RoutineCarouselWrite extends Component {
    constructor(props) {
        super(props);
        /**
        * exerciseType:
        * @type {Array}
        * Property that stores the exercise types that comes from to the database
        * 
        * exercise:
        * @type {Array}
        * Property that stores the exercise per type that comes from to the database
        * 
        * typeID:
        * @type {integer}
        * Property that stores the id from the exercise type selected 
        * 
        * id:
        * @type {integer}
        * Property that stores the party's id that comes from to the other page
        * 
        * lastTypeID:
        * @type {Array}
        * Property that stores the last type id that comes from to the database
        */
        this.state = {
            exerciseType: [{}],
            exercise: [{}],
            typeID: 1,
            id: 1,
            lastTypeID: ""
        };
        this.exerciseTypeSelect = this.exerciseTypeSelect.bind(this);
        this.rigthArrow = this.rigthArrow.bind(this);
        this.getExerciseData = this.getExerciseData.bind(this);
        this.leftArrow = this.leftArrow.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
    }

    /**
    * Method that can be sent to load the exercise type list and get the last type id
    * when loading the page for the first time
    */
   componentDidMount() {
    axios.get(`http://localhost:9000/RoutineRoute/getExerciseType`).then(response => {
        this.state.exerciseType = response.data;
        this.setState({ exerciseType: response.data });
    });

    axios.get(`http://localhost:9000/RoutineRoute/getLastType`).then(response => {
        this.state.lastTypeID = response.data[0];
        this.setState({ lastTypeID: response.data[0] });
    })
    console.log(this.state.typeID);
   this.getExerciseData();
}

/**
    * Method that change the state of the typeID to change the exercises
    */
   rigthArrow() {
    if (this.state.typeID == this.state.lastTypeID.exerciseTypeID) {
        this.state.typeID = 1;
        this.setState({ typeID: 1 });
    } else {
        const value = parseInt(this.state.typeID) + 1;
        this.state.typeID = value;
        this.setState({ typeID: value });

    }
    this.getExerciseData();
}

/**
* Method that change the state of the typeID to change the exercises
*/
leftArrow() {
    if (this.state.typeID == 1) {
        this.state.typeID = this.state.lastTypeID.exerciseTypeID;
        this.setState({ typeID: this.state.lastTypeID.exerciseTypeID });
    } else {
        const value = parseInt(this.state.typeID) - 1;
        this.state.typeID = value;
        this.setState({ typeID: value });
    }
    this.getExerciseData();
}


/**
* Method that change the state when an option are selected in the dropdown
*/
exerciseTypeSelect(event) {
    this.state.typeID = event.target.value;
    this.setState({ typeID: event.target.value });
    this.getExerciseData();
}


/**
* Method that get the exercises per type from the database
*/
getExerciseData() {
    axios.get("http://localhost:9000/RoutineRoute/getAllExercises", {
        params: {
            id : this.state.typeID
        }
    }).then(response => {
        this.state.exercise = response.data[0];
        this.setState({ exercise: response.data[0] });
    });
}

    rowEvent(event){
        var i = event.target.parentNode.rowIndex - 1;
        var id = document.getElementById("routines").rows[event.target.parentNode.rowIndex].cells[0].innerHTML;
        document.getElementById("weight" + i).disabled = false;
        document.getElementById("series"+ i).disabled = false;
        document.getElementById("repetitions"+ i).disabled = false;
        document.getElementById("minutes" + i).disabled = false;

    }
    render() {
        /**
        * The exercise.map is for create a table with the exercises information
        */
       const exerciseVisual = this.state.exercise.map((exercise, i) => {
        return (
            <tr className="pointer" key={i}>
                <td className="diplayNone">{exercise.exerciseID}</td>
                <td onClick={this.rowEvent}>{exercise.description}</td>
                <td><input type="number" id={"weight" + i} disabled={true} /></td>
                <td><input type="number" id={"series" + i} disabled={true}/></td>
                <td><input type="number" id={"repetitions" + i} disabled={true}/></td>
                <td><input type="number" id={"minutes" + i} disabled={true}/></td>
            </tr>
        )
    })

    /**
        * The exerciseType.map is for create the options to the dropdown
        */
       const exerciseList = this.state.exerciseType.map((exercises, i) => {
        return (
            <option value={exercises.exerciseTypeID} key={i}>{exercises.description} </option>
        )
    })
        return (
            <div className="container card">
                <div className="row mt-4">
                    <div className="col-2 ">
                        <img src={leftArrowImage} className="buttonSizeGeneral" onClick={this.leftArrow}  />
                    </div>
                    <div className="col-8 ">
                        <select name="exerciseTypeDropDown" className="form-control" float="center" onChange={this.exerciseTypeSelect} value={this.state.typeID}>
                        {exerciseList}
                        </select>
                    </div>
                    <div className="col-2 ">
                        <img src={rightArrowImage} className="buttonSizeGeneral" onClick={this.rigthArrow} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-sm table-hover" id="routines">
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

export default RoutineCarouselWrite;