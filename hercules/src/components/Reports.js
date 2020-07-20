import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import axios from 'axios';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.rowEvent = this.rowEvent.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
    }

    rowEvent(event) {
        const id = event.target.parentNode.rowIndex;
        sessionStorage.setItem("report", id);
        this.props.history.push(`/Report`);
    }

    downloadCSV() {
        try {
            axios.get(`http://localhost:9000/ReportsRoute/usersGeneralReport`,).then(response => {
                const { parse } = require('json2csv');
                const fields = ['Identificacion', 'Carnet', 'Nombre', 'Email', 'FechaIngreso', 'Estado', 'Genero', 'Carrera', 'TipoUsuario'];

                const opts = { fields };

                const csv = parse(response.data[0], opts);
                var fileDownload = require('js-file-download');
                fileDownload(csv, 'Reporte general de usuarios.csv');
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
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
                                <tr className="pointer" onClick={this.downloadCSV} key="8">
                                    <td>Reporte general de usuarios</td>
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