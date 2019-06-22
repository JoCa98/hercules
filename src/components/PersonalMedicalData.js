import React, { Component } from 'react';

class PersonalMedicalData extends Component {
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5 offset-1">
                <form class="form-horizontal" >
                    <div className="col-6 offset-1">
                        <div class="control-group">
                            <label class="control-label" for="inputPatologic">Patológicos</label>
                            <div class="controls">
                                <input type="decimal" id="inputPatologic" size="70" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="inputAllergy">Alergias</label>
                            <div class="controls">
                                <input type="decimal" id="inputAllergy" size="70" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="inputTabaquism">Tabaquismo</label>
                            <div class="controls">
                                <input type="decimal" id="inputTabaquism" size="70" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="inputSurgeries">Cirugías</label>
                            <div class="controls">
                                <input type="decimal" id="inputSurgeries" size="70" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="inputTraumas">Traumas</label>
                            <div class="controls">
                                <input type="decimal" id="inputTraumas" size="70" />
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default PersonalMedicalData;