import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class NavbarUserHome extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.userHome = this.userHome.bind(this);
        this.userConfiguration = this.userConfiguration.bind(this);
        this.medicalUserInfo = this.medicalUserInfo.bind(this);
        this.physicalUserInfo = this.physicalUserInfo.bind(this);

        this.homeAdmin = this.homeAdmin.bind(this);
        this.addAdmin = this.addAdmin.bind(this);
        this.adminConfig = this.adminConfig.bind(this);
        this.configuration = this.configuration.bind(this);
        this.reports = this.reports.bind(this);
    }
    componentDidMount() {
        if (sessionStorage.getItem('partyID') === undefined
            || sessionStorage.getItem('partyID') === null) {
            document.getElementById('rutine').style.display = 'none';
            document.getElementById('medicalInfo').style.display = 'none';
            document.getElementById('physicalInfo').style.display = 'none';
            document.getElementById('userProfile').style.display = 'none';
            document.getElementById('homeAdmin').style.display = 'none';
            document.getElementById('addAdmin').style.display = 'none';
            document.getElementById('adminConfig').style.display = 'none';
            document.getElementById('configuration').style.display = 'none';
            document.getElementById('reports').style.display = 'none';

            document.getElementById('logOut').style.display = 'none';

        } else {
            if (sessionStorage.getItem('userTypeID') === "1"
                || sessionStorage.getItem('userTypeID') === "2") {

                document.getElementById('rutine').style.display = 'block';
                document.getElementById('medicalInfo').style.display = 'block';
                document.getElementById('physicalInfo').style.display = 'block';
                document.getElementById('userProfile').style.display = 'block';

                document.getElementById('homeAdmin').style.display = 'none';
                document.getElementById('addAdmin').style.display = 'none';
                document.getElementById('adminConfig').style.display = 'none';
                document.getElementById('configuration').style.display = 'none';
                document.getElementById('reports').style.display = 'none';

            } else if (sessionStorage.getItem('userTypeID') === "3") {

                document.getElementById('rutine').style.display = 'none';
                document.getElementById('medicalInfo').style.display = 'none';
                document.getElementById('physicalInfo').style.display = 'none';
                document.getElementById('userProfile').style.display = 'none';

                document.getElementById('homeAdmin').style.display = 'block';
                document.getElementById('addAdmin').style.display = 'none';
                document.getElementById('adminConfig').style.display = 'block';
                document.getElementById('configuration').style.display = 'none';
                document.getElementById('reports').style.display = 'none';

            } else if (sessionStorage.getItem('userTypeID') === "4") {
                document.getElementById('rutine').style.display = 'none';
                document.getElementById('medicalInfo').style.display = 'none';
                document.getElementById('physicalInfo').style.display = 'none';
                document.getElementById('userProfile').style.display = 'none';
                document.getElementById('configuration').style.display = 'none';

                document.getElementById('homeAdmin').style.display = 'block';
                document.getElementById('addAdmin').style.display = 'block';
                document.getElementById('adminConfig').style.display = 'block';
                document.getElementById('reports').style.display = 'block';

            } else if (sessionStorage.getItem('userTypeID') === "5") {
                document.getElementById('rutine').style.display = 'none';
                document.getElementById('medicalInfo').style.display = 'none';
                document.getElementById('physicalInfo').style.display = 'none';
                document.getElementById('userProfile').style.display = 'none';
                document.getElementById('homeAdmin').style.display = 'none';
                document.getElementById('addAdmin').style.display = 'none';
                document.getElementById('adminConfig').style.display = 'none';
                document.getElementById('reports').style.display = 'none';
                document.getElementById('configuration').style.display = 'none';

            } else if (sessionStorage.getItem('userTypeID') === "6") {
                document.getElementById('rutine').style.display = 'none';
                document.getElementById('medicalInfo').style.display = 'none';
                document.getElementById('physicalInfo').style.display = 'none';
                document.getElementById('userProfile').style.display = 'none';

                document.getElementById('homeAdmin').style.display = 'block';
                document.getElementById('addAdmin').style.display = 'block';
                document.getElementById('adminConfig').style.display = 'block';
                document.getElementById('configuration').style.display = 'block';
                document.getElementById('reports').style.display = 'block';
            }
            document.getElementById('logOut').style.display = 'block';
        }
    }


    logOut() {
        sessionStorage.clear();
        this.props.history.push(`/`);
        window.location.reload();

    }

    userHome() {
        this.props.history.push(`/UserHome`);
    }

    userConfiguration() {
        this.props.history.push(`/UserConfiguration`);
    }

    medicalUserInfo() {
        this.props.history.push(`/HistoricMedicalUserInfo`);
    }

    physicalUserInfo() {
        this.props.history.push(`/HistoricPhysicalUserInfo`);
    }

    homeAdmin() {
        this.props.history.push(`/HomeAdmin`);
    }

    addAdmin() {
        this.props.history.push(`/AddAdmin`);
    }

    adminConfig() {
        this.props.history.push(`/ConfigurationAdmin`);
    }

    configuration() {
        this.props.history.push(`/Configuration`);
    }

    reports(){
        this.props.history.push(`/Reports`);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbarColor justify-content-end">
                <button className="navbar-toggler icon-bar navbar-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav text-center">

                        <li id="rutine" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.userHome}>Rutina</button>
                        </li>
                        <li id="medicalInfo" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.medicalUserInfo}>Consulta médica</button>
                        </li>
                        <li id="physicalInfo" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.physicalUserInfo}>Composición corporal</button>
                        </li>
                        <li id="userProfile" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.userConfiguration}>Perfil</button>
                        </li>

                        <li id="homeAdmin" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.homeAdmin}>Inicio</button>
                        </li>
                        <li id="addAdmin" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.addAdmin}>Agregar administrador</button>
                        </li>
                        <li id="configuration" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.configuration}>Configuración</button>
                        </li>
                        <li id="reports" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.reports}>Reportes</button>
                        </li>
                        <li id="adminConfig" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.adminConfig}>Perfil</button>
                        </li>

                        <li id="logOut" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.logOut}>Salir</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default withRouter(NavbarUserHome);