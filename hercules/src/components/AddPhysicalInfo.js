import React, { Component } from 'react';

class AddPhysicalInfo extends Component {
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
                        <form class="form-horizontal" >
                            <div className="row">
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputWeight">Peso</label>
                                <div class="controls">
                                    <input type="decimal" id="inputWeight" placeholder="kg" size="3"/>
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputDCI/BMR">DCI/BMR</label>
                                <div class="controls">
                                    <input type="decimal" id="inputDCI/BMR" size="3" />
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputBodyWater">Agua Corporal</label>
                                <div class="controls">
                                    <input type="decimal" id="inputBodyWater" size="3" placeholder="%"/>
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputViceralFat">Grasa Visceral</label>
                                <div class="controls">
                                    <input type="decimal" id="inputViceralFat" size="3" placeholder="%"/>
                                </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputBoneMass">Masa Ósea</label>
                                <div class="controls">
                                    <input type="decimal" id="inputBoneMass" size="3" />
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
                                    <input type="decimal" id="inputAerobic" size="3" />
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputMetAge">Edad Metabólica</label>
                                <div class="controls">
                                    <input type="decimal" id="inputMetAge" size="3" />
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputFat">Grasa Total</label>
                                <div class="controls">
                                    <input type="decimal" id="inputFat" size="3" placeholder="%" />
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputMass">Masa Muscular</label>
                                <div class="controls">
                                    <input type="decimal" id="inputMass" size="3" />
                                </div>
                                </div>
                                </div>
                                <div className="col-2 mt-4">
                            <div class="control-group">
                                <label class="control-label" for="inputPhysic">Valoración Física</label>
                                <div class="controls">
                                    <input type="decimal" id="inputPhysic" size="3" />
                                </div>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 offset-7 mt-4">
                                    <br/>
                                <button align="right" className="buttonSizeGeneral">Guardar</button>

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