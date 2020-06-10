import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class AccountConfiguration extends Component {
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
            //
            adminsList: [],
            medicsList: [],
            //
            userTypeID: "3",
            show: false,
            isExit: false
        };

        this.adminsList = this.adminsList.bind(this);
        this.activeMedicsList = this.activeMedicsList.bind(this);
        this.inactiveMedicsList = this.inactiveMedicsList.bind(this);
        this.activateMedic = this.activateMedic.bind(this);
        this.deactivateMedic = this.deactivateMedic.bind(this);
        this.eliminateGymAdmin = this.eliminateGymAdmin.bind(this);

    }

    componentDidMount() {
        /* if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {*/
        window.scrollTo(0, 0);
        /*}*/
    }
    
    getAdminsList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/AdminAccounts`).then(response => {
                const adminsList = response.data[0];
                this.setState({ adminsList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    //Este trae todos los medicos, activos o no **
    getActiveMedicsList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/MedicalAccounts`).then(response => {
                const medicsList = response.data[0];
                this.setState({ medicsList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    getInactiveMedicsList() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/InactiveMedics`).then(response => {
                const medicsList = response.data[0];
                this.setState({ medicsList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    activateMedicMethod() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/ChangeMedicStatus`,
            { params: { email: this.state.searchInput ,status: 1} }).then(response => {
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    deactivateMedicMethod() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/ChangeMedicStatus`,
            { params: { email: this.state.searchInput ,status: 0} }).then(response => {
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    eliminateGymAdminMethod() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/DeleteAdmin`,
            { params: { email: this.state.deleteInput} }).then(response => {
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that redirect to the requested page
    */
    adminsList() {
        this.props.history.push(`/AdminsList`);
    }

    activeMedicsList() {
        this.props.history.push(`/activeMedicsList`);
    }

    inactiveMedicsList() {
        this.props.history.push(`/inactiveMedicsList`);
    }

    activateMedic() {
        this.props.history.push(`/activateMedic`);
    }

    deactivateMedic() {
        this.props.history.push(`/deactivateMedic`);
    }

    eliminateGymAdmin() {
        this.props.history.push(`/eliminateGymAdmin`);
    }


    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/Configuration">Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item>Configuración de cuentas</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 className="text-left colorBlue">Configuración de cuentas</h1>
                            <br />
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.adminsList}>Ver administadores del gimnasio</button>
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.activeMedicsList}>Ver medicos activos</button>
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.inactiveMedicsList}>Ver medicos inactivos</button>
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.activateMedic}>Activar medico</button>
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.deactivateMedic}>Desactivar medico</button>
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.eliminateGymAdmin}>Eliminar administador del gimnasio</button>
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
export default AccountConfiguration;