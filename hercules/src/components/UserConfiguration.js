import React, { Component } from 'react';
import axios from "axios";
import validations from './validations';
import Hash from './Hash';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';

class UserConfiguration extends Component {
    constructor(props) {
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
        super(props);
        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            hash: new Hash(),
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
            show: false,
            modalTittle: "",
            modalChildren: ""
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

        this.modalTrigger = this.modalTrigger.bind(this);        

        this.backButton = this.backButton.bind(this);

    }
    /**
    * Method that validate the page permissions. Then, loads all the user info.
    */
    componentDidMount() {

        if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {
            window.scrollTo(0, 0);

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
    * Method that loads all the relation types on the select element. 
    */
    loadRelations() {
        this.state.relationList = this.state.relations.map((relations, i) => {
            return (
                <option value={relations.relationTypeID} key={i}>{relations.description} </option>
            )
        })
    }

    /**
    * Method that loads all the provinces on the select element. 
    */
    loadProvinces() {
        this.state.provinceList = this.state.provinces.map((provinces, i) => {
            return (
                <option value={provinces.provinceID} key={i}>{provinces.provinceDescription} </option>
            )
        })
    }

    /**
    * Method that loads all the cantons on the select element. 
    */
    loadCantons() {
        this.state.cantonList = this.state.cantons.map((cantons, i) => {

            return (
                <option value={cantons.cantonID} key={i}>{cantons.cantonDescription}</option>
            )
        });
    }

    /**
    * Method that loads all the districts on the select element. 
    */
    loadDistricts() {
        this.state.districtList = this.state.districts.map((districts, i) => {

            return (
                <option value={districts.districtID} key={i}>{districts.districtDescription}</option>
            )
        });
    }

    /**
    * Method that gets the first canton of the selected province. 
    * value:
    * @type {integer}
    * Property that stores a province´s ID.
    * 
    */
    getFirstCantonOfProvince(value) {
        axios.get(`http://localhost:9000/User/getFirstCantonOfProvince`, { params: { provinceID: value } }).then(response => {
            return JSON.parse(JSON.stringify(response.data[0]))[0]['cantonID']
        });
    }

   /**
    * Method that gets and sets the canton list by province.
    * 
    * Receive an object that contains the selected province.
    * @param {Object} 
    */

    handleSelectProvince(event) {
        this.handleInputChange(event);
        var value = event.target.value;
        this.getCantonsByProvince(value);
        this.loadCantons();

    }
    /**
    * Method that gets and sets the district list by province.
    * 
    * Receive an object that contains the selected canton.
    * @param {Object} 
    */
    handleSelectCanton(event) {
        this.handleInputChange(event);
        var value = event.target.value;
        this.getDistrictsByCanton(value);
        this.loadDistricts();
    }

    /**
    * Method that gets the province of a canton or the canton of a district. 
    * value:
    * @type {integer}
    * Property that stores a disctric/canton ID.
    * 
    */
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

    /**
    * Methods that loads all the user data.
    * 
    */
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
    /**
    * Method that updates the  information of the user.  
    * 
    */
    updateUser(event) {
        var secondName = this.state.secondName;
        var secondLastName = this.state.secondLastName;
        if (secondName == null) {
            secondName = '';
        }
        if (secondLastName == null) {
            secondLastName = '';
        }
        fetch("http://localhost:9000/User/updateUser", {
            method: "post",
            body: JSON.stringify({
                partyID: sessionStorage.getItem('partyID'),
                identificationID: this.state.identificationID,
                firstName: this.state.firstName,
                secondName: secondName,
                lastName: this.state.lastName,
                secondLastName: secondLastName,
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
                
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
        this.modalTrigger(event, 'Datos personales', 'Los datos de usuario fueron actualizados con éxito');
    }

    /**
    * Method that updates the password of the user.  
    * 
    */
    updatePassword(event) {
        fetch("http://localhost:9000/User/updatePassword", {
            method: "post",
            body: JSON.stringify({
                email: sessionStorage.getItem('email'),
                password: this.state.hash.encode(this.state.newPassword),
                tempPassword: 0
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
        this.modalTrigger(event, 'Contraseña', 'La contraseña fue cambiada con éxito');
    }

    /**
    * Method that updates the informatio of the user emergency contact.  
    * 
    */
    updateContact(event) {
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
                
            })
            .catch(err => console.error("Un error inesperado a ocurrido"));
        this.modalTrigger(event, 'Contacto de emergencia', 'Los datos del contacto de emergencia fueron actualizados con éxito');
    }
    
    /**
    * Method that loads the info of the user´s account.  
    * 
    */
    loadAccountInfo() {
        this.state.email = sessionStorage.getItem('email');
        this.state.password = "";
        this.state.newPassword = "";
        this.state.confirmNewPassword = "";
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
    * Method that sets the default state of the buttons.
    */
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

    /**
    * Method that sets the default state of the fields
    */
    initAllFields() {
        this.enableInfoFields(false);
        this.enablePasswordFields(false);
        this.enableContactFields(false);
    }

    /**
    * Method that allows or not to input new data on the the information fields.
    */
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

    /**
    * Method that allows or not to input new data on the the password fields.
    */

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

    /**
    * Method that allows or not to input new data on the emergency contact fields.
    */
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

    /**
    * Method that allows or not to edit the information fields.
    */

    editInfo() {
        document.getElementById('editInfo').style.display = 'none';
        document.getElementById('cancelInfo').style.display = 'block';
        document.getElementById('changeInfo').style.display = 'block';
        this.enableInfoFields(true)
    }

    /**
    * Method that reverts the changes on the information fields.
    */

    cancelInfo() {
        document.getElementById('cancelInfo').style.display = 'none';
        document.getElementById('editInfo').style.display = 'block';
        document.getElementById('changeInfo').style.display = 'none';
        this.loadUserInfo();
        this.enableInfoFields(false)
    }

    /**
    * Method that updates the information of the user.
    */
    changeInfo(event) {
        axios.get(`http://localhost:9000/User/isIdentificationValid`, { params: { identificationID: this.state.identificationID } }).then(response => {
            var identificationIDValid = JSON.parse(JSON.stringify(response.data))[0]['isIdentificationValid'].data[0];
            axios.get(`http://localhost:9000/User/isCarnetValid`, { params: { carnet: this.state.carnet } }).then(response => {
                var carnetValid = JSON.parse(JSON.stringify(response.data))[0]['isCarnetValid'].data[0];
                if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0
                    || this.state.phoneNumber1.trim().length == 0
                    || this.state.career.trim().length == 0 || this.state.carnet.trim().length == 0
                    || this.state.identificationID.toString().trim().length == 0) {
                    this.modalTrigger(event, 'Campos obligatorios', 'Todos los datos del usuarios deben estar llenos');
                } else if (!this.state.validations.validateTextField(this.state.firstName.trim())
                    || (this.state.secondName != null && (this.state.secondName.trim().length != 0) && (!this.state.validations.validateTextField(this.state.secondName.trim())))
                    || !this.state.validations.validateTextField(this.state.lastName.trim())
                    || (this.state.secondLastName != null && (this.state.secondLastName.trim().length != 0) && (!this.state.validations.validateTextField(this.state.secondLastName.trim())))
                ) {
                    this.modalTrigger(event, 'Nombre', 'Los datos del nombre solo pueden estar compuestos por letrasy extensión mínima de 2 caracteres');
                } else if (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber1)
                    || ((this.state.phoneNumber2.trim().length != 0) && (!this.state.validations.validatePhoneNumberField(this.state.phoneNumber2)))) {
                    this.modalTrigger(event, 'Números telefónicos', 'Los números telefónicos deben estar compuestos por 8 dígitos');
                } else if (this.state.carnet != "N/A" && !this.state.validations.validateCarnetField(this.state.carnet)) {
                    this.modalTrigger(event, 'Carné', 'El carné debe estar compuesto por 1 letra inicial y 5 dígitos');
                } else if (this.state.carnet != "N/A" && carnetValid == 1 && (this.state.carnet != sessionStorage.getItem('currentCarnet'))) {
                    this.modalTrigger(event, 'Carné', 'El carné ingresado ya corresponde a otro usuario registrado');
                } else if (!this.state.validations.validateIdentification(this.state.identificationID)) {
                    this.modalTrigger(event, 'Cédula', 'El formato de la cédula ingresada es incorrecto');
                } else if (identificationIDValid == 1 && (this.state.identificationID != sessionStorage.getItem('currentIdentificationID'))) {
                    this.modalTrigger(event, 'Cédula', 'La cédula ingresado ya corresponde a otro usuario registrado');
                } else {
                   
                        document.getElementById('changeInfo').style.display = 'none';
                        document.getElementById('editInfo').style.display = 'block';
                        document.getElementById('cancelInfo').style.display = 'none';
                        this.updateUser(event);
                        this.enableInfoFields(false);
                    
                }
            });
        });
    }

    /**
    * Method that allows or not to edit the password fields.
    */
    editPassword() {
        document.getElementById('editPassword').style.display = 'none';
        document.getElementById('cancelPassword').style.display = 'block';
        document.getElementById('changePassword').style.display = 'block';
        this.enablePasswordFields(true);
    }

    /**
    * Method that reverts the changes on the password fields.
    */
    cancelPassword() {
        document.getElementById('cancelPassword').style.display = 'none';
        document.getElementById('editPassword').style.display = 'block';
        document.getElementById('changePassword').style.display = 'none';
        this.setState({ password: "", newPassword: "", confirmNewPassword: "" });
        this.enablePasswordFields(false);
    }

    /**
    * Method that updates the password of the user.
    */
    changePassword(event) {
        if (document.getElementById('password').value.length == 0 || document.getElementById('newPassword').value.length == 0
            || document.getElementById('confirmNewPassword').value.length == 0) {
            this.modalTrigger(event, 'Contraseña', 'Todos los campos de contraseña deben estar llenos');
        } else if (!this.state.hash.comparePassword(this.state.password, sessionStorage.getItem('password'))) {
            this.modalTrigger(event, 'Contraseña', 'La contraseña actual es incorrecta');
        } else if (!this.state.validations.validatePasswordField(this.state.newPassword) || !this.state.validations.validatePasswordField(this.state.confirmNewPassword)) {
            this.modalTrigger(event, 'Contraseña', 'La contraseña debe contar con una extensión mínima de 8 caracteres y estar compuesta al menos por números y letras');
        } else if (this.state.newPassword != this.state.confirmNewPassword) {
            this.modalTrigger(event, 'Contraseña', 'Los campos de nueva contraseña no coinciden');
        } else {
            
                document.getElementById('changePassword').style.display = 'none';
                document.getElementById('editPassword').style.display = 'block';
                document.getElementById('cancelPassword').style.display = 'none';
                this.updatePassword(event);
                this.setState({ password: "", newPassword: "", confirmNewPassword: "" })
                this.enablePasswordFields(false);
            
        }
    }

    /**
    * Method that allows or not to edit the emergency contact fields.
    */
    editContact() {
        document.getElementById('editContact').style.display = 'none';
        document.getElementById('cancelContact').style.display = 'block';
        document.getElementById('changeContact').style.display = 'block';
        this.enableContactFields(true);
    }


    /**
    * Method that reverts the changes on the emergency contact fields.
    */
    cancelContact() {
        document.getElementById('cancelContact').style.display = 'none';
        document.getElementById('editContact').style.display = 'block';
        document.getElementById('changeContact').style.display = 'none';
        this.loadUserInfo();
        this.enableContactFields(false);
    }

    /**
    * Method that updates the emergency contact of the user.
    */
    changeContact(event) {
        if (this.state.emergencyContactPhoneNumber.trim().length == 0 || this.state.contactName.trim().length == 0) {            
            this.modalTrigger(event, 'Contacto de emergencia', 'Todos los datos del contacto de emergencia deben estar llenos');
        } else if (!this.state.validations.validateTextField(this.state.contactName)) {
            this.modalTrigger(event, 'Contacto de emergencia', 'El nombre del contacto de emergencia solo pueden estar compuesto por letras y extensión mínima de 2 caracteres');            
        } else if (!this.state.validations.validatePhoneNumberField(this.state.emergencyContactPhoneNumber)) {
            this.modalTrigger(event, 'Contacto de emergencia', 'El número teléfonico del contacto de emergencia debe estar compuesto por 8 dígitos');            
        } else {
            
                document.getElementById('changeContact').style.display = 'none';
                document.getElementById('editContact').style.display = 'block';
                document.getElementById('cancelContact').style.display = 'none';
                this.updateContact(event);
                this.enableContactFields(false);
           
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
            document.getElementById('newPassword').type = "text";
            document.getElementById('confirmNewPassword').type = "text";
        } else {
            document.getElementById('password').type = "password";
            document.getElementById('newPassword').type = "password";
            document.getElementById('confirmNewPassword').type = "password";
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

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/UserHome`);
    }

    render() {
        this.loadRelations();
        this.loadProvinces();
        this.loadCantons();
        this.loadDistricts();
        return (
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/UserHome">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>Configuración del perfil</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2 card p-5" >
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Configuración del perfil</h1>
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
                                            <input type="text" fontSize="18px" placeholder="Ej: Kevin" id="firstName" name="firstName" required className="form-control inputText" value={this.state.firstName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input type="text" fontSize="18px" placeholder="Ej: José" id="secondName" name="secondName" className="form-control inputText" value={this.state.secondName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Primer Apellido<font color="red">*</font></p>
                                            <input type="text" fontSize="18px" placeholder="Ej: Jiménez" id="lastName" name="lastName" required className="form-control inputText" value={this.state.lastName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo Apellido</p>
                                            <input type="text" fontSize="18px" placeholder="Ej: Molina" id="secondLastName" name="secondLastName" className="form-control inputText" value={this.state.secondLastName || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Teléfono 1<font color="red">*</font></p>
                                            <input type="text" fontSize="18px" placeholder="########" id="phoneNumber1" name="phoneNumber1" required className="form-control inputText" value={this.state.phoneNumber1 || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Teléfono 2</p>
                                            <input type="text" fontSize="18px" placeholder="########" id="phoneNumber2" name="phoneNumber2" className="form-control inputText" value={this.state.phoneNumber2 || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Número de cédula<font color="red">*</font></p>
                                            <input type="text" fontSize="18px" title="Número de cédula o cédula de residencia" placeholder="#########" id="identificationID" name="identificationID" required className="form-control InputText" value={this.state.identificationID || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Fecha de nacimiento<font color="red">*</font></p>
                                            <input type="date" fontSize="18px" name="birthDate" disabled required className="form-control InputText" value={this.state.birthDate || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Carné<font color="red">*</font></p>
                                            <input type="text" fontSize="18px" placeholder="Ej: A00000" id="carnet" name="carnet" required className="form-control InputText" value={this.state.carnet || ''} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Carrera<font color="red">*</font></p>
                                            <input type="text" fontSize="18px" placeholder="Ej: Informática Empresarial" id="career" name="career" required className="form-control InputText" value={this.state.career || ''} onChange={this.handleInputChange}></input>
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
                                            <select fontSize="18px" id="provinceID" id="provinceID" name="provinceID" className="form-control" onChange={this.getCantonsByProvince}>
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
                                            <select fontSize="18px" name="districtID" id="districtID" className="form-control" value={this.state.districtID} onChange={this.getDistrict}>
                                                {this.state.districtList}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio" align="left">Otras señas<font color="red">*</font></p>
                                            <textarea fontSize="18px" type="text" placeholder="Ej: Cerca del árbol de aguacate, casa color verde." id="addressLine" required name="addressLine" value={this.state.addressLine || ''} onChange={this.handleInputChange} className="bigInputText w-100 form-control bigInputText"></textarea>
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
                                            <button align="left" id="editInfo" className="buttonSizeGeneral" onClick={this.editInfo}>Editar</button>
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
                                            <p title="Campo obligatorio">Contraseña actual<font color="red">*</font></p>
                                            <input type="password" id="password" required name="password" value={this.state.password || ''} onChange={this.handleInputChange} className="form-control inputText w-100"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p title="Campo obligatorio">Contraseña nueva<font color="red">*</font> </p>
                                                    <input type="password" title="Debe contener letras y números" id="newPassword" required name="newPassword" className="inputText form-control" value={this.state.newPassword || ''} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p title="Campo obligatorio">Confirmar nueva<font color="red">*</font></p>
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
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Nombre<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" required name="contactName" id="contactName" className="inputText form-control" value={this.state.contactName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Parentesco<font color="red">*</font></p>
                                            <select fontSize="18px" name="relationTypeID" id="relationTypeID" className="form-control" value={this.state.relationTypeID} onChange={this.handleInputChange}>
                                                {this.state.relationList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p title="Campo obligatorio">Teléfono<font color="red">*</font></p>
                                            <input fontSize="18px" type="text" required name="emergencyContactPhoneNumber" id="emergencyContactPhoneNumber" className="inputText form-control" value={this.state.emergencyContactPhoneNumber} onChange={this.handleInputChange}></input>
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
                                            <button align="left" id="editContact" className="buttonSizeGeneral" onClick={this.editContact}>Editar</button>
                                            <button align="left" id="changeContact" className="buttonSizeGeneral" onClick={this.changeContact}>Guardar</button>
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <ModalComponent tittle={this.state.modalTittle} show={this.state.show} onClose={this.modalTrigger} >
                                    <br />{this.state.modalChildren}
                                </ModalComponent>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mt-4 col-2">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserConfiguration;