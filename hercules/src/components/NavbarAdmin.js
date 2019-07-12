import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class NavbarAdmin extends Component {
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
                            <ul className="nav justify-content-end">
                                <li className="nav-item active ml-4 mt-1">
                                    <Link to="/HomeAdmin" className="align-middle">Inicio</Link>
                                </li>
                                <li className="nav-item active ml-4 mt-1">
                                    <Link to="/AddAdmin" className="align-middle">Agregar administrador</Link>
                                </li>
                                <li className="nav-item active ml-4 mt-1">
                                    <Link to="/" className="align-middle" onClick={this.logOut}>Salir</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(NavbarAdmin);