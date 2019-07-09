import React, { Component } from 'react';
import TablePhysicalInfo from './TablePhysicalInfo';


class HistoricPhysicalUserInfo extends Component {
  render() {
    return (
      <div className="container">
        <div className="row card mt-4 p-5">
          <div className="col-12">
            <h1 className="text-left colorBlue">Composición Corporal</h1>
          </div>
          <div className="col-12 mt-4 text-center">
            <TablePhysicalInfo />
          </div>
        </div>
      </div>
    )
  }

}

export default HistoricPhysicalUserInfo;