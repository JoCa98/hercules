import React, { Component } from 'react';
import TablePhysicalInfo from './TablePhysicalInfo';


class AdminHistoricPhysicalInfo extends Component {
    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Composición Corporal</h1>
                    </div>
                    <div className="row">
                    <div className="col-4 offset-1 ">
                        <h4 className="text-left">Nombre del usuario</h4>
                    </div>
                    </div>
                   
                    <div className="col-12  mt-4">
                        <TablePhysicalInfo />
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminHistoricPhysicalInfo;