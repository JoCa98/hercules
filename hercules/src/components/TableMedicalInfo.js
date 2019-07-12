/**
 * @fileoverview TableMedicalInfo, this component get all the medical registers 
 * from the database of one especific user
 *
 * @version 1.0
 *
 * @author  Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of TableMedicalInfo was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom';

class TableMedicalInfo extends Component {
    constructor(props) {
        super(props);
        /**
        *  medicalInfo:
        * @type {Array}
        * Property that stores the list of medical registers that comes from the database
        * 
        * partyID:
        * @type {integer}
        * Property that indicates the user id,
        */
        this.state = {
            medicalInfo: [{}],
            partyID: 0
        };
        this.getMedicalInfoHist = this.getMedicalInfoHist.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
    }

    /**
     * Method that performs the search of al the registers of medical information
     */
    getMedicalInfoHist(value) {
        try {

            axios.get(`http://localhost:9000/MedicalInfo/getMedicalInfoHist`,
                {
                    params: { partyID: value }
                }).then(response => {
                    const medicalInfo = response.data[0];
                    this.setState({ medicalInfo });
                });
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Method that performs the search of al the registers of medical information
     */
    componentDidMount() {
        var value = '';
        if(sessionStorage.getItem('userTypeID') == 1 || sessionStorage.getItem('userTypeID') == 2){
            
            this.setState({
                partyID: sessionStorage.getItem('partyID')
            })
            value = sessionStorage.getItem('partyID');
            
        }else if(sessionStorage.getItem('userTypeID') == 3 || sessionStorage.getItem('userTypeID') == 4){
            this.setState({
                partyID: sessionStorage.getItem('userPartyID')
            })
            
            value = sessionStorage.getItem('userPartyID');
        }

        
        this.getMedicalInfoHist(value);
    }

     /**
     * Method that allow to select a row of the table
     */
    rowEvent(event) {
        try {
            var id = document.getElementById("medicalInfo").rows[event.target.parentNode.rowIndex].cells[0].innerHTML;
            sessionStorage.setItem("medicalFormID", id);
            sessionStorage.setItem("update", true);
            this.props.history.push(`/AddMedicalForm`);

        } catch (err) {
            console.error(err);
        }
    }

    render() {

        /**
        * The indexPersonalHist.map, indexExploration1.map, indexExploration2.map, indexRecomendations.map is 
        * used to create the rows of the table and to structure the html,
        * this is stored in a constant that is used in the code of the page
        */

        const indexPersonalHist = this.state.medicalInfo.map((medicalInfo, i) => {
            console.log(sessionStorage.getItem('userTypeID'));
            if (sessionStorage.getItem('userTypeID') == 4) {
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td className="diplayNone">{medicalInfo.medicalInfoID}</td>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.medicalCod}</td>
                        <td>{medicalInfo.pathologies}</td>
                        <td>{medicalInfo.allergies}</td>
                        <td>{medicalInfo.surgeries}</td>
                        <td>{medicalInfo.traumas}</td>
                        <td>{medicalInfo.smoking}</td>
                    </tr>
                )
            } else {
                return (
                    <tr key={i}>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.medicalCod}</td>
                        <td>{medicalInfo.pathologies}</td>
                        <td>{medicalInfo.allergies}</td>
                        <td>{medicalInfo.surgeries}</td>
                        <td>{medicalInfo.traumas}</td>
                        <td>{medicalInfo.smoking}</td>
                    </tr>
                )
            }
        })
        const indexExploration1 = this.state.medicalInfo.map((medicalInfo, i) => {
            if (i === 0 && sessionStorage.getItem('userTypeID') === 4) {
                console.log("dentro");
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td className="diplayNone">{medicalInfo.medicalInfoID}</td>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.size}</td>
                        <td>{medicalInfo.weight}</td>
                        <td>{medicalInfo.IMC}</td>
                        <td>{medicalInfo.bloodPressure}</td>
                        <td>{medicalInfo.SpO2}</td>
                        <td>{medicalInfo.heartRate}</td>
                        <td>{medicalInfo.heartRatePerMinute}</td>
                    </tr>
                )
            } else {
                return (
                    <tr key={i}>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.size}</td>
                        <td>{medicalInfo.weight}</td>
                        <td>{medicalInfo.IMC}</td>
                        <td>{medicalInfo.bloodPressure}</td>
                        <td>{medicalInfo.SpO2}</td>
                        <td>{medicalInfo.heartRate}</td>
                        <td>{medicalInfo.heartRatePerMinute}</td>
                    </tr>
                )
            }
        })

        const indexExploration2 = this.state.medicalInfo.map((medicalInfo, i) => {
            if (i === 0 && sessionStorage.getItem('userTypeID') === 4) {
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td className="diplayNone">{medicalInfo.medicalInfoID}</td>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.neurologicalInfo}</td>
                        <td>{medicalInfo.pulmonaryCardioInfo}</td>
                        <td>{medicalInfo.abdomen}</td>
                        <td>{medicalInfo.waist}</td>
                        <td>{medicalInfo.hip}</td>
                        <td>{medicalInfo.cardiovascularRisk}</td>
                    </tr>
                )
            } else {
                return (
                    <tr key={i}>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.neurologicalInfo}</td>
                        <td>{medicalInfo.pulmonaryCardioInfo}</td>
                        <td>{medicalInfo.abdomen}</td>
                        <td>{medicalInfo.waist}</td>
                        <td>{medicalInfo.hip}</td>
                        <td>{medicalInfo.cardiovascularRisk}</td>
                    </tr>
                )
            }
        })

        const indexRecomendations = this.state.medicalInfo.map((medicalInfo, i) => {
            if (i === 0 && sessionStorage.getItem('userTypeID') === 4) {
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td className="diplayNone">{medicalInfo.medicalInfoID}</td>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.recommendations}</td>
                    </tr>
                )
            } else {
                return (
                    <tr key={i}>
                        <td>{medicalInfo.date}</td>
                        <td>{medicalInfo.recommendations}</td>
                    </tr>
                )}
            })

        return (
            <div >
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
                            <table className="table table-sm table-hover" id="medicalInfo">
                                <thead>
                                    <tr>
                                        <th scope="col" className="align-middle">Fecha</th>
                                        <th scope="col" className="align-middle">Cod Médico</th>
                                        <th scope="col" className="align-middle">Patológicos</th>
                                        <th scope="col" className="align-middle">Alergias</th>
                                        <th scope="col" className="align-middle">Quirúrgicos</th>
                                        <th scope="col" className="align-middle">Traumáticos</th>
                                        <th scope="col" className="align-middle">Tabaquismo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {indexPersonalHist}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-physical-exploration-1" role="tabpanel" aria-labelledby="pills-physical-exploration-1-tab">
                        <div className="table-responsive">
                            <table className="table table-sm table-hover" id="medicalInfo">
                                <thead>
                                    <tr>
                                        <th scope="col" className="align-middle">Fecha</th>
                                        <th scope="col" className="align-middle">Talla (cm)</th>
                                        <th scope="col" className="align-middle">Peso (kg)</th>
                                        <th scope="col" className="align-middle">IMC (kg/m²)</th>
                                        <th scope="col" className="align-middle">Presión Arterial<br />(mmHg)</th>
                                        <th scope="col" className="align-middle">SpO2 (%)</th>
                                        <th scope="col" className="align-middle">Frecuencia Cardíaca</th>
                                        <th scope="col" className="align-middle">Frec. Cardíaca<br />por minuto<br />(ppm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {indexExploration1}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-physical-exploration-2" role="tabpanel" aria-labelledby="pills-physical-exploration-2-tab">
                        <div className="table-responsive">
                            <table className="table table-sm table-hover" id="medicalInfo">
                                <thead>
                                    <tr>
                                        <th scope="col" className="align-middle">Fecha</th>
                                        <th scope="col" className="align-middle">Neurológico</th>
                                        <th scope="col" className="align-middle">Cardiopulmonar</th>
                                        <th scope="col" className="align-middle">Abdomen (cm)</th>
                                        <th scope="col" className="align-middle">Cintura (cm)</th>
                                        <th scope="col" className="align-middle">Cadera</th>
                                        <th scope="col" className="align-middle">Riesgo Cardiovascular</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {indexExploration2}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-recommendations" role="tabpanel" aria-labelledby="pills-recommendations-tab">
                        <div className="table-responsive">
                            <table className="table table-sm table-hover" id="medicalInfo">
                                <thead>
                                    <tr>
                                        <th scope="col" className="align-middle">Fecha</th>
                                        <th scope="col" className="align-middle">Recomendaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {indexRecomendations}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default withRouter(TableMedicalInfo);
