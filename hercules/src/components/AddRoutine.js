import React, { Component } from 'react';
import axios from "axios";
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class AddRoutine extends Component {
    constructor() {
        super();
        this.state = {
            routineType: [{}],
            objective: [{}],
            Frecuency: 0,
            Intensity: 0,
            Density: 0,
            RestTime: 0,
            heartRatePerMinute: 0,
            routineTypeID: 1,
            objectiveID: 1,
            partyID: sessionStorage.getItem("userPartyID"),
            date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            exerciseType: [{}],
            exercise: [{}],
            typeID: 1,
            id: 1,
            lastTypeID: "",
            list: [],
            exerciseID: 0,
            exist: false,
            index: 0
        }

        this.inputNumberValidator = this.inputNumberValidator.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.objectiveSelect = this.objectiveSelect.bind(this);
        this.routineTypeSelect = this.routineTypeSelect.bind(this);
        this.empty = this.empty.bind(this);
        this.arrayEmpty = this.arrayEmpty.bind(this);
        this.submitExercise = this.submitExercise.bind(this);

        this.exerciseTypeSelect = this.exerciseTypeSelect.bind(this);
        this.rigthArrow = this.rigthArrow.bind(this);
        this.getExerciseData = this.getExerciseData.bind(this);
        this.leftArrow = this.leftArrow.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.initButtons = this.initButtons.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.editExercise = this.editExercise.bind(this);

        this.backButton = this.backButton.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:9000/RoutineRoute/getRoutineType").then(response => {
            this.state.routineType = response.data;
            this.setState({ routineType: response.data });
        });

        axios.get("http://localhost:9000/RoutineRoute/getObjetiveType").then(response => {
            this.state.objective = response.data;
            this.setState({ objective: response.data });
        });

        axios.get(`http://localhost:9000/RoutineRoute/getExerciseType`).then(response => {
            this.state.exerciseType = response.data;
            this.setState({ exerciseType: response.data });
        });

        axios.get(`http://localhost:9000/RoutineRoute/getLastType`).then(response => {
            this.state.lastTypeID = response.data[0];
            this.setState({ lastTypeID: response.data[0] });
        });

        this.initButtons();
        this.getExerciseData();
        this.cardioExercise();
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
        this.cardioExercise();
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
        this.cardioExercise();
        this.getExerciseData();
    }

    /**
    * Method that change the state when an option are selected in the dropdown
    */
    exerciseTypeSelect(event) {
        this.state.typeID = event.target.value;
        this.setState({ typeID: event.target.value });
        this.cardioExercise();
        this.getExerciseData();
    }

    /**
    * Method that get the exercises per type from the database
    */
    getExerciseData() {
        axios.get("http://localhost:9000/RoutineRoute/getAllExercises", {
            params: {
                id: this.state.typeID
            }
        }).then(response => {
            this.state.exercise = response.data[0];
            this.setState({ exercise: response.data[0] });
        });
    }

    initButtons() {
        document.getElementById("edit").style.display = 'none';
        document.getElementById("delete").style.display = 'none';
    }


    /**
    * Method that when the type of exercise is 1, show the arguments to cardiovascular 
    * exercises, and hide the other, or make the oposite whe the type of exercise is different than 1
    */
    cardioExercise(){
        this.disabledInputs();

        if(this.state.typeID == 1){
            document.getElementById("weightInput").style.display = "none";
            document.getElementById("seriesInput").style.display = "none";
            document.getElementById("repetitionsInput").style.display = "none";
            document.getElementById("pWeight").style.display = "none";
            document.getElementById("pSeries").style.display = "none";
            document.getElementById("pRepetitions").style.display = "none";
    
            document.getElementById("intensityInput").style.display = "initial";
            document.getElementById("pIntensity").style.display = "initial";
            document.getElementById("pHeartRate").style.display = "initial";
            document.getElementById("heartRateInput").style.display = "initial";

            }else{
            document.getElementById("weightInput").style.display = "initial";
            document.getElementById("seriesInput").style.display = "initial";
            document.getElementById("repetitionsInput").style.display = "initial";
            document.getElementById("pWeight").style.display = "initial";
            document.getElementById("pSeries").style.display = "initial";
            document.getElementById("pRepetitions").style.display = "initial";
    
            document.getElementById("intensityInput").style.display = "none";
            document.getElementById("pIntensity").style.display = "none";
            document.getElementById("pHeartRate").style.display = "none";
            document.getElementById("heartRateInput").style.display = "none";
            }
    }


    /**
    * Method that enabled inputs by the exercise type selected
    */    
    enabledInputs(){
        if(this.state.typeID == 1){
            document.getElementById("heartRateInput").disabled = false;
            document.getElementById("minutesInput").disabled = false;
            document.getElementById("intensityInput").disabled = false;
        }else{
            document.getElementById("weightInput").disabled = false;
            document.getElementById("seriesInput").disabled = false;
            document.getElementById("repetitionsInput").disabled = false;
            document.getElementById("minutesInput").disabled = false;
        }
    }

    /**
    * Method that make empty inputs by the exercise type selected
    */ 
    emptyInputs(){
   
            document.getElementById("weightInput").value = "";
            document.getElementById("seriesInput").value = "";
            document.getElementById("repetitionsInput").value = "";
            document.getElementById("minutesInput").value = "";
            document.getElementById("intensityInput").value = "";
            document.getElementById("weightInput").value = "";
            document.getElementById("heartRateInput").value = "";
 
    }

     /**
    * Method that disabled inputs by the exercise type selected
    */ 
    disabledInputs(){
        document.getElementById("weightInput").disabled = true;
        document.getElementById("seriesInput").disabled = true;
        document.getElementById("repetitionsInput").disabled = true;
        document.getElementById("heartRateInput").disabled = true;
        document.getElementById("minutesInput").disabled = true;
        document.getElementById("intensityInput").disabled = true;
    }


    rowEvent(event) {
        const id = document.getElementById("routines").rows[event.target.parentNode.rowIndex].cells[0].innerHTML;
        var a = document.getElementsByTagName("tr");
        for (var i = 0; i < a.length; i++) {
            a[i].classList.remove('table-info');
        }
        document.getElementById("routines").rows[event.target.parentNode.rowIndex].classList.add("table-info");
        this.setState({ exerciseID: id });

        this.enabledInputs();

        if (this.state.list.length !== 0) {
            this.state.list.map((ex, i) => {
                if (ex.exerciseID == id) {
                    this.setState({ exist: true, index: i });
                    if(this.state.typeID == 1){
                    this.cardioExercise();
                    document.getElementById("weightInput").value = ex.series;
                    document.getElementById("heartRateInput").value = ex.repetitions;
                    document.getElementById("minutesInput").value = ex.minutes; 

                    }else{
                     
                    document.getElementById("weightInput").value = ex.charge;
                    document.getElementById("seriesInput").value = ex.series;
                    document.getElementById("repetitionsInput").value = ex.repetitions;
                    document.getElementById("minutesInput").value = ex.minutes;

                    document.getElementById("add").style.display = "none";
                    document.getElementById("edit").style.display = "initial";
                    document.getElementById("delete").style.display = "initial";
                    }
                } else {
                    this.setState({ exist: false });
                    this.emptyInputs();
                    
                    document.getElementById("add").style.display = "initial";
                    document.getElementById("edit").style.display = "none";
                    document.getElementById("delete").style.display = "none";
                }
            })
        }
    }

    editExercise(e) {
        if (this.state.exist) {
            if(this.state.typeID == 1){
                this.enabledInputs();
                this.state.list[this.state.index].intensityPercentage = document.getElementById("intensityInput").value;
                this.state.list[this.state.index].heartRate = document.getElementById("heartRateInput").value;
                this.state.list[this.state.index].minutes = document.getElementById("minutesInput").value;
            }else{
            this.state.list[this.state.index].repetitions = document.getElementById("repetitionsInput").value;
            this.state.list[this.state.index].series = document.getElementById("seriesInput").value;
            this.state.list[this.state.index].minutes = document.getElementById("minutesInput").value;
            this.state.list[this.state.index].charge = document.getElementById("weightInput").value;
            }
            alert("Se ha editado con éxito");
        } else {
            alert("El elemento no se encuentra");
        }
        
        this.emptyInputs();
        this.disabledInputs();

        e.preventDefault();
    }

    deleteExercise(e) {
        if (this.state.exist) {
            this.state.list.splice(this.state.index, 1);
            alert("Se ha eliminado con éxito");
        } else {
            alert("El elemento no se encuentra");
        }

        this.emptyInputs();
        this.disabledInputs();

        e.preventDefault();
    }


    addExercise(e) {

        if (document.getElementById("weightInput").value.length == 0 && document.getElementById("seriesInput").value.length === 0
            && document.getElementById("repetitionsInput").value.length == 0 && document.getElementById("minutesInput").value.length === 0 
            && document.getElementById("intensityInput").value.length === 0 && document.getElementById("heartRateInput").value.length === 0 ) {

            alert("Debe llenar al menos un dato");

        } else {
            var weight = document.getElementById("weightInput").value;
            var minutes = document.getElementById("minutesInput").value;
            var repetitions = document.getElementById("repetitionsInput").value;
            var series = document.getElementById("seriesInput").value;
            var intensityPercentage = document.getElementById("intensityInput").value;
            var heartRate = document.getElementById("heartRateInput").value;

            if (weight == "") {
                weight = null;
            }
            if (minutes == "") {
                minutes = null;
            }
            if (repetitions == "") {
                repetitions = null;
            }
            if (series == "") {
                series = null;
            }
            if (intensityPercentage == "") {
                intensityPercentage = null;
            }
            if (heartRate == "") {
                heartRate = null;
            }
            var obj = {
                exerciseID: this.state.exerciseID,
                minutes: minutes,
                charge: weight,
                repetitions: repetitions,
                series: series,
                intensityPercentage: intensityPercentage,
                heartRate: heartRate
            }
            
            if (this.state.exist) {
                console.log(this.state.list);
                alert("El ejercicio ya fue agregado");
            } else {
                this.state.list.push(obj);
                alert("El ejercicio ha sido agregado con éxito");
            }
        }

        this.emptyInputs();
        this.disabledInputs();

        e.preventDefault();
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
        var id;
        if (!this.empty()) {

            axios.post("http://localhost:9000/RoutineRoute/addRoutine", {
                Frecuency: this.state.Frecuency,
                Intensity: this.state.Intensity,
                RestTime: this.state.RestTime,
                Density: this.state.Density,
                date: this.state.date,
                partyID: this.state.partyID,
                routineTypeID: this.state.routineTypeID,
                objectiveID: this.state.objectiveID,
                heartRatePerMinute: this.state.heartRatePerMinute
            })
                .then(response => {
                    console.log(response.data[0]);
                    id = response.data[0];
                    this.submitExercise(id[0].id);
                })

                .catch(err => console.error(err));

            e.preventDefault();
        } else {
            alert("Debe agregar ejercicios");
        }

    }

    submitExercise(id) {
        console.log(id);

        if (!this.arrayEmpty()) {
            this.state.list.map((ex) => {
                fetch("http://localhost:9000/RoutineRoute/addExercise", {
                    method: "post",
                    body: JSON.stringify({
                        routineID: id,
                        exerciseID: ex.exerciseID,
                        series: ex.series,
                        repetitions: ex.repetitions,
                        charge: ex.charge,
                        minutes: ex.minutes,
                        intensityPercentage: ex.intensityPercentage,
                        heartRate: ex.heartRate
                    }),
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


            this.props.history.push(`/HistoricRoutineInfo`);
        } else {
            alert("Debe agregar los datos de la preescripción física");

        }

    }


    empty() {
        if (this.state.Frecuency == "" || this.state.Density == "" || this.state.Intensity == "" || this.state.RestTime == ""
            || this.state.objectiveID == "" || this.state.routineTypeID == "" || this.state.heartRatePerMinute == "") {
            return true;
        } else {
            return false;
        }
    }

    arrayEmpty() {
        if (this.state.list.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
* Method that redirect to the previous page
*/
    backButton() {
        this.props.history.push(`/HistoricRoutineInfo`);
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
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/HistoricRoutineInfo">Lista de rutinas</Breadcrumb.Item>
                        <Breadcrumb.Item>Agregar rutina</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-12 card p-5">
                        <form className="AddRutineForm" >
                            <div className="row">
                                <h1 className="text-left colorBlue mb-4">Agregar rutina</h1>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Tipo de rutina<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">                                      
                                                <select name="rutineTypeDropdown" align="left" className="form-control" onChange={this.routineTypeSelect} value={this.state.routineTypeID}>
                                                  {routineTypeList}
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Objetivo<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <select name="objectiveDropdown" font-size="18px" align="left" className="form-control" onChange={this.objectiveSelect} onKeyPress={this.onKeyEvent} value={this.state.objectiveID}>
                                                        {objetiveType}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Frecuencia cardíaca<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" font-size="18px" name="heartRatePerMinute" onKeyPress={this.onKeyEvent} className="form-control" onChange={this.inputNumberValidator} placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Frecuencia<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" font-size="18px" onKeyPress={this.onKeyEvent} name="Frecuency" className="form-control" onChange={this.inputNumberValidator} placeholder="Días" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Intensidad<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" font-size="18px" name="Intensity" onKeyPress={this.onKeyEvent} className="form-control" onChange={this.inputNumberValidator} placeholder="%" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Densidad<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" font-size="18px" name="Density" onKeyPress={this.onKeyEvent} className="form-control" onChange={this.inputNumberValidator} placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Tiempo de descanso<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" font-size="18px" name="RestTime" onKeyPress={this.onKeyEvent} className="form-control" onChange={this.inputNumberValidator} placeholder="Segundos" />
                                                </div>
                                            </div>
                                        </div>
                                   
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="container card mt-4">
                                        <div className="row mt-4">
                                            <div className="col-3" align="center">
                                                <img src={leftArrowImage} className="arrows pointer" onClick={this.leftArrow} />
                                            </div>
                                            <div className="col-6 " align="center">
                                                <select name="exerciseTypeDropDown" font-size="18px" className="form-control" float="center" onChange={this.exerciseTypeSelect} value={this.state.typeID}>
                                                    {exerciseList}
                                                </select>
                                            </div>
                                            <div className="col-3 " align="center">
                                                <img src={rightArrowImage} className="arrows pointer" onClick={this.rigthArrow} />
                                            </div>
                                        </div>
                                        <div className="row mt-4 ">
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
                                                        <p>Minutos</p>
                                                        <input type="number" font-size="18px" id="minutesInput" className="form-control" disabled></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p id="pWeight">Carga/Peso</p>
                                                        <input type="number" font-size="18px" id="weightInput" className="form-control" disabled></input>
                                                        <p id="pIntensity" display="none">Intensidad</p>
                                                        <input type="number" font-size="18px" id="intensityInput" className="form-control" disabled display="none"></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p id="pSeries">Series</p>
                                                        <input type="number" font-size="18px" id="seriesInput" className="form-control" disabled></input>
                                                        <p id="pHeartRate" display="none">Frecuencia Cardiaca</p>
                                                        <input type="number" font-size="18px" id="heartRateInput" className="form-control" disabled display="none"></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p id="pRepetitions">Repeticiones</p>
                                                        <input type="number" font-size="18px" id="repetitionsInput" className="form-control" disabled></input>
                                                        
                                                    </div>
                                                    
                                                    <div className="form-group" align="right">
                                                        <button align="right" id="add" className="buttonSizeGeneral" onClick={this.addExercise}>Agregar</button>
                                                        <button align="right" id="edit" className="buttonSizeGeneral" onClick={this.editExercise} >Editar</button>
                                                        <button align="right" id="delete" className="buttonSizeGeneral" onClick={this.deleteExercise} >Eliminar</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" mt-4 col-10">
                                    <button align="right" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                                <div className=" mt-4 col-2">
                                    <button align="left" name="saveButton" className="buttonSizeGeneral" onClick={this.handleSubmit}> Guardar </button>
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