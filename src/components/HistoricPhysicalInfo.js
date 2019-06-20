import React, { Component } from 'react';


class HistoricPhysicalInfo extends Component {
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
            
                    <div className="col-10 offset-1 mt-4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Peso</th>
                                    <th scope="col">DCI/BMR</th>
                                    <th scope="col">Edad Metabólica</th>
                                    <th scope="col">%Agua Corporal</th>
                                    <th scope="col">Grasa Visceral</th>
                                    <th scope="col">Masa Ósea</th>
                                    <th scope="col">Grasa Total</th>
                                    <th scope="col">Masa Muscular</th>
                                    <th scope="col">Umbral Aeróbico</th>
                                    <th scope="col">Valoración Física</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
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

export default HistoricPhysicalInfo;