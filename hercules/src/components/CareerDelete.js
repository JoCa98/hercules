import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class CareerDelete extends Component {
    constructor(props) {
        super(props);
        /**
        *exerciseInfo:
        * @type {Array}
        * Property that stores the user information that comes from the database
        * 
        * exerciseID:
        * @type {integer}
        * Property that indicates the user id
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            careerID: sessionStorage.getItem("careerToDeleteID"),
            careerInfo: [{}],
            show: false,
            modalTittle: "",
            modalChildren: "",
            status: 0,
        };

        this.getCareerInfo = this.getCareerInfo.bind(this);
        this.backButton = this.backButton.bind(this);
        this.editCareer = this.editCareer.bind(this);
        this.deleteCareer = this.deleteCareer.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);

    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getCareerInfo();
        }
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

    modalTrigger(event, mdTittle, mdChildren) {
        this.setState({
            show: !this.state.show,
            modalTittle: mdTittle,
            modalChildren: mdChildren
        });
        event.preventDefault();
    };



    /**
    * Method that can get the basic information of a specifc career 
    * when the page is loaded.
    */
    getCareerInfo() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/GetCareerByID`,
                {
                    params: { careerID: this.state.careerID }
                }).then(response => {
                    const careerInfo = response.data[0];
                    this.setState({ careerInfo });
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    editCareer() {
        sessionStorage.setItem("careerID", sessionStorage.getItem("careerToDeleteID"));
        sessionStorage.removeItem("careerToDeleteID");
        this.props.history.push(`/CareerUpdate`);
    }

    deleteCareer(event) {
        fetch(`http://localhost:9000/ConfigurationRoute/DeleteCareer`, {
            method: "post",
            body: JSON.stringify({
                careerID: this.state.careerID
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
                this.modalTrigger(event, 'Carrera eliminada', 'Se ha eliminado correctamente la carrera');
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        sessionStorage.removeItem("careerToDeleteID");
        this.props.history.push(`/CareerConfiguration`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/CareerConfiguration'>Configuración de Carrera</Breadcrumb.Item>
                        <Breadcrumb.Item>Eliminacion de carrera</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left">Carrera</h1>
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <h3 fontSize="18px">Nombre:&nbsp;{this.state.careerInfo[0].name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4">
                                <h2 className="text-left">Acciones</h2>
                                <div className="form-group" align="left">
                                    <br></br>
                                    <button className="circularButton w-100" id="editCareer" name="editCareer" onClick={this.editCareer}>Editar</button>
                                    <br></br>
                                    <br></br>
                                    <button className="circularButton w-100" id="deleteCareer" name="deleteCareer" onClick={this.deleteCareer}>Eliminar</button>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" mt-3 col-md-3">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.modalTrigger} >
                                    <br />{this.state.modalChildren}
                                </ModalComponent>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default CareerDelete;