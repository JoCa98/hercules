import React, { Component } from 'react';
class validations extends Component {
    constructor(props) {
        super(props);
        this.validateTextField = this.validateTextField.bind(this);
        this.validateNumericField = this.validateNumericField.bind(this);
        this.validateCarnetField = this.validateCarnetField.bind(this);
        this.validatePhoneNumberField = this.validatePhoneNumberField.bind(this);
        this.validateEmailField = this.validateEmailField.bind(this);

    }

    validateTextField(value) {
        return new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$").test(value);
    }
    validateNumericField(value) {
        return new RegExp("^[0-9]*$").test(value);
    }

    validateCarnetField(value) {
        return new RegExp("^[a-zA-Z][0-9]{5}$").test(value);
    }
    validatePasswordField(value) {
        return new RegExp("^(?=.*\\d).{8,16}$").test(value);
    }

    validatePhoneNumberField(value){
        return new RegExp("^([0-9]{8})$").test(value);
        
    }
    validateEmailField(value){
        return new RegExp("^(([\\w-]+\\.)+[\\w-]+|([a-zA-Z]{1}|[\\w-]{2,}))@((ucr.ac.cr)|(UCR.AC.CR))$").test(value);   
    }
    validateAdminEmailField(value){
        return new RegExp("^(([\\w-]+\\.)+[\\w-]+|([a-zA-Z]{1}|[\\w-]{2,}))@(([a-zA-Z]+[\\w-]+\\.){1,2}[a-zA-Z]{2,4})$").test(value);
        //return new RegExp("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*[.][a-z]{2,4}$").test(value);
    }
    validateIdentification(value){
        return (new RegExp("^([1-7])(\\d{8})$").test(value) || new RegExp("^1(\\d{3})((..))(\\d{4,9})$").test(value));
    }
}
export default validations;