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

              <div className="activationCodeForm-body">

                <p align="left">Código de activación</p>
                <input type="text" name="actCode" className="form-control" onChange={this.handleInputChange} />

                <button type="submit" name="actCodeButton" className="cssCodeButton"> Guardar </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default ActCodeForm;


