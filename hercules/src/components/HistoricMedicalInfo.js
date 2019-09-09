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
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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
            partyID: sessionStorage.getItem("userPartyID")
        }
        this.redirect = this.redirect.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    /**
    * Method that can redirect to the page of AddMedicalForm
    * when the user click the addButton
    */
    redirect() {
        if (sessionStorage.getItem('dateLastRegistry') !== 'undefined' &&
            sessionStorage.getItem('dateLastRegistry') !== null &&
            new Date(sessionStorage.getItem('dateLastRegistry')) === Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate())) {
            alert("Solo se puede agregar un registro por día.");

        } else {
            sessionStorage.setItem("update", false);
            this.props.history.push(`/AddMedicalForm`);

        }
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

            if (sessionStorage.getItem("userTypeID") !== 3) {
                document.getElementById("addImage").style.display = "none";
                document.getElementById("addText").style.display = "none";
            } else {
                document.getElementById("addImage").style.display = "show";
                document.getElementById("addText").style.display = "show";
            }
        } catch (err) {
            console.error(err);
        }
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/ConsultUser`);
    }

    render() {
        const name = this.state.userName.map((userName, i) => {
            return (
                <label font-size="18px" className="form-label" key={i}>Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                 <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item>Consulta médica</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Consulta médica</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-center">
                                {name}
                            </div>
                            <div className="col-4 offset-1 text-center">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral pointer" display="none"/>
                                <h4 className="colorBlue pointer" onClick={this.redirect} display="none">Agregar nuevo</h4>
                            </div>
                            <div className="col-12 mt-4 text-center">
                                <TableMedicalInfo />
                            </div>
                        </div>
                        <div className="row">
                            <div className=" mt-3 col-md-8">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricMedicalInfo;