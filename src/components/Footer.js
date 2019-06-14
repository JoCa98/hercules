import React, { Component } from 'react';
import logoUCR from './ucr.png';
import './Footer.css';


class Footer extends Component {
    render() {
        return (
            <div className="div-container">
                <div className="row">
                    <div className="col-12">
                    <footer className="masterFooter">
                        <img src={logoUCR} className="logoUCR" alt="logo" />
                      </footer>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;