import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';

class HistoricMedicalInfo extends Component {
    constructor() {
        super();

        this.redirect = this.redirect.bind(this);

    }

    redirect() {
        window.location = "https://www.google.com/";
    }

    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Consulta médica</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-ceter">
                                <label className="form-control">Usuario: Jose Carlos Chavez Moran</label>
                            </div>
                            <div className="col-4 offset-1">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral" />
                                <h4 className="colorBlue" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 offset-1 mt-4 text-center">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active aNavbar" id="pills-personal-history-tab" data-toggle="pill" href="#pills-personal-history" role="tab" aria-controls="pills-personal-history" aria-selected="true">Antecedentes<br />personales</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link aNavbar" id="pills-physical-exploration-1-tab" data-toggle="pill" href="#pills-physical-exploration-1" role="tab" aria-controls="pills-physical-exploration-1" aria-selected="false">Exploración<br />Fisica I</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link aNavbar" id="pills-physical-exploration-2-tab" data-toggle="pill" href="#pills-physical-exploration-2" role="tab" aria-controls="pills-physical-exploration-2" aria-selected="false">Exploración<br />Fisica II</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link aNavbar" id="pills-recommendations-tab" data-toggle="pill" href="#pills-recommendations" role="tab" aria-controls="pills-recommendations" aria-selected="false">Recomendaciones<br />médicas</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-personal-history" role="tabpanel" aria-labelledby="pills-personal-history-tab">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Patológicos</th>
                                                <th scope="col">Alergias</th>
                                                <th scope="col">Tabaquismo</th>
                                                <th scope="col">Quirúrgicos</th>
                                                <th scope="col">Traumáticos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-physical-exploration-1" role="tabpanel" aria-labelledby="pills-physical-exploration-1-tab">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr >
                                                <th scope="col" className="align-middle">Fecha</th>
                                                <th scope="col" className="align-middle">Talla (cm)</th>
                                                <th scope="col" className="align-middle">Peso (kg)</th>
                                                <th scope="col" className="align-middle">IMC (kg/m²)</th>
                                                <th scope="col" className="align-middle">Presión Arterial<br />(mmHg)</th>
                                                <th scope="col" className="align-middle">Traumáticos</th>
                                                <th scope="col" className="align-middle">Frecuencia<br />Cardíaca (ppm)</th>
                                                <th scope="col" className="align-middle">Frecuencia<br />Cardíaca<br />por minuto<br />(220-edad)(ppm)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-physical-exploration-2" role="tabpanel" aria-labelledby="pills-physical-exploration-2-tab">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr >
                                                <th scope="col" className="align-middle">Fecha</th>
                                                <th scope="col" className="align-middle">Neurológico</th>
                                                <th scope="col" className="align-middle">Cardiopulmonar</th>
                                                <th scope="col" className="align-middle">Abdomen (cm)</th>
                                                <th scope="col" className="align-middle">Cintura (cm)</th>
                                                <th scope="col" className="align-middle">Riesgo Cardiovascular</th>
                                                <th scope="col" className="align-middle">SpO2 (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-recommendations" role="tabpanel" aria-labelledby="pills-recommendations-tab">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr >
                                                <th scope="col" className="align-middle">Fecha</th>
                                                <th scope="col" className="align-middle">Recomendaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricMedicalInfo;