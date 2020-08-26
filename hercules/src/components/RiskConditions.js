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
import PermissionsManager from "./PermissionsManager";
import plusImage from '../appImage/plusImage.svg';

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
            riskConditionListID: []
        };

        this.addRiskConditon = this.addRiskConditon.bind(this);
        this.riskConditonToDelete = this.riskConditonToDelete.bind(this);
        this.getRiskConditions = this.getRiskConditions.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.backButton = this.backButton.bind(this);

    }

    /**
    * Initiates the page.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.getRiskConditions();
        }
    }

    /**
    * Method that redirect to the requested page.
    */
    addRiskConditon() {
        this.props.history.push(`/AddRiskCondition`);
    }

    /**
     * Method that redirect to the requested page.
     */
    riskConditonToDelete() {
        this.props.history.push(`/RiskConditionsDeleteList`);
    }

    /**
     * Gets the risk conditions that can be deleted.
     */
    getRiskConditions() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/GetRiskConditions`).then(response => {
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
            sessionStorage.setItem("riskConditionID", this.state.riskConditionListID[event.target.parentNode.rowIndex - 1]);
            this.props.history.push("/ConsultRiskCondition");
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
     *                                 
    <div className="form-group" align="center">
    <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.addRiskConditon}>Agregar condiciones de riesgo</button>
    <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue" onClick={this.riskConditonToDelete}>Eliminar condiciones de riesgo</button>
    </div>
     */

    render() {
        /**
        * The riskCondition.map is used to create the rows of the table and to structure the html,
        * this is stored in a constant that is used in the code of the page
        */
        const riskConditionListVisual = this.state.riskConditionList.map((riskConditionList, i) => {
            this.state.riskConditionListID.push(riskConditionList.riskConditionID);
            if (sessionStorage.getItem('userTypeID') === '5') {
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
                                    <h4 className="colorBlue pointer" onClick={this.addRiskConditon}>Agregar condicion</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="col-10 offset-1 mt-4" >
                                        <table className="table table-sm table-hover" id="myTable">
                                            <thead>
                                                <tr class="header">
                                                    <th scope="col">Tipo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {riskConditionListVisual}
                                            </tbody>
                                        </table>
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