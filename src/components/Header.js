import React, { Component } from 'react';
import logo from '../appImage/logo_ucr.png';
import logoGym from '../appImage/logo_gimnasio.png';


class Header extends Component {

  render() {
    return (
      <div className="container-fluid backgroundBlue">
        <div className="row">
            <div className="col-10 text-left">
              <img src={logo} className="logo" alt="logo" />
            </div>
            <div className="col-2 text-right">
              <img src={logoGym}  className="logo" alt="logo" />
            </div>
        </div>
      </div>
    )
  }
}
export default Header;