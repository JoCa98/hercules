import React, {Component} from 'react';
import logo from './logo_ucr-2-01-copy.png';
import './Master.css';
import logoGym from './Logo gimnasio transparente v1.png';


class Header extends Component{

    render(){
        return(
          <div className="div-container">
              <div className="row">
                  <div className="col-6">
                    <img src={logo} className="logo" alt="logo" />
                  </div>
                  <div className="col-6">
                    <header className = "header" > 
                    <img src={logoGym} className="logo-Gym" alt="logo" />
                    </header>
                  </div>
                
                 
                  
              </div>
          </div>
        )
    }
}
export default Header;