import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class AccountConfiguration extends Component {
    constructor(props) {
        super(props);
        /**
        *userTypeList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database
        * 
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            userList: [],
            userListID: [],
            searchType: 0,
            searchInput: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.rowEvent = this.rowEvent.bind(this);

        this.getActiveMedicsList = this.getActiveMedicsList.bind(this);
        this.getInactiveMedicsList = this.getInactiveMedicsList.bind(this);
        this.getActiveAdminsList = this.getActiveAdminsList.bind(this);
        this.getInactiveAdminsList = this.getInactiveAdminsList.bind(this);
        this.searchEvent = this.searchEvent.bind(this);

        this.gymPersonal = this.gymPersonal.bind(this);
        this.medicalPersonal = this.medicalPersonal.bind(this);

    }

    componentDidMount() {
        /* if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {*/
        window.scrollTo(0, 0);
        this.getActiveMedicsList();
        /*}*/
    }

    searchEvent() {
        if (this.state.searchType == 0 && this.state.searchStatus == 0) {
            this.getActiveMedicsList();
        } else if (this.state.searchType == 0 && this.state.searchStatus == 1) {
            this.getInactiveMedicsList();
        } else if (this.state.searchType == 1 && this.state.searchStatus == 0) {
            this.getActiveAdminsList();
        } else {
            this.getInactiveAdminsList()
            
        }
    }

    getActiveMedicsList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/ActiveMedics`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    getInactiveMedicsList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/InactiveMedics`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    getActiveAdminsList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/ActiveGymAdmins`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    getInactiveAdminsList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/InactiveActiveGymAdmins`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    onKeyEvent(e) {
        if (e.key == "Enter") {
            this.searchEvent();
        }
    }

    rowEvent(event) {
        try {
            sessionStorage.setItem("userPartyID", this.state.userListID[event.target.parentNode.rowIndex - 1]);
            this.props.history.push("/ConsultAdmin");
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    /**
    * Method that redirect to the requested page
    */
    gymPersonal() {
        this.props.history.push(`/GymPersonal`);
    }

    medicalPersonal() {
        this.props.history.push(`/MedicalPersonal`);
    }


    /*
    activateMedic() {
        this.props.history.push(`/activateMedic`);
    }

    deactivateMedic() {
        this.props.history.push(`/deactivateMedic`);
    }

    eliminateGymAdmin() {
        this.props.history.push(`/eliminateGymAdmin`);
    }
    */

    /*
    <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.activateMedic}>Activar medico</button>
    <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.deactivateMedic}>Desactivar medico</button>
    <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.eliminateGymAdmin}>Eliminar administador del gimnasio</button>
    */

   render() {
    /**
    *The userList.map is used to create the rows of the table and to structure the html,
    *this is stored in a constant that is used in the code of the page
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
                            <div className="col-3 offset-1">
                                <select fontSize="18px" className="form-control"
                                    name="searchType"
                                    onChange={this.handleInput}>
                                    <option value="0">Personal salud</option>
                                    <option value="1">Personal gimnasio</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <select fontSize="18px" className="form-control"
                                    name="searchStatus"
                                    onChange={this.handleInput}>
                                    <option value="0">Activos</option>
                                    <option value="1">Inactivos</option>
                                </select>
                            </div>
                        <div className="col-3">
                            <input fontSize="18px"
                                type="text"
                                name="searchInput"
                                onChange={this.handleInput}
                                onKeyPress={this.onKeyEvent}
                                className="w-100 inputText"
                                placeholder="Buscar">
                            </input>
                        </div>
                        <div className="col-1">
                            <button className="buttonSizeGeneral" onClick={this.searchEvent}>Buscar</button>
                        </div>
                    </div>
                </div>
                <div className="col-10 offset-1 mt-4">
                    <table className="table table-sm table-hover" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Estado</th>
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
export default AccountConfiguration;

