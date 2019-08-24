/**
 * @fileoverview  AddMedicalForm page, Medical Form that allows to the doctor 
 * input a new medical form for a user 
 * 
 * @version 1.0
 *
 * @author    María Ester Molina Richmond <maria.molina@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AddMedicalForm was written by Ester Molina.
 */
import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';


/*global IMC*/


class AddMedicalForm extends Component {
    constructor(props) {
        super(props);
        /**
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
        */
        this.state = {
            userName: [{}],
            partyID: 66,
            partyID: sessionStorage.getItem("userPartyID"),
            pathologies: "",
            allergies: "",
            surgeries: "",
            traumas: 0,
            smoking: 0,
            neurologicalInfo: "",
            pulmonaryCardioInfo: "",
            bloodPressure: "0",
            heartRate: "0",
            aerobicThreshold: "0",
            SpO2: "0",
            weight: "0",
            size: "0",
            IMC: "0",
            waist: "0",
            hip: "0",
            cardiovascularRisk: "0",
            recommendations: "",
            medicalInfo: [{}],
            medicalID: "0",
            validations: new validations(),
            medicalCod: "0",
            upToDate: (new Date().getFullYear() +1) + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2),

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validation = this.validation.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    /**
    * Method that can get full name of the user and the data if is it an update, and the medical cod
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

            if (sessionStorage.getItem("update") === "true") {
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
                        this.setState({ medicalCod: response.data[0] });
                        this.loadData();
                    }
                })
            }
        } catch (err) {
            console.error(err);
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
        this.setState({ cardiovascularRisk: this.state.medicalInfo[0].cardiovascularRisk });
        this.setState({ recommendations: this.state.medicalInfo[0].recommendations });

    }

    /**
    * Method that submit all the information in the form
    */
    handleSubmit = event => {
        if (sessionStorage.getItem("update") === "true") {
            this.validation();
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
                    console.log(data);
                })
                .catch(err => console.error(err));
            event.preventDefault();

            sessionStorage.setItem("update", false);
        } else {
            this.validation()
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
                    console.log(data);
                })
                .catch(err => console.error(err));
            event.preventDefault();
            this.props.history.push(`/HistoricMedicalInfo`);
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


        if (this.state.weight !== 0 && this.state.size !== 0) {
            this.calcIMC();
        }
    }

    /**
    * Method that calculate the imc based in the size and weight
    */
    //no está bien
    calcIMC() {
        let size = (this.state.size * this.state.size);
        let imc = (this.state.weight / size) * 100;
        let round = imc.toFixed(2);
        this.setState({ IMC: round });
    }

    /**
    * Method that verify that the require inputs are not empty
    */
    validation() {
        if ((this.state.smoking != 0 && this.state.smoking != 1)
            || (this.state.traumas != 0 && this.state.traumas != 1)
            || this.state.size.toString().trim().length == 0
            || this.state.weight.toString().trim().length == 0
            || this.state.heartRate.toString().trim().length == 0
            || this.state.aerobicThreshold.toString().trim().length == 0
            || this.state.SpO2.toString().trim().length == 0
            || this.state.waist.toString().trim().length == 0
            || this.state.hip.toString().trim().length == 0
            || this.state.bloodPressure.toString().trim().length == 0
            || this.state.cardiovascularRisk.toString().trim().length == 0) {
            alert("Todos los campos obligatorios  deben estar llenos");
        } else if (this.state.pathologies.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.pathologies.trim())) {
                alert("El campo de patologías no puede contener números");
            }
        } else if (this.state.allergies.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.allergies.trim())) {
                alert("El campo de alergias no puede contener números");
            }
        } else if (this.state.surgeries.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.surgeries.trim())) {
                alert("El campo de quirúrgicos no puede contener números");
            }
        } else if (this.state.neurologicalInfo.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.neurologicalInfo.trim())) {
                alert("El campo de información neurólogica no puede contener números");
            }
        } else if (this.state.pulmonaryCardioInfo.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.pulmonaryCardioInfo.trim())) {
                alert("El campo de información cardiopulmonar no puede contener números");
            }
        } else if (this.state.recommendations.trim().length != 0) {
            if (!this.state.validations.validateTextField(this.state.recommendations.trim())) {
                alert("El campo de recomendaciones no puede contener números");
            }
        } else if (!this.state.validations.validateNumericField(this.state.bloodPressure.trim())
            || !this.state.validations.validateNumericField(this.state.heartRate.trim())
            || !this.state.validations.validateNumericField(this.state.aerobicThreshold.trim())//se debe cambiar por umbral aerobico
            || !this.state.validations.validateNumericField(this.state.SpO2.trim())
            || !this.state.validations.validateNumericField(this.state.weight.trim())
            || !this.state.validations.validateNumericField(this.state.size.trim())
            || !this.state.validations.validateNumericField(this.state.IMC.trim())
            || !this.state.validations.validateNumericField(this.state.waist.trim())
            || !this.state.validations.validateNumericField(this.state.hip.trim())
            || !this.state.validations.validateNumericField(this.state.cardiovascularRisk.trim())) {
            alert("Los campos de presión arterial, pulso, umbral aeróbico, oxígeno, peso, talla, cadera, cintura deben ser números");
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
                        <h1 className="text-left colorBlue">Formulario médico</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-left">
                                {name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 offset-1 text-left">
                                <div className="form-group" align="left">
                                    <br></br>
                                    <p title="Campo obligatorio">Válido hasta<font color="red">*</font></p>
                                    <input type="date" name="upToDate" required onChange={this.handleInputChange} value={this.state.upToDate} className="form-control InputText"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 offset-1 mt-4 text-center">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
                                                            <label className="control-label" htmlFor="pathologies">Patológicos</label>
                                                            <div className="controls">
                                                                <input type="text" name="pathologies" id="pathologies" className="form-control inputText" value={this.state.pathologies} onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="allergies">Alergias</label>
                                                            <div className="controls">
                                                                <input type="text" name="allergies" id="allergies" className="form-control inputText" value={this.state.allergies} onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="surgerie">Quirúrgicos</label>
                                                            <div className="controls">
                                                                <input type="text" id="surgerie" className="form-control inputText" name="surgeries" value={this.state.surgeries} onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="smoking">Tabaquismo<font color="red">*</font></label>
                                                        </div>
                                                        <form name="smoking" onChange={this.handleInputChange} value={this.state.smoking} required>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label>SI
                                                                 <input type="radio" name="smoking" id="smokingYes" value="1" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label>NO
                                                                 <input type="radio" name="smoking" id="smokingNo" value="0" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="traumas">Traumáticos<font color="red">*</font></label>
                                                        </div>
                                                        <form name="smoking" onChange={this.handleInputChange} value={this.state.traumas} required>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label> SI
                                                        <input type="radio" name="traumas" id="traumasYes" value="1" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label> NO
                                                        <input type="radio" name="traumas" id="traumasNo" value="0" />
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
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="inputHeight">Talla (cm)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="inputHeight" name="size" required value={this.state.size} onChange={this.inputNumberValidator} size="10" placeholder="ej: 170" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="weight">Peso (kg)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="weight" name="weight" required value={this.state.weight} onChange={this.inputNumberValidator} size="10" placeholder="ej. 80" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="IMC">IMC</label>
                                                                    <div className="controls">
                                                                        <input type="text" id="IMC" name="IMC" value={this.state.IMC} readOnly size="10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="aerobicThreshold">Umbral aeróbico<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="aerobicThreshold" name="aerobicThreshold" required value={this.state.aerobicThreshold} onChange={this.handleInputChange} size="10" placeholder="?" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="heartRate">FC<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="heartRate" name="heartRate" required value={this.state.heartRate} onChange={this.handleInputChange} size="10" placeholder="?" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 mt-4">
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="SpO2">Sp02<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="SpO2" name="SpO2" required value={this.state.SpO2} onChange={this.handleInputChange} size="10" placeholder="?" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="waist">Cintura (cm)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="waist" name="waist" required value={this.state.waist} onChange={this.handleInputChange} size="10" placeholder="ej. 70" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="hip">Cadera (cm)<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="hip" name="hip" required value={this.state.hip} onChange={this.handleInputChange} size="10" placeholder="ej. 90" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="bloodPressure">Presión Arterial<font color="red">*</font></label>
                                                                    <div className="controls">
                                                                        <input type="text" id="bloodPressure" name="bloodPressure" required value={this.state.bloodPressure} onChange={this.handleInputChange} size="10" placeholder="?" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-6 mt-4">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="neurologicalInfo">Neurológico</label>
                                                            <div className="form-group">
                                                                <textarea id="neurologicalInfo" className="form-control" rows="4" name="neurologicalInfo" value={this.state.neurologicalInfo} onChange={this.handleInputChange}></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="pulmonaryCardioInfo">Cardiopulmonar</label>
                                                            <div className="form-group">
                                                                <textarea id="pulmonaryCardioInfo" rows="5" className="form-control" name="pulmonaryCardioInfo" value={this.state.pulmonaryCardioInfo} onChange={this.handleInputChange}></textarea>
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
                                                            <label className="control-label" htmlFor="cardiovascularRisk">Riesgo Cardiovascular<font color="red">*</font></label>
                                                        </div>
                                                        <div className="controls">
                                                            <select name="cardiovascularRisk" id="cardiovascularRisk" className="form-control" align="left" value={this.state.cardiovascularRisk} onChange={this.handleInputChange} >
                                                                <option value="1" selected >1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="recommendations">Recomendaciones</label>
                                                            <div className="form-group">
                                                                <textarea id="recommendations" rows="5" name="recommendations" className="form-control" value={this.state.recommendations} onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 offset-9 mt-4">
                                <button align="left" name="save" type="submit" className="buttonSizeGeneral">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddMedicalForm;
