import React, { Component } from 'react';

class Recomendations extends Component {
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5 offset-1">
                    <form class="form-horizontal" >
                        <div className="col-6 offset-1">
                            <div class="control-group">
                                <label class="control-label" for="inputCardioVascularRisk">Riesgo Cardiovascular</label>
                                <div class="controls">
                                    <select name="rutineTypeDropDown" align="left" className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <div class="control-group">
                            <label class="control-label" for="inputRecomendations">Recomendaciones</label>
                            <div class="controls">
                                <input type="text" id="inputRecomendations" size="70"/>
                            </div>
                        </div>
                        </div>
                        </form>
                        </div>
                        </div>
        )
    }
}
export default Recomendations;