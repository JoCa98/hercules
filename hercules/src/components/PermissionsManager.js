import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PermissionManager extends Component {
    constructor(props) {
        super(props);
        this.validatePermission = this.validatePermission.bind(this);
        this.generalPages = this.generalPages.bind(this);
        this.withoutLogin = this.withoutLogin.bind(this);
        this.user = this.user.bind(this);
        this.admin = this.admin.bind(this);
        this.homeAdmin = this.homeAdmin.bind(this);
        this.userHome = this.userHome.bind(this);
        this.medic = this.medic.bind(this);
        this.signUp = this.signUp.bind(this);
        this.actCodeForm = this.actCodeForm.bind(this);
        this.routineAdmin = this.routineAdmin.bind(this);
        this.addMedicalForm = this.addMedicalForm.bind(this);
        this.addPhysicalInfo = this.addPhysicalInfo.bind(this);
        this.editPhysicalInfo = this.editPhysicalInfo.bind(this);
        this.changeTempPassword = this.changeTempPassword.bind(this);
        this.redirectUser = this.redirectUser.bind(this);
        this.generalPagesSpecialPermission = this.generalPagesSpecialPermission.bind(this);
        this.adminUserSpecialPermission = this.adminUserSpecialPermission.bind(this);

    }

    validatePermission(pageName, page) {
        //Permisos de páginas sin login y permisos especiales para singUp y actCodeForm
        if (this.withoutLogin(pageName) &&
            (sessionStorage.getItem('partyID') === ''
                || sessionStorage.getItem('partyID') === null)) {

            if (this.signUp(pageName) && !(sessionStorage.getItem('termsConfirm') === 'true')) {
                this.redirectUser(page);
                return false;
            } else if (this.actCodeForm(pageName) &&
                !(sessionStorage.getItem('identificationID') !== null && sessionStorage.getItem('identificationID') !== '')) {
                this.redirectUser(page);
                return false;

            }

            //Páginas de acceso sin login, estando logeado   
        } else if (this.withoutLogin(pageName) &&
            (sessionStorage.getItem('partyID') !== 0
                || sessionStorage.getItem('partyID') !== ''
                || sessionStorage.getItem('partyID') !== null)) {

            this.redirectUser(page);
            return false;


            //Página de cambio de contraseña temporal
        } else if (sessionStorage.getItem("changeTempPassword") === "true") {

            page.props.history.push(`/ChangeTempPassword`);
            return true;


        } else if (this.changeTempPassword(pageName) &&
            sessionStorage.getItem("changeTempPassword") !== "true") {

            this.redirectUser(page);
            return false;


            //Páginas de usuario
        } else if (this.user(pageName)
            && !(sessionStorage.getItem("userTypeID") === '1' || sessionStorage.getItem("userTypeID") === '2')) {

            this.redirectUser(page);
            return false;

        } else if (this.userHome(pageName)
            && (sessionStorage.getItem("userTypeID") === '1' || sessionStorage.getItem("userTypeID") === '2')) {

            console.log(sessionStorage.getItem("routineID"));
            console.log(sessionStorage.getItem("userTypeID"));

            if ((sessionStorage.getItem("routineID") !== null
                && sessionStorage.getItem("routineID") !== 'undefined')) {

                page.props.history.push(`/UserHome`);
                return false;


            } else if (
                (sessionStorage.getItem("routineID") === null
                    | sessionStorage.getItem("routineID") === 'undefined')) {

                page.props.history.push(`/UserHomeWithOut`);
                return false;


            }

            //Página de home admin
        } else if (this.homeAdmin(pageName) && !(sessionStorage.getItem('userTypeID') === '3'
            | sessionStorage.getItem('userTypeID') === '4'
            | sessionStorage.getItem('userTypeID') === '5')) {

            this.redirectUser(page);
            return false;

            //Páginas de acceso general para admin y medicos
        } else if (this.generalPages(pageName) && !(sessionStorage.getItem('userTypeID') === '3'
            || sessionStorage.getItem('userTypeID') === '4')) {

            this.redirectUser(page);
            return false;


        } else if (this.generalPages(pageName) && (sessionStorage.getItem('userTypeID') === '3'
            | sessionStorage.getItem('userTypeID') === '4')) {

            if (this.generalPagesSpecialPermission(pageName) &&
                (sessionStorage.getItem("userPartyID") === null
                    || sessionStorage.getItem("userPartyID") === ""
                    || sessionStorage.getItem("userPartyID") === 'undefined')) {

                this.redirectUser(page);
                return false;
            }

            //Páginas de administrador 
        } else if (this.admin(pageName) && !(sessionStorage.getItem('userTypeID') === '4')) {

            this.redirectUser(page);
            return false;

        } else if (this.admin(pageName) && sessionStorage.getItem('userTypeID') === '4') {

            if (this.adminUserSpecialPermission(pageName) &&
                (sessionStorage.getItem("userPartyID") === null
                    || sessionStorage.getItem("userPartyID") === "")) {

                this.redirectUser(page);
                return false;


            } else if (this.routineAdmin(pageName) &&
                (sessionStorage.getItem("routineID") === null
                    || sessionStorage.getItem("routineID") === ""
                    || sessionStorage.getItem("userPartyID") === null)) {

                this.redirectUser(page);
                return false;


            } else if (this.addPhysicalInfo(pageName) &&
                (sessionStorage.getItem('dateLastPhysicalRegistry') !== null
                    || sessionStorage.getItem('dateLastPhysicalRegistry') !== ""
                    || sessionStorage.getItem('dateLastPhysicalRegistry') !== 'undefined') &&
                new Date(sessionStorage.getItem('dateLastPhysicalRegistry')) === Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate())) {

                this.redirectUser(page);
                return false;

            } else if (this.editPhysicalInfo(pageName) && 
            (sessionStorage.getItem('dateLastPhysicalRegistry') === null
            || sessionStorage.getItem('dateLastPhysicalRegistry') === 'undefined')) {
                this.redirectUser(page);
                return false;
            }

            //Páginas de médico    
        } /**else if (this.medic(pageName) && !(sessionStorage.getItem('userTypeID') === '3')) {
            this.redirectUser(page);

        } else if (this.medic(pageName) && sessionStorage.getItem('userTypeID') === '3') {
            //Quiera ingresar a addMedicalForm
            if (this.addMedicalForm(pageName) &&
                (sessionStorage.getItem('update') === ""
                    | sessionStorage.getItem('update') === null)) {

                this.redirectUser(page);

                //Quiera agregar pero no deba
            } else if (this.addMedicalForm(pageName) &&
                sessionStorage.getItem('update') === "false" &&
                (sessionStorage.setItem('dateLastMedicRegistry') !== null
                    | sessionStorage.setItem('dateLastMedicRegistry') !== ""
                    | sessionStorage.setItem('dateLastMedicRegistry') !== 'undefined') &&
                new Date(sessionStorage.getItem('dateLastMedicRegistry')) === Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate())) {

                this.redirectUser(page)
            }
        }*/
        return true;
    }

    redirectUser(page) {
        if (sessionStorage.getItem('userTypeID') === '1' || sessionStorage.getItem('userTypeID') === '2') {
            page.props.history.push(`/UserHome`);
        } else if (sessionStorage.getItem('userTypeID') === '3' || sessionStorage.getItem('userTypeID') === '4'
            | sessionStorage.getItem('userTypeID') === '5') {
            page.props.history.push(`/HomeAdmin`);
        } else {
            page.props.history.push(`/`);
        }

    }

    withoutLogin(pageName) {
        return new RegExp("^((\/)|(\/Terms)|(\/SignUp)|(\/PasswordRecovery)|(\/ActCodeForm))$").test(pageName);
    }

    generalPages(pageName) {
        return new RegExp("^((\/HistoricMedicalInfo)|(\/ConsultUser)|(\/ConfigurationAdmin))$").test(pageName);
    }

    user(pageName) {
        return new RegExp("^((/UserHome)|(/UserHomeWithOut)|(\/UserConfiguration)|(\/HistoricPhysicalUserInfo)|(\/HistoricMedicalUserInfo))$").test(pageName);
    }

    admin(pageName) {
        return new RegExp("^((\/AddAdmin)|(\/AddPhysicalInfo)|(\/EditPhysicalInfo)|(\/AddRoutine)|(\/RoutineAdmin)|(\/HistoricPhysicalInfoAdmin)|(\/HistoricRoutineInfo))$").test(pageName);
    }

    homeAdmin(pageName) {
        return new RegExp("^(\/HomeAdmin)$").test(pageName);
    }

    userHome(pageName) {
        return new RegExp("^((/UserHome)|(/UserHomeWithOut))$").test(pageName);
    }

    medic(pageName) {
        return new RegExp("^((\/ChangeTempPassword)|(\/AddMedicalForm))$").test(pageName);
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

    routineAdmin(pageName) {
        return new RegExp("^(\/RoutineAdmin)$").test(pageName);
    }

    addMedicalForm(pageName) {
        return new RegExp("^(\/AddMedicalForm)$").test(pageName);
    }

    addPhysicalInfo(pageName) {
        return new RegExp("^(\/AddPhysicalInfo)$").test(pageName);
    }

    editPhysicalInfo(pageName) {
        return new RegExp("^(\/EditPhysicalInfo)$").test(pageName);
    }

    generalPagesSpecialPermission(pageName) {
        return new RegExp("^((\/HistoricMedicalInfo)|(\/ConsultUser))$").test(pageName);
    }

    adminUserSpecialPermission(pageName) {
        return new RegExp("^((\/AddPhysicalInfo)|(\/EditPhysicalInfo)|(\/AddRoutine)|(\/HistoricPhysicalInfoAdmin)|(\/HistoricRoutineInfo))$").test(pageName);
    }

}
export default PermissionManager;