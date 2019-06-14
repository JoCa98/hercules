import React, {Component} from 'react';
import logo from './logo_ucr-2-01-copy.png';
import './Master.css';
import logoGym from './Logo gimnasio transparente v1.png';


class Header extends Component{

    render(){
        return(
          <div className="div-container">
              <div className="row">
                  <div className="col-12">
                  <header className = "header" > 
                  <div>
                    <img src={logo} align="left" className="logo" alt="logo" />
                    </div>
                    <div>
                    <img src={logoGym} align="right" className="logo-Gym" alt="logo" />
                    </div>
                    </header>
                  </div> 
              </div>
          </div>
        )
    }
}
export default Header;