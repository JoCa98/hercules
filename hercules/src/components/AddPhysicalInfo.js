import React, { Component } from 'react';

class AddPhysicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partyID: 1,
            date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            weight: "",
            aerobicThreshold: "",
            bodyWater: "",
            viceralFat: "",
            boneMass: "",
            DCI: "",
            metabolicAge:"",
            totalBodyFat: "",
            muscleMass: "",
            physicalAssesment: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
                console.log(data);
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
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Formulario Composición Corporal</h1>
                    </div>
                    <div className="col-4 offset-1 ">
                        <h4 className="text-left">Nombre del usuario</h4>
                    </div>

                    <div className="col-10 offset-1 mt-4">
                        <form class="form-horizontal" onSubmit={this.handleSubmit} >
                            <div className="row">
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputWeight">Peso</label>
                                <div class="controls">
                                    <input type="decimal" id="inputWeight" name ="weight" placeholder="kg" size="3" value={this.state.weight} onChange={this.handleInputChange}/>
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputDCI/BMR">DCI/BMR</label>
                                <div class="controls">
                                    <input type="decimal" id="inputDCI/BMR" name ="DCI"  size="3" value={this.state.DCI} onChange={this.handleInputChange}/>
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputBodyWater">Agua Corporal</label>
                                <div class="controls">
                                    <input type="decimal" id="inputBodyWater"  name ="bodyWater" size="3" placeholder="%" value={this.state.bodyWater} onChange={this.handleInputChange}/>
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputViceralFat">Grasa Visceral</label>
                                <div class="controls">
                                    <input type="decimal" id="inputViceralFat"  name ="viceralFat"  size="3" placeholder="%" value={this.state.viceralFat} onChange={this.handleInputChange}/>
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputBoneMass">Masa Ósea</label>
                                <div class="controls">
                                    <input type="decimal" id="inputBoneMass"  name ="boneMass"  size="3" value={this.state.boneMass} onChange={this.handleInputChange} />
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputAerobic">Umbral Aeróbico</label>
                                <div class="controls">
                                    <input type="decimal" id="inputAerobic"  name ="aerobicThreshold" size="3" value={this.state.aerobicThreshold} onChange={this.handleInputChange} />
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputMetAge">Edad Metabólica</label>
                                <div class="controls">
                                    <input type="decimal" id="inputMetAge"  name ="metabolicAge"  size="3" value={this.state.metabolicAge} onChange={this.handleInputChange}/>
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputFat">Grasa Total</label>
                                <div class="controls">
                                    <input type="decimal" id="inputFat"  name ="totalBodyFat" size="3" placeholder="%" value={this.state.totalBodyFat} onChange={this.handleInputChange} />
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputMass">Masa Muscular</label>
                                <div class="controls">
                                    <input type="decimal" id="inputMass"  name ="muscleMass"  size="3" value={this.state.muscleMass} onChange={this.handleInputChange}/>
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputPhysic">Valoración Física</label>
                                <div class="controls">
                                    <input type="decimal" id="inputPhysic" name ="physicalAssesment" size="3" value={this.state.physicalAssesment} onChange={this.handleInputChange} />
                                </div>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 offset-7 mt-4">
                                    <br/>
                                <button align="right" type="submit" className="buttonSizeGeneral">Guardar</button>
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