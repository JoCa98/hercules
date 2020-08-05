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
            searchStatus: 2,
            searchInput: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.search = this.search.bind(this);

        this.getActiveMedicsList = this.getActiveMedicsList.bind(this);
        this.getInactiveMedicsList = this.getInactiveMedicsList.bind(this);
        this.getActiveAdminsList = this.getActiveAdminsList.bind(this);
        this.getInactiveAdminsList = this.getInactiveAdminsList.bind(this);
        this.searchEvent = this.searchEvent.bind(this);

        this.backButton = this.backButton.bind(this);
    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getActiveMedicsList();
        }
    }

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
        if(this.state.searchInput != ''){
           this.search(); 
        }
    }

    search() {
        var input, filter, table, tr, td, i, txtValue;
        input =  this.state.searchInput;
        filter = input.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          //Select column to filter with this index ..("td")[1] <<<
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
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
            if (this.state.searchType == 0) {
                this.props.history.push("/ConsultMedicPersonal");
            } else {
                this.props.history.push("/ConsultAdmin");
            }

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

    backButton() {
        this.props.history.push(`/Configuration`);
    }

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
                                    <option value="2">Activos</option>
                                    <option value="3">Inactivos</option>
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