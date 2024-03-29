import React, { Component } from 'react';
import axios from "axios";
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Modal from 'react-bootstrap/Modal';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';
import validations from './validations';


class AddRoutine extends Component {
    constructor() {
        super();
        /**
         *  permissionsManager:
         * @type {PermissionsManager}
         * 
         * routineType: 
         * @type {Array}
         * Property that stores the type of the routines that comes from to the database
         * 
         * objective:
         * @type {Array}
         * Property that stores the objectives of the routine that comes from to the database
         * 
         * Frecuency:
         * @type {integer}
         * Property that stores the input frecuency of the routine
         * 
         * Intesity:
         * @type {String}
         * Property that stores the input instensity of the routine
         * 
         * restBetweenSerie:
         * @type {integer}
         * Property that stores the input restBetweenSerie of the routine
         * 
         * restBetweenExercises:
         * @type {integer}
         * Property that stores the input rest time of the routine
         * 
         * HeartRatePerMinute
         * @type {String}
         * Property that stores the input heart rate of the routine
         * 
         * routineTypeID
         * @type {integer}
         * Property that stores the id of the routine's type selected
         * 
         * objectiveID
         * @type {integer}
         * Property that stores the id of the routine's objective selected
         * 
         * partyID:
         * @type {integer}
         * Property that stores the id of the user selected to the session storage
         * 
         * date:
         * @type {Date}
         * Property that stores the date of routine's creation
         * 
         * exerciseType:
         * @type {Array}
         * Property that stores the exercise's types that comes from the database
         * 
         * exercise:
         * @type {Array}
         * Property that stores the exercises that comes from the database
         * 
         * typeID:
         * @type {integer}
         * Property that stores the exercise's type selected
         * 
         * id:
         * @type {integer}
         * Property that stores the exercise's id selected
         * 
         * lastTypeID:
         * @type {integer}
         * Property that stores the id of exercise's last type existent
         * 
         * list:
         * @type {Array}
         * Property that stores the list of exercises selected
         * 
         * exerciseID:
         * @type {integer}
         * Property that stores the id of the exercise selected
         * 
         * exist:
         * @type {boolean}
         * Property that stores if one exercise is in the list of selected or not
         * 
         * index:
         * @type {integer}
         * Property that stores the index in list of selected if the exercise exists there
         * 
         * show:
         * @type {boolean}
         * Property that stores if the modal have to be shown or not
         * 
         * name:
         * @type {String}
         * Property that stores the name of the exercise selected
         * 
         * routineDay:
         * @type {integer}
         * Property that stores the day selected
         * 
         * daysCounter:
         * @type {integer}
         * Property that stores the quantity of days
         */
        this.state = {
            permissionsManager: new PermissionsManager(),
            routineType: [{}],
            objective: [{}],
            Frecuency: 0,
            Intensity: "",
            restBetweenSerie: 0,
            restBetweenExercises: 0,
            HeartRatePerMinute: "",
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
            index: 0,
            showModal: false,
            name: "",
            routineDay: 1,
            daysCounter: 1,
            modalList: [{}],
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false,
            validations: new validations()
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
        this.addDayButton = this.addDayButton.bind(this);
        this.dayButton = this.dayButton.bind(this);
        this.changeButtonsColors = this.changeButtonsColors.bind(this);
        this.deleteDayButton = this.deleteDayButton.bind(this);
        this.reorganizeList = this.reorganizeList.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }


    /**
       * This method takes care of show a modal with useful information
       */
    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };

    /**
    * This method close the modal  
    */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            this.props.history.push(`/`);
        }
        event.preventDefault();
    };


    /**
    * Method that  load the routine type list, objective list, exercise type list and get the last type id,
    * and call to init buttons, get exercise data and cardio exercise when loading the page for the first time
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);

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

    }

    /**
     * Method that put the state of show in true
     */
    showModal = (e) => {
        this.setState({ showModal: true });
        e.preventDefault();
    };

    /**
     * Method that put the state of show in false
     */
    hideModal = (e) => {
        this.setState({ showModal: false });
        e.preventDefault();
    };

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
        this.disabledInputs();
        this.emptyInputs();
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
        this.disabledInputs();
        this.emptyInputs();
    }

    /**
    * Method that change the state when an option are selected in the dropdown
    */
    exerciseTypeSelect(event) {
        this.state.typeID = event.target.value;
        this.setState({ typeID: event.target.value });
        this.cardioExercise();
        this.disabledInputs();
        this.getExerciseData();
        this.emptyInputs();
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

    /**
     * Method to init buttons of edit and delete exercise
     */
    initButtons() {
        document.getElementById("edit").style.display = 'none';
        document.getElementById("delete").style.display = 'none';
    }

    /**
    * Method that when the type of exercise is 1, show the arguments to cardiovascular 
    * exercises, and hide the other, or make the oposite when the type of exercise is different than 1
    */
    cardioExercise() {
        if (this.state.typeID == 1) {
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
        } else {
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
    enabledInputs() {
        if (this.state.typeID == 1) {
            document.getElementById("heartRateInput").disabled = false;
            document.getElementById("minutesInput").disabled = false;
            document.getElementById("intensityInput").disabled = false;
        } else {
            document.getElementById("weightInput").disabled = false;
            document.getElementById("seriesInput").disabled = false;
            document.getElementById("repetitionsInput").disabled = false;
            document.getElementById("minutesInput").disabled = false;
        }
    }

    /**
    * Method that make empty inputs by the exercise type selected
    */
    emptyInputs() {
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
    disabledInputs() {
        document.getElementById("weightInput").disabled = true;
        document.getElementById("seriesInput").disabled = true;
        document.getElementById("repetitionsInput").disabled = true;
        document.getElementById("heartRateInput").disabled = true;
        document.getElementById("minutesInput").disabled = true;
        document.getElementById("intensityInput").disabled = true;
    }


    /**
     * Method that get the exercise selected and check if is in the list to add or not
     * @param {object} event 
     */
    rowEvent(event) {
        const id = document.getElementById("routines").rows[event.target.parentNode.rowIndex].cells[0].innerHTML;
        var a = document.getElementsByTagName("tr");
        for (var i = 0; i < a.length; i++) {
            a[i].classList.remove('table-info');
        }
        const name = document.getElementById("routines").rows[event.target.parentNode.rowIndex].cells[1].innerHTML;
        document.getElementById("routines").rows[event.target.parentNode.rowIndex].classList.add("table-info");
        this.setState({ exerciseID: id });
        this.setState({ name: name });
        this.enabledInputs();
        this.emptyInputs();
        if (this.state.list.length != 0) {
            this.state.list.map((ex, i) => {
                if (ex.exerciseID == id && ex.day == this.state.routineDay) {
                    this.setState({ exist: true, index: i });
                    if (this.state.typeID == 1) {
                        this.cardioExercise();
                        document.getElementById("heartRateInput").value = ex.heartRate;
                        document.getElementById("intensityInput").value = ex.intensityPercentage;
                        document.getElementById("minutesInput").value = ex.minutes;

                    } else {
                        document.getElementById("weightInput").value = ex.charge;
                        document.getElementById("seriesInput").value = ex.series;
                        document.getElementById("repetitionsInput").value = ex.repetitions;
                        document.getElementById("minutesInput").value = ex.minutes;
                    }

                    document.getElementById("add").style.display = "none";
                    document.getElementById("edit").style.display = "initial";
                    document.getElementById("delete").style.display = "initial";
                } else {
                    this.setState({ exist: false });
                    document.getElementById("add").style.display = "initial";
                    document.getElementById("edit").style.display = "none";
                    document.getElementById("delete").style.display = "none";
                }
            })
        } else {
            this.setState({ exist: false });
            document.getElementById("add").style.display = "initial";
            document.getElementById("edit").style.display = "none";
            document.getElementById("delete").style.display = "none";
        }
    }

    /**
     * Method for edit a exercise in the list to add
     * @param {object} e 
     */
    editExercise(e) {
        if (this.state.exist) {
            this.enabledInputs();
            if (this.state.typeID == 1) {
                if (document.getElementById("minutesInput").value.length === 0 && document.getElementById("intensityInput").value.length === 0
                    && (document.getElementById("heartRateInput").value.length === 0)) {
                    this.modalTrigger(e, 'Campos obligatorios', 'Debe llenar al menos un dato del ejercicio');
                } else {
                    if ((document.getElementById("heartRateInput").value.length !== 0 && !this.state.validations.validateRange(document.getElementById("heartRateInput").value.trim()))) {
                        this.modalTrigger(e, 'Formato Incorrecto', 'La frecuencia cardiaca debe ser un rango');
                        e.preventDefault();
                    } else {
                        if (document.getElementById("intensityInput").value.length !== 0 && !this.state.validations.validateIntensity(document.getElementById("intensityInput").value.trim())) {
                            this.modalTrigger(e, 'Formato incorrecto', 'La intensidad del ejercicio debe ser un rango');
                        } else {
                            this.state.list[this.state.index].intensityPercentage = document.getElementById("intensityInput").value;
                            this.state.list[this.state.index].heartRate = document.getElementById("heartRateInput").value;
                            this.state.list[this.state.index].minutes = document.getElementById("minutesInput").value;
                            this.modalTrigger(e, 'Ejercicios', 'Se ha editado con éxito el ejercicio');
                        }
                    }
                }
            } else {
                if (document.getElementById("weightInput").value.length == 0 && document.getElementById("seriesInput").value.length === 0
                    && document.getElementById("repetitionsInput").value.length == 0 && document.getElementById("minutesInput").value.length === 0) {
                    this.modalTrigger(e, 'Campos obligatorios', 'Debe llenar al menos un dato del ejercicio');

                } else {
                    this.state.list[this.state.index].repetitions = document.getElementById("repetitionsInput").value;
                    this.state.list[this.state.index].series = document.getElementById("seriesInput").value;
                    this.state.list[this.state.index].minutes = document.getElementById("minutesInput").value;
                    this.state.list[this.state.index].charge = document.getElementById("weightInput").value;
                    this.modalTrigger(e, 'Ejercicios', 'Se ha editado con éxito el ejercicio');
                }

            }

        } else {
            this.modalTrigger(e, 'Ejercicios', 'El ejercicio no se encuentra registrado');
        }
        this.emptyInputs();
        this.disabledInputs();
        document.getElementById("add").style.display = "initial";
        document.getElementById("edit").style.display = "none";
        document.getElementById("delete").style.display = "none";
        e.preventDefault();
    }

    /**
     * Method to delete an exercise of the list to add
     * @param {object} e 
     */
    deleteExercise(e) {
        if (this.state.exist) {
            this.state.list.splice(this.state.index, 1);
            this.modalTrigger(e, 'Ejercicios', 'Se ha eliminado con éxito el ejercicio');
        } else {
            this.modalTrigger(e, 'Ejercicios', 'El ejercicio no se encuentra registrado');
        }
        this.emptyInputs();
        this.disabledInputs();
        document.getElementById("add").style.display = "initial";
        document.getElementById("edit").style.display = "none";
        document.getElementById("delete").style.display = "none";
        e.preventDefault();
    }



    /**
    * Method to add an exercise in the list to add
    * @param {object} e 
    */
    addExercise(e) {
        if (document.getElementById("weightInput").value.length == 0 && document.getElementById("seriesInput").value.length === 0
            && document.getElementById("repetitionsInput").value.length == 0 && document.getElementById("minutesInput").value.length === 0
            && document.getElementById("intensityInput").value.length === 0 && (document.getElementById("heartRateInput").value.length === 0)) {
            this.modalTrigger(e, 'Campos obligatorios', 'Debe llenar al menos un dato del ejercicio');
        } else {
            if ((document.getElementById("heartRateInput").value.length !== 0 && !this.state.validations.validateRange(document.getElementById("heartRateInput").value.trim()))) {
                this.modalTrigger(e, 'Formato Incorrecto', 'La frecuencia cardiaca debe ser un rango');
                e.preventDefault();
            } else {
                if (document.getElementById("intensityInput").value.length !== 0 && !this.state.validations.validateRange(document.getElementById("intensityInput").value.trim())) {
                    this.modalTrigger(e, 'Formato incorreco', 'La intensidad del ejercicio debe ser un rango');
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
                    if (heartRate == "" || heartRate == "-") {
                        heartRate = "";
                    }
                    var obj = {
                        exerciseID: this.state.exerciseID,
                        minutes: minutes,
                        charge: weight,
                        repetitions: repetitions,
                        series: series,
                        intensityPercentage: intensityPercentage,
                        heartRate: heartRate,
                        name: this.state.name,
                        day: this.state.routineDay
                    }

                    if (this.state.exist) {
                        this.modalTrigger(e, 'Ejercicios', 'El ejercicio ya estaba agregado anteriormente');
                    } else {
                        this.state.list.push(obj);
                        this.modalTrigger(e, 'Ejercicios', 'El ejercicio ha sido agregado con éxito');
                    }

                }
            }
            this.emptyInputs();
            this.disabledInputs();
            e.preventDefault();
        }
    }

    /**
     * Method for validate if the input text is a number
     * @param {object} event 
     */
    inputNumberValidator(event) {
        const re = /^[0-9\b]+$/;
        const { name, value } = event.target;
        if (value === "" || re.test(value)) {
            this.setState({
                [name]: value
            });
        }
    }



    /**
    * This method set the prop attributes
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    /**
     * Method to get the value of the selected routine type
     * @param {object} event 
     */
    routineTypeSelect(event) {
        this.state.routineTypeID = event.target.value;
        this.setState({ routineTypeID: event.target.value });
    }
    /**
     * Method to get the value of the selected routine objective
     * @param {object} event 
     */
    objectiveSelect(event) {
        this.state.objectiveID = event.target.value;
        this.setState({ objectiveID: event.target.value });
    }

    /**
     * Method that add an routine to the database
     * @param {object} e 
     */
    handleSubmit(e) {
        var id;
        axios.post("http://localhost:9000/RoutineRoute/addRoutine", {
            Frecuency: this.state.Frecuency,
            Intensity: this.state.Intensity,
            restBetweenExercises: this.state.restBetweenExercises,
            restBetweenSerie: this.state.restBetweenSerie,
            date: this.state.date,
            partyID: this.state.partyID,
            routineTypeID: this.state.routineTypeID,
            objectiveID: this.state.objectiveID,
            HeartRatePerMinute: this.state.HeartRatePerMinute
        })
            .then(response => {
                id = response.data[0];
                this.submitExercise(id[0].id, e);
            })

            .catch(err => console.error("Un error inesperado a ocurrido"));

        e.preventDefault();
    }


    /**
     * Method that add a list of exercises to a routine in the database
     * @param {integer} id 
     */
    submitExercise(id, e) {
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
                    heartRate: ex.heartRate,
                    routineDay: ex.day
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        isExit: true
                    });
                    this.hideModal(e);
                    this.props.history.push(`/HistoricRoutineInfo`);

                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
        })
    }

    /**
     * Method that verifies if some input is empty
     */
    empty(event) {
        if (this.state.Frecuency.toString().trim().length == 0 || this.state.restBetweenSerie.toString().trim().length == 0 || this.state.Intensity.toString().trim().length == 0 || this.state.restBetweenExercises.toString().trim().length == 0
            || this.state.objectiveID.toString().trim().length == 0 || this.state.routineTypeID.toString().trim().length == 0 || this.state.HeartRatePerMinute.trim().length == 0) {
            this.modalTrigger(event, 'Campos obligatorios', 'Debe agregar los datos de la preescripción física');
        } else {
             if (!this.state.validations.validateRange(this.state.Intensity.trim())) {
                this.modalTrigger(event, 'Formato Incorrecto', 'Intensidad debe ser un rango 000-000');
                }else{
                    if (!this.state.validations.validateRange(this.state.HeartRatePerMinute.trim())) {
                    this.modalTrigger(event, 'Formato Incorrecto', 'Frecuencia Cardiaca debe ser un rango 000-000');
                    }else{
                        this.arrayEmpty(event);
            }
        }
        
    }
}

    /**
     * Method that verifies if the list to add is empty
     */
    arrayEmpty(event) {
        if (this.state.list.length == 0) {
            this.modalTrigger(event, 'Ejercicios', 'Debe agregar al menos un ejercicio en la rutina');
        } else {
            this.reorganizeList(event);
        }
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/HistoricRoutineInfo`);
    }

    /**
     * Method delete the last day button
     */
    deleteDayButton(e) {
        if (this.state.daysCounter > 1) {
            var div = document.getElementById("btn");
            var button = document.getElementById(this.state.daysCounter);
            div.removeChild(button);
            var day = this.state.daysCounter - 1;
            this.setState({
                routineDay: day,
                daysCounter: this.state.daysCounter - 1
            })
            document.getElementById(day).style.backgroundColor = "#ffffff";
            document.getElementById(day).style.border = "2px solid #41ade7";
            document.getElementById(day).style.color = "#0c0c0c";
            
        }else{
            this.modalTrigger(e, 'Eliminar día', 'No puede eliminar el día 1');
        }
        e.preventDefault();
    }

    /**
     * Method that add a day button
     * @param {object} e 
     */
    addDayButton(e) {
        if (this.state.daysCounter < 6) {
            var div = document.getElementById("btn");
            var btn = document.createElement("button");
            var value = (this.state.daysCounter + 1);
            btn.value = value;
            btn.textContent = "Día " + value;
            btn.id = value;
            btn.className = "buttonDaysSize mr-1";
            btn.onclick = this.dayButton;
            btn.style.backgroundColor = "#ffffff";
            btn.style.border = "2px solid #41ade7";
            btn.style.color = "#0c0c0c";
            div.appendChild(btn);

            this.setState({
                routineDay: this.state.daysCounter + 1,
                daysCounter: this.state.daysCounter + 1
            })

            this.changeButtonsColors(value);

        }
        e.preventDefault();
    }

    /**
     * Method that change the state of routineDay for the selected day
     * @param {object} event 
     */
    dayButton(event) {
        if (this.state.routineDay != event.target.value) {
            this.setState({
                routineDay: event.target.value
            })
            event.target.style.backgroundColor = "#ffffff";
            event.target.style.border = "2px solid #41ade7";
            event.target.style.color = "#0c0c0c";
            this.changeButtonsColors(event.target.value);
            this.emptyInputs();
        }
        event.preventDefault();
    }

    /**
     * Method that change the color of the day buttons
     * @param {integer} day 
     */
    changeButtonsColors(day) {

        for (var i = 1; i <= this.state.daysCounter; i++) {
            if (i != day) {
                document.getElementById(i).style.backgroundColor = "#41ade7";
                document.getElementById(i).style.color = "#ffffff";
            }
        }

    }

    /**
     * Method that reorganize the exercises' list for days
     * @param {object} e 
     */
    reorganizeList(e) {
      
        var list1 = [];
        var list2 = [];
        var list3 = [];
        var list4 = [];
        var list5 = [];
        var list6 = [];
        var newList = [];
        var obj = {};
        
        for (var i = 0; i < this.state.list.length; i++) {
            obj = {
                name:  this.state.list[i].name
            };
          
            if ( this.state.list[i].day == 1) {
              
                    list1.push(obj);
            }else if( this.state.list[i].day == 2){
                list2.push(obj);
            }else if ( this.state.list[i].day == 3){
                list3.push(obj);
            }else if( this.state.list[i].day == 4){
                list4.push(obj);
            }else if( this.state.list[i].day == 5){
                list5.push(obj);
            }else if( this.state.list[i].day == 6){
                list6.push(obj);
            }
            }
        

        if (list1.length != 0) {
            if (list2.length != 0) {
                if (list3.length != 0) {
                    if (list4.length != 0) {
                        if (list5.length != 0) {
                            if (list6.length != 0) {
                                newList = [{ id: 1, list: list1 }
                                    , { id: 2, list: list2 }
                                    , { id: 3, list: list3 }
                                    , { id: 4, list: list4 }
                                    , { id: 5, list: list5 }
                                    , { id: 6, list: list6 }];
                            } else {
                                newList = [{ id: 1, list: list1 }, { id: 2, list: list2 }, { id: 3, list: list3 }, { id: 4, list: list4 }, { id: 5, list: list5 }];
                            }
                        } else {
                            newList = [{ id: 1, list: list1 }, { id: 2, list: list2 }, { id: 3, list: list3 }, { id: 4, list: list4 }];
                        }
                    } else {
                        newList = [{ id: 1, list: list1 }, { id: 2, list: list2 }, { id: 3, list: list3 }];
                    }
                } else {
                    newList = [{ id: 1, list: list1 }, { id: 2, list: list2 }];
                }
            } else {
                newList = [{ id: 1, list: list1 }];
            }
        }

        let nlist = [];
        newList.map((obj) => {
            nlist.push(<p><b>Día {obj.id}</b></p>);
            obj.list.map((exercise) => {
                nlist.push(<p>{exercise.name}</p>)
            })
            nlist.push(<p> <b>Total de ejercicios del día: {obj.list.length}</b> </p>)
        });

        this.setState({
            modalList: nlist
        });

        this.showModal(e);
    }



    render() {
        /**
         * Create options with the routine's types
         */
        const routineTypeList = this.state.routineType.map((types, i) => {
            return (
                <option value={types.routineTypeID} key={i}>{types.description}</option>
            )
        })

        /**
         * Create options with the routine's objectives
         */
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
                                                    <select name="objectiveDropdown" fontSize="18px" align="left" className="form-control" onChange={this.objectiveSelect} onKeyPress={this.onKeyEvent} value={this.state.objectiveID}>
                                                        {objetiveType}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Frecuencia<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" fontSize="18px" min="0" onKeyPress={this.onKeyEvent} name="Frecuency" className="form-control" onChange={this.inputNumberValidator} placeholder="Días" />
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
                                                    <p>Intensidad<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="text" fontSize="18px" name="Intensity" onKeyPress={this.onKeyEvent} className="form-control" onChange={this.handleInputChange} placeholder="000-000" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Descanso entre serie<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" fontSize="18px" name="restBetweenSerie" onKeyPress={this.onKeyEvent} className="form-control" onChange={this.inputNumberValidator} placeholder="Segundos" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7">
                                                    <p>Descanso entre ejercicios<font color="red">*</font></p>
                                                </div>
                                                <div className="col-5">
                                                    <input type="number" fontSize="18px" name="restBetweenExercises" onKeyPress={this.onKeyEvent} className="form-control" onChange={this.inputNumberValidator} placeholder="Segundos" />
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
                                                <p>Frecuencia cardíaca<font color="red">*</font></p>
                                            </div>
                                            <div className="col-5">
                                                <input type="text" fontSize="18px" id="HeartRatePerMinute" name="HeartRatePerMinute" className="form-control" onChange={this.handleInputChange} placeholder="000-000" />
                                            </div>
                                            </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                            <div className="row mt-4" >
                                <div className="col-9" id="btn" >
                                    <button className="buttonDays mr-1" value="1" id="1" onClick={this.dayButton}>Día 1</button>
                                </div>
                                <div className="col-3 " id="addDelete">
                                    <button className="buttonDaysSize mr-1" onClick={this.addDayButton}>Agregar día</button>
                                    <button className="buttonDaysSize ml-1" onClick={this.deleteDayButton}>Eliminar día</button>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-12" >
                                    <div className="container card mt-1">
                                        <div className="row mt-4">
                                            <div className="col-3" align="center">
                                                <img src={leftArrowImage} className="arrows pointer" onClick={this.leftArrow} />
                                            </div>
                                            <div className="col-6 " align="center">
                                                <select name="exerciseTypeDropDown" fontSize="18px" className="form-control" float="center" onChange={this.exerciseTypeSelect} value={this.state.typeID}>
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
                                                        <input type="number" fontSize="18px" id="minutesInput" className="form-control" disabled></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p id="pWeight">Carga/Peso(lb)</p>
                                                        <input type="number" fontSize="18px" id="weightInput" className="form-control" disabled></input>
                                                        <p id="pIntensity" display="none">Intensidad</p>
                                                        <input type="text" fontSize="18px" id="intensityInput" className="form-control" disabled display="none" placeholder="000-000"></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p id="pSeries">Series</p>
                                                        <input type="number" fontSize="18px" id="seriesInput" className="form-control" disabled></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p id="pHeartRate" display="none">Frecuencia Cardiaca</p>
                                                        <input type="text" fontSize="18px" id="heartRateInput" className="form-control" disabled display="none" placeholder="000-000"></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p id="pRepetitions">Repeticiones</p>
                                                        <input type="number" fontSize="18px" id="repetitionsInput" className="form-control" disabled></input>
                                                    </div>
                                                    <div className="form-group" align="right">
                                                        <button align="right" id="add" className="buttonSizeGeneral" onClick={this.addExercise}>Agregar</button>
                                                        <button align="right" id="edit" className="buttonSizeGeneral mr-1" onClick={this.editExercise} >Editar</button>
                                                        <button align="right" id="delete" className="buttonSizeGeneral ml-1" onClick={this.deleteExercise} >Eliminar</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Modal show={this.state.showModal} handleClose={this.hideModal}>
                                <Modal.Header closeButton onClick={this.hideModal}>
                                    <Modal.Title>Ejercicios seleccionados</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div id="listExercise">
                                        {this.state.modalList}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="buttonSizeGeneral" onClick={this.hideModal}>Volver</button>
                                    <button className="buttonSizeGeneral"  onClick={this.handleSubmit}>Aceptar</button>
                                </Modal.Footer>
                            </Modal>

                            <div className="row">
                                <div className=" mt-4 col-10">
                                    <button align="right" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                                <div className=" mt-4 col-2">
                                    <button align="left" name="saveButton" className="buttonSizeGeneral" onClick={this.empty} > Guardar </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                                        <br />{this.state.modalChildren}
                                    </ModalComponent>
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