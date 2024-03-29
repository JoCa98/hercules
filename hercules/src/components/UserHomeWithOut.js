import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";

class UserHomeWithOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissionsManager: new PermissionsManager()
        };

    }

    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-12 card p-5">
                        <h1 className="text-left colorBlue mb-4">Rutina actual</h1>
                        <div className="row">
                            <div className="col-12 ">
                                <div className="row">
                                    <div className="col-12">
                                        <label fontSize="18px">Aún no cuenta con una rutina.</label>
                                        <br />
                                        <label fontSize="18px">Diríjase a la oficina de deporte y recreación para que le asignen una.</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHomeWithOut;