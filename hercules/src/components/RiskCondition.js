import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class RiskCondition extends Component {
    constructor(props) {
        super(props);
        /**
        *userTypeList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database
        * 
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            userTypeID: "3",
            show: false,
            isExit: false
        };

        this.addRiskConditon = this.addRiskConditon.bind(this);
        this.riskConditonToDelete = this.riskConditonToDelete.bind(this);

    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            //this.getAdminUserType();
        }
    }

    /**
    * Method that redirect to the requested page
    */
    addRiskConditon() {
        this.props.history.push(`/AddRiskCondition`);
    }

    riskConditonToDelete() {
        this.props.history.push(`/RiskConditionsDeleteList`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Condiciones de riesgo</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 className="text-left colorBlue">Configuración condiciones de riesgo</h1>
                            <br />
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.addRiskConditon}>Agregar condiciones de riesgo</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.riskConditonToDelete}>Eliminar condiciones de riesgo</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                                        <br />{this.state.modalChildren}
                                    </ModalComponent>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default RiskCondition;