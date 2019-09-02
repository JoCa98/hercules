import React, { Component } from 'react';
import axios from 'axios';

class EditPhysicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: [{}],
            idPhisicalInfo: "",
            partyID: sessionStorage.getItem("userPartyID"),
            weight: "",
            bodyWater: "",
            visceralFat: "",
            boneMass: "",
            DCI: "",
            metabolicAge: "",
            totalBodyFat: "",
            muscleMass: "",
            physicalAssesment: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.loadInformation = this.loadInformation.bind(this);
        this.loadName = this.loadName.bind(this);
        this.loadPhysicalInformation = this.loadPhysicalInformation.bind(this);
        this.backButton = this.backButton.bind(this);

    }

    componentDidMount() {
        this.loadInformation();
    }

    loadInformation() {
        this.loadName();
        this.loadPhysicalInformation();
    }

    loadName() {
        //Name
        axios.get(`http://localhost:9000/User/getUserName`,
            {
                params: { partyID: this.state.partyID }
            }).then(response => {
                const userName = response.data[0];
                this.setState({ userName });
            });
    }

    loadPhysicalInformation() {
        //PhysicalInfo
        axios.get(`http://localhost:9000/PhysicalInfo/getOnePhysicalInfoByID`,
            {
                params: { partyID: this.state.partyID }
            }).then(response => {
                const physicalInfo = response.data[0];

                physicalInfo.map((physicalInfo, i) => {
                    this.setState({
                        idPhisicalInfo: physicalInfo.idPhisical_info,
                        weight: physicalInfo.weight,
                        bodyWater: physicalInfo.bodyWater,
                        visceralFat: physicalInfo.visceralFat,
                        boneMass: physicalInfo.boneMass,
                        DCI: physicalInfo.DCI,
                        metabolicAge: physicalInfo.metabolicAge,
                        totalBodyFat: physicalInfo.totalBody_Fat,
                        muscleMass: physicalInfo.totalMuscle_Mass,
                        physicalAssesment: physicalInfo.physicalAssessment
                    });
                })


            });
    }

    saveChange() {
        if (window.confirm("¿Está seguro de actualizar los datos?") == true) {
            fetch("http://localhost:9000/PhysicalInfo/updatePhysicalInfo", {
                method: "post",
                body: JSON.stringify(this.state),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                })
                .catch(err => console.error(err));

            alert("Los datos se actualizaron correctamente");
            this.props.history.push('/HistoricPhysicalInfoAdmin');
        }
    }

/**
* Method that redirect to the previous page
*/
    backButton() {
        this.props.history.push(`/HistoricPhysicalInfoAdmin`);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });

    }
    render() {
        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-label" font-size="18px" key={i}>Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Formulario Composición Corporal</h1>
                    </div>
                    <div className="col-4 offset-1 ">
                        {name}
                    </div>

                    <div className="col-10 offset-1 mt-4">
                        <form className="form-horizontal" >
                            <div className="row">
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputWeight">Peso</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputWeight" name="weight" placeholder="kg" size="3" value={this.state.weight} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputFat">Grasa Corporal</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputFat" name="totalBodyFat" size="3" placeholder="%" value={this.state.totalBodyFat} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputBodyWater">Agua Corporal</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputBodyWater" name="bodyWater" size="3" placeholder="%" value={this.state.bodyWater} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputMass">Masa Muscular</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputMass" name="muscleMass" size="3" value={this.state.muscleMass} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputPhysic">Valoración Física</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputPhysic" name="physicalAssesment" size="3" value={this.state.physicalAssesment} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputBoneMass">Masa Ósea</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputBoneMass" name="boneMass" size="3" value={this.state.boneMass} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputDCI/BMR">DCI/BMR</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputDCI/BMR" name="DCI" size="3" value={this.state.DCI} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputMetAge">Edad Metabólica</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputMetAge" name="metabolicAge" size="3" value={this.state.metabolicAge} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label font-size="18px" className="control-label" htmlFor="inputViceralFat">Grasa Visceral</label>
                                        <div className="controls">
                                            <input font-size="18px" type="decimal" id="inputVisceralFat" name="visceralFat" size="3" placeholder="%" value={this.state.visceralFat} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="mt-5 col-8">
                                    <button align="left" onClick={this.backButton} className="buttonSizeGeneral">Cancelar</button>
                                </div>
                                <div className="mt-5 col-4">
                                    <button align="right" onClick={this.saveChange} className="buttonSizeGeneral">Guardar cambios</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}
export default EditPhysicalInfo;