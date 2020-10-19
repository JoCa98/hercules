
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import axios from "axios";
import downloadImage from '../appImage/downloadImage.png';
import ModalComponent from './ModalComponent';
import {baseUrl} from "./baseUrl";


class ReportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissionsManager: new PermissionsManager(),
            reportNumber: sessionStorage.getItem("report"),
            list: [{}],
            optionList: [{}],
            variable: 1,
            name: "",
            breadcrumb: "",
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        }
        this.typeOfReport = this.typeOfReport.bind(this);
        this.report = this.report.bind(this);
        this.rutineDropDown = this.rutineDropDown.bind(this);
        this.typeDropDown = this.typeDropDown.bind(this);
        this.conditonDropDown = this.conditionDropDown.bind(this);
        this.dateDropDown = this.dateDropDown.bind(this);
        this.careerDropDown = this.careerDropDown.bind(this);
        this.genderDropDown = this.genderDropDown.bind(this);
        this.statusDropDown = this.statusDropDown.bind(this);
        this.optionSelect = this.optionSelect.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
        this.backButton = this.backButton.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            document.getElementById("total").style.display = "none";
            this.typeOfReport();
        }
    }

    /**
     * This method charge the state variables name and breadcrumb depending to the session variable that contains the type of the report
     */
    typeOfReport() {
        if (this.state.reportNumber == 1) {
            this.setState({ name: "Reporte por estado de usuarios", breadcrumb: "Reporte por estado" });
            this.statusDropDown();
        } else if (this.state.reportNumber == 2) {
            this.setState({ name: "Reporte por género de usuarios", breadcrumb: "Reporte por género" });
            this.genderDropDown();
        } else if (this.state.reportNumber == 3) {
            this.setState({ name: "Reporte por carrera de los usuarios", breadcrumb: "Reporte por carrera" });
            this.careerDropDown();
        } else if (this.state.reportNumber == 4) {
            this.setState({ name: "Reporte por año de ingreso de los usuarios", breadcrumb: "Reporte por año de ingreso" });
            this.dateDropDown();
        } else if (this.state.reportNumber == 5) {
            this.setState({ name: "Reporte por condición de riesgo de los usuarios", breadcrumb: "Reporte por condición de riesgo" });
            this.conditionDropDown();
        } else if (this.state.reportNumber == 6) {
            this.setState({ name: "Reporte por tipo de los usuarios", breadcrumb: "Reporte por tipo de usuario" });
            this.typeDropDown();
        } else if (this.state.reportNumber == 7) {
            this.setState({ name: "Reporte por tipo de rutina", breadcrumb: "Reporte por tipo de rutina" });
            this.rutineDropDown();
        }
    }

    /**
     * This method charge the rutine DropDown, when the report selected is by routine type
     */
    rutineDropDown() {
        axios.get(baseUrl + "RoutineRoute/getRoutineType").then(response => {
            var routine = response.data;
            this.setState({ variable: routine[0].routineTypeID });
            this.setState({ optionList: routine });
        });
    }

    /**
     * This method charge the user type DropDown, when the report selected is by user type
     */
    typeDropDown() {
        this.setState({
            optionList: [{ description: "Estudiante", value: 1 }, { description: "Funcionario", value: 2 }]
        });
    }

    /**
     * This method charge the risk condition DropDown, when the report selected is by risk condition
     */
    conditionDropDown() {
        axios.get(baseUrl + `MedicalInfo/getRiskCondition`).then(response => {
            var risk = response.data[0];
            this.setState({ variable: risk[0].riskConditionID });
            this.setState({ optionList: risk });
        });
    }

    /**
     * This method charge the date DropDown, when the report selected is by start date
     */
    dateDropDown() {
        axios.get(baseUrl + `ReportsRoute/signUpDates`).then(response => {
            var dates = response.data[0];
            if(dates.length != 0){
            this.setState({ variable: dates[0].value });
            this.setState({ optionList: dates });
            } else {
            this.setState({ optionList: "" }); 
            }
        });
    }

    /**
     * This method charge the career DropDown, when the report selected is by career
     */
    careerDropDown() {
        axios.get(baseUrl + `User/getCareer`).then(response => {
            var career = response.data[0];
            this.setState({ variable: career[0].careerID });
            this.setState({ optionList: career });
        });
    }

    /**
     * This method charge the gender DropDown, when the report selected is by gender
     */
    genderDropDown() {
        this.setState({
            optionList: [{ description: "Femenino", value: 1 }, { description: "Masculino", value: 2 }]
        });
    }

    /**
     * This method charge the status DropDown, when the report selected is by status
     */
    statusDropDown() {
        this.setState({
            optionList: [{ description: "Activo", value: 1 }, { description: "Inactivo", value: 0 }]
        });
    }

    /**
     * This method save the selected option of the dropdown in the state variable, variable
     */
    optionSelect(event) {
        if(event.target.value != ""){
        this.setState({ variable: event.target.value });
        }else{
            this.modalTrigger(event, 'Reportes', 'No existen usuarios registrados');
        }
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
        if (this.state.isExit) {
            this.props.history.push(`/HomeAdmin`);
        }
        event.preventDefault();
    };

    /**
     * This method call the API depeding to the selected report and save the results in the state variable list
     */
    report() {
        try {
            if (this.state.reportNumber == 1) {
                axios.get(baseUrl + `ReportsRoute/userStatusReport`,
                    {
                        params: { selectedStatus: this.state.variable }
                    }).then(response => {
                        const list = response.data[0];
                        this.setState({ list });
                        document.getElementById("total").style.display = "block";
                    });
            } else if (this.state.reportNumber == 2) {
                //género de los usuarios
                axios.get(baseUrl + `ReportsRoute/userGenderReport`,
                    {
                        params: { selectedGender: this.state.variable }
                    }).then(response => {
                        const list = response.data[0];
                        this.setState({ list });
                        document.getElementById("total").style.display = "block";
                    });
            } else if (this.state.reportNumber == 3) {
                //carrera
                axios.get(baseUrl + `ReportsRoute/userCareerReport`,
                    {
                        params: { selectedCareer: this.state.variable }
                    }).then(response => {
                        const list = response.data[0];
                        this.setState({ list });
                        document.getElementById("total").style.display = "block";
                    });
            } else if (this.state.reportNumber == 4) {
                //año de ingreso
                axios.get(baseUrl + `ReportsRoute/userYearReport`,
                    {
                        params: { selectedYear: this.state.variable }
                    }).then(response => {
                        const list = response.data[0];
                        this.setState({ list });
                        document.getElementById("total").style.display = "block";
                    });
            } else if (this.state.reportNumber == 5) {
                //condición de riesgo
                axios.get(baseUrl + `ReportsRoute/userRiskReport`,
                    {
                        params: { selectedRisk: this.state.variable }
                    }).then(response => {
                        const list = response.data[0];
                        this.setState({ list });
                        document.getElementById("total").style.display = "block";
                    });
            } else if (this.state.reportNumber == 6) {
                //tipo de usuarios
                axios.get(baseUrl + `ReportsRoute/userTypeReport`,
                    {
                        params: { selectedType: this.state.variable }
                    }).then(response => {
                        const list = response.data[0];
                        this.setState({ list });
                        document.getElementById("total").style.display = "block";
                    });
            } else if (this.state.reportNumber == 7) {
                //tipo de rutina
                axios.get(baseUrl + `ReportsRoute/userRoutineTypeReport`,
                    {
                        params: { selectedRoutine: this.state.variable }
                    }).then(response => {
                        const list = response.data[0];
                        this.setState({ list });
                        document.getElementById("total").style.display = "block";
                    });
            }
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
   * Get the information from the database 
   * and format it to csv to download  
   */
    downloadCSV() {
        const { parse } = require('json2csv');
        var fields = [];

        if (this.state.reportNumber == 5) {
            fields = ['Carnet', 'Nombre', 'Email', 'Identificacion', 'FechaIngreso', 'Estado', 'Genero', 'Carrera', 'RiesgoCardiovascular'];
        } else if (this.state.reportNumber == 6) {
            fields = ['Carnet', 'Nombre', 'Email', 'Identificacion', 'FechaIngreso', 'Estado', 'Genero', 'Carrera', 'TipoUsuario'];
        } else if (this.state.reportNumber == 7) {
            fields = ['Carnet', 'Nombre', 'Email', 'Identificacion', 'FechaIngreso', 'Estado', 'Genero', 'Carrera', 'TipoRutina'];
        } else {
            fields = ['Carnet', 'Nombre', 'Email', 'Identificacion', 'FechaIngreso', 'Estado', 'Genero', 'Carrera'];

        }

        const opts = { fields };

        const csv = parse(this.state.list[0], { opts, encoding: "ISO-8859-1", excelStrings: true, withBOM: true });
        console.log(csv)
        var fileDownload = require('js-file-download');
        fileDownload(csv, this.state.name + '.csv');
    }

    backButton() {
        this.props.history.push(`/Reports`);
    }


    render() {
        const dropDownList = this.state.optionList.map((option, i) => {
            if (this.state.reportNumber == 3) {
                return (
                    <option value={option.careerID} key={i}>{option.name}</option>
                )
            }
            if (this.state.reportNumber == 4) {
                return (
                    <option value={option.value} key={i}>{option.value}</option>
                )
            }
            if (this.state.reportNumber == 5) {
                return (
                    <option value={option.riskConditionID} key={i}>{option.description}</option>
                )
            }

            if (this.state.reportNumber == 7) {
                return (
                    <option value={option.routineTypeID} key={i}>{option.description}</option>
                )
            }
            return (
                <option value={option.value} key={i}>{option.description} </option>
            )

        })

        const total = this.state.list[0].Total;

        const report = this.state.list.map((result, i) => {
            return (
                <tr key={i}>
                    <td>{result.Identificacion}</td>
                    <td>{result.Carnet}</td>
                    <td>{result.Nombre}</td>
                    <td>{result.Email}</td>
                    <td>{result.FechaIngreso}</td>
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
                            <select name="optionDropDown" id="DD" align="left" className="form-control" onChange={this.optionSelect}>
                                {dropDownList}
                            </select>
                        </div>
                        <div className="col-4 mt-2">
                            <button className="buttonSizeGeneral" onClick={this.report}>Buscar</button>
                        </div>
                        <div className="col-2 text-center">
                            <img src={downloadImage} onClick={this.downloadCSV} className="imageHistoricPage pointer" />
                            <h4 className="colorBlue pointer" onClick={this.downloadCSV}>Descargar</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive" style={{ overflow: 'auto', height: '300px' }}>
                                <table className="table table-sm table-hover" id="allReports">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="align-middle">Identificación</th>
                                            <th scope="col" className="align-middle">Carnet</th>
                                            <th scope="col" className="align-middle">Nombre</th>
                                            <th scope="col" className="align-middle">Correo electrónico</th>
                                            <th scope="col" className="align-middle">Fecha de ingreso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-2">
                            <label type="text" disabled="disabled" id="total" display="none">Cantidad total: {total}</label>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default ReportComponent;