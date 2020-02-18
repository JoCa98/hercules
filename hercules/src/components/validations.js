
import { Component } from 'react';


class validations extends Component {
    constructor(props) {
        super(props);
        this.validateTextField = this.validateTextField.bind(this);
        this.validateNumericField = this.validateNumericField.bind(this);
        this.validateCarnetField = this.validateCarnetField.bind(this);
        this.validatePhoneNumberField = this.validatePhoneNumberField.bind(this);
        this.validateEmailField = this.validateEmailField.bind(this);
        this.validatePhysicalAssesment = this.validatePhysicalAssesment.bind(this);
        this.validateKg = this.validateKg.bind(this);
        this.validatePercent = this.validatePercent.bind(this);
        this.validateViceralFat = this.validateViceralFat.bind(this);
        this.validateDCI = this.validateDCI.bind(this);
        this.validateMetabolicAge = this.validateMetabolicAge.bind(this);    
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
    }
    validateIdentification(value){
        return (new RegExp("^([1-9])(\\d{8})$").test(value) || new RegExp("^1(\\d{3})((..))(\\d{4,9})$").test(value));
    }
    validatePhysicalAssesment(value){
        return new RegExp("^[1-9]$").test(value);
    }
    validateKg(value){
        return new RegExp("^(\\d{1,3}(\\.\\d{1,2})|\\d{1,3})$").test(value);
    }
    validatePercent(value){
        return new RegExp("^(\\d{1,2}(\\.\\d{1,2})|\\d{1,2}|100)$").test(value);
    }
    validateViceralFat(value){
        return new RegExp("^([1-5][0-9]|[1-9]|60)$").test(value);
    }
    validateDCI(value){
        return new RegExp("^(\\d{1,5}(\\.\\d{1,2})|\\d{1,5})$").test(value);
    }
    validateMetabolicAge(value){
        return new RegExp("^(\\d{1,3})$").test(value);
    }
}
export default validations;