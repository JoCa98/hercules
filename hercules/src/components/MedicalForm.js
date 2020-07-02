/**
 * @fileoverview  AddMedicalForm page, Medical Form that allows to the doctor 
 * input a new medical form for a user 
 * 
 * @version 2.0
 *
 * @author    María Ester Molina Richmond <maria.molina@ucrso.info>
 * History
 * v2.0 – Initial Release
 * ----
 * The first version of AddMedicalForm was written by Ester Molina.
 */

import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';


/*global IMC*/

class MedicalForm extends Component {
    constructor(props) {
        super(props);
        /**
        *  permissionsManager:
        * @type {PermissionsManager}
        * 
        * partyID:
        * @type {integer}
        * 
        * date:
        * @type {Date}
        * 
        * pathologies:
        * @type {String}
        *
        * allergies:
        * @type {String}
        * 
        * traumas:
        * @type {integer}
        * 
        * smoking:
        * @type {integer}
        * 
        * neurologicalInfo:
        * @type {String}
        * 
        * pulmonaryCardioInfo:
        * @type {String}
        * 
        * bloodPressure:
        * @type {integer}
        * 
        * heartRate:
        * @type {integer}
        * 
        * aerobicThreshold:
        * @type {integer}
        * 
        * Sp02:
        * @type {integer}
        * 
        * weight:
        * @type {integer}
        * 
        * size:
        * @type {integer}
        * 
        * IMC:
        * @type {integer}
        * 
        * waist:
        * @type {integer}
        * 
        * hip:
        * @type {integer}
        * 
        * cardiovascularRisk
        * @type {integer}
        * 
        * recommendations
        * @type {String}
        * 
        * medicalInfo
        * @type {Array}
        * 
        * medicalID
        * @type {integer}
        * 
        * validatios:
        * @type {validations}
        * 
        * medicalCode:
        * @type {Integer}
        * 
        * upToDate:
        * @type {Date}
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            userName: [{}],
            partyID: sessionStorage.getItem("userPartyID"),
            pathologies: "",
            allergies: "",
            surgeries: "",
            traumas: 0,
            smoking: 0,
            neurologicalInfo: "",
            pulmonaryCardioInfo: "",
            bloodPressure: "",
            heartRate: 0,
            aerobicThreshold: 0,
            SpO2: 0,
            weight: 0,
            size: 0,
            IMC: 0,
            waist: 0,
            hip: 0,
            riskList :[{}],
            cardiovascularRisk: 1,
            recommendations: "",
            medicalInfo: [{}],
            medicalID: "",
            validations: new validations(),
            medicalCod: "8888",
            date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            upToDate: new Date(),
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: 0

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validation = this.validation.bind(this);
        this.loadData = this.loadData.bind(this);
        this.backButton = this.backButton.bind(this);
        this.calcIMC = this.calcIMC.bind(this);
        this.checkEmptySpaces = this.checkEmptySpaces.bind(this);
        this.cardioVascularSelect = this.cardioVascularSelect.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (this.state.isExit == 1) {
            this.props.history.push(`/HistoricMedicalInfo`);
        } else if (this.state.isExit == 2) {
            this.handleSubmit(event);
        }
        event.preventDefault();
    };

    /**
    * Method that can get full name of the user and the data if is it an update, and the medical cod
    * when the page is load
    */
    componentDidMount() {

        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);

            try {
                axios.get(`http://localhost:9000/User/getUserName`,
                    {
                        params: { partyID: this.state.partyID }
                    }).then(response => {
                        const userName = response.data[0];
                        this.setState({ userName });
                    });
                axios.get(`http://localhost:9000/MedicalInfo/getRiskCondition`).then(
                    response =>{
                        const riskList = response.data[0];
                        this.setState({riskList});
                    });

                if (sessionStorage.getItem("update") == "true") {
                    this.setState({ medicalID: sessionStorage.getItem("medicalFormID") });
                    axios.get("http://localhost:9000/MedicalInfo/getMedicalInfoHist", {
                        params: {
                            partyID: this.state.partyID
                        }
                    }).then(response => {
                        if (response) {
                            this.setState({ medicalInfo: response.data[0] });
                            this.loadData();
                        }
                    })
                }

                if (sessionStorage.getItem("userTypeID") == 3) {
                    axios.get("http://localhost:9000/MedicalInfo/getMedicalCod", {
                        params: {
                            partyID: sessionStorage.getItem("partyID")
                        }
                    }).then(response => {
                        if (response) {
                            var d = response.data[0];
                            this.setState({ medicalCod: d[0].medicalCod });

                        }
                    })
                }
            } catch (err) {
                console.error("Un error inesperado ha ocurrido");
            }
        }
    }

    /**
    * Method that load the data is it an update 
    * when the page is load
    */
    loadData() {
        var smoke = this.state.medicalInfo[0].smoking;
        var trauma = this.state.medicalInfo[0].traumas;
        if (smoke == "Si") {
            this.setState({ smoking: 1 });
            document.getElementById("smokingNo").checked = false;
            document.getElementById("smokingYes").checked = true;
        } else {
            this.setState({ smoking: 0 });
            document.getElementById("smokingYes").checked = false;
            document.getElementById("smokingNo").checked = true;
        }
        if (trauma === "Si") {
            this.setState({ traumas: 1 });
            document.getElementById("traumasYes").checked = true;
            document.getElementById("traumasNo").checked = false;
        } else {
            this.setState({ traumas: 0 });
            document.getElementById("traumasYes").checked = false;
            document.getElementById("traumasNo").checked = true;
        }
        document.getElementById("pathologies").value = this.state.medicalInfo[0].pathologies;
        document.getElementById("allergies").value = this.state.medicalInfo[0].allergies;
        document.getElementById("surgeries").value = this.state.medicalInfo[0].surgeries;
        document.getElementById("weight").value = this.state.medicalInfo[0].weight;
        document.getElementById("size").value = this.state.medicalInfo[0].size;
        document.getElementById("heartRate").value = this.state.medicalInfo[0].heartRate;
        document.getElementById("aerobicThreshold").value = this.state.medicalInfo[0].aerobicThreshold;
        document.getElementById("SpO2").value = this.state.medicalInfo[0].SpO2;
        document.getElementById("waist").value = this.state.medicalInfo[0].waist;
        document.getElementById("hip").value = this.state.medicalInfo[0].hip;
        document.getElementById("neurologicalInfo").value = this.state.medicalInfo[0].neurologicalInfo;
        document.getElementById("pulmonaryCardioInfo").value = this.state.medicalInfo[0].pulmonaryCardioInfo;
        document.getElementById("cardiovascularRisk").value = this.state.medicalInfo[0].riskConditionID;
        document.getElementById("recommendations").value = this.state.medicalInfo[0].recommendations;
        document.getElementById("upToDate").value = this.state.medicalInfo[0].upToDate;
        document.getElementById("bloodPressure").value = this.state.medicalInfo[0].bloodPressure;

        this.setState({ pathologies: this.state.medicalInfo[0].pathologies });
        this.setState({ surgeries: this.state.medicalInfo[0].surgeries });
        this.setState({ allergies: this.state.medicalInfo[0].allergies });
        this.setState({ neurologicalInfo: this.state.medicalInfo[0].neurologicalInfo });
        this.setState({ pulmonaryCardioInfo: this.state.medicalInfo[0].pulmonaryCardioInfo });
        this.setState({ bloodPressure: this.state.medicalInfo[0].bloodPressure });
        this.setState({ heartRate: this.state.medicalInfo[0].heartRate });
        this.setState({ aerobicThreshold: this.state.medicalInfo[0].aerobicThreshold });
        this.setState({ SpO2: this.state.medicalInfo[0].SpO2 });
        this.setState({ weight: this.state.medicalInfo[0].weight });
        this.setState({ size: this.state.medicalInfo[0].size });
        this.setState({ IMC: this.state.medicalInfo[0].IMC });
        this.setState({ waist: this.state.medicalInfo[0].waist });
        this.setState({ hip: this.state.medicalInfo[0].hip });
        this.setState({ cardiovascularRisk: this.state.medicalInfo[0].riskConditionID });
        this.setState({ recommendations: this.state.medicalInfo[0].recommendations });
        this.setState({ upToDate: this.state.medicalInfo[0].upToDate });
    }

    /**
    * Method that submit all the information in the form
    */
    handleSubmit(event) {

        if (sessionStorage.getItem("update") == "true") {
            fetch(`http://localhost:9000/MedicalInfo/updateMedicalRegister`, {
                method: "post",
                body: JSON.stringify(this.state),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        isExit: 1
                    });
                    sessionStorage.setItem("update", false);
                    this.modalTrigger(event, 'Actualización de registro', 'Se actualizó de manera correcta el registro médico');

                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
            event.preventDefault();
        } else {
            fetch("http://localhost:9000/MedicalInfo/addMedicalInfo", {
                method: "post",
                body: JSON.stringify(this.state),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        isExit: 1
                    });
                    this.modalTrigger(event, 'Ingreso de registro', 'Se ingresó de manera correcta el registro médico');
                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
            event.preventDefault();
        }
    }

    /**
    * Method that set the state when an input change
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

        if (this.state.pathologies != "" || this.state.allergies != "" || this.state.surgeries != ""
            || this.state.neurologicalInfo != "" || this.state.pulmonaryCardioInfo != "" || this.state.recommendations != "") {
    
                this.checkEmptySpaces();
        }

    }

    /**
     * Method that set the state when the select changes
     * @param {*} event 
     */
    cardioVascularSelect(event) {
        this.setState({ cardiovascularRisk: event.target.value });
    }

    /**
    * Method that calculate the imc based in the size and weight
    * peso/altura a la 2
    */
    calcIMC(event) {
        var size = (this.state.size * this.state.size);
        var imc = (this.state.weight / size);
        var round = imc.toFixed(2);
        this.setState({ IMC: round, isExit: 2 });
        this.modalTrigger(event, "Cálculo IMC", "El IMC es de " + round);
    }

    /**
    * Method that verify that the require inputs are not empty
    */
    validation(event) {
        if ((this.state.smoking.toString().trim() != 0 && this.state.smoking.toString().trim() != 1)
            || (this.state.traumas.toString().trim() != 0 && this.state.traumas.toString().trim() != 1)
            || this.state.size == 0
            || this.state.weight == 0
            || this.state.heartRate == 0
            || this.state.aerobicThreshold == 0
            || this.state.SpO2 == 0
            || this.state.waist == 0
            || this.state.hip == 0
            || this.state.bloodPressure == ""
            || this.state.cardiovascularRisk == 0
            || this.state.upToDate == 0) {
            this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos obligatorios  deben estar llenos y no pueden ser cero');
        } else if (this.state.pathologies.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.pathologies.trim())) {
                this.modalTrigger(event, 'Formato incorrecto', 'El campo de patologías no puede contener números');
            }
        } else if (this.state.allergies.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.allergies.trim())) {
                this.modalTrigger(event, 'Formato incorrecto', 'El campo de alergias no puede contener números');
            }
        } else if (this.state.surgeries.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.surgeries.trim())) {
                this.modalTrigger(event, 'Formato incorrecto', 'El campo de quirúrgicos no puede contener números');
            }
        } else if (this.state.neurologicalInfo.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.neurologicalInfo.trim())) {
                this.modalTrigger(event, 'Formato incorrecto', 'El campo de información neurólogica no puede contener números');
            }
        } else if (this.state.pulmonaryCardioInfo.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.pulmonaryCardioInfo.trim())) {
                this.modalTrigger(event, 'Formato incorrecto', 'El campo de información cardiopulmonar no puede contener números');
            }
        } else if (this.state.recommendations.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.recommendations.trim())) {
                this.modalTrigger(event, 'Formato incorrecto', 'El campo de recomendaciones no puede contener números');
            }            
        } else if ((document.getElementById("bloodPressure").value.length != 0 && !this.state.validations.validateRange(document.getElementById("bloodPressure").value.trim()))) {
            this.modalTrigger(event, 'Formato Incorrecto', 'La presión arterial debe ser un rango');
        } else if (!this.state.validations.validatePercent(this.state.heartRate.toString().trim())
            || !this.state.validations.validatePercent(this.state.aerobicThreshold.toString().trim())
            || !this.state.validations.validatePercent(this.state.SpO2.toString().trim())
            || !this.state.validations.validateKg(this.state.weight.toString().trim())
            || !this.state.validations.validateKg(this.state.size.toString().trim())
            || !this.state.validations.validateKg(this.state.IMC.toString().trim())
            || !this.state.validations.validateNumericField(this.state.waist.toString().trim())
            || !this.state.validations.validateNumericField(this.state.hip.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'Los campos de  frecuencia cardiaca, umbral aeróbico, oxígeno, peso, talla, cadera, cintura deben ser números');
        } else {
            this.calcIMC(event);
        }

    }

    /**
     * This method set the state empty for the null values
     */
    checkEmptySpaces() {
        if (document.getElementById("pathologies").value.length == 0 || document.getElementById("pathologies").value == "N/A") {
            this.setState({
                pathologies: ""
            });
        }
        if (document.getElementById("allergies").value.length == 0 || document.getElementById("allergies").value == "N/A") {
            this.setState({
                allergies: ""
            });
        }
        if (document.getElementById("surgeries").value.length == 0 || document.getElementById("surgeries").value == "N/A") {
            this.setState({
                surgeries: ""
            });
        }
        if (document.getElementById("neurologicalInfo").value.length == 0 || document.getElementById("neurologicalInfo").value == "N/A") {
            this.setState({
                neurologicalInfo: ""
            });
        }
        if (document.getElementById("pulmonaryCardioInfo").value.length == 0 || document.getElementById("pulmonaryCardioInfo").value == "N/A") {
            this.setState({
                pulmonaryCardioInfo: ""
            });
        }
        if (document.getElementById("recommendations").value.length == 0 || document.getElementById("recommendations").value == "N/A") {
            this.setState({
                recommendations: ""
            });
        }
        if (document.getElementById("cardiovascularRisk").value == 1) {
            this.setState({
                cardiovascularRisk: 1
            });
        }

    }


    /**
    * Method that redirect to the previous page
    */
    backButton() {
        sessionStorage.setItem('update', false);
        this.props.history.push(`/HistoricMedicalInfo`);
    }

    render() {

        const list = this.state.riskList.map((risk,i) =>{
            return(
                <option value={risk.riskConditionID}>{risk.description}</option>
            )
        });

        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-label" key={i}>Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/HistoricMedicalInfo">Consulta médica</Breadcrumb.Item>
                        <Breadcrumb.Item>Formulario médico</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Formulario médico</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-left">
                                {name}
                            </div>
                        </div>
                    </div>
                    <div className="col-10 offset-1 mt-4 text-center">
                        <form className="form-horizontal">
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active aNavbar" id="pills-personal-history-tab" data-toggle="pill" href="#pills-personal-history" role="tab" aria-controls="pills-personal-history" aria-selected="true">Antecedentes<br />personales</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link aNavbar" id="pills-physical-exploration-1-tab" data-toggle="pill" href="#pills-physical-exploration-1" role="tab" aria-controls="pills-physical-exploration-1" aria-selected="false">Exploración<br />Fisica </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link aNavbar" id="pills-recommendations-tab" data-toggle="pill" href="#pills-recommendations" role="tab" aria-controls="pills-recommendations" aria-selected="false">Recomendaciones<br />médicas</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-personal-history" role="tabpanel" aria-labelledby="pills-personal-history-tab">
                                    <div className="container">
                                        <div className="row card mt-4 p-5 ">
                                            <div className="col-6 offset-1">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="pathologies" fontSize="18px">Patológicos</label>
                                                            <div className="controls">
                                                                <input type="text" name="pathologies" id="pathologies" fontSize="18px" className="form-control inputText" onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="allergies" fontSize="18px">Alergias</label>
                                                            <div className="controls">
                                                                <input type="text" name="allergies" id="allergies" fontSize="18px" className="form-control inputText" onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="surgerie" fontSize="18px">Quirúrgicos</label>
                                                            <div className="controls">
                                                                <input type="text" id="surgeries" className="form-control inputText" fontSize="18px" name="surgeries" onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="smoking" fontSize="18px">Tabaquismo<font color="red">*</font></label>
                                                        </div>
                                                        <form name="smoking" onChange={this.handleInputChange} fontSize="18px" value={this.state.smoking} required>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label fontSize="18px">Sí
                                                                 <input type="radio" name="smoking" id="smokingYes" value="1" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label fontSize="18px">No
                                                                 <input type="radio" name="smoking" id="smokingNo" value="0" checked />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="traumas" fontSize="18px">Traumáticos<font color="red">*</font></label>
                                                        </div>
                                                        <form name="smoking" onChange={this.handleInputChange} fontSize="18px" value={this.state.traumas} required>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label fontSize="18px"> Sí
                                                        <input type="radio" name="traumas" id="traumasYes" value="1" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label fontSize="18px"> No
                                                        <input type="radio" name="traumas" id="traumasNo" value="0" checked />
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-physical-exploration-1" role="tabpanel" aria-labelledby="pills-physical-exploration-1-tab">
                                    <div className="container">
                                        <div className="row card mt-4 p-5">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-3 mt-4">
                                                        <div className="row">
                                                            <div className="col-9">
                                                                <div className="control-group">
                                                                    <label className="control-label" font-size="18px" htmlFor="weight">Peso (kg)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="number" id="weight" font-size="18px" name="weight" required onChange={this.handleInputChange} className="form-control" placeholder="ej. 80" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-9">
                                                                <div className="control-group">
                                                                    <label className="control-label" font-size="18px" htmlFor="size">Talla (m)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="number" id="size" font-size="18px" name="size" required onChange={this.handleInputChange} className="form-control" placeholder="ej: 1.70" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-9">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="heartRate" font-size="18px">FC<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="number" id="heartRate" name="heartRate" font-size="18px" required onChange={this.handleInputChange} className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-9">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="aerobicThreshold" font-size="18px">Umbral aeróbico<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="number" id="aerobicThreshold" font-size="18px" name="aerobicThreshold" required onChange={this.handleInputChange} className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-4 mt-4">

                                                        <div className="row">
                                                            <div className="col-7">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="SpO2" fontSize="18px">Sp02<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="number" id="SpO2" name="SpO2" font-size="18px" required onChange={this.handleInputChange} className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-7">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="waist" fontSize="18px">Cintura (cm)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="number" id="waist" name="waist" font-size="18px" required onChange={this.handleInputChange} className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-7">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="hip" fontSize="18px">Cadera (cm)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="number" id="hip" name="hip" font-size="18px" required onChange={this.handleInputChange} className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-7">
                                                                <label className="control-label" htmlFor="bloodPressure" fontSize="18px">Presión Arterial<font color="red">*</font></label>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-7">
                                                                <input type="text" id="bloodPressure" className="form-control" name="bloodPressure" required onChange={this.handleInputChange} placeholder="000-000" />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-5 mt-4">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="neurologicalInfo" fontSize="18px">Neurológico</label>
                                                            <div className="form-group">
                                                                <textarea id="neurologicalInfo" className="form-control" font-size="18px" rows="4" name="neurologicalInfo" onChange={this.handleInputChange}></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="pulmonaryCardioInfo" fontSize="18px">Cardiopulmonar</label>
                                                            <div className="form-group">
                                                                <textarea id="pulmonaryCardioInfo" rows="5" font-size="18px" className="form-control" name="pulmonaryCardioInfo" onChange={this.handleInputChange}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-recommendations" role="tabpanel" aria-labelledby="pills-recommendations-tab">
                                    <div className="container">
                                        <div className="row card mt-4 p-5">
                                            <div className="col-10 offset-1">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="cardiovascularRisk" fontSize="18px">Riesgo Cardiovascular<font color="red">*</font></label>
                                                        </div>
                                                        <div className="controls">
                                                            <select name="cardiovascularRisk" id="cardiovascularRisk" font-size="18px" className="form-control" align="left" onChange={this.cardioVascularSelect} >
                                                              {list}
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="recommendations" fontSize="18px">Recomendaciones</label>
                                                            <div className="form-group">
                                                                <textarea id="recommendations" rows="5" name="recommendations" font-size="18px" className="form-control" onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="form-group" align="left">
                                                            <br></br>
                                                            <p title="Campo obligatorio">Válido hasta<font color="red">*</font></p>
                                                            <input type="date" name="upToDate" id="upToDate" font-size="18px" required onChange={this.handleInputChange} value={this.state.upToDate} className="form-control InputText"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mt-4 col-2">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                                <div className="mt-4 col-2 offset-7">
                                    <button align="right" name="save" className="buttonSizeGeneral" onClick={this.validation}>Guardar</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                                        <br />{this.state.modalChildren}
                                    </ModalComponent>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default MedicalForm;
