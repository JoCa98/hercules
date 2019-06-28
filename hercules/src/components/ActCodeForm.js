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
      <div className="container">
        <div className="row mt-4 ">
          <div className="col-6 offset-3 card p-5">

            <form className="activationCodeForm" onSubmit={this.handleSubmit}>
              <h2 className="text-left colorBlue">Activación de cuenta</h2>

              <div class="form-group">
                <p align="left">Ingrese el código de activación enviado a su correo</p>
                <input type="text" name="actCode" className="form-control" onChange={this.handleInputChange} />
              </div>

              <div className="row mt-4">
                <div className="col-4">
                  <button type="button" align="left" name="actCodeButton" className="cssCodeButtonResend"> Reenviar código </button>
                </div>

                <div className="col-4 offset-4">
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