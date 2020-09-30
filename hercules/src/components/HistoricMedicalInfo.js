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
import downloadImage from '../appImage/downloadImage.png';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';
import {baseUrl} from "./baseUrl";

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
            permissionsManager: new PermissionsManager(),
            userName: [{}],
            partyID: sessionStorage.getItem("userPartyID"),
            show: false,
            modalTittle: "",
            modalChildren: ""
        }
        this.redirect = this.redirect.bind(this);
        this.backButton = this.backButton.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
    * This method takes care of show a modal with useful information
    */
    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };

    /**
    * This method close the modal  
    */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        event.preventDefault();
    };

    /**
    * Method that can redirect to the page of AddMedicalForm
    * when the user click the addButton
    */
    redirect(event) {
        if (sessionStorage.getItem('dateLastMedicRegistry') !== 'undefined' &&
            sessionStorage.getItem('dateLastMedicRegistry') !== null &&
            new Date(sessionStorage.getItem('dateLastMedicRegistry')).toString()
            === new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toString()) {
            this.modalTrigger(event, 'Restricciones', 'Solo se puede agregar un registro por día');
        } else {
            sessionStorage.setItem("update", false);
            this.props.history.push(`/MedicalForm`);

        }
    }

    /**
    * Get the information from the database 
    * and format it to csv to download  
    */
    downloadCSV() {
        try {
            axios.get(baseUrl + `MedicalInfo/getMedicalInfoByIDSpanish`,
                { params: { partyID: this.state.partyID } }).then(response => {

                    const { parse } = require('json2csv');

                    const fields = ["Fecha", "CodigoMedico", "Patologicos", "Alergias",
                        "Quirurgicos", "Traumaticos", "PresionArterial", "SpO2",
                        "Neurologico", "Cardiopulmonar", "UmbralAerobico",
                        "FrecuenciaCardiaca", "Peso", "Talla", "IMC",
                        "Cintura", "Cadera", "Recomendaciones",
                        "RiesgoCardiovascular", "ValidoHasta"];
                    const opts = { fields };

                    const csv = parse(response.data[0], {opts, encoding: "ISO-8859-1",excelStrings: true, withBOM: true});
                    var fileDownload = require('js-file-download');
                    fileDownload(csv, this.state.userName[0].fullName + ' - Composición médica.csv');
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that can get full name of the user
    * when the page is load
    */
    componentDidMount() {

        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            try {
                axios.get(baseUrl + `http://localhost:9000/User/getUserName`,
                    {
                        params: { partyID: this.state.partyID }
                    }).then(response => {
                        const userName = response.data[0];
                        this.setState({ userName });
                    });

                if (sessionStorage.getItem("userTypeID") == 3) {
                    document.getElementById("addImage").style.display = "initial";
                    document.getElementById("addText").style.display = "initial";
                } else {
                    document.getElementById("addImage").style.display = "none";
                    document.getElementById("addText").style.display = "none";

                }
            } catch (err) {
                console.error("Un error inesperado ha ocurrido");
            }
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
                <label fontSize="18px" className="form-label" key={i}>Usuario: {userName.fullName}</label>
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
                            <div className="col-2 offset-1 text-center">
                                <img src={plusImage} id="addImage" alt="Agregar nuevo" onClick={this.redirect} className="buttonSizeGeneral pointer" />
                                <h4 className="colorBlue pointer" id="addText" onClick={this.redirect} >Agregar nuevo</h4>
                            </div>
                            <div className="col-2 text-center">
                                <img src={downloadImage} alt="Descargar" onClick={this.downloadCSV} className="imageHistoricPage pointer" />
                                <h4 className="colorBlue pointer" onClick={this.downloadCSV}>Descargar</h4>
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
                        <div className="row">
                            <div className="col-md-1">
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                                    <br />{this.state.modalChildren}
                                </ModalComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricMedicalInfo;