import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class EditPhysicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validations: new validations(),
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

        if (this.state.weight.toString().trim().length === 0 || this.state.bodyWater.toString().trim().length === 0 ||
        this.state.visceralFat.toString().trim().length === 0 || this.state.boneMass.toString().trim().length === 0 ||
        this.state.DCI.toString().trim().length === 0 || this.state.metabolicAge.toString().trim().length === 0 ||
        this.state.totalBodyFat.toString().trim().length === 0 || this.state.muscleMass.toString().trim().length === 0 ||
        this.state.physicalAssesment.toString().trim().length === 0) {
            alert("Todos los campos deben de estar llenos");

        } else if (!this.state.validations.validateKg(this.state.weight.toString().trim())) {
            alert("El peso debe estar formado por un máximo de 3 números, puede contener punto decimal y dos decimales máximo");

        } else if (!this.state.validations.validatePercent(this.state.totalBodyFat.toString().trim())) {
            alert("El porcentaje de grasa corporal solo debe contener números de entre 0 a 100, con punto decimal y dos decimales máximo");
            
        } else if (!this.state.validations.validatePercent(this.state.bodyWater.toString().trim())) {
            alert("El porcentaje de agua corporal solo debe contener números de entre 0 a 100, con punto decimal y dos decimales máximo");
            
        } else if (!this.state.validations.validateKg(this.state.muscleMass.toString().trim())) {
            alert("La masa muscular debe estar formada por un máximo de 3 números, puede contener punto decimal y dos decimales máximo");
            
        } else if (!this.state.validations.validatePhysicalAssesment(this.state.physicalAssesment.toString().trim())) {
            alert("La valoración física debe ser un número entre 1 y 9");
            
        } else if (!this.state.validations.validateKg(this.state.boneMass.toString().trim())) {
            alert("La masa ósea debe estar formada por un máximo de 3 números, puede contener punto decimal y dos decimales máximo");            

        } else if (!this.state.validations.validateDCI(this.state.DCI.toString().trim())) { 
            alert("El DCI/BMR debe estar formado por un máximo de 5 números, puede contener punto decimal y dos decimales máximo");            
            
        } else if (!this.state.validations.validateMetabolicAge(this.state.metabolicAge.toString().trim())) {
            alert("La edad metabólica debe de estar compuesta únicamente de 3 números como máximo");

        } else if (!this.state.validations.validateViceralFat(this.state.visceralFat.toString().trim())) {
            alert("La grasa viceral debe ser un número entre 1 y 60");
        } else {
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
                window.location.reload();
            }
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
                  <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/HistoricPhysicalInfoAdmin">Composición Corporal</Breadcrumb.Item>
                        <Breadcrumb.Item>Formulario Composición Corporal</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
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