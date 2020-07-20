
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
            variable: 1,
            name: "",
            breadcrumb:""
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
    }

    componentDidMount() {
        document.getElementById("total").style.display = "none";
        this.typeOfReport();
       
    }

    typeOfReport() {
        if (this.state.reportNumber == 1) {
            this.setState({ name: "Reporte por estado de usuarios", breadcrumb:"Reporte por estado" });
            this.statusDropDown();
        }else if (this.state.reportNumber == 2){
            this.setState({ name: "Reporte por género de usuarios", breadcrumb:"Reporte por género" });
            this.genderDropDown();
        }else if (this.state.reportNumber == 3){
            this.setState({ name: "Reporte por carrera de los usuarios", breadcrumb:"Reporte por carrera" });
            this.careerDropDown();
        }else if (this.state.reportNumber == 4){
            this.setState({ name: "Reporte por año de ingreso de los usuarios", breadcrumb:"Reporte por año de ingreso" });
            this.dateDropDown();
        }else if (this.state.reportNumber == 5){
            this.setState({ name: "Reporte por condición de riesgo de los usuarios", breadcrumb:"Reporte por condición de riesgo" });
            this.conditionDropDown();
        }else if (this.state.reportNumber == 6){
            this.setState({ name: "Reporte por tipo de los usuarios", breadcrumb:"Reporte por tipo de usuario" });
            this.typeDropDown();
        }else if (this.state.reportNumber == 7){
            this.setState({ name: "Reporte por tipo de rutina", breadcrumb:"Reporte por tipo de rutina" });
            this.rutineDropDown();
        }
    }

    rutineDropDown(){
        axios.get("http://localhost:9000/RoutineRoute/getRoutineType").then(response => {
            var routine = response.data;
            if(routine.lenght = 1){
                this.setState({variable: routine[0].value});
            }
              this.setState({optionList: routine});
            });
                
    }

    typeDropDown(){
        this.setState({
            optionList: [{ description: "Estudiante", value: 1 }, { description: "Funcionario", value: 2 }]
        });
    }

    conditionDropDown(){
        axios.get(`http://localhost:9000/MedicalInfo/getRiskCondition`).then(response => {
            var risk = response.data[0];  
            if(risk.lenght = 1){
                this.setState({variable: risk[0].value});
            }
              this.setState({optionList: risk});
            });
    }

    dateDropDown(){
        axios.get(`http://localhost:9000/ReportsRoute/signUpDates`).then(response => {
            var dates = response.data[0];  
            if(dates.lenght = 1){
                this.setState({variable: dates[0].value});
            }
              this.setState({optionList: dates});
            });
    }

    careerDropDown(){
        axios.get(`http://localhost:9000/User/getCareer`).then(response => {
            var career = response.data[0];
            if(career.lenght = 1){
                this.setState({variable: career[0].careerID});
            }
              this.setState({optionList: career});

        });
    }

    genderDropDown(){
        this.setState({
            optionList: [{ description: "Femenino", value: 1 }, { description: "Masculino", value: 2 }]
        });
    }

    statusDropDown() {
        this.setState({
            optionList: [{ description: "Activo", value: 1 }, { description: "Inactivo", value: 0 }]
        });
    }

    optionSelect(event) {
        this.setState({ variable: event.target.value });   
    }

    report() {
        try {
            if(this.state.reportNumber == 1){
            axios.get(`http://localhost:9000/ReportsRoute/userStatusReport`,
                {
                    params: { selectedStatus: this.state.variable}
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                    document.getElementById("total").style.display = "block";
                });
            }else if(this.state.reportNumber == 2){
                //género de los usuarios
                axios.get(`http://localhost:9000/ReportsRoute/userGenderReport`,
                {
                    params: { selectedGender: this.state.variable}
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                    document.getElementById("total").style.display = "block";
                });
            }else if(this.state.reportNumber == 3){
                //carrera
                axios.get(`http://localhost:9000/ReportsRoute/userCareerReport`,
                {
                    params: { selectedCareer: this.state.variable}
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                    document.getElementById("total").style.display = "block";
                });
            }else if(this.state.reportNumber == 4){
                //año de ingreso
                axios.get(`http://localhost:9000/ReportsRoute/userYearReport`,
                {
                    params: { selectedYear: this.state.variable }
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                    document.getElementById("total").style.display = "block";
                });
            }else if(this.state.reportNumber == 5){
                //condición de riesgo
                axios.get(`http://localhost:9000/ReportsRoute/userRiskReport`,
                {
                    params: { selectedRisk: this.state.variable }
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                    document.getElementById("total").style.display = "block";
                });
            }else if(this.state.reportNumber == 6){
                //tipo de usuarios
                axios.get(`http://localhost:9000/ReportsRoute/userTypeReport`,
                {
                    params: { selectedType : this.state.variable }
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                    document.getElementById("total").style.display = "block";
                });
            }else if(this.state.reportNumber == 7){
                //tipo de rutina
                axios.get(`http://localhost:9000/ReportsRoute/userRoutineTypeReport`,
                {
                    params: { selectedRoutine: this.state.variable}
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
        var fields=[];

        if(this.state.reportNumber == 5){
            fields =  ['Carnet', 'Nombre', 'Email','Identificacion','FechaIngreso','Estado','Genero','Carrera','RiesgoCardiovascular'];
        }else if(this.state.reportNumber == 6){
            fields =  ['Carnet', 'Nombre', 'Email','Identificacion','FechaIngreso','Estado','Genero','Carrera','TipoUsuario'];
        }else if(this.state.reportNumber == 7){
            fields =  ['Carnet', 'Nombre', 'Email','Identificacion','FechaIngreso','Estado','Genero','Carrera','TipoRutina'];
        }else{
            fields =  ['Carnet', 'Nombre', 'Email','Identificacion','FechaIngreso','Estado','Genero','Carrera'];
            
        }

        const opts = { fields };

        const csv = parse(this.state.list[0], opts);
        var fileDownload = require('js-file-download');
        fileDownload(csv,this.state.name + '.csv');
}



    render() {

        const dropDownList = this.state.optionList.map((option, i) => {
            if(this.state.reportNumber == 3){
                return (
                    <option value={option.careerID} key={i}>{option.name}</option>
                )
            }
            if(this.state.reportNumber == 4){
                return (
                    <option value={option.value} key={i}>{option.value}</option>
                )
            }
            if(this.state.reportNumber == 5){
                return (
                    <option value={option.riskConditionID} key={i}>{option.description}</option>
                )
            }
            
            if(this.state.reportNumber == 7){
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
                            <div className="table-responsive">
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