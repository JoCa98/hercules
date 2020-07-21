import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";

class RiskConditionsToDeleteList extends Component {
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
            riskConditionList: [],
            riskConditionListID: []
        };

        this.getRiskConditionsToDeleteList = this.getRiskConditionsToDeleteList.bind(this);
        this.backButton = this.backButton.bind(this);
        this.rowEvent = this.rowEvent.bind(this);

    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getRiskConditionsToDeleteList();
        }
    }

    getRiskConditionsToDeleteList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/GetRiskConditionsWithoutStudents`).then(response => {
                const riskConditionList = response.data[0];
                this.setState({ riskConditionList });
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
            sessionStorage.setItem("riskConditionID", this.state.riskConditionListID[event.target.parentNode.rowIndex - 1]);
            this.props.history.push("/RiskConditionDelete");
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/Configuration`);
    }


    render() {

        const riskConditionListVisual = this.state.riskConditionList.map((riskConditionList, i) => {
            this.state.riskConditionListID.push(riskConditionList.riskConditionID);
            if (sessionStorage.getItem('userTypeID') === '5') {
                return (
                    <tr key={i}>
                        <td>{riskConditionList.riskConditionID}</td>
                        <td>{riskConditionList.description}</td>
                    </tr>
                )
            } else {
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td>{riskConditionList.riskConditionID}</td>
                        <td>{riskConditionList.description}</td>
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
                        <Breadcrumb.Item>Condiciones de riesgo disponibles para eliminar</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <div className="row p-3">
                                <h1 className="text-left colorBlue">Condiciones de riesgo sin estudiantes</h1>
                                <h2>Presione cualquier opcion para eliminarla</h2>
                            </div>
                            <div className="col-10 offset-1 mt-4" >
                                <table className="table table-sm table-hover" id="myTable">
                                    <thead>
                                        <tr class="header">
                                            <th scope="col">Id</th>
                                            <th scope="col">Descripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riskConditionListVisual}
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
export default RiskConditionsToDeleteList;