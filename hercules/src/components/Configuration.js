/**
 * @fileoverview Career page, this page shows a menu to configure different aspects of the system.
 * @version 1.0
 *
 * @author Victor Bolaños <victor.bolanos@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class Configuration extends Component {
    constructor(props) {
        super(props);
        /**
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

        this.careerConfiguration = this.careerConfiguration.bind(this);
        this.routineConfiguration = this.routineConfiguration.bind(this);
        this.tipsConfiguration = this.tipsConfiguration.bind(this);
        this.accountConfiguration = this.accountConfiguration.bind(this);

    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
        }
    }

    /**
    * Methods that redirect to the requested page
    */
    careerConfiguration() {
        this.props.history.push(`/CareerConfiguration`);
    }

    routineConfiguration() {
        this.props.history.push(`/ConfigurationRoutine`);
    }

    tipsConfiguration() {
        this.props.history.push(`/TipsAdmin`);
    }

    accountConfiguration() {
        this.props.history.push(`/AccountConfiguration`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Configuración</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 className="text-left colorBlue">Configuración</h1>
                            <br />
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.careerConfiguration}>Configuración carreras</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.routineConfiguration}>Configuración rutina</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.tipsConfiguration}>Configuración consejos</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.accountConfiguration}>Configuración cuentas</button>
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
export default Configuration;