import React, { Component } from 'react';
import axios from "axios";
import validations from './validations';
import Hash from './Hash';
class UserConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validations: new validations(),
            Hash: new Hash(),
            identificationID: "",
            firstName: "",
            secondName: "",
            lastName: "",
            secondLastName: "",
            career: "",
            carnet: "",
            birthDate: "",
            userTypeID: "",
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
            emergencyContactID: "",
            relations: [{}],
            provinces: [{}],
            provinceList: null,
            provinceID: "",
            cantons: [{}],
            cantonList: null,
            cantonID: "",
            districts: [{}],
            districtList: null,
        };

        this.handleSelectProvince = this.handleSelectProvince.bind(this);
        this.loadRelations = this.loadRelations.bind(this);
        this.loadProvinces = this.loadProvinces.bind(this);
        this.loadCantons = this.loadCantons.bind(this);
        this.handleSelectCanton = this.handleSelectCanton.bind(this);
        this.loadDistricts = this.loadDistricts.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCantonsByProvince = this.getCantonsByProvince.bind(this);
        this.getDistrictsByCanton = this.getDistrictsByCanton.bind(this);
        this.getFirstCantonOfProvince = this.getFirstCantonOfProvince.bind(this);
        this.editInfo = this.editInfo.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
        this.cancelInfo = this.cancelInfo.bind(this);

        this.editPassword = this.editPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.cancelPassword = this.cancelPassword.bind(this);

        this.editContact = this.editContact.bind(this);
        this.changeContact = this.changeContact.bind(this);
        this.cancelContact = this.cancelContact.bind(this);


        this.loadUserInfo = this.loadUserInfo.bind(this);
        this.getLocalGeoSupID = this.getLocalGeoSupID.bind(this);
        this.initButtons = this.initButtons.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateContact = this.updateContact.bind(this);

        this.enableInfoFields = this.enableInfoFields.bind(this);
        this.enablePasswordFields = this.enablePasswordFields.bind(this);
        this.enableContactFields = this.enableContactFields.bind(this);
        this.initAllFields = this.initAllFields.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);

    }
    componentDidMount() {

        this.loadUserInfo();
        axios.get(`http://localhost:9000/User/getRelationType`).then(response => {
            this.setState({ relations: response.data });
        });

        axios.get(`http://localhost:9000/User/getProvinces`).then(response => {
            this.setState({ provinces: response.data });
        });

        this.initButtons();
        this.initAllFields();

    }

    getCantonsByProvince(value) {
        axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: value } }).then(response => {
            this.setState({ cantons: response.data[0] });

        });
    };
    getDistrictsByCanton(value) {
        axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: value } }).then(response => {
            this.setState({ districts: response.data[0] });
        });
    };
    loadRelations() {
        this.state.relationList = this.state.relations.map((relations, i) => {
            return (
                <option value={relations.relationTypeID} key={i}>{relations.description} </option>
            )
        })
    }

    loadProvinces() {
        this.state.provinceList = this.state.provinces.map((provinces, i) => {
            return (
                <option value={provinces.provinceID} key={i}>{provinces.provinceDescription} </option>
            )
        })
    }
    loadCantons() {
        this.state.cantonList = this.state.cantons.map((cantons, i) => {
            if (i == 0 & this.state.cantonID == undefined) {
                this.state.cantonID = cantons.cantonID
            }
            return (
                <option value={cantons.cantonID} key={i}>{cantons.cantonDescription}</option>
            )
        });
        document.getElementById('cantonID')
    }
    loadDistricts() {
        this.state.districtList = this.state.districts.map((districts, i) => {
            if (i == 0) {
                this.state.districtID = districts.districtID
            }

            return (
                <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
            )
        });
    }

    getFirstCantonOfProvince(value) {
        axios.get(`http://localhost:9000/User/getFirstCantonOfProvince`, { params: { provinceID: value } }).then(response => {
            return JSON.parse(JSON.stringify(response.data[0]))[0]['cantonID']
        });
    }
    handleSelectProvince(event) {
        this.handleInputChange(event);
        var value = event.target.value;
        this.getCantonsByProvince(value);
        this.loadCantons();

    }

    handleSelectCanton(event) {
        this.handleInputChange(event);
        var value = event.target.value;
        this.getDistrictsByCanton(value);
        this.loadDistricts();
    }

    getLocalGeoSupID(value) {
        axios.get(`http://localhost:9000/User/getLocalGeoSupID`, { params: { localGeoSupID: value } }).then(response => {
            this.setState({ cantonID: JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID'] });
            axios.get(`http://localhost:9000/User/getLocalGeoSupID`, { params: { localGeoSupID: JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID'] } }).then(response => {
                this.setState({ provinceID: JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID'] });
                axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: this.state.provinceID } }).then(response => {
                    this.setState({ cantons: response.data[0] });
                });
                axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: this.state.cantonID } }).then(response => {
                    this.setState({ districts: response.data[0] });
                });
            });
        });

    }
    loadUserInfo() {
        axios.get(`http://localhost:9000/User/getUserInfo`, { params: { partyID: sessionStorage.getItem('partyID') } }).then(response => {
            console.log("dsd: " + JSON.stringify(response.data[0]));
            response.data[0].map((response) => {
                this.setState({
                    identificationID: response.identificationID,
                    firstName: response.firstName,
                    secondName: response.secondName,
                    lastName: response.lastName,
                    secondLastName: response.secondLastName,
                    career: response.career,
                    carnet: response.carnet,
                    phoneNumber1: response.phoneNumber1,
                    phoneNumber2: response.phoneNumber2,
                    districtID: response.districtID,
                    addressLine: response.addressLine,
                    contactName: response.contactName,
                    emergencyContactPhoneNumber: response.emergencyContactPhoneNumber,
                    emergencyContactID: response.emergencyContactID,
                    relationTypeID: response.relationTypeID,
                    birthDate: response.birthDate
                })
                this.getLocalGeoSupID(response.districtID);
            })

        });
        this.state.userTypeID = sessionStorage.getItem('userTypeID');
        this.state.email = sessionStorage.getItem('email');
    }

    updateUser() {

        console.log("sec: " + this.state.secondName)
        if (this.state.secondName.trim.length == 0) {
            this.setState({ secondLastName: null })
        }
        fetch("http://localhost:9000/User/updateUser", {
            method: "post",
            body: JSON.stringify({
                partyID: sessionStorage.getItem('partyID'),
                identificationID: this.state.identificationID,
                firstName: this.state.firstName,
                secondName: this.state.secondName,
                lastName: this.state.lastName,
                secondLastName: this.state.secondLastName,
                carnet: this.state.carnet,
                career: this.state.career,
                phoneNumber1: this.state.phoneNumber1,
                phoneNumber2: this.state.phoneNumber2,
                districtID: this.state.districtID,
                addressLine: this.state.addressLine
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
        alert("Los datos de usuario fueron actualizados");
    }

    updatePassword() {
        fetch("http://localhost:9000/User/updatePassword", {
            method: "post",
            body: JSON.stringify({
                email: sessionStorage.getItem('email'),
                password: this.state.newPassword,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
    }

    updateContact() {
        //Validacion 
        fetch("http://localhost:9000/User/updateContact", {
            method: "post",
            body: JSON.stringify({
                contactName: this.state.contactName,
                relationTypeID: this.state.relationTypeID,
                emergencyContactID: this.state.emergencyContactID,
                emergencyContactPhoneNumber: this.state.emergencyContactPhoneNumber,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
    }

    loadAccountInfo() {
        this.state.email = sessionStorage.getItem('email');
        this.state.password = "";
        this.state.newPassword = "";
        this.state.confirmNewPassword = "";
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    initButtons() {
        document.getElementById('cancelInfo').style.display = 'none';
        document.getElementById('editInfo').style.display = 'block';
        document.getElementById('changeInfo').style.display = 'none';

        document.getElementById('cancelPassword').style.display = 'none';
        document.getElementById('editPassword').style.display = 'block';
        document.getElementById('changePassword').style.display = 'none';

        document.getElementById('cancelContact').style.display = 'none';
        document.getElementById('editContact').style.display = 'block';
        document.getElementById('changeContact').style.display = 'none';
    }
    initAllFields() {
        this.enableInfoFields(false);
        this.enablePasswordFields(false);
        this.enableContactFields(false);
    }

    enableInfoFields(value) {
        var disabled = '';
        if (value == true) {
            disabled = false;
        } else {
            disabled = true;
        }
        document.getElementById('firstName').disabled = disabled;
        document.getElementById('secondName').disabled = disabled;
        document.getElementById('lastName').disabled = disabled;
        document.getElementById('secondLastName').disabled = disabled;
        document.getElementById('phoneNumber1').disabled = disabled;
        document.getElementById('phoneNumber2').disabled = disabled;
        if (sessionStorage.getItem('userTypeID') == 1) {
            document.getElementById('carnet').disabled = disabled;
            document.getElementById('career').disabled = disabled;
        }
        document.getElementById('provinceID').disabled = disabled;
        document.getElementById('cantonID').disabled = disabled;
        document.getElementById('districtID').disabled = disabled;
        document.getElementById('addressLine').disabled = disabled;
        document.getElementById('identificationID').disabled = disabled;
    }
    enablePasswordFields(value) {
        var disabled = '';
        if (value == true) {
            disabled = false;
        } else {
            disabled = true;
        }
        document.getElementById('password').disabled = disabled;
        document.getElementById('newPassword').disabled = disabled;
        document.getElementById('confirmNewPassword').disabled = disabled;
        document.getElementById('showPasswordFields').disabled = disabled;
    }

    enableContactFields(value) {
        var disabled = '';
        if (value == true) {
            disabled = false;
        } else {
            disabled = true;
        }
        document.getElementById('contactName').disabled = disabled;
        document.getElementById('relationTypeID').disabled = disabled;
        document.getElementById('emergencyContactPhoneNumber').disabled = disabled;
    }

    editInfo() {
        // alert(this.state.Hash.encode("hola"))
        document.getElementById('editInfo').style.display = 'none';
        document.getElementById('cancelInfo').style.display = 'block';
        document.getElementById('changeInfo').style.display = 'block';
        this.enableInfoFields(true)
    }
    cancelInfo() {
        document.getElementById('cancelInfo').style.display = 'none';
        document.getElementById('editInfo').style.display = 'block';
        document.getElementById('changeInfo').style.display = 'none';
        this.loadUserInfo();
        this.enableInfoFields(false)
    }
    changeInfo() {
        if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0
            || this.state.secondLastName.trim().length == 0 || this.state.phoneNumber1.trim().length == 0
            || this.state.career.trim().length == 0 || this.state.carnet.trim().length == 0
            || this.state.identificationID.toString().trim().length == 0) {
            alert("Todos los datos del usuarios deben estar llenos");
        } else if (!this.state.validations.validateTextField(this.state.firstName)
            || (!this.state.secondName.trim().length == 0 & !this.state.validations.validateTextField(this.state.secondName))
            || !this.state.validations.validateTextField(this.state.lastName)
            || !this.state.validations.validateTextField(this.state.secondLastName)
        ) {
            alert("Los datos del nombre solo pueden estar compuestos por letras");
        } else if (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber1
            || (!this.state.phoneNumber2.trim().length == 0 & !this.state.validations.validatePhoneNumberField(this.state.phoneNumber2))
        )) {
            alert("Los números telefónicos deben estar compuestos por 8 dígitos");

        } else if (this.state.carnet != "N/A" & !this.state.validations.validateCarnetField(this.state.carnet)) {
            alert("El carné debe estar compuesto por 1 letra inicial y 5 dígitos");
        }
        else {
            if (window.confirm("¿Está seguro se actualizar los datos de usuario?") == true) {
                document.getElementById('changeInfo').style.display = 'none';
                document.getElementById('editInfo').style.display = 'block';
                document.getElementById('cancelInfo').style.display = 'none';
                this.updateUser();
                this.enableInfoFields(false);
            }
        }

    }
    //////////////////////////
    editPassword() {
        document.getElementById('editPassword').style.display = 'none';
        document.getElementById('cancelPassword').style.display = 'block';
        document.getElementById('changePassword').style.display = 'block';
        this.enablePasswordFields(true);
    }
    cancelPassword() {
        document.getElementById('cancelPassword').style.display = 'none';
        document.getElementById('editPassword').style.display = 'block';
        document.getElementById('changePassword').style.display = 'none';
        this.setState({ password: "", newPassword: "", confirmNewPassword: "" });
        this.enablePasswordFields(false);
    }
    changePassword() {
        //validad y encriptar
        if (document.getElementById('password').value.length == 0 || document.getElementById('newPassword').value.length == 0
            || document.getElementById('confirmNewPassword').value.length == 0) {
            alert("Todos los campos de contraseña deben estar llenos")
        } else if (this.state.password != sessionStorage.getItem('password')) {
            alert("La contraseña actual es incorrecta");
        } else if (this.state.newPassword != this.state.confirmNewPassword) {
            alert("Las contraseñas no coinciden");
        } else {
            if (window.confirm("¿Está seguro de actualizar los datos de la contraseña?") == true) {
                document.getElementById('changePassword').style.display = 'none';
                document.getElementById('editPassword').style.display = 'block';
                document.getElementById('cancelPassword').style.display = 'none';
                this.updatePassword();
                this.setState({ password: "", newPassword: "", confirmNewPassword: "" })
                this.enablePasswordFields(false);
            }
        }
    }
    editContact() {
        document.getElementById('editContact').style.display = 'none';
        document.getElementById('cancelContact').style.display = 'block';
        document.getElementById('changeContact').style.display = 'block';
        this.enableContactFields(true);
    }
    cancelContact() {
        document.getElementById('cancelContact').style.display = 'none';
        document.getElementById('editContact').style.display = 'block';
        document.getElementById('changeContact').style.display = 'none';
        this.loadUserInfo();
        this.enableContactFields(false);
    }
    changeContact() {
        if (this.state.emergencyContactPhoneNumber.trim().length == 0 || this.state.contactName.trim().length == 0) {
            alert("Todos los datos del contacto de emergencia deben estar llenos");
        } else if (!this.state.validations.validatePhoneNumberField(this.state.emergencyContactPhoneNumber)) {
            alert("El número teléfonico del contacto de emergencia debe estar compuesto por 8 dígitos");
        } else {
            if (window.confirm("¿Está seguro de actualizar los datos del contacto de emergencia?") == true) {
                document.getElementById('changeContact').style.display = 'none';
                document.getElementById('editContact').style.display = 'block';
                document.getElementById('cancelContact').style.display = 'none';
                this.updateContact();
                this.enableContactFields(false);
            }
        }
    }

    showPasswordFields() {
        var show = document.getElementById('showPasswordFields').checked;
        if (show == true) {
            document.getElementById('password').type = "text";
            document.getElementById('newPassword').type = "text";
            document.getElementById('confirmNewPassword').type = "text";
        } else {
            document.getElementById('password').type = "password";
            document.getElementById('newPassword').type = "password";
            document.getElementById('confirmNewPassword').type = "password";
        }
    }
    render() {
        console.log("cargo en render: " + this.state.provinceID)
        this.loadRelations();
        this.loadProvinces();
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
                                            <input type="text" id="firstName" name="firstName" required className="form-control inputText" value={this.state.firstName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Primer Apellido</p>
                                            <input type="text" id="lastName" name="lastName" required className="form-control inputText" value={this.state.lastName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 1</p>
                                            <input type="text" id="phoneNumber1" name="phoneNumber1" required className="form-control inputText" value={this.state.phoneNumber1 || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input type="text" id="secondName" name="secondName" className="form-control inputText" value={this.state.secondName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Segundo Apellido</p>
                                            <input type="text" id="secondLastName" name="secondLastName" required className="form-control inputText" value={this.state.secondLastName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 2</p>
                                            <input type="text" id="phoneNumber2" name="phoneNumber2" className="form-control inputText" value={this.state.phoneNumber2 || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Número de cédula</p>
                                            <input type="text" id="identificationID" name="identificationID" required className="form-control InputText" value={this.state.identificationID || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Fecha de nacimiento</p>
                                            <input type="date" name="birthDate" disabled required className="form-control InputText" value={this.state.birthDate || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Carné</p>
                                            <input type="text" id="carnet" name="carnet" required className="form-control InputText" value={this.state.carnet || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Carrera</p>
                                            <input type="text" id="career" name="career" required className="form-control InputText" value={this.state.career || ''} onChange={this.handleInputChange}></input>
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
                                            <select id="provinceID" id="provinceID" name="provinceID" className="form-control" value={this.state.provinceID} onChange={this.handleSelectProvince}>
                                                {this.state.provinceList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Cantón</p>
                                            <select name="cantonID" id="cantonID" className="form-control" value={this.state.cantonID} onChange={this.handleSelectCanton}>
                                                {this.state.cantonList}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Distrito</p>
                                            <select name="districtID" id="districtID" className="form-control" value={this.state.districtID} onChange={this.handleInputChange}>
                                                {this.state.districtList}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <p align="left">Otras señas</p>
                                            <textarea type="text" id="addressLine" required name="addressLine" value={this.state.addressLine || ''} onChange={this.handleInputChange} className="bigInputText w-100 form-control bigInputText"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group" align="left">
                                            <button align="left" id="cancelInfo" className="buttonSizeGeneral" onClick={this.cancelInfo}>Cancelar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group" align="right">
                                            <button align="left" id="editInfo" className="buttonSizeGeneral" onClick={this.editInfo}>Cambiar</button>
                                            <button align="left" id="changeInfo" className="buttonSizeGeneral" onClick={this.changeInfo}>Guardar</button>
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
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Contraseña actual</p>
                                            <input type="password" id="password" required name="password" value={this.state.password || ''} onChange={this.handleInputChange} className="form-control inputText w-100"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Contraseña nueva</p>
                                                    <input type="password" id="newPassword" required name="newPassword" className="inputText form-control" value={this.state.newPassword || ''} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Confirmar contraseña nueva</p>
                                                    <input type="password" id="confirmNewPassword" required name="confirmNewPassword" className="inputText form-control" value={this.state.confirmNewPassword || ''} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <row>
                                    <div className="col-12">
                                        <div className="form-group " align="left">
                                            <input type="checkbox" id="showPasswordFields" required name="showPasswordFields" onChange={this.showPasswordFields} ></input>Mostrar campos
                                        </div>
                                    </div>
                                </row>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group" align="left">
                                            <button align="left" id="cancelPassword" className="buttonSizeGeneral" onClick={this.cancelPassword}>Cancelar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group" align="right">
                                            <button align="left" id="editPassword" className="buttonSizeGeneral" onClick={this.editPassword}>Cambiar</button>
                                            <button align="left" id="changePassword" className="buttonSizeGeneral" onClick={this.changePassword}>Guardar</button>
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
                                            <input type="text" required name="contactName" id="contactName" className="inputText form-control" value={this.state.contactName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Parentesco</p>
                                            <select name="relationTypeID" id="relationTypeID" className="form-control" value={this.state.relationTypeID} onChange={this.handleInputChange}>
                                                {this.state.relationList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Teléfono</p>
                                            <input type="text" required name="emergencyContactPhoneNumber" id="emergencyContactPhoneNumber" className="inputText form-control" value={this.state.emergencyContactPhoneNumber} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group" align="left">
                                            <button align="left" id="cancelContact" className="buttonSizeGeneral" onClick={this.cancelContact}>Cancelar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group" align="right">
                                            <button align="left" id="editContact" className="buttonSizeGeneral" onClick={this.editContact}>Cambiar</button>
                                            <button align="left" id="changeContact" className="buttonSizeGeneral" onClick={this.changeContact}>Guardar</button>
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
export default UserConfiguration;