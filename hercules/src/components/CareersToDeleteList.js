import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";

class CareersToDeleteList extends Component {
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
            validations: new validations(),
            userTypeID: "3",
            userTypeList: [],
            careerList: [],
            careerListID: []
        };

        this.getCareersToDeleteList = this.getCareersToDeleteList.bind(this);
        this.backButton = this.backButton.bind(this);
        this.rowEvent = this.rowEvent.bind(this);

    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getCareersToDeleteList();
        }
    }

    getCareersToDeleteList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/GetCareersWithoutStudents`).then(response => {
                const careerList = response.data[0];
                this.setState({ careerList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * This method load the information in the dropdownlist
    */

    rowEvent(event) {
        try {
            sessionStorage.setItem("careerToDeleteID", this.state.careerListID[event.target.parentNode.rowIndex - 1]);
            this.props.history.push("/CareerDelete");
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/CareerConfiguration`);
    }


    render() {

        const careerListVisual = this.state.careerList.map((careerList, i) => {
            this.state.careerListID.push(careerList.careerID);
            if (sessionStorage.getItem('userTypeID') === '5') {
                return (
                    <tr key={i}>
                        <td>{careerList.name}</td>
                    </tr>
                )
            } else {
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td>{careerList.name}</td>
                    </tr>
                )
            }
        })

        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/CareerConfiguration'>Configuración de Carrera</Breadcrumb.Item>
                        <Breadcrumb.Item>Carreras disponibles para eliminar</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <div className="row p-3">
                                <h1 className="text-left colorBlue">Carreras sin estudiantes</h1>
                            </div>
                            <div className="col-10 offset-1 mt-4" >
                                <table className="table table-sm table-hover" id="myTable">
                                    <thead>
                                        <tr class="header">
                                            <th scope="col">Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {careerListVisual}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className=" mt-3 col-md-3">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default CareersToDeleteList;