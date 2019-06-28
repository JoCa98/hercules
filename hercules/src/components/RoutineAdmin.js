import React, { Component } from 'react';
import Carousel from './RoutineCarousel';
import './UserHome.css';

class RoutineAdmin extends Component {

    render() {

        return (

            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                        <form className="RoutineAdminForm">

                            <h2 className="text-center colorBlue mb-4">Rutina actual del usuario</h2>

                            <div className="row">
                                <div className="col-6 col-md-2">
                                    <p className="cssPText">Usuario: </p>
                                </div>
                                <div className="col-6 col-md-2">
                                    <label> *agregar nombre*</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tipo de rutina: </p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRutineType" className="form-control" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Objetivo:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textObjective" className="form-control" disabled="disabled" />
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
                                                    <input type="text" name="textFrecuency" className="form-control" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Intensidad:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textIntensity" className="form-control" disabled="disabled" />
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
                                                    <input type="text" name="textDensity" className="form-control" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="cssPText">Tiempo de descanso:</p>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRestTime" className="form-control" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Carousel/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default RoutineAdmin;