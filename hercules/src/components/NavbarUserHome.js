import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class NavbarUserHome extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(){
        this.props.history.push(`/`);
        window.location.reload();
        sessionStorage.clear();
    }
    render() {
        return (
            <div className="container-fluid navbarColor">
                <div className="row ">
                    <div className="col-12 text-center">
                        <nav className="navbar navbar-expand-md navbarColor justify-content-end">
                            <button class="navbar-toggler icon-bar navbar-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                                <span class="navbar-toggler-icon "></span>
                            </button>
                            <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                                <ul className="navbar-nav text-center">

                                    <li className="nav-item active ml-4 mt-1">
                                        <Link to="/UserHome" className="align-middle">Rutina</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/HistoricMedicalUserInfo" className="align-middle">Consulta médica</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/HistoricPhysicalUserInfo" className="align-middle">Composición corporal</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/UserConfiguration" className="align-middle">Perfil</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/" className="align-middle" onClick={this.logOut}>Salir</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter(NavbarUserHome);