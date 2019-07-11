import React, { Component } from 'react';
import axios from "axios";

import { Link } from 'react-router-dom';

class NavbarUserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identificationID: "",
            firstName: "",
            secondName: "",
            lastName: "",
            secondLastName: "",
            career: "",
            carnet: "",
            userTypeID: "",
            email: "",
            password: "",
            phoneNumber1: "",
            phoneNumber2: "",
            districtID: "",
            addressLine: "",
            contactName: "",
            relationTypeID: "",
            emergencyContactPhoneNumber: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }



    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
                                        <Link to="/UserConfiguration" className="align-middle">Rutina</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/UserConfiguration" className="align-middle">Consulta médica</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/UserConfiguration" className="align-middle">Composición corporal</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/UserConfiguration" className="align-middle">Perfil</Link>
                                    </li>
                                    <li className="nav-item ml-4 mt-1">
                                        <Link to="/UserConfiguration" className="align-middle">Salir</Link>
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
export default NavbarUserHome;