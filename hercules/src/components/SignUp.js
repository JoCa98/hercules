import React, { Component } from 'react';
import axios from "axios";
import Select from "react-select";
class SignUp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            identificationID: "",
            firstName: "",
            secondName: "",
            lastName: "",
            secondLastName: "",
            carnet: "",
            birthDate: "",
            phonenumber1: "",
            phonenumber2: "",
            gender: "1",
            userType: "1",
            email: "",
            password: "",
            startDate: new Date().getDate(),
            activationCode: "",
            addressLine: "",
            contactName: "",
            relationTypeID: "",
            emergencyContactPhonenumber: "",
            relation: [{}],
            provinces: [{}],
            provinceID: 2,
            cantons: [{}],
            cantonList: null,
            cantonID: "",
            districts: [{}],  
            districtList: null,          
            districtID: "",

        };
       
        this.handleSelectProvince = this.handleSelectProvince.bind(this);
        this.loadCantons = this.loadCantons.bind(this);
        this.handleSelectCanton = this.handleSelectCanton.bind(this);
        this.loadDistricts = this.loadDistricts.bind(this);        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCantonsByProvince = this.getCantonsByProvince.bind(this);
        this.getDistrictsByCanton = this.getDistrictsByCanton.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        var initProvinceID = 2;
        var initCantonID = 30;
        var initDistrictID = 242;
        axios.get(`http://localhost:9000/User/getRelationType`).then(response => {
            this.state.relation = response.data;
            this.setState({ relation: response.data });
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
                                            <p>Primer nombre</p>
                                            <input type="text" name="firstName" className="form-control inputText" value={this.state.firstName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Primer Apellido</p>
                                            <input type="text" name="firstLastName" className="form-control inputText" value={this.state.lastName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 1</p>
                                            <input type="text" name="phoneNumber1" className="form-control inputText" value={this.state.phonenumber1} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Segundo nombre</p>
                                            <input type="text" name="secondName" className="form-control inputText" value={this.state.secondName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Segundo Apellido</p>
                                            <input type="text" name="secondLastName" className="form-control inputText" value={this.state.secondLastName} onChange={this.handleInputChange}></input>
                                        </div>
                                        <div className="form-group" align="left">
                                            <p>Teléfono 2</p>
                                            <input type="text" name="phoneNumber2" className="form-control inputText" value={this.state.phonenumber2} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Tipo de usuario</p>
                                            <input type="radio" name="userType" value="2" value={this.state.userType} onChange={this.handleInputChange} checked></input>Funcionario
                                            <br></br>
                                            <input type="radio" name="userType" value="1" value={this.state.userType} onChange={this.handleInputChange}></input>Estudiante

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Sexo</p>
                                            <input type="radio" name="gender" value="1" value={this.state.gender} onChange={this.handleInputChange} checked></input>Maculino
                                            <br></br>
                                            <input type="radio" name="gender" value="2" value={this.state.gender} onChange={this.handleInputChange}></input>Femenino

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Número de cédula</p>
                                            <input type="text" name="identificationNumber" className="form-control InputText" value={this.state.identificationID} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Número de carné</p>
                                            <input type="text" name="carnet" value={this.state.carnet} onChange={this.handleInputChange} className="form-control InputText"></input>
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
                                            <select name="provinceID" className="form-control" onChange={this.handleSelectProvince}>
                                                {provinceList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Cantón</p>
                                            <select name="cantonID" className="form-control" onChange={this.handleSelectCanton}>
                                                {this.state.cantonList}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4">
                                        <div className="form-group" align="left">
                                            <p>Distrito</p>
                                            <select name="districtID" className="form-control" onChange={this.handleInputChange}>
                                                {this.state.districtList}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group" align="left">
                                            <p align="left">Otras señas</p>
                                            <input type="text" name="addressLine" value={this.state.addressLine} onChange={this.handleInputChange} className="w-100 form-control bigInputText"></input>
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
                                        <div className="form-group" align="left">
                                            <p>Email</p>
                                            <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control inputText w-100"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Contraseña</p>
                                                    <input type="text" name="password" className="inputText form-control" value={this.state.password} onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="form-group" align="left">
                                                    <p>Confirmar contraseña</p>
                                                    <input type="text" name="confirmPassword" className="inputText form-control"></input>
                                                </div>
                                            </div>
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
                                            <input type="text" name="contactName" className="inputText form-control" value={this.state.contactName} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Parentesco</p>
                                            <Select options={this.state.relation.map(function (json) {
                                                return {
                                                    label: json.description,
                                                    value: json.relationTypeID
                                                };
                                            })}>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group" align="left">
                                            <p>Teléfono</p>
                                            <input type="text" name="phoneNumber" className="inputText form-control" value={this.state.emergencyContactPhonenumber} onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-5 offset-md-7">
                                <button align="left" className="buttonSizeGeneral">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SignUp;