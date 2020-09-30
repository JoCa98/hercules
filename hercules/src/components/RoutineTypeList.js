import React, { Component } from 'react';
import PermissionsManager from "./PermissionsManager";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import plusImage from '../appImage/plusImage.svg';
import {baseUrl} from "./baseUrl";


class RoutineTypeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissionsManager: new PermissionsManager(),
            routineList: []
        }

        this.backButton = this.backButton.bind(this);
        this.redirect = this.redirect.bind(this);
        this.getRoutineTypes = this.getRoutineTypes.bind(this);
    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getRoutineTypes();
        }
    }

    /**
     * Gets the routine types from the database.
     */
    getRoutineTypes() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/GetRoutineTypes`).then(response => {
                const routineList = response.data[0];
                this.setState({ routineList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    redirect(event) {
        this.props.history.push(`/AddRoutineType`);
    }

    /**
* Method that redirect to the previous page.
*/
    backButton() {
        this.props.history.push(`/ConfigurationRoutine`);
    }

    render(){
          /**
        *The routineList.map is used to create the rows of the table and to structure the html,
        *this is stored in a constant that is used in the code of the page
        */
       const routineListVisual = this.state.routineList.map((routineList, i) => {
        return (
            <tr key={i}>
                <td>{routineList.description}</td>
            </tr>
        )
    })

        return(
                <div className="container">
                    <div className="row mt-4">
                        <Breadcrumb>
                            <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                            <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                            <Breadcrumb.Item href='#/ConfigurationRoutine'>Configuración de rutina</Breadcrumb.Item>
                            <Breadcrumb.Item>Tipos de rutina</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row card mt-2 p-5">
                        <div className="col-12">
                            <div className="row p-3">
                                <div className="col-6">
                                    <h1 className="text-left colorBlue">Lista tipos de rutina</h1>
                                </div>
                                <div className="col-6 text-center">
                                    <img src={plusImage} onClick={this.redirect} className="imageHistoricPage pointer" />
                                    <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar tipo rutina</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10 offset-1 mt-4" >
                            <div style={{ overflow: 'auto', height: '300px' }}>
                                <table className="table table-sm table-hover" id="myTable">
                                    <thead>
                                        <tr class="header">
                                            <th scope="col">Tipos de rutina</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {routineListVisual}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" mt-3 col-md-3">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default RoutineTypeList;