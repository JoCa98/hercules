/**
 * @fileoverview HomeAdmin page, Home of the administrator user that shows the list 
 *of all users (students and officials), with different search options by carnet, name and ID.
 *
 * @version 1.0
 *
 * @author    José Carlos Chávez Moran <jose.chavez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of HomeAdmin was written by José Chávez.
 */

import React, { Component } from 'react';
import axios from "axios";

class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        /**
        *userList:
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
            userList: [{}],
            searchType: 0,
            searchInput: ''
        };

        this.getUserListByCarnet = this.getUserListByCarnet.bind(this);
        this.getUserListByName = this.getUserListByName.bind(this);
        this.getUserListByIdentification = this.getUserListByIdentification.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.onKeyEvent = this.onKeyEvent.bind(this);
    }

    /**
    * Method that can be sent to load a preliminary list of all users
    * when loading the page for the first time
    */
    componentDidMount() {
        this.getUserListByCarnet();
    }

    /**
    * Method that performs the search corresponding to the type of search and using the values entered
    */
    searchEvent() {
        if (this.state.searchType == 0) {
            this.getUserListByCarnet();

        } else if (this.state.searchType == 1) {
            this.getUserListByName();

        } else if (this.state.searchType == 2) {
            this.getUserListByIdentification();
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
            console.log('value', e.key);
            this.searchEvent();
        }
    }

    /**
    * Method that brings the list of users using the carnet as a search criterion
    * and loads them to the userlist
    */
    getUserListByCarnet() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getUsersByCarnet`,
                { params: { carnet: this.state.searchInput } }).then(response => {
                    const userList = response.data[0];
                    this.setState({ userList });
                });
        } catch (err) {
            console.error(err);
        }
    }

    /**
    * Method that brings the list of users using the name as a search criterion
    * and loads them to the userlist
    */
    getUserListByName() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getUsersByName`,
                { params: { name: this.state.searchInput } }).then(response => {
                    const userList = response.data[0];
                    this.setState({ userList });
                });
        } catch (err) {
            console.error(err);
        }
    }

    /**
    * Method that brings the list of users using the ID as a search criterion
    * and loads them to the userlist
    */
    getUserListByIdentification() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getUsersByIdentification`,
                { params: { identificationID: this.state.searchInput } }).then(response => {
                    const userList = response.data[0];
                    this.setState({ userList });
                });
        } catch (err) {
            console.error(err);
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
    *  Redirects to the ConsultUser page
    * 
    * Receive an object that contains the element that called the method
    *  @param {Object} 
    */
    rowEvent(event) {
        try {
            alert(document.getElementById("myTable").rows[event.target.parentNode.rowIndex].cells[0].innerHTML);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        /**
        *The userList.map is used to create the rows of the table and to structure the html,
        *this is stored in a constant that is used in the code of the page
        */
        const userListVisual = this.state.userList.map((userList, i) => {
            return (
                <tr className="pointer" onClick={this.rowEvent} key={i}>
                    <td className="diplayNone">{userList.partyID}</td>
                    <td>{userList.identificationID}</td>
                    <td>{userList.fullName}</td>
                    <td>{userList.carnet}</td>
                </tr>
            )
        })
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Lista de usuarios</h1>
                        <div className="row">
                            <div className="col-2 offset-1">
                                <select className="form-control"
                                    name="searchType"
                                    onChange={this.handleInput}>
                                    <option value="0">Carnet</option>
                                    <option value="1">Nombre</option>
                                    <option value="2">Cedula</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <input
                                    type="text"
                                    name="searchInput"
                                    onChange={this.handleInput}
                                    onKeyPress={this.onKeyEvent}
                                    className="w-100 inputText"
                                    placeholder="Buscar"
                                >
                                </input>
                            </div>
                            <div className="col-2">
                                <button className="buttonSizeGeneral" onClick={this.searchEvent}>Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 offset-1 mt-4">
                        <table className="table table-sm table-hover" id="myTable">
                            <thead>
                                <tr>
                                    <th scope="col">Cédula</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Carnet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userListVisual}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

export default HomeAdmin;