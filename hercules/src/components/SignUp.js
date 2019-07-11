import React, { Component } from 'react';
import axios from "axios";
import validations from './validations';
import Hash from './Hash';

class SignUp extends Component {
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
            carnet: "",
            career: "",
            birthDate: (new Date().getFullYear() - 17) + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2),
            genderID: "1",
            userTypeID: "2",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber1: "",
            phoneNumber2: "",
            startDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
            districtID: "242",
            addressLine: "",
            contactName: "",
            relationTypeID: "1",
            emergencyContactPhoneNumber: "",
            activationCode: "",
            relations: [{}],
            provinces: [{}],
            provinceID: "2",
            cantons: [{}],
            cantonList: null,
            cantonID: "30",
            districts: [{}],
            districtList: null,

        };

        this.handleSelectProvince = this.handleSelectProvince.bind(this);
        this.loadCantons = this.loadCantons.bind(this);
        this.handleSelectCanton = this.handleSelectCanton.bind(this);
        this.loadDistricts = this.loadDistricts.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCantonsByProvince = this.getCantonsByProvince.bind(this);
        this.getDistrictsByCanton = this.getDistrictsByCanton.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.goActCodeForm = this.goActCodeForm.bind(this);
        this.GetCode = this.GetCode.bind(this);
        this.selectFemale = this.selectFemale.bind(this);
        this.selectMale = this.selectMale.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.selectWorker = this.selectWorker.bind(this);
        this.validEmail = this.validEmail.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.selectWorker();
        this.selectFemale();
        var initProvinceID = 2;
        var initCantonID = 30;
        //var initDistrictID = 242;
        axios.get(`http://localhost:9000/User/getRelationType`).then(response => {
            this.setState({ relations: response.data });
        });
        axios.get(`http://localhost:9000/User/getProvinces`).then(response => {
            this.setState({ provinces: response.data });
        });
        axios.get(`http://localhost:9000/User/getCantons`, { params: { pID: initProvinceID } }).then(response => {
            this.setState({ cantons: response.data[0] });
        });
        axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: initCantonID } }).then(response => {
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

    GetCode() {
        this.state.activationCode = Math.floor((Math.random() * ((10000 - 100000) + 1)) + 100000);
    }

    selectStudent() {
        if (document.getElementById('cbStudent').checked == true) {
            document.getElementById('cbWorker').checked = false;
            document.getElementById('divStudent1').style.display = 'block';
            document.getElementById('divStudent2').style.display = 'block';
            this.state.userTypeID = 2;
        } else {
            document.getElementById('cbWorker').checked = true;
            document.getElementById('divStudent1').style.display = 'none';
            document.getElementById('divStudent2').style.display = 'none';
            this.state.userTypeID = 1;
        }
    }

    selectWorker() {
        if (document.getElementById('cbWorker').checked == true) {
            document.getElementById('cbStudent').checked = false;
            document.getElementById('divStudent1').style.display = 'none';
            document.getElementById('divStudent2').style.display = 'none';
            this.state.userTypeID = 1;
        } else {
            document.getElementById('cbStudent').checked = true;
            document.getElementById('divStudent1').style.display = 'block';
            document.getElementById('divStudent2').style.display = 'block';
            this.state.userTypeID = 2;
        }
    }
    showStudentFields() {
        document.getElementById('divStudent1').style.display = 'block';
        document.getElementById('divStudent2').style.display = 'block';
    }

    selectMale() {
        if (document.getElementById('cbMale').checked == true) {
            document.getElementById('cbFemale').checked = false;
            this.state.genderID = 1;
        } else {
            document.getElementById('cbFemale').checked = true;
            this.state.genderID = 2;
        }
    }
    showPasswordFields() {
        var show = document.getElementById('showPasswordFields').checked;
        if (show == true) {
            document.getElementById('password').type = "text";
            document.getElementById('confirmPassword').type = "text";
        } else {
            document.getElementById('password').type = "password";
            document.getElementById('confirmPassword').type = "password";
        }
    }
    selectFemale() {
        if (document.getElementById('cbFemale').checked == true) {
            document.getElementById('cbMale').checked = false;
            this.state.genderID = 2;
        } else {
            document.getElementById('cbMale').checked = true;
            this.state.genderID = 1;
        }
    }

    validEmail() {
        axios.get(`http://localhost:9000/User/isEmailValid`, { params: { email: this.state.email } }).then(response => {
            return JSON.parse(JSON.stringify(response.data))[0]['isUserExist'].data[0];
        });
    }
    validIdentification() {
        axios.get(`http://localhost:9000/User/isIdentificationValid`, { params: { identificationID: this.state.identificationID } }).then(response => {
            return JSON.parse(JSON.stringify(response.data))[0]['isUserExist'].data[0];
        });
    }
    validCarnet() {
        axios.get(`http://localhost:9000/User/isCarnetValid`, { params: { carnet: this.state.carnet } }).then(response => {
            return JSON.parse(JSON.stringify(response.data))[0]['isUserExist'].data[0];
        });
    }

    goActCodeForm() {
        alert("inicio pruebas");
        if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0
            || this.state.secondLastName.trim().length == 0 || this.state.phoneNumber1.trim().length == 0
            || this.state.phoneNumber2.toString().trim().length == 0 || this.state.contactName.toString().trim().length == 0
            || this.state.email.trim().length == 0 || this.state.password.trim().length == 0
            || this.state.confirmPassword.toString().trim().length == 0 || this.state.addressLine.toString().trim().length == 0
            || this.state.emergencyContactPhoneNumber.toString().trim().length == 0
            || (this.state.userTypeID == 1 & (this.state.carnet.trim().length == 0 || this.state.career.trim().length == 0))
        ) {
            alert("Todos los campos obligatorios  deben estar llenos");
        } else if (!this.state.validations.validateTextField(this.state.firstName)
            || !(this.state.secondName.trim().length != 0 & this.state.validations.validateTextField(this.state.secondName))
            || !this.state.validations.validateTextField(this.state.lastName)
            || !this.state.validations.validateTextField(this.state.secondLastName)
        ) {
            alert("Los datos del nombre solo pueden estar compuestos por letras y extensión mínima de 2 caracteres");
        } else if (this.state.userTypeID == 1 & !this.state.validations.validateCarnetField(this.state.carnet)) {
            alert("El carné debe estar compuesto por 1 letra inicial y 5 dígitos");
        } else if (this.state.userTypeID == 1 & this.validCarnet() == 1) {
            alert("El carné ingresado ya corresponde a otro usuario registrado");
        } else if (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber1)
            || (!this.state.phoneNumber2.trim().length == 0
                & !this.state.validations.validatePhoneNumberField(this.state.phoneNumber2))
            || !this.state.validations.validatePhoneNumberField(this.state.emergencyContactPhoneNumber)) {
            alert("Los números telefónicos deben estar compuestos por 8 dígitos");
        } else if (!this.state.validations.validateEmailField(this.state.email)) {
            alert("correo:" + this.state.email);
            alert("Debe utilizar su cuenta de correo institucional");
        } else if (this.validEmail() == 1) {
            alert("El correo ingresado ya corresponde a otro usuario registrado");
        } else if (!this.state.validations.validateIdentification(this.state.identificationID)) {
            alert("El formato de la cédula ingresada es incorrecto");
        } else if (this.validIdentification() == 1) {
            alert("La cédula ingresado ya corresponde a otro usuario registrado");
        } else {
            alert("paso pruebas");
            this.GetCode();
            sessionStorage.setItem('identificationID', this.state.identificationID);
            sessionStorage.setItem('firstName', this.state.firstName);
            sessionStorage.setItem('secondName', this.state.secondName);
            sessionStorage.setItem('lastName', this.state.lastName);
            sessionStorage.setItem('secondLastName', this.state.secondLastName);
            sessionStorage.setItem('carnet', this.state.carnet);
            sessionStorage.setItem('career', this.state.career);
            sessionStorage.setItem('birthDate', this.state.birthDate);
            sessionStorage.setItem('phoneNumber1', this.state.phoneNumber1);
            sessionStorage.setItem('phoneNumber2', this.state.phoneNumber2);
            sessionStorage.setItem('genderID', this.state.genderID);
            sessionStorage.setItem('userTypeID', this.state.userTypeID);
            sessionStorage.setItem('email', this.state.email);
            sessionStorage.setItem('password', this.state.password);
            sessionStorage.setItem('startDate', this.state.startDate);
            sessionStorage.setItem('activationCode', this.state.activationCode);
            sessionStorage.setItem('districtID', this.state.districtID);
            sessionStorage.setItem('addressLine', this.state.addressLine);
            sessionStorage.setItem('contactName', this.state.contactName);
            sessionStorage.setItem('relationTypeID', this.state.relationTypeID);
            sessionStorage.setItem('emergencyContactPhoneNumber', this.state.emergencyContactPhoneNumber);
            this.sendEmail();
            this.props.history.push(`/ActCodeForm`);
        }
    }

    sendEmail() {
        console.log("jason: " + JSON.stringify({ email: this.state.email, activationCode: this.state.activationCode }))
        fetch("http://localhost:9000/User/sendEmail", {
            method: "post",
            body: JSON.stringify({ email: this.state.email, activationCode: this.state.activationCode }),
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

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
                        <h1 className="text-center">Formulario de registro</h1>
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
                                            <input type="text" placeholder="Ej: Kevin" name="firstName" required className="form-control inputText" value={this.state.firstName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Primer Apellido<font color="red">*</font></p>
                                            <input type="text" placeholder="Ej: Jiménez" name="lastName" required className="form-control inputText" value={this.state.lastName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 1<font color="red">*</font></p>
                                            <input type="text" placeholder="########" name="phoneNumber1" required className="form-control inputText" value={this.state.phoneNumber1} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input type="text" placeholder="Ej: José" name="secondName" className="form-control inputText" value={this.state.secondName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Segundo Apellido</p>
                                            <input type="text" placeholder="Ej: Molina" name="secondLastName" required className="form-control inputText" value={this.state.secondLastName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 2</p>
                                            <input type="text" placeholder="########" name="phoneNumber2" className="form-control inputText" value={this.state.phoneNumber2} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Tipo de usuario<font color="red">*</font></p>
                                            <input type="checkbox" id="cbStudent" name="cbStudent" onClick={this.selectStudent} ></input>Estudiante

                                            <br></br>
                                            <input type="checkbox" id="cbWorker" name="cbWorker" onClick={this.selectWorker} ></input>Funcionario
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Sexo<font color="red">*</font></p>
                                            <input type="checkbox" id="cbMale" name="cbMale" onClick={this.selectMale} ></input>Maculino
                                            <br></br>
                                            <input type="checkbox" id="cbFemale" name="cbFemale" onClick={this.selectFemale} ></input>Femenino

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Número de cédula<font color="red">*</font></p>
                                            <input type="text" placeholder="#########" name="identificationID" required className="form-control InputText" value={this.state.identificationID} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Fecha de nacimiento<font color="red">*</font></p>
                                            <input type="date" name="birthDate" required onChange={this.handleInputChange} value={this.state.birthDate} className="form-control InputText"></input>
                                        </div>

                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left" id="divStudent1">
                                            <p>Número de carné<font color="red">*</font></p>
                                            <input type="text" placeholder="Ej: A00000" name="carnet" maxLength="6" value={this.state.carnet} onChange={this.handleInputChange} className="form-control InputText"></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left" id="divStudent2">
                                            <p>Carrera<font color="red">*</font></p>
                                            <input type="text" placeholder="Ej: Informática Empresarial" name="career" value={this.state.career} onChange={this.handleInputChange} className="form-control InputText"></input>
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
                                            <select name="provinceID" className="form-control" value="2" onChange={this.handleSelectProvince}>
                                                {provinceList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Cantón<font color="red">*</font></p>
                                            <select name="cantonID" className="form-control" value="30" onChange={this.handleSelectCanton}>
                                                {this.state.cantonList}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Distrito<font color="red">*</font></p>
                                            <select name="districtID" className="form-control" value="242" onChange={this.handleInputChange}>
                                                {this.state.districtList}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <p align="left">Otras señas<font color="red">*</font></p>
                                            <textarea type="text" placeholder="Ej: Cerca del árbol de aguacate, casa color verde." name="addressLine" value={this.state.addressLine} onChange={this.handleInputChange} className="w-100 form-control bigInputText" required></textarea>
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
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Email<font color="red">*</font></p>
                                                    <input type="text" title="Solo correo institucional" placeholder="Ej: correo@ucr.ac.cr" required name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control inputText w-100"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Contraseña<font color="red">*</font></p>
                                                    <input type="password" title="Debe contener letras y números" required name="password" id="password"className="inputText form-control" value={this.state.password} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Confirmar contraseña<font color="red">*</font></p>
                                                    <input type="password" title="Vuelva a introducir su contraseña" required name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} className="inputText form-control"></input>
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
                                            <input type="text" placeholder="Ej: Juan Piedra" required name="contactName" className="inputText form-control" value={this.state.contactName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Parentesco<font color="red">*</font></p>
                                            <select name="relationTypeID" className="form-control" onChange={this.handleInputChange}>
                                                {relationList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Teléfono<font color="red">*</font></p>
                                            <input type="text" placeholder="########" required name="emergencyContactPhoneNumber" className="inputText form-control" value={this.state.emergencyContactPhonenumber} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-5 offset-md-7">
                                <button align="left" className="buttonSizeGeneral" onClick={this.goActCodeForm}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SignUp;