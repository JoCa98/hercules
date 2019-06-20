import React, { Component } from 'react';
import './UserHome.css';

class UserHome extends Component {

    render() {

        return (

            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                        <form className="userHomeForm">

                            <h2 className="text-center colorBlue mb-4">Rutina actual</h2>

                            <div className="row">

                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label className="cssLabelText">Tipo de rutina: </label>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRutineType" className="cssInputText" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label className="cssLabelText">Objetivo:</label>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textObjective" className="cssInputText" disabled="disabled" />
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
                                                    <label className="cssLabelText">Frecuencia:</label>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textFrecuency" className="cssInputText" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label className="cssLabelText">Intensidad:</label>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textIntensity" className="cssInputText" disabled="disabled" />
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
                                                    <label className="cssLabelText">Densidad:</label>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textDensity" className="cssInputText" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label className="cssLabelText">Tiempo de descanso:</label>
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="textRestTime" className="cssInputText" disabled="disabled" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default UserHome;