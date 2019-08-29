import React, { Component } from 'react';
import TablePhysicalInfo from './TablePhysicalInfo';

class HistoricPhysicalUserInfo extends Component {
  constructor(props) {
    super(props);
    this.backButton = this.backButton.bind(this);
  }

  /**
  * Method that redirect to the previous page
  */
  backButton() {
    this.props.history.push(`/UserHome`);
  }
  
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
          <div className="col-12 mt-4">
            <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
          </div>
        </div>
      </div>
    )
  }
}

export default HistoricPhysicalUserInfo;