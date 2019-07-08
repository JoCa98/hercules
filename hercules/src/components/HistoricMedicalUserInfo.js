/**
 * @fileoverview HomeAdmin page, Home of the administrator user that shows the list 
 *of all users (students and officials), with different search options by carnet, name and ID.
 *
 * @version 1.0
 *
 * @author    Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of HomeAdmin was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import TableMedicalInfo from './TableMedicalInfo';

class HistoricMedicalUserInfo extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Consulta médica</h1>
                    </div>
                    <div className="col-12">
                        <TableMedicalInfo />
                    </div>

                </div>
            </div>
        )
    }
}

export default HistoricMedicalUserInfo;