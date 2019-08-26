import React, { Component } from 'react';
class RandomPassword extends Component {
    constructor(props) {
        super(props);

    }
    generatePassword() {
        var generator = require('generate-password');

        var password = generator.generate({
            length: 8,
            numbers: true,
            uppercase: true
        });
        return password;
    }



}
export default RandomPassword;