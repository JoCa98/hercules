/**
 * @fileoverview  RoutineCarouselReadOnly component, a component to show the exercises per type
 * that are in the user rutine 
 * 
 * @version 1.0
 *
 * @author    María Ester Molina Richmond <maria.molina@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of RoutineCarouselReadOnly was written by Ester Molina.
 */
import React, { Component } from 'react';
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';
import axios from "axios";

class RoutineCarouselReadOnly extends Component {

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
            id: sessionStorage.getItem("routineID"),
            lastTypeID: "",
            days: 0,
            day: 1
        };

        this.exerciseTypeSelect = this.exerciseTypeSelect.bind(this);
        this.rigthArrow = this.rigthArrow.bind(this);
        this.getExerciseData = this.getExerciseData.bind(this);
        this.leftArrow = this.leftArrow.bind(this);
        this.addDayButton = this.addDayButton.bind(this);
        this.changeRoutineDay = this.changeRoutineDay.bind(this);
        this.changeButtonsColors = this.changeButtonsColors.bind(this);
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

        axios.get(`http://localhost:9000/RoutineRoute/getNumberOfDays`, {
            params: {
                routineID: this.state.id,
            }
        }).then(response => {
            var day = response.data[0];
            this.state.days = day[0].days;
            this.setState({ days: day[0].days });
            this.addDayButton();
        });

        document.getElementById("heatingTable").style.display = "initial";
        document.getElementById("exerciseTable").style.display = "none";
        this.getExerciseData();

    }

    /**
    * Method that change the state of the typeID to change the exercises
    */
    rigthArrow() {
        if (this.state.typeID == this.state.lastTypeID.exerciseTypeID) {
            this.state.typeID = 1;
            this.setState({ typeID: 1 });
            document.getElementById("heatingTable").style.display = "initial";
            document.getElementById("exerciseTable").style.display = "none";
        } else {
            const value = parseInt(this.state.typeID) + 1;
            this.state.typeID = value;
            this.setState({ typeID: value });
            document.getElementById("heatingTable").style.display = "none";
            document.getElementById("exerciseTable").style.display = "initial";
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
            document.getElementById("heatingTable").style.display = "none";
            document.getElementById("exerciseTable").style.display = "initial";
        } else {
            const value = parseInt(this.state.typeID) - 1;
            this.state.typeID = value;
            this.setState({ typeID: value });
            if(value == 1){
                document.getElementById("heatingTable").style.display = "initial";
                document.getElementById("exerciseTable").style.display = "none";
            }else{
                document.getElementById("heatingTable").style.display = "none";
            document.getElementById("exerciseTable").style.display = "initial";
            }
            
        }
        this.getExerciseData();
    }

    /**
     * Method that add day buttons
     */
    addDayButton() {
        for (var i = 1; i <= this.state.days; i++) {
            var div = document.getElementById("btn");
            var btn = document.createElement("button");
            var value = i;
            btn.value = value;
            btn.textContent = value;
            btn.id = value;
            btn.onclick = this.changeRoutineDay;
            btn.className = "buttonDaysSizeUser mr-1 mb-1";
            if (i == 1) {
                btn.style.backgroundColor = "#ffffff";
                btn.style.border = "2px solid #41ade7";
                btn.style.color = "#0c0c0c";
            }
            div.appendChild(btn);

        }
    }


    /**
    * Method that change the state when an option are selected in the dropdown
    */
    exerciseTypeSelect(event) {
        this.state.typeID = event.target.value;
        this.setState({ typeID: event.target.value });
        if (event.target.value == 1) {
            document.getElementById("heatingTable").style.display = "initial";
            document.getElementById("exerciseTable").style.display = "none";
        } else {
            document.getElementById("heatingTable").style.display = "none";
            document.getElementById("exerciseTable").style.display = "intial";
        }
        this.getExerciseData();
    }


    /**
    * Method that get the exercises per type from the database
    */
    getExerciseData() {
        axios.get(`http://localhost:9000/RoutineRoute/getExercise`, {
            params: {
                routineID: this.state.id,
                id: this.state.typeID,
                routineDay: this.state.day
            }
        }).then(response => {
            this.state.exercise = response.data[0];
            this.setState({ exercise: response.data[0] });
        });
    }

    /**
     * Method that changes the state of day for the selected 
     * @param {object} event 
     */
    changeRoutineDay(event) {
        if (this.state.day != event.target.value) {
            this.setState({
                day: event.target.value
            })
            event.target.style.backgroundColor = "#ffffff";
            event.target.style.border = "2px solid #41ade7";
            event.target.style.color = "#0c0c0c";
            this.changeButtonsColors(event.target.value);
            this.getExerciseData();
        }
        event.preventDefault();
    }

    /**
     * Method that changes the color of the day buttons
     * @param {integer} day 
     */
    changeButtonsColors(day) {
        for (var i = 1; i <= this.state.days; i++) {
            if (i != day) {
                document.getElementById(i).style.backgroundColor = "#41ade7";
                document.getElementById(i).style.color = "#ffffff";
            }
        }
    }

    render() {

        /**
        * The exercise.map is for create a table with the exercises information
        */
        const exerciseVisual = this.state.exercise.map((exercise, i) => {
            if (this.state.typeID == 1) {
                return (
                    <tr key={i}>
                        <td>{exercise.description}</td>
                        <td align="center">{exercise.minutes}</td>
                        <td align="center">{exercise.intensity}</td>
                        <td align="center">{exercise.heartRate}</td>
                    </tr>
                )
            } else {
                return (
                    <tr key={i}>
                        <td>{exercise.description}</td>
                        <td align="center">{exercise.charge}</td>
                        <td align="center">{exercise.series}</td>
                        <td align="center">{exercise.repetitions}</td>
                        <td align="center">{exercise.minutes}</td>
                    </tr>
                )
            }
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
            <div className="container">
                <div className="row mt-4" >
                    <div className="col-12" id="btn" >
                    </div>
                </div>
                <div className="container card">
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="row">

                                <div className="col-3" align="center">
                                    <img src={leftArrowImage} className="arrows pointer" onClick={this.leftArrow} responsive />
                                </div>
                                <div className="col-6 " align="center">
                                    <select fontSize="18px" name="exerciseTypeDropDown" className="form-control" float="center" onChange={this.exerciseTypeSelect} value={this.state.typeID}>
                                        {exerciseList}
                                    </select>
                                </div>
                                <div className="col-3 " align="center">
                                    <img src={rightArrowImage} className="arrows pointer" onClick={this.rigthArrow} responsive />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="table-responsive text-center">
                                <table id="heatingTable" className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ejercicio</th>
                                            <th scope="col">Minutos</th>
                                            <th scope="col">Intensidad</th>
                                            <th scope="col">Frecuencia Cardiaca</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exerciseVisual}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="table-responsive text-center">
                                <table id="exerciseTable" className="table table-hover" display="none">
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
            </div>
        )
    }
}

export default RoutineCarouselReadOnly;