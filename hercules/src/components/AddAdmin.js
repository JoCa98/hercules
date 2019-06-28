import React, { Component } from 'react';

class AddAdmin extends Component {

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-6 offset-3 card p-5">
                        <form>
                            <h2 ><font color="#41ade7">Agregar Administrador</font></h2>
                            <br />
                            <div class="form-group" align="left">
                                <p align="justify">Tipo de administrador</p>
                                <select align="justify" className="form-control">
                                    <option value="gimnasio">Gimnasio</option>
                                    <option value="medico">Médico</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div class="form-group" align="left">
                                        <p align="justify">Primer nombre</p>
                                        <input type="text" name="firstName" className="form-control"></input>
                                        <br></br>
                                        <p align="justify">Primer Apellido</p>
                                        <input type="text" name="firstLastName" className="form-control"></input>                                       
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div class="form-group" align="left">
                                        <p align="justify">Segundo nombre</p>
                                        <input type="text" name="secondName" className="form-control"></input>
                                        <br></br>
                                        <p align="justify">Segundo Apellido</p>
                                        <input type="text" name="secondLastName" className="form-control"></input>                                        
                                    </div>
                                </div>                                
                            </div>
                            <div className="row">
                            <div className="col-12">
                                    <div class="form-group" align="left">
                                        <p align="justify">Email</p>
                                        <input type="text" name="email" className="form-control"></input>
                                        <br></br>
                                        <p align="justify">Contraseña</p>
                                        <input type="text" name="password" className="form-control"></input>
                                        <br></br>
                                        <p align="justify">Confirmar contraseña</p>
                                        <input type="text" name="confirmPassword" className="form-control"></input>
                                    </div>
                                </div> 
                            </div>
                            <div className="row">
                                    <div className="col-md-5 offset-md-7">
                                        <button align="left" className="buttonSizeGeneral">Guardar</button>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddAdmin;