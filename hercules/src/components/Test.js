import React, { Component } from 'react';
import axios from "axios";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identificationID: "",
            firstName: "",
            secondName: "",
            lastName: "",
            secondLastName: "",
            email: "",
            password: "",
            newPassword: "",
            confirmNewPassword: "",
            phoneNumber1: "",
            phoneNumber2: "",
            districtID: "",
            addressLine: "",
            contactName: "",
            relationTypeID: "",
            emergencyContactPhoneNumber: "",
            relations: [{}],
            provinces: [{}],
            provinceID: "",
            cantons: [{}],
            cantonList: null,
            cantonID: "",
            districts: [{}],
            districtList: null,
            localGeoSupID: "",

        };

        this.handleSelectProvince = this.handleSelectProvince.bind(this);
        this.loadCantons = this.loadCantons.bind(this);
        this.handleSelectCanton = this.handleSelectCanton.bind(this);
        this.loadDistricts = this.loadDistricts.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCantonsByProvince = this.getCantonsByProvince.bind(this);
        this.getDistrictsByCanton = this.getDistrictsByCanton.bind(this);
        this.editInfo = this.editInfo.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
        this.cancelInfo = this.cancelInfo.bind(this);
        this.editPassword = this.editPassword.bind(this);
        this.changePassword = this.cancelPassword.bind(this);
        this.cancelPassword = this.cancelPassword.bind(this);
        this.editContact = this.editContact.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.cancelPassword = this.cancelPassword.bind(this);
        this.loadUserInfo = this.loadUserInfo.bind(this);
        this.loadContactInfo = this.loadContactInfo.bind(this);
        this.loadAccountInfo = this.loadAccountInfo.bind(this);
        this.getLocalGeoSupID = this.getLocalGeoSupID.bind(this);

        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.loadUserInfo();
        axios.get(`http://localhost:9000/User/getRelationType`).then(response => {
            this.state.relations = response.data;
            this.setState({ relations: response.data });
        });
        axios.get(`http://localhost:9000/User/getProvinces`).then(response => {
            this.setState({ provinces: response.data });
        });

        axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: this.state.provinceID } }).then(response => {
            this.setState({ cantons: response.data[0] });
        });
        axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: this.state.cantonID } }).then(response => {
            this.setState({ districts: response.data[0] });
        });

    }


    getCantonsByProvince(value) {
        axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: value } }).then(response => {
            this.setState({ cantons: response.data[0] });
        });
    };
    getDistrictsByCanton(value) {
        axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: value } }).then(response => {
            this.setState({ districts: response.data[0] });
            console.log("getSuop:" +  response.data[0])
        });
    };
    loadCantons() {
        this.state.cantonList = this.state.cantons.map((cantons, i) => {
            return (
                <option value={cantons.cantonID} key={i}>{cantons.cantonDescription}</option>
            )
        });
    }
    loadDistricts() {
        this.state.districtList = this.state.districts.map((districts, i) => {
            return (
                <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
            )
        });
    }
    getLocalGeoSupID(value) {
        axios.get(`http://localhost:9000/User/getLocalGeoSupID`, { params: { localGeoSupID: value } }).then(response => {
            this.state.localGeoSupID = response.data[0]["localGeoSupID"] ; 
            console.log("getSup: " +  JSON.stringify(response.data))
        });
    }
    loadUserInfo() {

        this.state.identificationID = sessionStorage.getItem('identificationID');
        this.state.firstName = sessionStorage.getItem('firstName');
        this.state.secondName = sessionStorage.getItem('secondName');
        this.state.lastName = sessionStorage.getItem('lastName');
        this.state.secondLastName = sessionStorage.getItem('secondLastName');
        this.state.phoneNumber1 = sessionStorage.getItem('phoneNumber1');
        this.state.phoneNumber2 = sessionStorage.getItem('phoneNumber2');
        this.state.districtID = 500; //sessionStorage.getItem('districtID')
        console.log("distrito:  " + this.state.districtID);
        this.getLocalGeoSupID(this.state.districtID);
        console.log("sup1:  " + this.state.localGeoSupID);
        this.state.cantonID = this.localGeoSupID;
        console.log("canton:  " + this.state.cantonID);
        this.getLocalGeoSupID(this.state.cantonID)
        console.log("sup2:  " + this.state.localGeoSupID);
        this.state.provinceID = this.localGeoSupID;
        console.log("provincia:  " + this.state.provinceID);
        this.state.addressLine = sessionStorage.getItem('addressLine');

    }

    loadAccountInfo() {
        this.state.email = sessionStorage.getItem('email');
        this.state.password = "";
        this.state.newPassword = "";
        this.state.confirmNewPassword = "";
    }

    loadContactInfo() {
        this.state.contactName = sessionStorage.getItem('contactName');
        this.state.relationTypeID = sessionStorage.getItem('relationTypeID');
        this.state.emergencyContactPhoneNumber = sessionStorage.getItem('emergencyContactPhoneNumber');
    }

    handleSelectProvince(event) {
        var value = event.target.value;
        this.getCantonsByProvince(value);
        this.loadCantons();
    }

    handleSelectCanton(event) {
        var value = event.target.value;
        this.getDistrictsByCanton(value);
        this.loadDistricts();
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    editInfo() {
        document.getElementById('editInfo').disabled = true;
        document.getElementById('cancelInfo').disabled = false;
        document.getElementById('changeInfo').disabled = false;
    }
    cancelInfo() {
        document.getElementById('cancelInfo').disabled = true;
        document.getElementById('editInfo').disabled = false;
        document.getElementById('changeInfo').disabled = true;
    }
    changeInfo() {
        document.getElementById('changeInfo').disabled = true;
        document.getElementById('editInfo').disabled = false;
        document.getElementById('cancelInfo').disabled = true;
    }
    //--
    editPassword() {
        document.getElementById('editPassword').disabled = true;
        document.getElementById('cancelPassword').disabled = false;
        document.getElementById('changePassword').disabled = false;
    }
    cancelPassword() {
        document.getElementById('cancelPassword').disabled = true;
        document.getElementById('editPassword').disabled = false;
        document.getElementById('changePassword').disabled = true;
    }


    changePassword() {
        document.getElementById('changePassword').disabled = true;
        document.getElementById('editPassword').disabled = false;
        document.getElementById('cancelPassword').disabled = true;
    }
    editContact() {
        document.getElementById('editContact').disabled = true;
        document.getElementById('cancelContact').disabled = false;
        document.getElementById('changeContact').disabled = false;
    }
    cancelContact() {
        document.getElementById('cancelContact').disabled = true;
        document.getElementById('editContact').disabled = false;
        document.getElementById('changeContact').disabled = true;
    }
    changeContact() {
        document.getElementById('changeContact').disabled = true;
        document.getElementById('editContact').disabled = false;
        document.getElementById('cancelContact').disabled = true;
    }
    render() {
        const provinceList = this.state.provinces.map((provinces, i) => {
            return (
                <option value={provinces.provinceID} key={i}>{provinces.provinceDescription} </option>
            )


        })
        const relationList = this.state.relations.map((relations, i) => {
            return (
                <option value={relations.relationTypeID} key={i}>{relations.description} </option>
            )
        })
        this.loadCantons();
        this.loadDistricts();

        return (
            <div className="container">
                <div className="row mt-4 card p-5" >
                    <div className="col-12">
                        <h1 className="text-center">Configuración del perfil</h1>
                        <br></br>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <h2 className="text-left">Información de usuario</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Primer nombre</p>
                                            <input type="text" name="firstName" required className="form-control inputText" value={this.state.firstName|| ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Primer Apellido</p>
                                            <input type="text" name="lastName" required className="form-control inputText" value={this.state.lastName|| ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 1</p>
                                            <input type="text" name="phoneNumber1" required className="form-control inputText" value={this.state.phoneNumber1|| ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input type="text" name="secondName" className="form-control inputText" value={this.state.secondName|| ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Segundo Apellido</p>
                                            <input type="text" name="secondLastName" required className="form-control inputText" value={this.state.secondLastName|| ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 2</p>
                                            <input type="text" name="phoneNumber2" className="form-control inputText" value={this.state.phoneNumber2|| ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Número de cédula</p>
                                            <input type="text" name="identificationID" required className="form-control InputText" value={this.state.identificationID|| ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <h2 align="left">Dirección</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Provincia</p>
                                            <select id="provinceID" name="provinceID" className="form-control" value={this.state.provinceID} onChange={this.handleSelectProvince}>
                                                {provinceList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Cantón</p>
                                            <select name="cantonID" className="form-control" value={this.state.cantonID} onChange={this.handleSelectCanton}>
                                                {this.state.cantonList}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Distrito</p>
                                            <select name="districtID" className="form-control" value={this.state.cantonID} onChange={this.handleInputChange}>
                                                {this.state.districtList}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <p align="left">Otras señas</p>
                                            <input type="text" required name="addressLine" value={this.state.addressLine|| ''} onChange={this.handleInputChange} className="w-100 form-control bigInputText"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group" align="left">
                                            <button align="left" id="changeInfo" className="buttonSizeGeneral" onClick={this.changeInfo}>Guardar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group" align="center">
                                            <button align="left" id="editInfo" className="buttonSizeGeneral" onClick={this.editInfo}>Cambiar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group" align="right">
                                            <button align="left" id="cancelInfo" className="buttonSizeGeneral" onClick={this.cancelInfo}>Cancelar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <h2 className="text-left">Información de la cuenta</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group" align="left">
                                            <p>Contraseña actual</p>
                                            <input type="password" required name="password" value={this.state.password|| ''} onChange={this.handleInputChange} className="form-control inputText w-100"></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Contraseñ nueva</p>
                                                    <input type="password" required name="newPassword" className="inputText form-control" value={this.state.newPassword|| ''} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Confirmar contraseña nueva</p>
                                                    <input type="password" required name="confirmNewPassword" className="inputText form-control" value={this.state.confirmNewPassword|| ''} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group" align="left">
                                            <button align="left" id="changePassword" className="buttonSizeGeneral" onChange={this.changePassword}>Guardar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group" align="center">
                                            <button align="left" id="editPassword" className="buttonSizeGeneral" onChange={this.editPassword}>Cambiar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group" align="right">
                                            <button align="left" id="cancelPassword" className="buttonSizeGeneral" onChange={this.cancelPassword}>Cancelar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <h2 className="text-left">Contacto de emergencia</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group" align="left">
                                            <p>Nombre</p>
                                            <input type="text" required name="contactName" className="inputText form-control" value={this.state.contactName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Parentesco</p>
                                            <select name="relationTypeID" className="form-control" onChange={this.handleInputChange}>
                                                {relationList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Teléfono</p>
                                            <input type="text" required name="emergencyContactPhoneNumber" className="inputText form-control" value={this.state.emergencyContactPhonenumber} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group" align="left">
                                            <button align="left" id="changeContact" className="buttonSizeGeneral" onChange={this.changeContact}>Guardar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group" align="center">
                                            <button align="left" id="editContact" className="buttonSizeGeneral" onChange={this.editContact}>Cambiar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group" align="right">
                                            <button align="left" id="cancelConact" className="buttonSizeGeneral" onChange={this.cancelContact}>Cancelar</button>
                                            <br></br>
                                        </div>
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
export default Test;