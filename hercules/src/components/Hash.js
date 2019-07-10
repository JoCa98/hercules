import React, { Component } from 'react';
import bcrypt from 'bcryptjs';
class Hash extends Component {
    constructor(props) {
        super(props);
        this.encode = this.encode.bind(this);

    }

    encode(value) {
        //return  bcrypt.hashSync(value, crypto.randomByto)
    }
    
}
export default Hash;