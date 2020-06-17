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
                                    <th scope="col" className="align-middle">Reporte</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="pointer"  onClick={this.rowEvent} key="1">
                                    <td >Estado de los usuarios</td>
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