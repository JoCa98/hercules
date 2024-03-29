import React, { Component } from 'react';
import axios from "axios";
import validations from './validations';
import PermissionsManager from "./PermissionsManager";
import Hash from './Hash';
import ModalComponent from './ModalComponent';

class SignUp extends Component {
    constructor(props) {
        super(props);
        /**
    *permissionsManager:
    * @type {PermissionsManager}
    * Instance of PermissionManager to grant or deny permission to the user to access certain pages from the current one
    * and depending of the user type.
    * 
    * hash
    * @type {hash}
    * Instance of Hash which encrypts the password.
    * 
    * valiadations
    * @type {validations}
    * Instance of validations which allows to validates different types of data.
    * 
    * identificationID:
    * @type {integer}
    * Property that stores the identification ID of the user.
    * 
    * identificationID:
    * @type {integer}
    * Property that stores the identification ID of the user.
    * 
    * firstName:
    * @type {String}
    * Property that stores the first name of the user.
    * 
    * secondName:
    * @type {String}
    * Property that stores the second name of the user.
    * 
    * lastName:
    * @type {String}
    * Property that stores the last name of the user.
    * 
    * secondLastName:
    * @type {String}
    * Property that stores the second last name of the user.
    * 
    * carnet:
    * @type {String}
    * Property that stores the carnet of the user.
    * 
    * career:
    * @type {String}
    * Property that stores the career of the user (if they are a student).
    * 
    * birthDate:
    * @type {Date}
    * Property that stores the birth date of the user.
    * 
    * genderID:
    * @type {integer}
    * Property that stores a 1 if the user is male a or a if the user is female.
    * 
    * userTypeID:
    * @type {integer}
    * Property that stores the ID of the type of user.
    * 
    * email:
    * @type {String}
    * Property that stores the email of the user.
    * 
    * password:
    * @type {String}
    * Property that stores the password of the user account.
    * 
    * confirmPassword:
    * @type {String}
    * Property that stores the confirmation password of the user account.
    *         
    * phoneNumber1:
    * @type {integer}
    * Property that stores the main phone number of the user.
    * 
    * phoneNumber2:
    * @type {integer}
    * Property that stores the secondary phone number of the user.
    * 
    * startDate:
    * @type {Date}
    * Property that stores the sign up date of the user.
    * 
    * districtID:
    * @type {integer}
    * Property that stores the ID number of the district of residence of the user.
    * 
    * addressLine:
    * @type {String}
    * Property that stores the datails about the address of the user.
    * 
    * contactName:
    * @type {String}
    * Property that stores the name of the user´s contact.
    * 
    * relationTypeID:
    * @type {integer}
    * Property that stores the ID number of the relation between the user and their contact.
    * 
    * emergencyContactPhoneNumber:
    * @type {integer}
    * Property that stores the  phone number of the user´s contact.
    * 
    * activationCode:
    * @type {integer}
    * Property that stores the previously sent activation code required to complete the sing up process.
    * 
    * relations:
    * @type {Array}
    * Property that stores an array which contains the relation types.
    * 
    * provinces:
    * @type {Array}
    * Property that stores an array which contains the all provinces.
    * 
    * provinceList:
    * @type {Set}
    * Property that stores a set of every province´s name and ID.
    * 
    * provinceID:
    * @type {integer}
    * Property that stores the ID number of the province of residence of the user.
    * 
    * cantons:
    * @type {Array}
    * Property that stores an array which contains the all cantons.
    * 
    * cantonList:
    * @type {Set}
    * Property that stores a set of every canton´s name and ID.
    * 
    * districtID:
    * @type {integer}
    * Property that stores the ID number of the canton of residence of the user.
    * 
    * districts:
    * @type {Array}
    * Property that stores an array which contains all the districts.
    * 
    * districtList:
    * @type {Set}
    * Property that stores a set of every district´s name and ID.
    */
        this.state = {
            validations: new validations(),
            permissionsManager: new PermissionsManager(),
            hash: new Hash(),
            identificationID: "",
            firstName: "",
            secondName: "",
            lastName: "",
            secondLastName: "",
            carnet: "",
            career: "",
            birthDate: (new Date().getFullYear() - 17) + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2),
            genderID: "1",
            userTypeID: "1",
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
            provinceList: null,
            provinces: [{}],
            provinceID: "",
            cantons: [{}],
            cantonList: null,
            cantonID: "30",
            districts: [{}],
            districtList: null,
            show: false,
            modalTittle: "",
            modalChildren: "",
            isExit: false
        };

        this.handleSelectProvince = this.handleSelectProvince.bind(this);
        this.loadCantons = this.loadCantons.bind(this);
        this.handleSelectCanton = this.handleSelectCanton.bind(this);
        this.loadDistricts = this.loadDistricts.bind(this);
        this.loadProvinces = this.loadProvinces.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCantonsByProvince = this.getCantonsByProvince.bind(this);
        this.getDistrictsByCanton = this.getDistrictsByCanton.bind(this);
        this.getDistrict = this.getDistrict.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.goActCodeForm = this.goActCodeForm.bind(this);
        this.GetCode = this.GetCode.bind(this);
        this.selectFemale = this.selectFemale.bind(this);
        this.selectMale = this.selectMale.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.selectWorker = this.selectWorker.bind(this);
        this.showPasswordFields = this.showPasswordFields.bind(this);
        this.backButton = this.backButton.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.modalTrigger = this.modalTrigger.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
    * Method that validate the page permissions. Then, loads all the address select elements.
    */
    componentDidMount() {
        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);

            this.selectWorker();
            this.selectFemale();
            var initProvinceID = 2;
            var initCantonID = 30;
            var initDistrictID = 242;
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
                this.setState({ cantonID: initCantonID });
                document.getElementById('cantonID').value = initCantonID
            });
            axios.get(`http://localhost:9000/User/getDistricts`, { params: { cID: initCantonID } }).then(response => {
                this.setState({ districts: response.data[0] });
                this.state.districtList = this.state.districts.map((districts, i) => {
                    return (
                        <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
                    )
                });
                this.setState({ districtID: initDistrictID });
                document.getElementById('districtID').value = initDistrictID
            });
        }

    }

    /**
    * Method that gets and sets the list of cantons by the selected province. 
    */
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

    /**
    * Method that gets and sets the list of districts by the selected canton. 
    */
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

    /**
    * Method that gets the selected district.
    */
    getDistrict(event) {
        this.setState({ districtID: event.target.value });
        document.getElementById('districtID').value = event.target.value;
    };

    /**
    * Method that load all the cantons on the select element. 
    */
    loadCantons() {
        this.state.cantonList = this.state.cantons.map((cantons, i) => {
            return (
                <option value={cantons.cantonID} key={i}>{cantons.cantonDescription}</option>
            )
        });
    }

    /**
    * Method that load all the provinces on the select element. 
    */
    loadProvinces() {
        this.state.provinceList = this.state.provinces.map((provinces, i) => {
            return (
                <option value={provinces.provinceID} key={i}>{provinces.provinceDescription}</option>
            )
        });

    }

    /**
    * Method that load all the districts on the select element. 
    */
    loadDistricts() {
        this.state.districtList = this.state.districts.map((districts, i) => {
            return (
                <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
            )
        });
    }

    /**
    * Method that gets and sets the canton list by province.
    * 
    * Receive an object that contains the selected province.
    * @param {Object} 
    */
    handleSelectProvince(event) {
        var value = event.target.value;
        this.getCantonsByProvince(value);
    }

    /**
    * Method that gets and sets the district list by province.
    * 
    * Receive an object that contains the selected canton.
    * @param {Object} 
    */
    handleSelectCanton(event) {
        var value = event.target.value;
        this.getDistrictsByCanton(value);
        this.loadDistricts();
    }

    /**
    * Method that generates the activation code required to complete the sign up process.
    *    
    */
    GetCode() {
        this.state.activationCode = Math.floor((Math.random() * ((10000 - 100000) + 1)) + 100000);
    }

    /**
    * Method that hides and shows the student user exclusive fields.
    * 
    */
    selectStudent() {
        if (document.getElementById('cbStudent').checked == true) {
            document.getElementById('cbWorker').checked = false;
            document.getElementById('divStudent1').style.display = 'block';
            document.getElementById('divStudent2').style.display = 'block';
            this.state.userTypeID = 1;
        } else {
            document.getElementById('cbWorker').checked = true;
            document.getElementById('divStudent1').style.display = 'none';
            document.getElementById('divStudent2').style.display = 'none';
            this.state.userTypeID = 2;
        }
    }

    /**
    * Method that hides and shows the worker user exclusive fields.
    * 
    */
    selectWorker() {
        if (document.getElementById('cbWorker').checked == true) {
            document.getElementById('cbStudent').checked = false;
            document.getElementById('divStudent1').style.display = 'none';
            document.getElementById('divStudent2').style.display = 'none';
            this.state.userTypeID = 2;
        } else {
            document.getElementById('cbStudent').checked = true;
            document.getElementById('divStudent1').style.display = 'block';
            document.getElementById('divStudent2').style.display = 'block';
            this.state.userTypeID = 1;
        }
    }
    /**
    * Method that checks the male check button and unchecks the female check.
    * 
    */
    selectMale() {
        if (document.getElementById('cbMale').checked == true) {
            document.getElementById('cbFemale').checked = false;
            this.state.genderID = 1;
        } else {
            document.getElementById('cbFemale').checked = true;
            this.state.genderID = 2;
        }
    }
    /**
    * Method that hides and shows the password fields.
    * 
    */
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

    /**
    * Method that checks the female check button and unchecks the male check.
    * 
    */
    selectFemale() {
        if (document.getElementById('cbFemale').checked == true) {
            document.getElementById('cbMale').checked = false;
            this.state.genderID = 2;
        } else {
            document.getElementById('cbMale').checked = true;
            this.state.genderID = 1;
        }
    }

    /**
    * Method that validates all the fields and warns the user when the data in wrong or missing.
    * If the data is correct, redirects the user to the ActCodeFormPage.
    * 
    */
    goActCodeForm(event) {
        axios.get(`http://localhost:9000/User/isEmailValid`, { params: { email: this.state.email } }).then(response => {
            var emailValid = JSON.parse(JSON.stringify(response.data))[0]['isEmailValid'].data[0]
            axios.get(`http://localhost:9000/User/isIdentificationValid`, { params: { identificationID: this.state.identificationID } }).then(response => {
                var identificationIDValid = JSON.parse(JSON.stringify(response.data))[0]['isIdentificationValid'].data[0];

                axios.get(`http://localhost:9000/User/isCarnetValid`, { params: { carnet: this.state.carnet } }).then(response => {
                    var carnetValid = JSON.parse(JSON.stringify(response.data))[0]['isCarnetValid'].data[0];

                    if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0
                        || this.state.phoneNumber1.trim().length == 0
                        || this.state.contactName.toString().trim().length == 0
                        || this.state.email.trim().length == 0 || this.state.password.trim().length == 0
                        || this.state.confirmPassword.toString().trim().length == 0 || this.state.addressLine.toString().trim().length == 0
                        || this.state.emergencyContactPhoneNumber.toString().trim().length == 0
                        || (this.state.userTypeID == 1 && (this.state.carnet.trim().length == 0 || this.state.career.trim().length == 0))
                    ) {
                        this.modalTrigger(event, 'Campos obligatorios', 'Todos los campos obligatorios  deben estar llenos');
                    } else if (!this.state.validations.validateTextField(this.state.firstName.trim())
                        || (this.state.secondName != null && (this.state.secondName.trim().length != 0) && (!this.state.validations.validateTextField(this.state.secondName.trim())))
                        || !this.state.validations.validateTextField(this.state.lastName.trim())
                        || (this.state.secondLastName != null && (this.state.secondLastName.trim().length != 0) && (!this.state.validations.validateTextField(this.state.secondLastName.trim())))) {
                        this.modalTrigger(event, 'Nombre', 'Los datos del nombre solo pueden estar compuestos por letras y extensión mínima de 2 caracteres');
                    } else if (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber1)
                        || ((this.state.phoneNumber2.trim().length != 0) && (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber2)))
                        || !this.state.validations.validatePhoneNumberField(this.state.emergencyContactPhoneNumber)) {
                        this.modalTrigger(event, 'Números telefónicos', 'Los números telefónicos deben estar compuestos por 8 dígitos');
                    } else if (!this.state.validations.validateIdentification(this.state.identificationID)) {
                        this.modalTrigger(event, 'Cédula', 'El formato de la cédula ingresada es incorrecto');
                    } else if (identificationIDValid == 1) {
                        this.modalTrigger(event, 'Cédula', 'La cédula ingresada ya corresponde a otro usuario registrado');
                    } else if (this.state.userTypeID == 1 && !this.state.validations.validateCarnetField(this.state.carnet)) {
                        this.modalTrigger(event, 'Carné', 'El carné debe estar compuesto por 1 letra inicial y 5 dígitos');
                    } else if (this.state.userTypeID == 1 && carnetValid == 1) {
                        this.modalTrigger(event, 'Carné', 'El carné ingresado ya corresponde a otro usuario registrado');
                    } else if (this.state.userTypeID == 1 && !this.state.validations.validateTextField(this.state.career.trim())) {
                        this.modalTrigger(event, 'Números', 'El dato de la carrera solo debe de contener letras');
                    } else if (!this.state.validations.validateEmailField(this.state.email)) {
                        this.modalTrigger(event, 'Email', 'Debe utilizar su cuenta de correo institucional');
                    } else if (emailValid == 1) {
                        this.modalTrigger(event, 'Email', 'El correo ingresado ya corresponde a otro usuario registrado');
                    } else if (this.state.password != this.state.confirmPassword) {
                        this.modalTrigger(event, 'Contraseña', 'Los campos de contraseña no coinciden');
                    } else if (!this.state.validations.validatePasswordField(this.state.password) || !this.state.validations.validatePasswordField(this.state.confirmPassword)) {
                        this.modalTrigger(event, 'Contraseña', 'La contraseña debe contar con una extensión entre de 8 y 16 caracteres y estar compuesta al menos por números y letras');
                    } else if (!this.state.validations.validateTextField(this.state.contactName.trim())) {
                        this.modalTrigger(event, 'Contacto de emergencia', 'El nombre del contacto de emergencia solo debe contener letras');
                    } else {
                        this.GetCode();
                        sessionStorage.setItem('identificationID', this.state.identificationID);
                        sessionStorage.setItem('firstName', this.state.firstName);
                        sessionStorage.setItem('secondName', this.state.secondName);
                        sessionStorage.setItem('lastName', this.state.lastName);
                        sessionStorage.setItem('secondLastName', this.state.secondLastName);
                        if (this.state.userTypeID == 1) {
                            sessionStorage.setItem('carnet', this.state.carnet.toUpperCase());
                            sessionStorage.setItem('career', this.state.career);
                        } else if (this.state.userTypeID == 2) {
                            sessionStorage.setItem('carnet', '');
                            sessionStorage.setItem('career', '');
                        }

                        sessionStorage.setItem('birthDate', this.state.birthDate);
                        sessionStorage.setItem('phoneNumber1', this.state.phoneNumber1);
                        sessionStorage.setItem('phoneNumber2', this.state.phoneNumber2);
                        sessionStorage.setItem('genderID', this.state.genderID);
                        sessionStorage.setItem('userTypeIDRegister', this.state.userTypeID);
                        sessionStorage.setItem('emailRegister', this.state.email);
                        sessionStorage.setItem('passwordRegister', this.state.hash.encode(this.state.password));
                        sessionStorage.setItem('startDate', this.state.startDate);
                        sessionStorage.setItem('activationCode', this.state.activationCode);
                        sessionStorage.setItem('districtID', this.state.districtID);
                        sessionStorage.setItem('addressLine', this.state.addressLine);
                        sessionStorage.setItem('contactName', this.state.contactName);
                        sessionStorage.setItem('relationTypeID', this.state.relationTypeID);
                        sessionStorage.setItem('emergencyContactPhoneNumber', this.state.emergencyContactPhoneNumber);
                        this.sendEmail();
                        this.setState({
                            isExit: true
                        });
                        this.modalTrigger(event, 'Código de activación', 'Se ha enviado un código de activación al correo, debe copiarlo para completar el proceso de registro');
                    }
                });
            });
        });
    }

    /**
    * Method that sends an email to the user with the activation code.
    * 
    */
    sendEmail() {
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
                
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
    }

    /**
    * Method that redirect the user to the previous page.
    * 
    */
    backButton() {
        sessionStorage.removeItem('termsConfirm');
        this.props.history.push(`/`);
    }

    /**
    * Method that changes the value of the state variable using the object that triggers the event.
    * To do this the element must have the property name defined as the state variable
    * 
    * Receive an object that contains the element that called the method
    * @param {Object} 
    */
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
            this.props.history.push(`/ActCodeForm`);
        }
        event.preventDefault();
    };

    render() {
        const relationList = this.state.relations.map((relations, i) => {
            return (
                <option value={relations.relationTypeID} key={i}>{relations.description} </option>
            )
        })
        this.loadProvinces()
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
                                            <p title="Campo obligatorio">Primer nombre<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" placeholder="Ej: Kevin" name="firstName" required className="form-control inputText" value={this.state.firstName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input fontSize="18px" type="text" placeholder="Ej: José" name="secondName" className="form-control inputText" value={this.state.secondName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Primer Apellido<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" placeholder="Ej: Jiménez" name="lastName" required className="form-control inputText" value={this.state.lastName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo Apellido</p>
                                            <input fontSize="18px" type="text" placeholder="Ej: Molina" name="secondLastName" required className="form-control inputText" value={this.state.secondLastName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Teléfono 1<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" placeholder="########" name="phoneNumber1" required className="form-control inputText" value={this.state.phoneNumber1} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Teléfono 2</p>
                                            <input fontSize="18px" type="text" placeholder="#########" name="phoneNumber2" className="form-control inputText" value={this.state.phoneNumber2} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Tipo de usuario<font color="red">*</font></p>
                                            <input fontSize="18px" type="checkbox" id="cbStudent" name="cbStudent" onClick={this.selectStudent} ></input>Estudiante

                                            <br></br>
                                            <input fontSize="18px" type="checkbox" id="cbWorker" name="cbWorker" onClick={this.selectWorker} ></input>Funcionario
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Sexo<font color="red">*</font></p>
                                            <input type="checkbox" id="cbMale" name="cbMale" onClick={this.selectMale} ></input>Maculino
                                            <br></br>
                                            <input type="checkbox" id="cbFemale" name="cbFemale" onClick={this.selectFemale} ></input>Femenino

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Número de cédula<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" title="Número de cédula o cédula de residencia" placeholder="#########" name="identificationID" required className="form-control InputText" value={this.state.identificationID} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Fecha de nacimiento<font color="red">*</font></p>
                                            <input fontSize="18px" type="date" name="birthDate" required onChange={this.handleInputChange} value={this.state.birthDate} className="form-control InputText"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left" id="divStudent1">
                                            <p title="Campo obligatorio">Número de carné<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" placeholder="Ej: A00000" name="carnet" maxLength="6" value={this.state.carnet} onChange={this.handleInputChange} className="form-control InputText"></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left" id="divStudent2">
                                            <p title="Campo obligatorio">Carrera<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" placeholder="Ej: Informática Empresarial" name="career" value={this.state.career} onChange={this.handleInputChange} className="form-control InputText"></input>
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
                                            <p title="Campo obligatorio">Provincia<font color="red">*</font></p>
                                            <select fontSize="18px" name="provinceID" id="provinceID" className="form-control" onChange={this.getCantonsByProvince}>
                                                {this.state.provinceList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Cantón<font color="red">*</font></p>
                                            <select fontSize="18px" name="cantonID" id="cantonID" className="form-control" onChange={this.getDistrictsByCanton}>
                                                {this.state.cantonList}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Distrito<font color="red">*</font></p>
                                            <select fontSize="18px" name="districtID" id="districtID" className="form-control" onChange={this.getDistrict} value={this.districtID}>
                                                {this.state.districtList}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group text-left">
                                            <p title="Campo obligatorio">Otras señas<font color="red">*</font></p>
                                            <textarea fontSize="18px" type="text" placeholder="Ej: Cerca del árbol de aguacate, casa color verde." required name="addressLine" value={this.state.addressLine} onChange={this.handleInputChange} className="w-100 form-control bigInputText"></textarea>
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
                                                    <p title="Campo obligatorio">Email<font color="red">*</font></p>
                                                    <input fontSize="18px" type="text" title="Únicamenta correos institucionales" placeholder="Ej: correo@ucr.ac.cr" required name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control inputText w-100"></input>

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
                                                    <p title="Campo obligatorio">Contraseña<font color="red">*</font></p>
                                                    <input type="password" title="Debe de contener letras y números" placeholder="Contraseña" required name="password" id="password" className="inputText form-control" value={this.state.password} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p title="Campo obligatorio">Confirmar contraseña<font color="red">*</font></p>
                                                    <input type="password" title="Vuelva a escribir su contraseña" placeholder="Confirmar contraseña" required name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} className="inputText form-control"></input>
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
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <h2 className="text-left">Contacto de emergencia</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Nombre<font color="red">*</font></p>
                                            <input type="text" fontSize="18px" placeholder="Ej: Juan Piedra" required name="contactName" className="inputText form-control" value={this.state.contactName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Parentesco<font color="red">*</font></p>
                                            <select fontSize="18px" name="relationTypeID" className="form-control" onChange={this.handleInputChange}>
                                                {relationList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Teléfono<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" placeholder="########" required name="emergencyContactPhoneNumber" className="inputText form-control" value={this.state.emergencyContactPhonenumber} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-3 col-md-2 text-left mt-4">
                                <button className="buttonSizeGeneral w-100" onClick={this.backButton}>Cancelar</button>
                            </div>
                            <div className="col-12 col-sm-3 offset-sm-6 col-md-2 offset-md-8  text-right mt-4" >
                                <button className="buttonSizeGeneral w-100" onClick={this.goActCodeForm}>Guardar</button>
                            </div>
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
        )
    }
}
export default SignUp;