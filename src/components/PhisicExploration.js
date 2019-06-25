import React, { Component } from 'react';

class PhisicExploration extends Component {
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5 offset-1">
                    <div className="col-12 ">
                        <form class="form-horizontal" >
                            <div className="row">
                                <div className="col-2 mt-4">
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputHeight">Talla</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputHeight" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputWeight">Peso</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputWeight" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputIMC">IMC</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputIMC" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputFCM">FCM</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputFCM" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputFC">FC</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputFC" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputSPO2">SPo2</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputSPO2" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputAbd">Abdomen</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputAbd" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputWaist">Cintura</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputWaist" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputHip">Cadera</label>
                                                <div class="controls">
                                                    <input type="decimal" id="inputHip" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <div class="control-group">
                                                <label class="control-label" for="inputPressure">Presión Arterial</label>
                                                <div class="controls">
                                                    <input type="text" id="inputPressure" size="10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-6 mt-4">
                                    <div class="control-group">
                                        <label class="control-label" for="inputNeurological">Neurológico</label>
                                        <div class="controls">
                                            <input type="text" id="inputNeurological" size="70" />
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="inputPulmonary">Cardiopulmonar</label>
                                        <div class="controls">
                                            <input type="text" id="inputPulmonary" size="70" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default PhisicExploration;
