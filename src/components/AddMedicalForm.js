import React, { Component } from 'react';
import PersonalMedicalData from './PersonalMedicalData';
import Recomendations from './Recomendations';
import PhisicExploration from './PhisicExploration';

class AddMedicalForm extends Component {
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Composición Corporal</h1>
                    </div>
                    <div className="col-4 offset-1 ">
                        <h4 className="text-left">Nombre del usuario</h4>
                    </div>
                    <div className="row">
                    <div className="col-6 offset-1">
                        <br/>
                    <button className="buttonSizeGeneral">Ant. Personales</button>
                    <button className="buttonSizeGeneral">Exploración Física</button>
                    <button className="buttonSizeGeneral">Recomendaciones</button>
                    </div>
                    <div className="col-12">
                            <PhisicExploration/>
                        </div>
                    </div>
            
                        
                   
                   </div>
                   </div>
        )
    }
}
export default AddMedicalForm;
