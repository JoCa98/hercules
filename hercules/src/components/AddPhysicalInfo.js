import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class AddPhysicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validations: new validations(),
            userName: [{}],
            partyID: sessionStorage.getItem("userPartyID"),
            date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            weight: "",
            bodyWater: "",
            viceralFat: "",
            boneMass: "",
            DCI: "",
            metabolicAge: "",
            totalBodyFat: "",
            muscleMass: "",
            physicalAssesment: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:9000/User/getUserName`,
            {
                params: { partyID: this.state.partyID }
            }).then(response => {
                const userName = response.data[0];
                this.setState({ userName });
            });
    }

    handleSubmit() {
        if (this.state.weight.trim().length === 0 || this.state.bodyWater.trim().length === 0 ||
            this.state.viceralFat.trim().length === 0 || this.state.boneMass.trim().length === 0 ||
            this.state.DCI.trim().length === 0 || this.state.metabolicAge.trim().length === 0 ||
            this.state.totalBodyFat.trim().length === 0 || this.state.muscleMass.trim().length === 0 ||
            this.state.physicalAssesment.trim().length === 0) {
            alert("Todos los campos deben de estar llenos");

        } else if (!this.state.validations.validateKg(this.state.weight.trim())) {
            alert("El peso debe estar formado por un máximo de 3 números, puede contener punto decimal y dos decimales máximo");

        } else if (!this.state.validations.validatePercent(this.state.totalBodyFat.trim())) {
            alert("El porcentaje de grasa corporal solo debe contener números de entre 0 a 100, con punto decimal y dos decimales máximo");

        } else if (!this.state.validations.validatePercent(this.state.bodyWater.trim())) {
            alert("El porcentaje de agua corporal solo debe contener números de entre 0 a 100, con punto decimal y dos decimales máximo");

        } else if (!this.state.validations.validateKg(this.state.muscleMass.trim())) {
            alert("La masa muscular debe estar formada por un máximo de 3 números, puede contener punto decimal y dos decimales máximo");

        } else if (!this.state.validations.validatePhysicalAssesment(this.state.physicalAssesment.trim())) {
            alert("La valoración física debe ser un número entre 1 y 9");

        } else if (!this.state.validations.validateKg(this.state.boneMass.trim())) {
            alert("La masa ósea debe estar formada por un máximo de 3 números, puede contener punto decimal y dos decimales máximo");

        } else if (!this.state.validations.validateDCI(this.state.DCI.trim())) {
            alert("El DCI/BMR debe estar formado por un máximo de 5 números, puede contener punto decimal y dos decimales máximo");

        } else if (!this.state.validations.validateMetabolicAge(this.state.metabolicAge.trim())) {
            alert("La edad metabólica debe de estar compuesta únicamente de 3 números como máximo");

        } else if (!this.state.validations.validateViceralFat(this.state.viceralFat.trim())) {
            alert("La grasa viceral debe ser un número entre 1 y 60");
        } else {
            //Agregar correctamente
            fetch("http://localhost:9000/PhysicalInfo/addPhysicalInfo", {
                method: "post",
                body: JSON.stringify(this.state),

                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.props.history.push('/HistoricPhysicalInfoAdmin');
                })
                .catch(err => console.error(err));

        }

    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });

    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/HistoricPhysicalInfoAdmin`);
    }

    render() {
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
                        <div className="row">
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputWeight">Peso</label>
                                    <div className="controls">
                                        <input type="decimal" font-size="18px" id="inputWeight" name="weight" placeholder="kg" size="3" value={this.state.weight} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputFat">Grasa Corporal</label>
                                    <div className="controls">
                                        <input type="decimal" id="inputFat" font-size="18px" name="totalBodyFat" size="3" placeholder="%" value={this.state.totalBodyFat} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputBodyWater">Agua Corporal</label>
                                    <div className="controls">
                                        <input type="decimal" id="inputBodyWater" font-size="18px" name="bodyWater" size="3" placeholder="%" value={this.state.bodyWater} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputMass">Masa Muscular</label>
                                    <div className="controls">
                                        <input type="decimal" id="inputMass" font-size="18px" name="muscleMass" size="3" value={this.state.muscleMass} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputPhysic">Valoración Física</label>
                                    <div className="controls">
                                        <input type="decimal" id="inputPhysic" font-size="18px" name="physicalAssesment" size="3" value={this.state.physicalAssesment} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputBoneMass">Masa Ósea</label>
                                    <div className="controls">
                                        <input type="decimal" font-size="18px" id="inputBoneMass" name="boneMass" size="3" value={this.state.boneMass} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputDCI/BMR">DCI/BMR</label>
                                    <div className="controls">
                                        <input type="decimal" font-size="18px" id="inputDCI/BMR" name="DCI" size="3" value={this.state.DCI} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputMetAge">Edad Metabólica</label>
                                    <div className="controls">
                                        <input type="decimal" font-size="18px" id="inputMetAge" name="metabolicAge" size="3" value={this.state.metabolicAge} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label className="control-label" font-size="18px" htmlFor="inputViceralFat">Grasa Visceral</label>
                                    <div className="controls">
                                        <input type="decimal" font-size="18px" id="inputViceralFat" name="viceralFat" size="3" placeholder="%" value={this.state.viceralFat} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" mt-5 col-8">
                                <button align="left" font-size="18px" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                            <div className=" mt-5 col-4">
                                <button align="right" name="save" type="submit" className="buttonSizeGeneral" onClick={this.handleSubmit}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddPhysicalInfo;