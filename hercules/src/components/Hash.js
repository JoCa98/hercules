import React, { Component } from 'react';
import bcrypt from 'bcryptjs';

class Hash extends Component {
    constructor(props) {
        super(props);
        this.encode = this.encode.bind(this);

    }

    encode(value) {
        var salt = bcrypt.genSaltSync(10);
       console.log(bcrypt.hashSync(value, salt));
        return  bcrypt.hashSync(value, salt);
    }

    comparePassword(text, hash)
    {
        return bcrypt.compareSync(text, hash);
    }
    
}
export default Hash;