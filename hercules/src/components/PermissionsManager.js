import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PermissionManager extends Component {
    constructor(props) {
        super(props);
        this.validatePermission = this.validatePermission.bind(this);
        this.withoutLogin = this.withoutLogin.bind(this);
        this.user = this.user.bind(this);
        this.admin = this.admin.bind(this);
        this.assistant = this.assistant.bind(this);
        this.medic = this.medic.bind(this);
        this.signUp = this.signUp.bind(this);
        this.actCodeForm = this.actCodeForm.bind(this);
        this.changeTempPassword = this.changeTempPassword.bind(this);
        this.userHome = this.userHome.bind(this);
        this.userHomeWithout = this.userHomeWithout.bind(this);
        this.redirectUser = this.redirectUser.bind(this);
    }

    validatePermission(pageName, page) {
        //Permisos de páginas sin login y permisos especiales para singUp y actCodeForm
        if (this.withoutLogin(pageName) &&
            (sessionStorage.getItem('partyID') === 0
                | sessionStorage.getItem('partyID') === ''
                | sessionStorage.getItem('partyID') === null)) {

            if (this.signUp(pageName) && !(sessionStorage.getItem('termsConfirm') === 'true')) {
                this.redirectUser(page);
            } else if (this.actCodeForm(pageName) &&
                !(sessionStorage.getItem('identificationID') !== null && sessionStorage.getItem('identificationID') !== '')) {
                this.redirectUser(page);
            }

        //Páginas de acceso sin login, estando logeado   
        } else if (this.withoutLogin(pageName) &&
            (sessionStorage.getItem('partyID') !== 0
                | sessionStorage.getItem('partyID') !== ''
                | sessionStorage.getItem('partyID') !== null)) {

            this.redirectUser();

        //Página de cambio de contraseña temporal
        } else if (sessionStorage.getItem("changeTempPassword") === "true") {

            page.props.history.push(`/ChangeTempPassword`);
            
        } else if (this.changeTempPassword(pageName) && 
        sessionStorage.getItem("changeTempPassword") !== "true") {
        
            this.redirectUser(page);

        //Páginas de usuario
        } else if (this.user(pageName) 
        && !(sessionStorage.getItem("userTypeID") === 1 && sessionStorage.getItem("userTypeID") === 2)) {
        
            this.redirectUser(page);

        } else if (this.user(pageName)
            && (sessionStorage.getItem("userTypeID") === 1 && sessionStorage.getItem("userTypeID") === 2) ) {

            if (this.userHome(pageName) && sessionStorage.getItem("routineID") !== null) {
        
                page.props.history.push(`/UserHome`);
        
            } else if (this.userHomeWithout(pageName) && sessionStorage.getItem("routineID") === null) {
        
                page.props.history.push(`/UserHomeWithOut`);
        
            }
        
        //Páginas de administrador    
        } else if (this.admin(pageName) && !(sessionStorage.getItem('userTypeID') === 4)) {
            
            this.redirectUser(page);

        //Páginas de médico    
        } else if (this.medic(pageName) && !(sessionStorage.getItem('userTypeID') === 3)) {
            
            this.redirectUser(page);

        //Páginas de asistente
        } else if (this.assistant(page) && !(sessionStorage.getItem('userTypeID') === 5)) {

            this.redirectUser(page);
        }
    }

    redirectUser(page) {
        if (sessionStorage.getItem('userTypeID') === 1 | sessionStorage.getItem('userTypeID') === 2) {
            page.props.history.push(`/UserHome`);
        } else if (sessionStorage.getItem('userTypeID') === 3 | sessionStorage.getItem('userTypeID') === 4
            | sessionStorage.getItem('userTypeID') === 5) {
            page.props.history.push(`/HomeAdmin`);
        } else {
            page.props.history.push(`/`);
        }
    }

    withoutLogin(pageName) {
        return new RegExp("^((\/)|(\/Terms)|(\/SignUp)|(\/PasswordRecovery)|(\/ActCodeForm))$").test(pageName);
    }

    user(pageName) {
        return new RegExp("^((\/UserHome)|(\/UserHomeWithOut)|(\/UserConfiguration)|(\/HistoricPhysicalUserInfo)|(\/HistoricMedicalUserInfo))$").test(pageName);
    }

    admin(pageName) {
        return new RegExp("^((\/HomeAdmin)|(\/AddAdmin)|(\/AddPhysicalInfo)|(\/EditPhysicalInfo)|(\/AddRoutine)|(\/RoutineAdmin)|(\/ConsultUser)|(\/HistoricMedicalInfo)|(\/HistoricPhysicalInfoAdmin)|(\/HistoricRoutineInfo)|(\/ConfigurationAdmin))$").test(pageName);
    }

    assistant(pageName) {
        return new RegExp("^(\/HomeAdmin)$").test(pageName);
    }

    medic(pageName) {
        return new RegExp("^((\/ChangeTempPassword)|(\/HomeAdmin)|(\/AddMedicalForm)|(\/ConsultUser)|(\/HistoricMedicalInfo)|(\/ConfigurationAdmin))$").test(pageName);
    }

    signUp(pageName) {
        return new RegExp("^(\/SignUp)$").test(pageName);
    }

    actCodeForm(pageName) {
        return new RegExp("^(\/ActCodeForm)$").test(pageName);
    }

    changeTempPassword(pageName) {
        return new RegExp("^(\/ChangeTempPassword)$").test(pageName);
    }

    userHome(pageName) {
        return new RegExp("^(\/UserHome)$").test(pageName);
    }

    userHomeWithout(pageName) {
        return new RegExp("^(\/UserHomeWithOut)$").test(pageName);
    }
}
export default PermissionManager;