import React, { Component } from 'react';
import { write } from 'fs';

/*global IMC*/
//const state = {


//};

class AddMedicalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partyID: 1,
            date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            pathologies: "",
            allergies: "",
            surgeries: "",
            traumas: 0,
            smoking: 0,
            neurologicalInfo: "",
            pulmonaryCardioInfo: "",
            bloodPressure: 0,
            heartRate: 0,
            heartRatePerMinute: 0,
            SpO2: 0,
            weight: 0,
            size: 0,
            IMC: 0,
            abdomen: 0,
            waist: 0,
            hip: 0,
            cardiovascularRisk: 0,
            recommendations: ""

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //  this.calcIMC = this.calcIMC.bind(this);
    }

    inputNumberValidator(event) {
        const re = /^[0-9]+\.[0-9][0-9]/;
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        // if value is not blank, then test the regex
    
        if (value === "" || re.test(value)) {
          this.setState({
            [name]: value
          });
        }
        
        if (this.state.weight !== 0) {
            if (this.state.size !== 0 && this.state.size !== '') {
                this.calcIMC();

            }
        }
      }

    handleSubmit = event => {
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
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    }

    calcIMC() {
        let size = (this.state.size * this.state.size);
        let imc = (this.state.weight / size) * 10;
        let round = imc.toFixed(2);
        this.setState({ IMC: round });
    }

    //  load(){
    //    let imc = this.state.IMC;
    //if(imc < 18.5){
    //  imcResult += "Delgadez";
    // } else if(imc >= 18.5 && imc < 25){
    //   imcResult += "Saludable";
    //} else{
    //  imcResult += "Sobrepeso";
    // }
    //}
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Formulario médico</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-ceter">
                                <label className="form-control">Usuario: Jose Carlos Chavez Moran</label>
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
                                                                <input type="text" name="pathologies" id="pathologies" size="70" value={this.state.pathologies} onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="allergies">Alergias</label>
                                                            <div className="controls">
                                                                <input type="text" name="allergies" id="allergies" size="70" value={this.state.allergies} onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="surgerie">Cirugías</label>
                                                            <div className="controls">
                                                                <input type="text" id="surgerie" size="70" name="surgeries" value={this.state.surgeries} onChange={this.handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="smoking">Tabaquismo*</label>
                                                        </div>
                                                        <form name="smoking" onChange={this.handleInputChange} value={this.state.smoking} required>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label>SI
                                                                 <input type="radio" name="smoking" id="smoking" value="1" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label>NO
                                                                 <input type="radio" name="smoking" id="smoking" value="0" checked />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="traumas">Traumas*</label>
                                                        </div>
                                                        <form name="smoking" onChange={this.handleInputChange} value={this.state.traumas} required>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label> SI
                                                        <input type="radio" name="traumas" id="traumas" value="1" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="controls">
                                                                        <label> NO
                                                        <input type="radio" name="traumas" id="traumas" value="0" checked />
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
                                                                    <label className="control-label" htmlFor="inputHeight">Talla*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="inputHeight" name="size" required value={this.state.size} onChange={this.inputNumberValidator} size="10" placeholder="ej: 1.70" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="weight">Peso*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="weight" name="weight" required value={this.state.weight} onChange={this.handleInputChange} size="10" />
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
                                                                    <label className="control-label" htmlFor="heartRatePerMinute">FCM*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="heartRatePerMinute" name="heartRatePerMinute" required value={this.state.heartRatePerMinute} onChange={this.handleInputChange} size="10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="heartRate">FC*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="heartRate" name="heartRate" required value={this.state.heartRate} onChange={this.handleInputChange} size="10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 mt-4">
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="SpO2">Sp02*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="SpO2" name="SpO2" required value={this.state.SpO2} onChange={this.handleInputChange} size="10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="abdomen">Abdomen*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="abdomen" name="abdomen" required value={this.state.abdomen} onChange={this.handleInputChange} size="10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="waist">Cintura*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="waist" name="waist" required value={this.state.waist} onChange={this.handleInputChange} size="10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="hip">Cadera*</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="hip" name="hip" required value={this.state.hip} onChange={this.handleInputChange} size="10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="bloodPressure">Presión Arterial*</label>
                                                                    <div className="controls">
                                                                        <input type="text" id="bloodPressure" name="bloodPressure" required value={this.state.bloodPressure} onChange={this.handleInputChange} size="10" />
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
                                                            <label className="control-label" htmlFor="cardiovascularRisk">Riesgo Cardiovascular*</label>
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
                                <button align="left" name="save" type="submit" className="buttonSizeGeneral"  >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddMedicalForm;
