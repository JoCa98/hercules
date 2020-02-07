import React, { Component } from 'react';
import TablePhysicalInfo from './TablePhysicalInfo';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";


class HistoricPhysicalUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permissionsManager: new PermissionsManager()
    }

    this.backButton = this.backButton.bind(this);
  }

  componentDidMount() {
    this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
    window.scrollTo(0, 0);
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
        <div className="row mt-4">
          <Breadcrumb>
            <Breadcrumb.Item href="#/UserHome">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item>Composición Corporal</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="row card mt-2 p-5">
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