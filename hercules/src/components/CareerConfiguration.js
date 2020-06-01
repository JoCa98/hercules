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
        this.backButton = this.backButton.bind(this);
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

        if (this.empty()) {
            this.modalTrigger(event, 'Campos obligatorios', 'Los campos de texto con un * no se pueden dejar en blanco');
        } else if (!this.state.validations.validateTextField(this.state.careerName.trim())) {
            this.modalTrigger(event, 'Nombre de la carrera', 'El nombre de la carrera solo pueden estar compuesto por letras');
        } else {
        
        fetch(`http://localhost:9000/ConfigurationRoute/AddCareer`, {
            method: "post",
            body: JSON.stringify({
                name: this.state.careerName
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            this.setState({
                isExit: true
            });
            this.modalTrigger(event,'Ingreso Carrera','Se ha agregado correctamente la carrera');
        })

        .catch(err => console.error("Un error inesperado a ocurrido"));
    }
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
    backButton() {
        this.props.history.push(`/Configuration`);
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
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item>Configuración de Carrera</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h1 className="text-left colorBlue">Agregar carrera</h1>
                            <br />
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                        <p align="justify">Nombre de la carrera<font color="red">*</font></p>
                                        <input type="text" name="careerName" placeholder="Ej: Informática empresarial" className="form-control" fontSize="18px" onChange={this.handleInputChange} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" mt-3 col-md-3">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                                </div>
                                <div className=" mt-3 col-md-3 offset-6" align="right">
                                    <button align="rigth" className="buttonSizeGeneral" onClick={this.handleSubmit}>Guardar</button>
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