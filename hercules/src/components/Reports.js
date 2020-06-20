import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";

class Reports extends Component {
    constructor(props) {
        super(props);
        this.rowEvent = this.rowEvent.bind(this);
    }

    rowEvent(event) {
        const id = event.target.parentNode.rowIndex;
        sessionStorage.setItem("report", id);
        this.props.history.push(`/Report`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Reports">Reportes</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2  card p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue mb-4">Reportes</h1>
                    </div>
                    <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-sm table-hover" id="reports">
                            <thead>
                                <tr>
                                    <th scope="col" className="align-middle">Reporte por:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="pointer"  onClick={this.rowEvent} key="1">
                                    <td >Estado de los usuarios</td>
                                </tr>
                                <tr className="pointer"  onClick={this.rowEvent} key="2">
                                    <td >Género de los usuarios</td>
                                </tr>
                                <tr className="pointer"  onClick={this.rowEvent} key="3">
                                    <td >Carrera de los usuarios</td>
                                </tr>
                                <tr className="pointer"  onClick={this.rowEvent} key="4">
                                    <td >Año de ingreso al sistema de los usuarios</td>
                                </tr>
                                <tr className="pointer"  onClick={this.rowEvent} key="5">
                                    <td >Condición de riesgo de los usuarios</td>
                                </tr>
                                <tr className="pointer"  onClick={this.rowEvent} key="6">
                                    <td >Tipo de los usuarios</td>
                                </tr>
                                <tr className="pointer"  onClick={this.rowEvent} key="7">
                                    <td >Tipo de rutina de los usuarios</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default Reports;