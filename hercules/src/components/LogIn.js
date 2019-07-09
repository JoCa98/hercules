import React, { Component } from 'react';
import axios from "axios";
class LogIn extends Component {
   /*constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userTypeID: "",
            partyID: "",
            isUserValid: "",
        };
        this.goSignUp = this.goSignUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.tryLogin = this.tryLogin.bind(this);

    }

    tryLogin() {
        axios.get(`http://localhost:9000/User/isUserValid`, { params: { email: this.state.email, password: this.state.password } }).then(response => {
            console.log("es: " + JSON.parse(JSON.stringify(response.data[0])));
<<<<<<< HEAD
        this.setState({ isUserValid: JSON.parse(
            e.data[0])[0]['isUserValid'] });
=======
        this.setState({ isUserValid: JSON.parse(JSON.stringify(response.data[0]))[0]['isUserValid'] });
>>>>>>> d30edc3c092ba52fd18b75179345400ab100b8be
            if (this.state.isUserValid == 1) {
                axios.get(`http://localhost:9000/User/getDataForLogin`, { params: { email: this.state.email, password: this.state.password } }).then(response => {
                    this.setState({ partyID: JSON.parse(JSON.stringify(response.data[0]))[0]['partyID'] ,
                    userTypeID: JSON.parse(JSON.stringify(response.data[0]))[0]['userTypeID']});
                    if(this.state.userTypeID == 1 ||this.state.userTypeID == 2){

                    }
                });
            }
        });
    }

    goSignUp() {
        this.props.history.push(`/SignUp`);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row mt-4 " >
                    <div className="col-3">
                    </div>
                    <div className="col-6 card p-5">
                        <h1 className="text-center">Ingreso al sistema del gimnasio</h1>
                        <br></br>
                        <div className="row mt-4 " ></div>
                        <div className="form-group" align="left">
                            <p>Correo institucional</p>
                            <input type="text" name="email" value={this.state.email} className="form-control inputText w-100"onChange={this.handleInputChange}></input>
                            <br></br>
                            <p>Contraseña</p>
                            <input type="text" name="password" value={this.state.password} className="form-control inputText w-100" onChange={this.handleInputChange}></input>
                            <br></br>
                            <button align="left" name="logIn" className="buttonSizeGeneral w-100" onClick={this.tryLogin}>Ingresar</button>
                            <br></br>
                            <br></br>
                            <a href="url">Recuperar contraseña</a>
                            <br></br>
                            <a href="javascript:void(0);" onClick={this.goSignUp}>Registrarse</a>
                            <br></br>

                        </div>
                    </div>
                    <div className="col-3">

                    </div>
                </div>
            </div>
        )
    }
    */
}
//export default withRouter(LogIn);

export default LogIn;