/**
 * @fileoverview HistoricMedicalInfo page, this page call the component of the table
 * and get the medical information of one specific user 
 *
 * @version 1.0
 *
 * @author    Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of HistoricMedicalInfo was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';
import TableMedicalInfo from './TableMedicalInfo';
import axios from 'axios';

class HistoricMedicalInfo extends Component {
    constructor() {
        super();
        /**
      * userName
      * @type {String}
      * Property that contains the name of the user
      * partyID
      * @type {Integer}
      * Property that contains the id of the user
      */
        this.state = {
            userName: [{}],
            partyID: 1
        }
        this.redirect = this.redirect.bind(this);
    }

    /**
    * Method that can redirect to the page of AddMedicalForm
    * when the user click the addButton
    */
    redirect() {
        sessionStorage.setItem("update", false);
        this.props.history.push(`/AddMedicalForm`);
    }

    /**
  * Method that can get full name of the user
  * when the page is load
  */
    componentDidMount() {
        try {
            axios.get(`http://localhost:9000/User/getUserName`,
                {
                    params: { partyID: this.state.partyID }
                }).then(response => {
                    const userName = response.data[0];
                    this.setState({ userName });
                });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-label">Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Consulta médica</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-ceter">
                                {name}
                            </div>
                            <div className="col-4 offset-1 text-center">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                            <div className="col-12 mt-4 text-center">
                                <TableMedicalInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default HistoricMedicalInfo;