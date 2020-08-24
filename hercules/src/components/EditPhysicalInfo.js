import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class EditPhysicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            userName: [{}],
            idPhysicalInfo: "",
            partyID: sessionStorage.getItem("userPartyID"),
            weight: "",
            bodyWater: "",
            visceralFat: "",
            boneMass: "",
            DCI: "",
            metabolicAge: "",
            totalBodyFat: "",
            muscleMass: "",
            physicalAssesment: "",
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.loadInformation = this.loadInformation.bind(this);
        this.loadName = this.loadName.bind(this);
        this.loadPhysicalInformation = this.loadPhysicalInformation.bind(this);
        this.backButton = this.backButton.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);

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

            this.props.history.push(`/HistoricPhysicalInfoAdmin`);
            window.location.reload();
        }
        event.preventDefault();
    };

    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);
            this.loadInformation();
        }
    }

    loadInformation() {
        this.loadName();
        this.loadPhysicalInformation();
    }

    loadName() {
        axios.get(`http://localhost:9000/User/getUserName`,
            {
                params: { partyID: this.state.partyID }
            }).then(response => {
                const userName = response.data[0];
                this.setState({ userName });
            });
    }

    loadPhysicalInformation() {
        axios.get(`http://localhost:9000/PhysicalInfo/getOnePhysicalInfoByID`,
            {
                params: { partyID: this.state.partyID }
            }).then(response => {
                const physicalInfo = response.data[0];

                physicalInfo.map((physicalInfo, i) => {
                    this.setState({
                        idPhysicalInfo: physicalInfo.idPhysical_info,
                        weight: physicalInfo.weight,
                        bodyWater: physicalInfo.bodyWater,
                        visceralFat: physicalInfo.visceralFat,
                        boneMass: physicalInfo.boneMass,
                        DCI: physicalInfo.DCI,
                        metabolicAge: physicalInfo.metabolicAge,
                        totalBodyFat: physicalInfo.totalBody_Fat,
                        muscleMass: physicalInfo.totalMuscle_Mass,
                        physicalAssesment: physicalInfo.physicalAssessment
                    });
                })
            });
    }

    saveChange(event) {

        if (this.state.weight.toString().trim().length === 0 || this.state.bodyWater.toString().trim().length === 0 ||
            this.state.visceralFat.toString().trim().length === 0 || this.state.boneMass.toString().trim().length === 0 ||
            this.state.DCI.toString().trim().length === 0 || this.state.metabolicAge.toString().trim().length === 0 ||
            this.state.totalBodyFat.toString().trim().length === 0 || this.state.muscleMass.toString().trim().length === 0 ||
            this.state.physicalAssesment.toString().trim().length === 0) {
            this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos deben de estar llenos');

        } else if (!this.state.validations.validateKg(this.state.weight.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'El peso debe estar formado por un máximo de 3 números, puede contener punto decimal y dos decimales máximo');
        } else if (!this.state.validations.validatePercent(this.state.totalBodyFat.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'El porcentaje de grasa corporal solo debe contener números de entre 0 a 100, con punto decimal y dos decimales máximo');
        } else if (!this.state.validations.validatePercent(this.state.bodyWater.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'El porcentaje de agua corporal solo debe contener números de entre 0 a 100, con punto decimal y dos decimales máximo');
        } else if (!this.state.validations.validateKg(this.state.muscleMass.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'La masa muscular debe estar formada por un máximo de 3 números, puede contener punto decimal y dos decimales máximo');
        } else if (!this.state.validations.validatePhysicalAssesment(this.state.physicalAssesment.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'La valoración física debe ser un número entre 1 y 9');
        } else if (!this.state.validations.validateKg(this.state.boneMass.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'La masa ósea debe estar formada por un máximo de 3 números, puede contener punto decimal y dos decimales máximo');
        } else if (!this.state.validations.validateDCI(this.state.DCI.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'El DCI/BMR debe estar formado por un máximo de 5 números, puede contener punto decimal y dos decimales máximo');
        } else if (!this.state.validations.validateMetabolicAge(this.state.metabolicAge.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'La edad metabólica debe de estar compuesta únicamente de 3 números como máximo');
        } else if (!this.state.validations.validateViceralFat(this.state.visceralFat.toString().trim())) {
            this.modalTrigger(event, 'Formato incorrecto', 'La grasa viceral debe ser un número entre 1 y 60');
        } else {
           
                fetch("http://localhost:9000/PhysicalInfo/updatePhysicalInfo", {
                    method: "post",
                    body: JSON.stringify(this.state),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            isExit: true
                        });
                    }).catch(err => console.error("Un error inesperado a ocurrido"));

                this.modalTrigger(event, 'Actualización de registro', 'Se actualizó correctamente el registro de composición corporal');
            
        }

    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/HistoricPhysicalInfoAdmin`);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });

    }
    render() {
        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-label" fontSize="18px" key={i}>Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/ConsultUser">Consulta de usuario</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/HistoricPhysicalInfoAdmin">Composición Corporal</Breadcrumb.Item>
                        <Breadcrumb.Item>Formulario Composición Corporal</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row card mt-2 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Formulario Composición Corporal</h1>
                    </div>
                    <div className="col-4 offset-1 ">
                        {name}
                    </div>
                    <div className="col-10 offset-1 mt-4">
                        <div className="row">
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputWeight">Peso<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputWeight" name="weight" placeholder="kg" size="3" value={this.state.weight} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputFat">Grasa Corporal<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputFat" name="totalBodyFat" size="3" placeholder="%" value={this.state.totalBodyFat} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputBodyWater">Agua Corporal<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputBodyWater" name="bodyWater" size="3" placeholder="%" value={this.state.bodyWater} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputMass">Masa Muscular<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputMass" name="muscleMass" size="3" value={this.state.muscleMass} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputPhysic">Valoración Física<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputPhysic" name="physicalAssesment" size="3" value={this.state.physicalAssesment} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputBoneMass">Masa Ósea<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputBoneMass" name="boneMass" size="3" value={this.state.boneMass} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputDCI/BMR">DCI/BMR<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputDCI/BMR" name="DCI" size="3" value={this.state.DCI} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputMetAge">Edad Metabólica<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputMetAge" name="metabolicAge" size="3" value={this.state.metabolicAge} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mt-4 p-1">
                                <div className="control-group">
                                    <label fontSize="18px" className="control-label" htmlFor="inputViceralFat">Grasa Visceral<font color="red">*</font></label>
                                    <div className="controls">
                                        <input fontSize="18px" type="decimal" id="inputVisceralFat" name="visceralFat" size="3" placeholder="%" value={this.state.visceralFat} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="mt-5 col-8">
                                <button align="left" onClick={this.backButton} className="buttonSizeGeneral">Cancelar</button>
                            </div>
                            <div className="mt-5 col-4">
                                <button align="right" onClick={this.saveChange} className="buttonSizeGeneral">Guardar cambios</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.closeModal} >
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
export default EditPhysicalInfo;