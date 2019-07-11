import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarAdmin extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-md navbarColor justify-content-end">
                <ul className="nav justify-content-end">
                    <li className="nav-item active ml-4 mt-1">
                        <Link to="/UserConfiguration" className="align-middle">Inicio</Link>
                    </li>
                    <li className="nav-item active ml-4 mt-1">
                        <Link to="/UserConfiguration" className="align-middle">Agregar administrador</Link>
                    </li>
                    <li className="nav-item active ml-4 mt-1">
                        <Link to="/UserConfiguration" className="align-middle">Perfil</Link>
                    </li>
                    <li className="nav-item active ml-4 mt-1">
                        <Link to="/UserConfiguration" className="align-middle">Salir</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default NavbarAdmin;