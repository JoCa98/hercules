import React, { Component } from 'react';
import logoUCR from '../appImage/logo_ucr_footer.png';


class Footer extends Component {
    render() {
        return (
            <div className="container-fluid backgroundGrayFooter mt-4">
                <div className="row">
                    <div className="col-12 text-left">
                        <img src={logoUCR} className="logo mt-5 mb-5" alt="logo" />
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;