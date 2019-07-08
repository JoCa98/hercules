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
                    params: { partyID : this.state.partyID }
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
                </tr>
            )
        })

        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">

                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
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
        );
    }
}

export default TableMedicalInfo;
