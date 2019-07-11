import React, { Component } from 'react';
import logo from '../appImage/logo_ucr.png';
import logoGym from '../appImage/logo_gimnasio.png';
import NavbarAdmin from './NavbarAdmin';
import NavbarUserHome from './NavbarUserHome';

class Header extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    console.log(sessionStorage.getItem('userTypeID'))
    var navbar;
    if (sessionStorage.getItem('userTypeID') != null) {
      if (sessionStorage.getItem('userTypeID') == 1 || sessionStorage.getItem('userTypeID') == 2) {
        navbar = <NavbarUserHome />
      } else {
        navbar = <NavbarAdmin />
      }
    }
    return (
      <div>
        <div className="container-fluid backgroundBlue p-1">
          <div className="row ">
            <div className="col-8">
              <img src={logo} className="logo" alt="logo" />
            </div>
            <div className="col-2 ">
              <img src={logoGym} className="logo" alt="logo" />
            </div>
          </div>
        </div>
        {navbar}

      </div>
    )
  }
}
export default Header;