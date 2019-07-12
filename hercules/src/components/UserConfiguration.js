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
        this.getDistrict = this.getDistrict.bind(this);
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


        var initProvinceID = 2;
        var initCantonID = 30;
        axios.get(`http://localhost:9000/User/getRelationType`).then(response => {
            this.setState({ relations: response.data });
        });
        axios.get(`http://localhost:9000/User/getProvinces`).then(response => {
            this.setState({ provinces: response.data });
            this.provinceList = this.state.provinces.map((provinces, i) => {
                return (
                    <option value={provinces.provinceID} key={i}>{provinces.provinceDescription} </option>
                )
            })
            this.setState({ provinceID: initProvinceID });
            document.getElementById('provinceID').value = initProvinceID
        });
        axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: initProvinceID } }).then(response => {
            this.setState({ cantons: response.data[0] });
            this.state.cantonList = this.state.cantons.map((cantons, i) => {
                return (
                    <option value={cantons.cantonID} key={i}>{cantons.cantonDescription}</option>
                )
            });
        });
        axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: initCantonID } }).then(response => {
            this.setState({ districts: response.data[0] });
            this.state.districtList = this.state.districts.map((districts, i) => {
                return (
                    <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
                )
            });
        });
        this.loadUserInfo();
        this.initButtons();
        this.initAllFields();

    }

    getCantonsByProvince(event) {
        this.setState({ provinceID: event.target.value });
        document.getElementById('provinceID').value = event.target.value
        axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: event.target.value } }).then(response => {
            this.setState({ cantons: response.data[0] });
            var cantonValue;
            this.state.cantonList = this.state.cantons.map((cantons, i) => {
                if (i == 0) {
                    cantonValue = cantons.cantonID
                } return (
                    <option value={cantons.cantonID} key={i}>{cantons.cantonDescription}</option>
                )
            });
            this.setState({ cantonID: cantonValue });
            document.getElementById('cantonID').value = cantonValue
            axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: cantonValue } }).then(response => {
                this.setState({ districts: response.data[0] });
                var districtValue;
                this.state.districtList = this.state.districts.map((districts, i) => {
                    if (i == 0) {
                        districtValue = districts.districtID
                    }
                    return (
                        <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
                    )
                });
                this.setState({ districtID: districtValue });
                document.getElementById('districtID').value = districtValue;
            });
        });
    };
    getDistrictsByCanton(event) {
        this.setState({ cantonID: event.target.value });
        document.getElementById('cantonID').value = event.target.value
        axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: event.target.value } }).then(response => {
            this.setState({ districts: response.data[0] });
            var districtValue;
            this.state.districtList = this.state.districts.map((districts, i) => {
                if (i == 0) {
                    districtValue = districts.districtID
                }
                return (
                    <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
                )
            });
            this.setState({ districtID: districtValue });
            document.getElementById('districtID').value = districtValue;
        });
    };

    getDistrict(event) {
        this.setState({ districtID: event.target.value });
        document.getElementById('districtID').value = event.target.value;
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
            axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID'] } }).then(response => {
                this.setState({ districts: response.data[0] });
                this.state.districtList = this.state.districts.map((districts, i) => {
                    return (
                        <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
                    )
                });
            });
            document.getElementById('cantonID').value = JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID']
            axios.get(`http://localhost:9000/User/getLocalGeoSupID`, { params: { localGeoSupID: JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID'] } }).then(response => {
                this.setState({ provinceID: JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID'] });
                axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID'] } }).then(response => {
                    this.setState({ cantons: response.data[0] });
                    this.state.cantonList = this.state.cantons.map((cantons, i) => {
                        return (
                            <option value={cantons.cantonID} key={i}>{cantons.cantonDescription}</option>
                        )
                    });
                });
                document.getElementById('provinceID').value = JSON.parse(JSON.stringify(response.data[0]))[0]['localGeoSupID']
            });
        });

    }
    loadUserInfo() {
        axios.get(`http://localhost:9000/User/getUserInfo`, { params: { partyID: sessionStorage.getItem('partyID') } }).then(response => {
            response.data[0].map((response) => {
                this.getLocalGeoSupID(response.districtID);
                document.getElementById('districtID').value = response.districtID;


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
                sessionStorage.setItem('currentIdentificationID', response.identificationID);
                sessionStorage.setItem('currentCarnet', response.carnet);

            })

        });
        this.state.userTypeID = sessionStorage.getItem('userTypeID');
        this.state.email = sessionStorage.getItem('email');
    }

    updateUser() {      
        alert(this.state.secondLastName);
        fetch("http://localhost:9000/User/updateUser", {
            method: "post",
            body: JSON.stringify({
                partyID: sessionStorage.getItem('partyID'),
                identificationID: this.state.identificationID,
                firstName: this.state.firstName,
                secondName: this.state.secondName,
                lastName: this.state.lastName,
                secondLastName: this.state.secondLastName,
                carnet: this.state.carnet.trim(),
                career: this.state.career.trim(),
                phoneNumber1: this.state.phoneNumber1,
                phoneNumber2: this.state.phoneNumber2.trim(),
                districtID: document.getElementById('districtID').value,
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
        alert("Los datos de usuario fueron actualizados con éxito");
    }

    updatePassword() {
        fetch("http://localhost:9000/User/updatePassword", {
            method: "post",
            body: JSON.stringify({
                email: sessionStorage.getItem('email'),
                password: this.state.Hash.encode(this.state.newPassword),
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
        alert("La contraseña fue cambiada con éxito");
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
        alert("Los datos del usuario de emergencia fueron actualizadoscon éxito");
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
        axios.get(`http://localhost:9000/User/isIdentificationValid`, { params: { identificationID: this.state.identificationID } }).then(response => {
            var identificationIDValid = JSON.parse(JSON.stringify(response.data))[0]['isIdentificationValid'].data[0];

            axios.get(`http://localhost:9000/User/isCarnetValid`, { params: { carnet: this.state.carnet } }).then(response => {
                var carnetValid = JSON.parse(JSON.stringify(response.data))[0]['isCarnetValid'].data[0];
                if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0
              ||  this.state.phoneNumber1.trim().length == 0
                    || this.state.career.trim().length == 0 || this.state.carnet.trim().length == 0
                    || this.state.identificationID.toString().trim().length == 0) {
                    alert("Todos los datos del usuarios deben estar llenos");
                } else if (!this.state.validations.validateTextField(this.state.firstName.trim())
                    || (this.state.secondName != null && (this.state.secondName.trim().length != 0) && (!this.state.validations.validateTextField(this.state.secondName.trim())))
                    || !this.state.validations.validateTextField(this.state.lastName.trim())
                    || (this.state.secondLastName != null && (this.state.secondLastName.trim().length != 0) && (!this.state.validations.validateTextField(this.state.secondLastName.trim())))
                ) {
                    alert("Los datos del nombre solo pueden estar compuestos por letras y extensión mínima de 2 caracteres");
                } else if (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber1)
                    || ((this.state.phoneNumber2.trim().length != 0) && (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber2)))) 
                    {
                    alert("Los números telefónicos deben estar compuestos por 8 dígitos");

                } else if (this.state.carnet != "N/A" && !this.state.validations.validateCarnetField(this.state.carnet)) {
                    alert("El carné debe estar compuesto por 1 letra inicial y 5 dígitos");
                } else if (this.state.carnet != "N/A" && carnetValid == 1 && (this.state.carnet != sessionStorage.getItem('currentCarnet'))) {
                    alert("El carné ingresado ya corresponde a otro usuario registrado");
                } else if (!this.state.validations.validateIdentification(this.state.identificationID)) {
                    alert("El formato de la cédula ingresada es incorrecto");
                } else if (identificationIDValid == 1 && (this.state.identificationID != sessionStorage.getItem('currentIdentificationID'))) {
                    alert("La cédula ingresado ya corresponde a otro usuario registrado");

                } else {
                    if (window.confirm("¿Está seguro se actualizar los datos de usuario?") == true) {
                        document.getElementById('changeInfo').style.display = 'none';
                        document.getElementById('editInfo').style.display = 'block';
                        document.getElementById('cancelInfo').style.display = 'none';
                        this.updateUser();
                        this.enableInfoFields(false);
                    }
                }
            });
        });


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
        if (document.getElementById('password').value.length == 0 || document.getElementById('newPassword').value.length == 0
            || document.getElementById('confirmNewPassword').value.length == 0) {
            alert("Todos los campos de contraseña deben estar llenos")
        } else if (this.state.hash.encode(this.state.password, sessionStorage.getItem('password'))) {
            alert("La contraseña actual es incorrecta");
        } else if (!this.state.validations.validatePasswordField(this.state.newPassword) ||!this.state.validations.validatePasswordField(this.state.confirmNewPassword)) {
            alert("La contraseña debe contar con una extensión mínima de 8 caracteres y estar compuesta almenos por números y letras");
        } else if (this.state.newPassword != this.state.confirmNewPassword) {
            alert("Los campos de nueva contraseña no coinciden");
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

        } else if (!this.state.validations.validateTextField(this.state.contactName)) {
            alert("El nombre del contacto de emergencia solo pueden estar compuesto por letras y extensión mínima de 2 caracteres");
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
                                            <p>Primer nombre<font color="red">*</font></p>
                                            <input type="text" placeholder="Ej: Kevin" id="firstName" name="firstName" required className="form-control inputText" value={this.state.firstName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Primer Apellido<font color="red">*</font></p>
                                            <input type="text" placeholder="Ej: Jiménez" id="lastName" name="lastName" required className="form-control inputText" value={this.state.lastName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 1<font color="red">*</font></p>
                                            <input type="text" placeholder="########" id="phoneNumber1" name="phoneNumber1" required className="form-control inputText" value={this.state.phoneNumber1 || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input type="text" placeholder="Ej: José" id="secondName" name="secondName" className="form-control inputText" value={this.state.secondName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Segundo Apellido</p>
                                            <input type="text" placeholder="Ej: Molina" id="secondLastName" name="secondLastName"  className="form-control inputText" value={this.state.secondLastName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 2</p>
                                            <input type="text" placeholder="########" id="phoneNumber2" name="phoneNumber2" className="form-control inputText" value={this.state.phoneNumber2 || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Número de cédula<font color="red">*</font></p>
                                            <input type="text" placeholder="#########" id="identificationID" name="identificationID" required className="form-control InputText" value={this.state.identificationID || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Fecha de nacimiento<font color="red">*</font></p>
                                            <input type="date" name="birthDate" disabled required className="form-control InputText" value={this.state.birthDate || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Carné<font color="red">*</font></p>
                                            <input type="text" placeholder="Ej: A00000" id="carnet" name="carnet" required className="form-control InputText" value={this.state.carnet || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Carrera<font color="red">*</font></p>
                                            <input type="text" placeholder="Ej: Informática Empresarial" id="career" name="career" required className="form-control InputText" value={this.state.career || ''} onChange={this.handleInputChange}></input>
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
                                            <p>Provincia<font color="red">*</font></p>
                                            <select id="provinceID" id="provinceID" name="provinceID" className="form-control" onChange={this.getCantonsByProvince}>
                                                {this.state.provinceList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Cantón<font color="red">*</font></p>
                                            <select name="cantonID" id="cantonID" className="form-control" onChange={this.getDistrictsByCanton}>
                                                {this.state.cantonList}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Distrito<font color="red">*</font></p>
                                            <select name="districtID" id="districtID" className="form-control" value={this.state.districtID} onChange={this.getDistrict}>
                                                {this.state.districtList}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <p align="left">Otras señas<font color="red">*</font></p>
                                            <textarea type="text" placeholder="Ej: Cerca del árbol de aguacate, casa color verde." id="addressLine" required name="addressLine" value={this.state.addressLine || ''} onChange={this.handleInputChange} className="bigInputText w-100 form-control bigInputText"></textarea>
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
                                            <p>Contraseña actual<font color="red">*</font></p>
                                            <input type="password" id="password" required name="password" value={this.state.password || ''} onChange={this.handleInputChange} className="form-control inputText w-100"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Contraseña nueva<font color="red">*</font></p>
                                                    <input type="password" title="Debe contener letras y números" id="newPassword" required name="newPassword" className="inputText form-control" value={this.state.newPassword || ''} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Confirmar contraseña nueva<font color="red">*</font></p>
                                                    <input type="password" title="Vuelva a introducir la contraseña nueva" id="confirmNewPassword" required name="confirmNewPassword" className="inputText form-control" value={this.state.confirmNewPassword || ''} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group " align="left">
                                            <input type="checkbox" id="showPasswordFields" required name="showPasswordFields" onChange={this.showPasswordFields} ></input>Mostrar campos
                                        </div>
                                    </div>
                                    </div>
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
                                            <p>Nombre<font color="red">*</font></p>
                                            <input type="text" required name="contactName" id="contactName" className="inputText form-control" value={this.state.contactName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Parentesco<font color="red">*</font></p>
                                            <select name="relationTypeID" id="relationTypeID" className="form-control" value={this.state.relationTypeID} onChange={this.handleInputChange}>
                                                {this.state.relationList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Teléfono<font color="red">*</font></p>
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