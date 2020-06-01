import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class Configuration extends Component {
    constructor(props) {
        super(props);
        /**
        *userTypeList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database
        * 
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            userTypeID: "3",
            careerName: null,
            userTypeList: [],
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.empty = this.empty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.careerConfiguration = this.careerConfiguration.bind(this);
        this.excerciseConfiguration = this.excerciseConfiguration.bind(this);
        this.accountConfiguration = this.accountConfiguration.bind(this);
        this.getAdminUserType = this.getAdminUserType.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        /* if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {*/
        window.scrollTo(0, 0);
        this.getAdminUserType();
        /*}*/
    }

    /**
        * Method that submit all the information in the form to the database
        */
    handleSubmit = event => {

        axios.get(`http://localhost:9000/User/isEmailValid`, { params: { email: this.state.email } }).then(response => {
            var isEmailValid = JSON.parse(JSON.stringify(response.data))[0]['isEmailValid'].data[0];

            if (this.empty()) {
                this.modalTrigger(event, 'Campos obligatorios', 'Los campos de texto con un * no se pueden dejar en blanco');
            } else if (!this.state.validations.validateTextField(this.state.careerName.trim())) {
                this.modalTrigger(event, 'Nombre de la carrera', 'El nombre de la carrera solo pueden estar compuesto por letras');
            }
        });
        event.preventDefault();
    }

    /**
     * This method takes care of show a modal with useful information
     */
    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };

    /**
     * This method close the modal  
     */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            this.props.history.push(`/HomeAdmin`);
        }
        event.preventDefault();
    };

    /**
    * This method set the prop attributes
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    /**
    * This method load the information in the dropdownlist
    */
    getAdminUserType() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getAdminUserType`).then(response => {
                const userTypeList = response.data[0];
                this.setState({ userTypeList });
            });
        } catch (err) {
            console.error("Un error inesperado a ocurrido");
        }
    }

    /**
    * Method that verify that the require inputs are not empty
    */
    empty() {
        if (this.state.careerName == "" || this.state.careerName == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
* Method that redirect to the previous page
*/
    careerConfiguration() {
        this.props.history.push(`/CareerConfiguration`);
    }

    excerciseConfiguration() {
        this.props.history.push(`/ExercisesList`);
    }

    accountConfiguration() {
        this.props.history.push(`/HomeAdmin`);
    }

    render() {
        const selectUserType = this.state.userTypeList.map((userTypeList, i) => {
            if (i == 0) {
                return (

                    <option defaultValue={userTypeList.userTypeID}
                        value={userTypeList.userTypeID}>{userTypeList.description}</option>

                )
            } else {
                return (
                    <option value={userTypeList.userTypeID}>{userTypeList.description}</option>

                )
            }

        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Configuración</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 className="text-left colorBlue">Configuración</h1>
                            <br />
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.careerConfiguration}>Configuración carreras</button>
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.excerciseConfiguration}>Configuración ejercicios</button>
                                         <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.accountConfiguration}>Configuración cuentas</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
                                        <br />{this.state.modalChildren}
                                    </ModalComponent>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Configuration;