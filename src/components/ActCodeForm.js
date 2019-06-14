import React, { Component } from 'react';
import './ActCodeForm.css';

class ActCodeForm extends Component {
  constructor() {
    super();
    this.state = {
      actCode: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = event => {
    const nameText = event.target.name;
    const valueText = event.target.value;
    this.setState({
      [nameText]: valueText
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.actCode.trim() !== "") {
      alert(this.state.actCode.trim());
    } else {
      alert('El código de activación es obligatorio');
    }
  }

  render() {
    return (
      <div className="div-container">
        <div className="row mt-4">
          <div className="col-md-4 offset-md-4 card">

            <form className="activationCodeForm" onSubmit={this.handleSubmit}>
              <h2 align="left"><font color="#41ade7">Activación de cuenta</font></h2>

              <div class="form-group">
                <p align="left">Ingrese el código de activación enviado a su correo</p>
                <input type="text" name="actCode" className="form-control" onChange={this.handleInputChange} />
              </div>

              <div className="row mt-4">
                <div className="col-md-4">
                  <button type="button" align="left" name="actCodeButton" className="cssCodeButtonResend"> Reenviar código </button>
                </div>

                <div className="col-md-4 offset-md-4">
                  <button type="submit" align="right" name="actCodeButton" className="cssCodeButtonConfirm"> Confirmar </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default ActCodeForm;