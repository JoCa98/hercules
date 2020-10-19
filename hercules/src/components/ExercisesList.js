/**
 * @fileoverview ExercisesList page, this page shows all exercises
 * @version 1.0
 *
 * @author  Jermy Calvo <jermy.calvo@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import PermissionsManager from "./PermissionsManager";
import plusImage from '../appImage/plusImage.svg';
import {baseUrl} from "./baseUrl";

class ExercisesList extends Component {
    constructor(props) {
        super(props);
        /**
        *exerciseList:
        * @type {Array}
        * Property that stores the list of users that comes from the database
        * 
        * searchType:
        * @type {integer}
        * Property that indicates the type of search to be performed,
        *  takes the value of a select and has an initial value of 0
        * 
        * searchInput
        * @type {String}
        * Property that contains the search values
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            exerciseList: [],
            exerciseTypes: [],
            exerciseListID: [],
            searchType: 0,
            searchInput: ''
        };

        this.getExerciseListOrderType = this.getExerciseListOrderType.bind(this);

        this.rowEvent = this.rowEvent.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.onKeyEvent = this.onKeyEvent.bind(this);
        this.backButton = this.backButton.bind(this);
        this.redirect = this.redirect.bind(this);

    }

    /**
    * Method that can be sent to load a preliminary list of all users
    * when loading the page for the first time
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getExerciseListOrderType();
            this.getexerciseTypes();
        }

    }

    /**
    * Method that performs the search corresponding to the type of search and using the values entered
    */

    searchEvent() {
        if (this.state.searchType == 0 && this.state.searchInput != '') {
            this.getExerciseListByName();

        } else if (this.state.searchType > 0 && this.state.searchInput != '') {
            this.getExerciseListByNameAndType();

        } else if (this.state.searchType > 0 && this.state.searchInput == '') {
            this.getExerciseListByType();
        } else {
            this.getExerciseListOrderType();
        }
    }

    /**
    * Method that executes the search method by pressing enter in the input.
    * 
    * Receive an object that contains the element that called the method
    *  @param {Object} 
    */
    onKeyEvent(e) {
        if (e.key == "Enter") {
            this.searchEvent();
        }
    }

    /**
    This method brings the list of exercises in order, 
    it is the list that is shown at the beginning without filters.
    */
    getExerciseListOrderType() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/getExercisesListOrderType`).then(response => {
                const exerciseList = response.data[0];
                this.setState({ exerciseList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * This method is responsible for bringing the list of exercises filtered by the type of exercise.
     */
    getExerciseListByType() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/getExercisesByType`,
                { params: { type: this.state.searchType } }).then(response => {
                    const exerciseList = response.data[0];
                    this.setState({ exerciseList });
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * This method is responsible for bringing the list of exercises filtered by the type of exercise and the name.
     */
    getExerciseListByNameAndType() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/getExercisesByNameAndType`,
                { params: { type: this.state.searchType, name: this.state.searchInput } }).then(response => {
                    const exerciseList = response.data[0];
                    this.setState({ exerciseList });
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * This method is responsible for bringing the list of exercises filtered by the  name
     */
    getExerciseListByName() {
        console.log("nombre: " + this.state.searchInput);
        try {
            axios.get(baseUrl + `ConfigurationRoute/getExerciseName`,
                { params: { name: this.state.searchInput } }).then(response => {
                    const exerciseList = response.data[0];
                    this.setState({ exerciseList });
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that brings the list of users using the name as a search criterion
    * and loads them to the exerciseList
    */
    getexerciseTypes() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/getExerciseType`).then(response => {
                const exerciseTypes = response.data[0];
                this.setState({ exerciseTypes });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }



    /**
    * Method that changes the value of the state variable using the object that triggers the event.
    *  To do this the element must have the property name defined as the state variable
    * 
    * Receive an object that contains the element that called the method
    *  @param {Object} 
    */
    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    /**
    * Method that uses the value of the id of the row that was selected in the table.
    *  Redirects to the ConsultExercise page
    * 
    * Receive an object that contains the element that called the method
    *  @param {Object} 
    */
    rowEvent(event) {
        try {
            sessionStorage.setItem("exerciseID", this.state.exerciseListID[event.target.parentNode.rowIndex - 1]);
            this.props.history.push("/ConsultExercise");
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * This method returns us to the previous page.
     */
    backButton() {
        this.props.history.push(`/ConfigurationRoutine`);
    }
    /**
     * This method takes us to the page AddExercise
     */
    redirect(event) {
        this.props.history.push(`/AddExercise`);
    }

    render() {
        /**
        *The exerciseList.map is used to create the rows of the table and to structure the html,
        *this is stored in a constant that is used in the code of the page
        */
        const exerciseListVisual = this.state.exerciseList.map((exerciseList, i) => {
            this.state.exerciseListID.push(exerciseList.exerciseID);
            return (
                <tr className="pointer" onClick={this.rowEvent} key={i}>
                    <td>{exerciseList.description}</td>
                    <td>{exerciseList.type}</td>
                    <td>{exerciseList.status}</td>
                </tr>
            )
        })
        /**
         * The types of exercises are stored in this constant.
         */
        const exerciseTypeListVisual = this.state.exerciseTypes.map((exerciseTypes, i) => {
            return (
                <option value={exerciseTypes.exerciseTypeID} key={i}>{exerciseTypes.description}</option>
            )
        })

        var breadcrumb = '';
        if (sessionStorage.getItem('userTypeID') !== '5') {
            breadcrumb = <div className="row mt-4"><Breadcrumb>
                <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                <Breadcrumb.Item href="#/ConfigurationRoutine">Configuración de rutina</Breadcrumb.Item>
                <Breadcrumb.Item >Lista de Ejercicios</Breadcrumb.Item>
            </Breadcrumb></div>;
        }

        return (
            <div className="container">
                {breadcrumb}
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <div className="row p-3">
                            <div className="col-6">
                                <h1 className="text-left colorBlue">Lista de ejercicios</h1>
                            </div>
                            <div className="col-6 text-center">
                                <img src={plusImage} onClick={this.redirect} className="imageHistoricPage pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar ejercicio</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 offset-1">
                                <select fontSize="18px" className="form-control"
                                    name="searchType"
                                    onChange={this.handleInput}>
                                    <option value="0">Todos</option>
                                    {exerciseTypeListVisual}
                                </select>
                            </div>
                            <div className="col-6">
                                <input fontSize="18px"
                                    type="text"
                                    name="searchInput"
                                    onChange={this.handleInput}
                                    onKeyPress={this.onKeyEvent}
                                    className="w-100 inputText"
                                    placeholder="Buscar"
                                >
                                </input>
                            </div>
                            <div className=" col-2">
                                <button className="buttonSizeGeneral" onClick={this.searchEvent}>Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 offset-1 mt-4" >
                        <div className="table-responsive" style={{ overflow: 'auto', height: '300px' }}>
                            <table className="table table-sm table-hover " id="myTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exerciseListVisual}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" mt-3 col-md-3">
                            <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExercisesList;