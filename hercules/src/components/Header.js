import React, { Component } from 'react';
import logo from '../appImage/logo_ucr.png';
import logoGym from '../appImage/logo_gimnasio.png';
import NavbarUserHome from './NavbarUserHome';

class Header extends Component {


  render() {
    var navbar;
    if (sessionStorage.getItem('userTypeID') !== null) {
      navbar = <NavbarUserHome />   
    }        
    return (
      <div>
        <div className="container-fluid backgroundBlue">
          <div className="row p-2">
          <div className="d-block d-sm-none col-8">
              <img src={logo} className="logoUCRMovil" alt="logo" />
            </div>
            <div className="d-none d-sm-block d-md-none col-sm-8">
              <img src={logo} className="logoUCRMovilSM" alt="logo"  />
            </div>
            <div className="d-none d-md-block col-sm-8">
              <img src={logo} className="logoUCRMDToAll" alt="logo"  />
            </div>
            <div className="d-block d-sm-none col-4 text-right">
              <img src={logoGym} className="logoGYMMovil " alt="logo"  />
            </div>
            <div className="d-none d-sm-block d-md-none col-sm-4 text-right">
              <img src={logoGym} className="logoGYMMovilSM" alt="logo"  />
            </div>
            <div className="d-none d-md-block col-sm-4 text-right">
              <img src={logoGym} className="logoGYMMovilMDToAll" alt="logo"  />
            </div>
          </div>
        </div>
        {navbar}
      </div>
    )
  }
}
export default Header;