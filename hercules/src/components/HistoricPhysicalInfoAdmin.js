import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';
import TablePhysicalInfo from './TablePhysicalInfo';


class AdminHistoricPhysicalInfo extends Component {



    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Composición Corporal</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-ceter">
                                <label className="form-control">Usuario: Jose Carlos Chavez Moran</label>
                            </div>
                            <div className="col-4 offset-1">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4 text-center">
                    <TablePhysicalInfo />
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminHistoricPhysicalInfo;