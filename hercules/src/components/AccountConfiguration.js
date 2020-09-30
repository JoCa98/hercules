/**
 * @fileoverview AccountConfiguration page, this page shows medical and admin accounts, according to their status.
 * @version 1.0
 *
 * @author Victor Bolaños <victor.bolanos@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import {baseUrl} from "./baseUrl";


class AccountConfiguration extends Component {
    constructor(props) {
        super(props);
        /**
        * userList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database.
        * 
        * searchType:
        * @type {integer}
        * Property that indicates the type of user that is going to be displayed. Initial value: 0
        * 
        * searchStatus:
        * @type {integer}
        * Property that indicates the status of user that is going to be displayed. Initial value: 2
        * 
        * searchInput:
        * @type {String}
        * Property that indicates the string to search for.
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            userList: [],
            userListID: [],
            searchType: 0,
            searchStatus: 2,
            searchInput: ''
        };

        this.searchEvent = this.searchEvent.bind(this);
        this.getActiveMedicsList = this.getActiveMedicsList.bind(this);
        this.getInactiveMedicsList = this.getInactiveMedicsList.bind(this);
        this.getActiveAdminsList = this.getActiveAdminsList.bind(this);
        this.getInactiveAdminsList = this.getInactiveAdminsList.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.backButton = this.backButton.bind(this);
        this.onKeyEvent = this.onKeyEvent.bind(this);
    }

    /**
     * Initiates the page
     */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getActiveMedicsList();
        }
    }

    /**
     * Search the user list according to the different user types or states.
     * Also has a search box for more accurate searchs.
     */
    searchEvent() {
        if (this.state.searchType == 0 && this.state.searchStatus == 2) {
            this.getActiveMedicsList();
        } else if (this.state.searchType == 1 && this.state.searchStatus == 2) {
            this.getActiveAdminsList();
        } else if (this.state.searchType == 0 && this.state.searchStatus == 3) {
            this.getInactiveMedicsList();
        } else {
            this.getInactiveAdminsList()
        }
    }

    /**
     * Gets the active medics list.
     */
    getActiveMedicsList() {
        try {
            axios.get(baseUrl +`ConfigurationRoute/ActiveMedics`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * Gets the inactive medics list.
     */
    getInactiveMedicsList() {
        try {
            axios.get(baseUrl+ `ConfigurationRoute/InactiveMedics`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * Gets the active admins list.
     */
    getActiveAdminsList() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/ActiveGymAdmins`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * Gets the inactive admins list.
     */
    getInactiveAdminsList() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/InactiveActiveGymAdmins`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * Calls the search method when the 'Enter' key is pressed.
     */
    onKeyEvent(e) {
        if (e.key == "Enter") {
            this.searchEvent();
        }
    }

    /**
     * Redirects to the appropiate page for the given user.
     */
    rowEvent(event) {
        try {
            sessionStorage.setItem("userPartyID", this.state.userListID[event.target.parentNode.rowIndex - 1]);
            if (this.state.searchType == 0) {
                this.props.history.push("/ConsultMedicPersonal");
            } else {
                this.props.history.push("/ConsultAdmin");
            }

        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
     * Changes the value of the given component where the method is called, to match the input.
     */
    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    /**
     * Go to previous page.
     */
    backButton() {
        this.props.history.push(`/Configuration`);
    }

    render() {
        /**
        * The userList.map is used to create the rows of the table and to structure the html,
        * this is stored in a constant that is used in the code of the page
        */
        const userListVisual = this.state.userList.map((userList, i) => {
            this.state.userListID.push(userList.partyID);
            if (sessionStorage.getItem('userTypeID') === '5') {
                return (
                    <tr key={i}>
                        <td>{userList.email}</td>
                        <td>{userList.status}</td>
                    </tr>
                )
            } else {
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td>{userList.email}</td>
                        <td>{userList.status}</td>
                    </tr>
                )
            }
        })

        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item>Configuración de cuentas</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Configuración de cuentas</h1>
                        <div className="row">
                            <div className="col-4 offset-1">
                                <select fontSize="18px" className="form-control"
                                    name="searchType"
                                    onChange={this.handleInput}>
                                    <option value="0">Personal salud</option>
                                    <option value="1">Personal gimnasio</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select fontSize="18px" className="form-control"
                                    name="searchStatus"
                                    onChange={this.handleInput}>
                                    <option value="2">Activos</option>
                                    <option value="3">Inactivos</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <button className="buttonSizeGeneral" onClick={this.searchEvent}>Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 offset-1 mt-4" >
                        <table className="table table-sm table-hover" id="myTable">
                            <thead>
                                <tr class="header">
                                    <th scope="col">Email</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userListVisual}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="mt-3 offset-1 col-md-3">
                            <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AccountConfiguration;