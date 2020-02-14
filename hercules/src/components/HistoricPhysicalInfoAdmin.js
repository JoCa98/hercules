import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';
import downloadImage from '../appImage/downloadImage.png';
import TablePhysicalInfo from './TablePhysicalInfo';
import axios from "axios";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import json2csv from 'json2csv';
import PermissionsManager from "./PermissionsManager";



class HistoricPhysicalInfoAdmin extends Component {

    constructor(props) {
        super(props);
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
            physicalInfo: [{}]
        }

        this.redirect = this.redirect.bind(this);
        this.backButton = this.backButton.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
    }

    componentDidMount() {

        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);

        try {
            axios.get(`http://localhost:9000/User/getUserName`,
                {
                    params: { partyID: this.state.partyID }
                }).then(response => {
                    const userName = response.data[0];
                    this.setState({ userName });
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    redirect() {
        if (sessionStorage.getItem('dateLastPhysicalRegistry') !== 'undefined' &&
            sessionStorage.getItem('dateLastPhysicalRegistry') !== null &&
            new Date(sessionStorage.getItem('dateLastPhysicalRegistry')) === Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate())) {

            alert("Solo se puede agregar un registro por día.");

        } else {
            this.props.history.push(`/AddPhysicalInfo`);

        }
    }

    /**
    * Get the information from the database 
    * and format it to csv to download  
    */
    downloadCSV() {
        try {
            axios.get(`http://localhost:9000/PhysicalInfo/getPhysicalInfoByIDSpanish`,
                { params: { partyID: this.state.partyID } }).then(response => {

                    const { parse } = require('json2csv');

                    const fields = ['Fecha', 'Peso', 'PorcentajeDeGrasaCorporal', 'PorcentajeDeAguaCorporal',
                        'MasaMuscular', 'ValoracionFisica', 'MasaOsea', 'DCI', 'EdadMetabolica', 'GrasaVisceral'];
                    const opts = { fields };

                    const csv = parse(response.data[0], opts);
                    var fileDownload = require('js-file-download');
                    fileDownload(csv, this.state.userName[0].fullName + ' - Composición física.csv');
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
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
                <label className="form-label" key={i} >Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item>Composición Corporal</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Composición Corporal</h1>
                        <div className="row p-3">
                            <div className="col-4 offset-1 text-center">
                                {name}
                            </div>
                            <div className="col-2 offset-1 text-center">
                                <img src={plusImage} onClick={this.redirect} className="imageHistoricPage pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                            <div className="col-2 text-center">
                                <img src={downloadImage} onClick={this.downloadCSV} className="imageHistoricPage pointer" />
                                <h4 className="colorBlue pointer" onClick={this.downloadCSV}>Descargar</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4 text-center">
                        <TablePhysicalInfo />
                    </div>
                    <div className="row">
                        <div className=" mt-4 col-md-8">
                            <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricPhysicalInfoAdmin;