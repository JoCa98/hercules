import React, { Component } from 'react';

class NavbarAdmin extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light justify-content-end" backgroud-color="ECECEC">
                <ul className="nav justify-content-end">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Inicio<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Agregar administrador</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Perfil</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Salir</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default NavbarAdmin;