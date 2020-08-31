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

class TipsAdmin extends Component {
    constructor(props) {
        super(props);
        /**
        *tipsList:
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
            tipsList: [],
            tipsListID: [],
        };

        this.getAllTips = this.getAllTips.bind(this);

        this.rowEvent = this.rowEvent.bind(this);
        this.handleInput = this.handleInput.bind(this);
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
            this.getAllTips();
        }

    }

    /**
    * Method that performs the search corresponding to the type of search and using the values entered
    */

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
    * Method that brings the list of users using the carnet as a search criterion
    * and loads them to the tipsList
    */
    getAllTips() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/getAllTips`).then(response => {
                const tipsList = response.data[0];
                this.setState({ tipsList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that brings the list of users using the name as a search criterion
    * and loads them to the tipsList
    */




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
    *  Redirects to the ConsultUser page
    * 
    * Receive an object that contains the element that called the method
    *  @param {Object} 
    */
    rowEvent(event) {
        try {
            sessionStorage.setItem("tipID", this.state.tipsListID[event.target.parentNode.rowIndex - 1]);
            this.props.history.push("/ConsultTips");
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    backButton() {
        this.props.history.push(`/Configuration`);
    }
    redirect(event) {

        this.props.history.push(`/AddTip`);
    }

    render() {

        const tipsListVisual = this.state.tipsList.map((tipsList, i) => {
            this.state.tipsListID.push(tipsList.tipsID);
            return (
                <tr className="pointer" onClick={this.rowEvent} key={i}>
                    <td>{tipsList.description}</td>
                    <td>{tipsList.link}</td>
                </tr>
            )
        })
        /**
        *The tipsList.map is used to create the rows of the table and to structure the html,
        *this is stored in a constant that is used in the code of the page
        */
        var breadcrumb = '';
        if (sessionStorage.getItem('userTypeID') !== '5') {
            breadcrumb = <div className="row mt-4"><Breadcrumb>
                <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                <Breadcrumb.Item >Lista de consejos</Breadcrumb.Item>
            </Breadcrumb></div>;
        }

        return (
            <div className="container">
                {breadcrumb}
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <div className="row p-3">
                            <div className="col-8">
                                <h1 className="text-left colorBlue">Lista de consejos</h1>
                            </div>
                            <div className="col-4  text-center">
                                <img src={plusImage} onClick={this.redirect} className="imageHistoricPage pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 offset-1 mt-4 ">
                        <table className="table table-sm table-hover " id="myTable">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tipsListVisual}
                            </tbody>
                        </table>
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

export default TipsAdmin;