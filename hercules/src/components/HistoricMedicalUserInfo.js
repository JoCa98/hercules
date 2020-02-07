/**
 * @fileoverview HistoricMedicalUserInfo page is used to show the historic of registers
 * of medical information about a user.
 *
 * @version 1.0
 *
 * @author    Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of HistoricMedicalUserInfo was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import TableMedicalInfo from './TableMedicalInfo';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";


class HistoricMedicalUserInfo extends Component {
    constructor() {
        super();

        this.state = {
            permissionsManager: new PermissionsManager()
        };

        this.backButton = this.backButton.bind(this);
    }

    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
    }

    /**
* Method that redirect to the previous page
*/
    backButton() {
        this.props.history.push(`/UserHome`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/UserHome">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Consulta médica</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Consulta médica</h1>
                    </div>
                    <div className="col-12 mt-4 text-center">
                        <TableMedicalInfo />
                    </div>
                    <div className="col-12 mt-4">
                        <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricMedicalUserInfo;