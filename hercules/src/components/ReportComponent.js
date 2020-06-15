
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import axios from "axios";
import downloadImage from '../appImage/downloadImage.png';



class ReportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportNumber: sessionStorage.getItem("report"),
            list: [{}],
            optionList: [{}],
            status: 1,
            name: "",
            breadcrumb:""
        }
        this.typeOfReport = this.typeOfReport.bind(this);
        this.statusReport = this.statusReport.bind(this);
        this.statusDropDown = this.statusDropDown.bind(this);
        this.optionSelect = this.optionSelect.bind(this);
    }

    componentDidMount() {
        document.getElementById("total").style.display = "none";
        this.typeOfReport();
    }

    typeOfReport() {
        if (this.state.reportNumber == 1) {
            this.setState({ name: "Reporte por estado de usuarios", breadcrumb:"Reporte por estado" });
            this.statusDropDown();
        }

    }

    statusDropDown() {
        this.setState({
            optionList: [{ description: "Activo", value: 1 }, { description: "Inactivo", value: 0 }]
        });
    }

    optionSelect(event) {
        if (this.state.reportNumber == 1) {
            this.setState({ status: event.target.value });
            
        }
    }

    statusReport() {
        try {
            axios.get(`http://localhost:9000/ReportsRoute/userStatusReport`,
                {
                    params: { selectedStatus: this.state.status}
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                    document.getElementById("total").style.display = "block";
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
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



    render() {

        const statusList = this.state.optionList.map((option, i) => {
            return (
                <option value={option.value} key={i}>{option.description} </option>
            )
        })
        const total = this.state.list[0].Total;

        const report = this.state.list.map((result, i) => {
            return (
                <tr key={i}>
                    <td>{result.identificationID}</td>
                    <td>{result.carnet}</td>
                    <td>{result.fullName}</td>
                    <td>{result.email}</td>
                </tr>
            )
        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Reports">Reportes</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Report">{this.state.breadcrumb}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5">
                    <div className="col-12 ">
                        <div className="row">
                            <h1 className="text-left colorBlue mb-4">{this.state.name}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mt-2">
                            <select name="optionDropDown" align="left" className="form-control" onChange={this.optionSelect}>
                                {statusList}
                            </select>
                        </div>
                        <div className="col-4 mt-2">
                            <button className="buttonSizeGeneral" onClick={this.statusReport}>Buscar</button>
                        </div>
                        <div className="col-2 text-center">
                                <img src={downloadImage} onClick={this.downloadCSV} className="imageHistoricPage pointer" />
                                <h4 className="colorBlue pointer" onClick={this.downloadCSV}>Descargar</h4>
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table table-sm table-hover" id="allReports">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="align-middle">Identificación</th>
                                            <th scope="col" className="align-middle">Carnet</th>
                                            <th scope="col" className="align-middle">Nombre</th>
                                            <th scope="col" className="align-middle">Correo electrónico</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className ="row">
                    <div className="col-12 mt-2">
                             <label type="text" disabled="disabled" id="total" display="none">Cantidad total: {total}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ReportComponent;