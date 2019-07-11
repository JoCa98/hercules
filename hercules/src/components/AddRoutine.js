import React, { Component } from 'react';
import Carousel from './RoutineCarouselWrite';
import axios from "axios";

class AddRoutine extends Component {
    constructor() {
        super();
        this.state = {
            routineType: [{}],
            objective:[{}],
            Frecuency:0,
            Intensity:0,
            Density:0,
            RestTime:0,
            routineTypeID:1,
            objectiveID: 1,
            partyID:sessionStorage.getItem("partyID"),
            date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            routineID:0,
            exerciseList :[]

        }

        this.inputNumberValidator = this.inputNumberValidator.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.objectiveSelect = this.objectiveSelect.bind(this);
        this.routineTypeSelect = this.routineTypeSelect.bind(this);
        this.empty = this.empty.bind(this);
        this.arrayEmpty = this.arrayEmpty.bind(this);
        this.addExercise = this.addExercise.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:9000/RoutineRoute/getRoutineType").then(response => {
            this.state.routineType = response.data;
            this.setState({ routineType: response.data });
        });

        axios.get("http://localhost:9000/RoutineRoute/getObjetiveType").then(response => {
            this.state.objective= response.data;
            this.setState({objective: response.data});
        });
    }

    inputNumberValidator(event) {
        const re = /^[0-9\b]+$/;
         const { name, value } = event.target;
     
         if (value === "" || re.test(value)) {
           this.setState({
             [name]: value
           });
         }
       }
 

    routineTypeSelect(event) {
        this.state.routineTypeID = event.target.value;
        this.setState({ routineTypeID: event.target.value });
    }

    objectiveSelect(event) {
        this.state.objectiveID = event.target.value;
        this.setState({ objectiveID: event.target.value });
    }

    handleSubmit(e) {
        if(!this.empty()){
            if(!this.arrayEmpty()){
            fetch("http://localhost:9000/RoutineRoute/addRoutine", {
                method: "post",
                body: JSON.stringify(this.state),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({routineID: data[0]})
                })
                .catch(err => console.error(err));

               this.addExercise();
               
            e.preventDefault();
            }else{
                alert("Debe agregar ejercicios");
            }
            } else{
                alert("Los campos con * son obligatorios");
            }
        }
    
    addExercise(){
        this.state.exerciseList.map((ex) =>{
            fetch("http://localhost:9000/RoutineRoute/addExercise", {
                method: "post",
                body: JSON.stringify(this.state),
                params:{
                    routineID: this.state.routineID,
                    exerciseID: ex.exerciseID,
                    series: ex.series,
                    repetitions: ex.repetitions,
                    charge: ex.charge,
                    minutes: ex.minutes
                },
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => console.error(err));
        })
    }

    empty(){
        if(this.state.Frecuency == "" || this.state.Density == "" || this.state.Intensity == "" || this.state.RestTime == ""
        || this.state.objectiveID == "" || this.state.routineTypeID == "" ){
            return true;
        } else{
            return false;
        }
    }

    arrayEmpty(){
        if(sessionStorage.getItem("exerciseList").length == 0){
            return true;
        }else{
            this.setState({exerciseList :sessionStorage.getItem("exerciseList")});
            return false;
        }
    }
    render() {
        const routineTypeList = this.state.routineType.map((types, i) => {
            return (
                <option value={types.routineTypeID} key={i}>{types.description}</option>
            )
        })

        const objetiveType = this.state.objective.map((objetives, i) => {
            return (
                <option value={objetives.objectiveID} key={i}>{objetives.description}</option>
            )
        })

        return (

            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                        <form className="AddRutineForm" >
                            <h2 className="text-center colorBlue mb-4">Agregar rutina</h2>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Tipo de rutina*:</p>
                                                </div>
                                                <div className="col-6">
                                                    <select name="rutineTypeDropdown" align="left" className="form-control" onChange={this.routineTypeSelect} value={this.state.routineTypeID}>
                                                       {routineTypeList}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Objetivo*:</p>
                                                </div>
                                                <div className="col-6">
                                                    <select name="objectiveDropdown" align="left" className="form-control" onChange={this.objectiveSelect} value={this.state.objectiveID}>
                                                        {objetiveType}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Frecuencia*:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="number" name="Frecuency" className="form-control" onChange={this.inputNumberValidator} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Intensidad*:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="number" name="Intensity" className="form-control" onChange={this.inputNumberValidator} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Densidad*:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="number" name="Density" className="form-control" onChange={this.inputNumberValidator} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Tiempo de descanso*:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="number" name="RestTime" className="form-control" onChange={this.inputNumberValidator} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Carousel />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 offset-10">
                                <div className="form-group" aling="right">
                                    <button name="saveButton" className="buttonSizeGeneral" onClick={this.handleSubmit}> Guardar </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default AddRoutine;