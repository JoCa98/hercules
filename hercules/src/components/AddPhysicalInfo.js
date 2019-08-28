import React, { Component } from 'react';
import axios from 'axios';

class AddPhysicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleSubmit = event => {

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

        event.preventDefault();
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
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Formulario Composición Corporal</h1>
                    </div>
                    <div className="col-4 offset-1 ">
                        {name}
                    </div>
                    <div className="col-10 offset-1 mt-4">
                        <form className="form-horizontal" onSubmit={this.handleSubmit} >
                            <div className="row">
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputWeight">Peso</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputWeight" name="weight" placeholder="kg" size="3" value={this.state.weight} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputFat">Grasa Corporal</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputFat" name="totalBodyFat" size="3" placeholder="%" value={this.state.totalBodyFat} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputBodyWater">Agua Corporal</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputBodyWater" name="bodyWater" size="3" placeholder="%" value={this.state.bodyWater} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputMass">Masa Muscular</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputMass" name="muscleMass" size="3" value={this.state.muscleMass} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputPhysic">Valoración Física</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputPhysic" name="physicalAssesment" size="3" value={this.state.physicalAssesment} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputBoneMass">Masa Ósea</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputBoneMass" name="boneMass" size="3" value={this.state.boneMass} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputDCI/BMR">DCI/BMR</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputDCI/BMR" name="DCI" size="3" value={this.state.DCI} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputMetAge">Edad Metabólica</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputMetAge" name="metabolicAge" size="3" value={this.state.metabolicAge} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="inputViceralFat">Grasa Visceral</label>
                                        <div className="controls">
                                            <input type="decimal" id="inputViceralFat" name="viceralFat" size="3" placeholder="%" value={this.state.viceralFat} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" mt-5 col-md-8">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                                <div className=" mt-5 col-md-4">
                                    <button align="right" name="save" type="submit" className="buttonSizeGeneral">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddPhysicalInfo;