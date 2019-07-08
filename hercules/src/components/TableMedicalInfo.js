import React, { Component } from 'react';
import axios from 'axios';
/*global medicalInfo*/

class TableMedicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicalInfo: [{}],
            partyID: 1
        };
        this.getMedicalInfoHist = this.getMedicalInfoHist.bind(this);
    }

    getMedicalInfoHist() {
        try {
            axios.get(`http://localhost:9000/MedicalInfo/getMedicalInfoHist`,
                {
                    params: { partyID: this.state.partyID, btnFuntion: 1 }
                }).then(response => {
                    const medicalInfo = response.data[0];
                    this.setState({ medicalInfo });
                    console.log(this.state.medicalInfo)
                });
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getMedicalInfoHist();
    }

    render() {

        const tableIndex = this.state.medicalInfo.map((medicalInfo, i) => {
            return (
                <tr className="pointer" key={i}>
                    <td>{medicalInfo.date}</td>
                    <td>{medicalInfo.pathologies}</td>
                    <td>{medicalInfo.allergies}</td>
                    <td>{medicalInfo.surgeries}</td>
                    <td>{medicalInfo.traumas}</td>
                    <td>{medicalInfo.smoking}</td>
                    <td>{medicalInfo.neurologicalInfo}</td>
                    <td>{medicalInfo.pulmonaryCardioInfo}</td>
                    <td>{medicalInfo.bloodPressure}</td>
                    <td>{medicalInfo.heartRate}</td>
                    <td>{medicalInfo.heartRatePerMinute}</td>
                    <td>{medicalInfo.SpO2}</td>
                    <td>{medicalInfo.weight}</td>
                    <td>{medicalInfo.size}</td>
                    <td>{medicalInfo.IMC}</td>
                    <td>{medicalInfo.abdomen}</td>
                    <td>{medicalInfo.waist}</td>
                    <td>{medicalInfo.hip}</td>
                    <td>{medicalInfo.cardiovascularRisk}</td>
                    <td>{medicalInfo.recommendations}</td>
                    <td>{medicalInfo.medicalCod}</td>
                </tr>
            )
        })

        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Consulta médica</h1>
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
                                <table className="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Cod Médico</th>
                                            <th scope="col">Patologías</th>
                                            <th scope="col">Alergias</th>
                                            <th scope="col">Operaciones</th>
                                            <th scope="col">Traumas</th>
                                            <th scope="col">Fumado</th>
                                            <th scope="col">Información neurológica</th>
                                            <th scope="col">Información pulmonar</th>
                                            <th scope="col">Presión sanguínea</th>
                                            <th scope="col">Ritmo cardiaco</th>
                                            <th scope="col">Ritmo cardiaco por minuto</th>
                                            <th scope="col">SpO2</th>
                                            <th scope="col">Peso</th>
                                            <th scope="col">Altura</th>
                                            <th scope="col">IMC</th>
                                            <th scope="col">Abdomen</th>
                                            <th scope="col">Cintura</th>
                                            <th scope="col">Cadera</th>
                                            <th scope="col">Riesgo cardiovascular</th>
                                            <th scope="col">Recomendaciones</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableIndex}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableMedicalInfo;
