import React, { Component } from 'react';
import axios from "axios";

import {Link } from 'react-router-dom';

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
            <nav className="navbar navbar-expand-sm bg-light justify-content-end" backgroud-color="ECECEC">
                <ul className="nav justify-content-end">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Inicio<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Valoraciones físicas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Valoraciones médicas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Composición física</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/UserConfiguration">Perfil</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0);">Salir</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default NavbarUserHome;