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
        return new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$").test(value);
    }
    validateNumericField(value) {
        return new RegExp("^[0-9]*$").test(value);
    }

    validateCarnetField(value) {
        return new RegExp("^[a-zA-Z][0-9]{5}$").test(value);
    }
    validatePasswordField(value) {
        return new RegExp("^(?=.*\d).{8,16}$").test(value);
    }

    validatePhoneNumberField(value){
        return new RegExp("^([0-9]{8})$").test(value);
        
    }
    validateEmailField(value){
        return new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$").test(value);        
    }
    
}
export default validations;