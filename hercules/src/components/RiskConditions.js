/**
 * @fileoverview RiskCondition page, this page allows to configure risk conditions.
 * @version 1.0
 *
 * @author Victor Bolaños <victor.bolanos@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 */
import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import Modal from 'react-bootstrap/Modal';
import PermissionsManager from "./PermissionsManager";
import plusImage from '../appImage/plusImage.svg';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import {baseUrl} from "./baseUrl";

class RiskConditions extends Component {
    constructor(props) {
        super(props);
        /**
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site.
        */
        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            userTypeID: "3",
            show: false,
            isExit: false,
            riskConditionList: [],
            riskConditionListToDelete: [],
            showModal : false,
            deleteID : 0
        };

        this.addRiskConditon = this.addRiskConditon.bind(this);
        this.getRiskConditions = this.getRiskConditions.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.backButton = this.backButton.bind(this);
        this.validateDeleteRiskCondition = this.validateDeleteRiskCondition.bind(this);
        this.deleteRiskCondition = this.deleteRiskCondition.bind(this);
        this.getRiskConditionsToDeleteList = this.getRiskConditionsToDeleteList.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getRiskConditions();
            this.getRiskConditionsToDeleteList();
        }
    }

    /**
    * Method that redirect to the requested page.
    */
    addRiskConditon() {
        this.props.history.push(`/AddRiskCondition`);
    }

        /**
     * Gets the risk conditions that can be deleted.
     */
    getRiskConditionsToDeleteList() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/GetRiskConditionsWithoutStudents`).then(response => {
                const riskConditionListToDelete = response.data[0];
                this.setState({ riskConditionListToDelete });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }


    /**
     * Gets the risk conditions that can be deleted.
     */
    getRiskConditions() {
        try {
            axios.get(baseUrl + `ConfigurationRoute/GetRiskConditions`).then(response => {
                const riskConditionList = response.data[0];
                this.setState({ riskConditionList });
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * This method reddirects to a page and sets an id into the session to be used in the next page.
    */
    rowEvent(event) {
        try {
           this.setState({
               deleteID: this.state.riskConditionList[event.target.parentNode.rowIndex-1].riskConditionID
            });
            this.showModal(event);

        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that redirect to the previous page.
    */
    backButton() {
        sessionStorage.removeItem("riskConditionID");
        this.props.history.push(`/HomeAdmin`);
    }

    /**
     * Method that put the state of show in true
     */
    showModal = (e) => {
        this.setState({ showModal: true });
        e.preventDefault();
    };

    
    /**
     * Method that put the state of show in false
     */
    hideModal = (e) => {
        this.setState({ showModal: false });
        e.preventDefault();
    };

     /**
     * This method takes care of show a modal with useful information.
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
     * This method close the modal.
     */
    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            this.props.history.push("/RiskConditions");
        }
        event.preventDefault();
    };

        /**
     * Validates if the risk condition can be deleted.
     */
    validateDeleteRiskCondition() {
        for (var i = 0; i < this.state.riskConditionListToDelete.length; i++) {
            if (this.state.deleteID == this.state.riskConditionListToDelete[i].riskConditionID) {
                return true;
            }
        }
        return false;
    }

    /**
     * Method to delete a risk condition when a event is triggered.
     * @param {*} event 
     */
    deleteRiskCondition(event) {
        this.hideModal(event);
        console.log(this.state.riskConditionListToDelete);
        if (this.validateDeleteRiskCondition()) {
           
            fetch(baseUrl + `ConfigurationRoute/DeleteRiskCondition`, {
                method: "post",
                body: JSON.stringify({
                    riskConditionID: this.state.deleteID
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
                    this.modalTrigger(event, 'Condición de riesgo eliminada', 'Se ha eliminado correctamente la condición de riesgo');
                })
                .catch(err => console.error("Un error inesperado a ocurrido"));
        } else {
            this.modalTrigger(event, 'Condición de riesgo no eliminada', 'No se puede eliminar una condición de riesgo con estudiantes asociados');
        }
    }


    render() {
        /**
        * The riskCondition.map is used to create the rows of the table and to structure the html,
        * this is stored in a constant that is used in the code of the page
        */
        const riskConditionListVisual = this.state.riskConditionList.map((riskConditionList, i) => {
            if (sessionStorage.getItem('userTypeID') != '3') {
                return (
                    <tr key={i}>
                        <td>{riskConditionList.description}</td>
                    </tr>
                )
            } else {
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td>{riskConditionList.description}</td>
                    </tr>
                )
            }
        })

        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Condiciones de riesgo</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <div className="row p-3">
                                <h1 className="text-left colorBlue">Condiciones de riesgo</h1>
                                <div className="col-3 text-center offset-2">
                                    <img src={plusImage} onClick={this.addRiskConditon} className="imageHistoricPage pointer" />
                                    <h4 className="colorBlue pointer" onClick={this.addRiskConditon}>Agregar condición de riesgo</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="col-10 offset-1 mt-4" >
                                        <table className="table table-sm table-hover" id="myTable">
                                            <thead>
                                                <tr class="header">
                                                    <th scope="col">Condiciones de riesgo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {riskConditionListVisual}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <Modal show={this.state.showModal} handleClose={this.hideModal}>
                                <ModalHeader closeButton onClick={this.hideModal}>
                                    <ModalTitle>Eliminar condición de riesgo</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <p>¿Desea eliminar esta condición de riesgo?</p>
                                </ModalBody>
                                <Modal.Footer>
                                    <button className="buttonSizeGeneral" onClick={this.hideModal}>Volver</button>
                                    <button className="buttonSizeGeneral"  onClick={this.deleteRiskCondition}>Aceptar</button>
                                </Modal.Footer>
                            </Modal>

                            <div className="row">
                                <div className=" mt-3 col-md-3">
                                    <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
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
export default RiskConditions;