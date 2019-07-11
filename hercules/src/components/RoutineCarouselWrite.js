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
            lastTypeID: "",
            list:[],
            exerciseID : 0,
            exist:false

        };
       
        this.exerciseTypeSelect = this.exerciseTypeSelect.bind(this);
        this.rigthArrow = this.rigthArrow.bind(this);
        this.getExerciseData = this.getExerciseData.bind(this);
        this.leftArrow = this.leftArrow.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.addExercise = this.addExercise.bind(this);
     
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
    });

   
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
        
    const id = document.getElementById("routines").rows[event.target.parentNode.rowIndex].cells[0].innerHTML;
        this.setState({
         exerciseID: id   
        });
       document.getElementById("weightInput").disabled = false;
       document.getElementById("seriesInput").disabled = false;
       document.getElementById("repetitionsInput").disabled = false;
       document.getElementById("minutesInput").disabled = false; 

        if (this.state.list.length !== 0) {
            this.state.list.map((ex) => {
                if (ex.exerciseID == this.state.exerciseID) {
                    document.getElementById("weightInput").value = ex.charge;
                    document.getElementById("seriesInput").value = ex.series;
                    document.getElementById("repetitionsInput").value = ex.repetitions;
                    document.getElementById("minutesInput").value = ex.minutes;
                    document.getElementById("add").display = "none";
                    document.getElementById("edit").display = "show";
                    document.getElementById("delete").display = "show";


                    this.setState({exist:true});
                }else{
                    this.setState({exist:false});

                }
            })
        }

    }
    addExercise(){
        if(document.getElementById("weightInput") !== "" && document.getElementById("seriesInput")!== ""
        &&  document.getElementById("repetitionsInput") !== "" && document.getElementById("minutesInput")!==""){
            var obj = {exerciseID: this.state.exerciseID, minutes: document.getElementById("minutesInput").value,
            charge: document.getElementById("weightInput").value,
            repetitions:document.getElementById("repetitionsInput").value,
            series: document.getElementById("seriesInput").value} 

            if(this.state.exist){
                console.log(this.state.list);
                alert("El ejercicio ya fue agregado");
            }else{
                this.state.list.push(obj);
            }
            
                  
            }

        sessionStorage.setItem("exerciseList", this.state.list);
 
       document.getElementById("weightInput").value = "";
       document.getElementById("seriesInput").value = "";
       document.getElementById("repetitionsInput").value = "";
       document.getElementById("minutesInput").value = "";
       document.getElementById("weightInput").disabled = true;
       document.getElementById("seriesInput").disabled = true;
       document.getElementById("repetitionsInput").disabled = true;
       document.getElementById("minutesInput").disabled = true;
    }

    render() {
        /**
        * The exercise.map is for create a table with the exercises information
        */
       const exerciseVisual = this.state.exercise.map((exercise, i) => {
        return (
            <tr className="pointer" key={i}>
                <td className="diplayNone">{exercise.exerciseID}</td>
                <td onClick={this.rowEvent} >{exercise.description}</td>
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
                    <div className="col-6">
                        <div className="table-responsive">
                            <table className="table table-sm table-hover" id="routines">
                                <thead>
                                    <tr>
                                        <th scope="col">Ejercicio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exerciseVisual}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-6">
                        <form>
                        <div className="form-group">
                            <p>Carga/Peso</p>
                            <input type="number" id="weightInput" className ="form-control" disabled></input>
                        </div>
                        <div className="form-group">
                            <p>Series</p>
                            <input type="number" id="seriesInput" className ="form-control" disabled></input>
                        </div>
                        <div className="form-group">
                            <p>Repeticiones</p>
                            <input type="number" id="repetitionsInput" className ="form-control" disabled></input>
                        </div>
                        <div className="form-group">
                            <p>Minutos</p>
                            <input type="number" id="minutesInput"  className ="form-control" disabled></input>
                        </div>
                        <div className="form-group" align="right">
                        <button align="right" id="add" className="buttonSizeGeneral" onClick={this.addExercise}>Agregar</button>
                        <button align="right" id="edit" className="buttonSizeGeneral" onClick={this.addExercise} display="none">Editar</button>
                        <button align="right" id="delete" className="buttonSizeGeneral" onClick={this.addExercise} display="none" >Eliminar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoutineCarouselWrite;