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
    }

    logOut() {
        this.props.history.push(`/`);
        window.location.reload();
        sessionStorage.clear();
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
    render() {
        return (
            <nav className="navbar navbar-expand-md navbarColor justify-content-end">
                <button class="navbar-toggler icon-bar navbar-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon "></span>
                </button>
                <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav text-center">

                        <li className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.userHome}>Rutina</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.medicalUserInfo}>Consulta médica</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.physicalUserInfo}>Composición corporal</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.userConfiguration}>Perfil</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.logOut}>Salir</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default withRouter(NavbarUserHome);