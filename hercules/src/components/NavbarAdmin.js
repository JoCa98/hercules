import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class NavbarAdmin extends Component {
    constructor(props){
        super(props);
        this.homeAdmin = this.homeAdmin.bind(this);
        this.addAdmin = this.addAdmin.bind(this);
        this.adminConfig = this.adminConfig.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    homeAdmin() {
        this.props.history.push(`/HomeAdmin`);
    }

    addAdmin() {
        this.props.history.push(`/AddAdmin`);
    }

    adminConfig(){
        this.props.history.push(`/ConfigurationAdmin`);
    }

    logOut(){
        this.props.history.push(`/`);
        window.location.reload();
        sessionStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbarColor justify-content-end">
                <button className="navbar-toggler icon-bar navbar-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav text-center">

                        <li id= "home" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.homeAdmin}>Inicio</button>
                        </li>
                        <li id= "addAdmin" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.addAdmin}>Agregar administrador</button>
                        </li>
                        <li id= "admConfig" className="nav-item">
                            <button className="btn buttonNavbar" onClick={this.adminConfig} >Perfil</button>
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
export default withRouter(NavbarAdmin);