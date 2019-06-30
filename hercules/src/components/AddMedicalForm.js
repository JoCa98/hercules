import React, { Component } from 'react';
import ReactDOM from "react-dom";

const state = {
    partyID: 1,
    date: "1998-08-22",
    pathologies: "a",
    allergies: "b",
    surgeries: "c",
    traumas: 1,
    smoking: 1,
    neurologicalInfo: "d",
    pulmonaryCardioInfo: "e",
    bloodPressure: 100,
    heartRate: 20,
    heartRatePerMinute: 20,
    SpO2: 2,
    weight: 40,
    size: 160,
    IMC: 15,
    abdomen: 90,
    waist: 60,
    hip: 70,
};

class AddMedicalForm extends Component {

    handleSubmit = event => {
        fetch("http://localhost:9000/MedicalInfo/addMedicalInfo", {
            method: "post",
            body: JSON.stringify(state),

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
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="pathologies">Patológicos</label>
                                                    <div className="controls">
                                                        <input type="decimal" id="pathologies" size="70" required />
                                                    </div>
                                                </div>
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="allergies">Alergias</label>
                                                    <div className="controls">
                                                        <input type="decimal" id="allergies" size="70" />
                                                    </div>
                                                </div>
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="smoking">Tabaquismo</label>
                                                    <div className="controls">
                                                        <input type="decimal" id="smoking" size="70" />
                                                    </div>
                                                </div>
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="surgerie">Cirugías</label>
                                                    <div className="controls">
                                                        <input type="decimal" id="surgerie" size="70" />
                                                    </div>
                                                </div>
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="traumas">Traumas</label>
                                                    <div className="controls">
                                                        <input type="decimal" id="traumas" size="70" />
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
                                                    <div className="col-4 mt-4">
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="inputHeight">Talla</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="inputHeight" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="weight">Peso</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="weight" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="IMC">IMC</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="IMC" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="heartRatePerMinute">FCM</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="heartRatePerMinute" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="heartRate">FC</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="heartRate" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 mt-4">
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="SpO2">Sp02</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="SpO2" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="abdomen">Abdomen</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="abdomen" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="waist">Cintura</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="waist" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="hip">Cadera</label>
                                                                    <div className="controls">
                                                                        <input type="decimal" id="hip" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="control-group">
                                                                    <label className="control-label" htmlFor="bloodPressure">Presión Arterial</label>
                                                                    <div className="controls">
                                                                        <input type="text" id="bloodPressure" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-4 mt-4">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="neurologicalInfo">Neurológico</label>
                                                            <div className="controls">
                                                                <textarea id="neurologicalInfo" rows="5"></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="control-group">
                                                            <label className="control-label" htmlFor="pulmonaryCardioInfo">Cardiopulmonar</label>
                                                            <div className="controls">
                                                                <textarea id="pulmonaryCardioInfo" rows="5"></textarea>
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
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="cardiovascularRisk">Riesgo Cardiovascular</label>
                                                    <div className="controls">
                                                        <select name="cardiovascularRisk" align="left" className="form-control">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br />
                                                <br />
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="recommendations">Recomendaciones</label>
                                                    <div className="controls">
                                                        <textarea id="recommendations" rows="5" />
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
