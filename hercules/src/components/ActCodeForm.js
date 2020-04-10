import React, { Component } from 'react';
import PermissionsManager from "./PermissionsManager";
import ModalComponent from './ModalComponent';


class ActCodeForm extends Component {
  constructor() {
    super();
    /**
    *permissionsManager:
    * @type {PermissionsManager}
    * Instance of PermissionManager to grant or deny permission to the user to access certain pages from the current one
    * and depending of the user type.
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
    * actCode:
    * @type {integer}
    * Property that stores the activation code entered by the user.
    */
    this.state = {
      permissionsManager: new PermissionsManager(),
      identificationID: sessionStorage.getItem('identificationID'),
      firstName: sessionStorage.getItem('firstName'),
      secondName: sessionStorage.getItem('secondName'),
      lastName: sessionStorage.getItem('lastName'),
      secondLastName: sessionStorage.getItem('secondLastName'),
      carnet: sessionStorage.getItem('carnet'),
      career: sessionStorage.getItem('career'),
      birthDate: sessionStorage.getItem('birthDate'),
      genderID: sessionStorage.getItem('genderID'),
      userTypeID: sessionStorage.getItem('userTypeIDRegister'),
      email: sessionStorage.getItem('emailRegister'),
      password: sessionStorage.getItem('passwordRegister'),
      phoneNumber1: sessionStorage.getItem('phoneNumber1'),
      phoneNumber2: sessionStorage.getItem('phoneNumber2'),
      startDate: sessionStorage.getItem('startDate'),
      districtID: sessionStorage.getItem('districtID'),
      addressLine: sessionStorage.getItem('addressLine'),
      contactName: sessionStorage.getItem('contactName'),
      relationTypeID: sessionStorage.getItem('relationTypeID'),
      emergencyContactPhoneNumber: sessionStorage.getItem('emergencyContactPhoneNumber'),
      activationCode: sessionStorage.getItem('activationCode'),
      actCode: "",
      show: false,
      modalTittle: "",
      modalChildren: "",
      isExit: false

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeSignUp = this.completeSignUp.bind(this);
    this.resendCode = this.resendCode.bind(this);
    this.sendNotificationEmail = this.sendNotificationEmail.bind(this);
    this.modalTrigger = this.modalTrigger.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
    * Method that validate the page permissions.
  */

  
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
      this.props.history.push(`/`);
    }
    event.preventDefault();
  };

  componentDidMount() {
    this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
    window.scrollTo(0, 0);
  }

  /**
  * Method that changes the value of the state variable using the object that triggers the event.
  *  To do this the element must have the property name defined as the state variable
  * 
  * Receive an object that contains the element that called the method
  *  @param {Object} 
  */
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  
  /**
  * Method that deletes the blank spaces within the actCode field. Also warns the user that the field is obligatory.
  * 
  */
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.actCode.trim().length != 0) {
      this.completeSignUp(event);
    } else {
      this.modalTrigger(event, 'Campo Obligatorio', 'El código de activación es obligatorio');
    }
  }
  /**
  * Method that completes the user sign up process by adding them to the data base. Notifies the user 
  * they still need to be activates by and admin and redirects them to the login page.  * 
  */
  completeSignUp(event) {
    if (this.state.actCode == this.state.activationCode) {
      fetch("http://localhost:9000/User/addUser", {
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
        })
        .catch(err => console.error("Un error inesperado a ocurrido"));
      this.sendNotificationEmail();
      this.modalTrigger(event, 'Registro exitoso', 'El registro fue completado con éxito. Permanecerá inactivo y no podrá ingresar al sistema hasta que el encargado (a) del gimnasio lo active. Se le ha enviado un correo con más detalles. Ahora será redirigido a la pantalla de ingreso');
      sessionStorage.clear();
    } else {
      this.modalTrigger(event, 'Código incorrecto', 'El código ingresado es incorrecto');
    }
  }

  /**
  * Method that allows the user to resend the code to their email if something went wrong or the email was never received.
  */
  resendCode(event) {
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
    this.modalTrigger(event, 'Reenvio', 'Se reenvió el código de activación, por favor revise su correo institucional');
  }

  /**
  * Method that sends an email to the user which says that the sign up process is complete but they still need 
  * an administrator to activate ther account to be able to login. 
  */
  sendNotificationEmail() {
    fetch("http://localhost:9000/User/sendNotificationEmail", {
      method: "post",
      body: JSON.stringify({ email: this.state.email }),
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

  render() {
    return (
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-12 col-lg-6 offset-lg-3 card p-5">
            <form className="activationCodeForm" >
              <h1 className="text-left colorBlue">Activación de cuenta</h1>
              <div className="form-group">
                <p align="left">Ingrese el código de activación enviado a su correo</p>
                <input type="text" name="actCode" className="form-control" fontSize="18px" onChange={this.handleInputChange} />
              </div>
              <div className="row">
                <div className="col-12 col-sm-4 text-left mt-2">
                  <button type="button" name="resendButton" className="cssCodeButtonResend w-100" onClick={this.resendCode}> Reenviar código </button>
                </div>
                <div className="col-12 col-sm-4 offset-sm-4 text-right mt-2">
                  <button type="button" align="right" name="confirmButton" className="cssCodeButtonConfirm w-100" onClick={this.handleSubmit}> Confirmar </button>
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
    );
  }
}

export default ActCodeForm;