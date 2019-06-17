import React, { Component } from 'react';
import logoUCR from '../appImage/logo_ucr_footer.svg';


class Footer extends Component {
    render() {
        return (
            <footer className="mt-4 p-4">
                <div className="container-fluid  ">
                    <div className="row">
                        <div className="col-12 text-left">
                            <img src={logoUCR} className="logoFooter" alt="logo" />
                        </div>
                        <div className="col-12 text-left">
                             <span className="text-white">© Universidad de Costa Rica - Tel. 2511-4000.</span>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;