import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class RiskConditionDelete extends Component {
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
            riskConditionID: sessionStorage.getItem("riskConditionID"),
            show: false,
            modalTittle: "",
            modalChildren: "",
            status: 0,
        };

        this.backButton = this.backButton.bind(this);
        this.deleteRiskCondition = this.deleteRiskCondition.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
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

    closeModal(event) {
        this.setState({
            show: !this.state.show
        });
        if (this.state.isExit) {
            this.backButton();
        }
        event.preventDefault();
    };

    deleteRiskCondition(event) {
        fetch(`http://localhost:9000/ConfigurationRoute/DeleteRiskCondition`, {
            method: "post",
            body: JSON.stringify({
                riskConditionID: this.state.riskConditionID
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
                this.modalTrigger(event, 'Condicion de riesgo eliminada', 'Se ha eliminado correctamente la condicion de riesgo');
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
    }


    /**
    * Method that redirect to the previous page
    */
    backButton() {
        sessionStorage.removeItem("riskConditionToDelete");
        this.props.history.push(`/RiskConditionsDeleteList`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href='#/Configuration'>Configuración</Breadcrumb.Item>
                        <Breadcrumb.Item>Eliminacion de condicion de riesgo</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-10 offset-1 card p-5">
                        <form className="form-horizontal">
                            <h2 className="text-left colorBlue">¿Desea eliminar la condicion de riesgo con el ID: {sessionStorage.getItem("riskConditionToDelete")}?</h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group" align="center">
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue col-8" id="deleteRiskCondition" name="deleteRiskCondition" onClick={this.deleteRiskCondition}>Si</button>
                                        <button className="buttonSizeGeneral" class="btn-lg btn-block backgroundBlue col-8" onClick={this.backButton}>No</button>
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
export default RiskConditionDelete;