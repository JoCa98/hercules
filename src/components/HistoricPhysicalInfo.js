import React, { Component } from 'react';
import TablePhysicalInfo from './components/TablePhysicalInfo';


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
                        <TablePhysicalInfo />
                    </div>
                </div>
            </div>
        )
    }

}

export default HistoricPhysicalInfo;