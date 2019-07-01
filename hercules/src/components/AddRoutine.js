import React, { Component } from 'react';
import Carousel from './RoutineCarouselWrite';
import './AddRutine.css';

class AddRoutine extends Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        const nameText = event.target.name;
        const valueText = event.target.value;
        this.setState({
            [nameText]: valueText
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.actCode.trim() !== "") {
            alert(this.state.actCode.trim());
        } else {
            alert('Campos obligatorios vacíos');
        }
    }
    render() {

        return (

            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                        <form className="AddRutineForm" onSubmit={this.handleSubmit}>

                            <h2 className="text-center colorBlue mb-4">Agregar rutina</h2>

                            <div className="row">

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tipo de rutina:</p>
                                                </div>
                                                <div className="col-6">
                                                    <select name="rutineTypeDropDown" align="left" className="form-control">
                                                        <option value="1">Circuito</option>
                                                        <option value="2">Funcional</option>
                                                        <option value="3">Contra-resistencia</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Objetivo:</p>
                                                </div>
                                                <div className="col-6">
                                                    <select name="objectiveDropDown" align="left" className="form-control">
                                                        <option value="1">Acondicionamiento físico</option>
                                                        <option value="2">Hipertrofia</option>
                                                        <option value="3">Potencia</option>
                                                        <option value="4">Fuerza</option>
                                                        <option value="5">Resistencia muscular</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Frecuencia:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textFrecuency" className="form-control" onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Intensidad:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textIntensity" className="form-control" onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Densidad:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textDensity" className="form-control" onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tiempo de descanso:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRestTime" className="form-control" onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Carousel />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 offset-5">
                                    <button type="submit" align="right" name="saveButton" className="cssCodeButtonConfirm"> Guardar </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default AddRoutine;