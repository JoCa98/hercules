import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';
import axios from "axios"; 
class HistoricRoutineInfo extends Component {
    constructor() {
        super();
        /**
        * userName
        * @type {String}
        * Property that contains the name of the user
        * partyID
        * @type {Integer}
        * Property that contains the id of the user
        */
        this.state = {
            userName: [{}],
            partyID: 1
        }

        this.redirect = this.redirect.bind(this);

    }

    redirect() {
        window.location = "https://www.google.com/";
    }

    /**
    * Method that can get full name of the user
    * when the page is load
    */
    componentDidMount() {
        try {
            axios.get(`http://localhost:9000/User/getUserName`,
                {
                    params: { partyID: this.state.partyID }
                }).then(response => {
                    const userName = response.data[0];
                    this.setState({ userName });
                });
        } catch (err) {
            console.error(err);
        }
    }



    render() {

        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-control">Usuario: {userName.fullName}</label>
            )
        })

        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Lista de rutinas</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-ceter">
                                {name}
                            </div>
                            <div className="col-4 offset-1">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 offset-1 mt-4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Tipo rutina</th>
                                    <th scope="col">Objetivo</th>
                                    <th scope="col">Frecuencia</th>
                                    <th scope="col">Intensidad</th>
                                    <th scope="col">Tiempo</th>
                                    <th scope="col">Densidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricRoutineInfo;