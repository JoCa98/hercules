/**
 * @fileoverview Terms page, this page contains the rules about the use of the gym. The user must agrees with them so they 
 * can continue with the sign up process.
 *
 * @version 1.0
 *
 * @author Kevin Loria Paniagua <kevin.loria@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of Terms was written by Kevin Loría.
 */

import React, { Component } from 'react';
import PermissionsManager from "./PermissionsManager";

class Terms extends Component {
    constructor(props) {
        super(props);
        /**
        *permissionsManager:
        * @type {PermissionsManager}
        * Instance of PermissionManager to grant or deny permission to the user to access certain pages from the current one
        * and depending of the user type.
        * 
        * accept:
        * @type {integer}
        * Property that stores a 1 if the user agrees with the terms of usage or a 0 if they don´t.
        */

        this.state = {
            accept: 0,
            permissionsManager: new PermissionsManager()
        }

        this.redirect = this.redirect.bind(this);
        this.backButton = this.backButton.bind(this);
    }
    /**
    * Method that validate the page permissions.
    */
    componentDidMount() {
        this.state.permissionsManager.validatePermission(this.props.location.pathname, this);
        window.scrollTo(0, 0);
    }
    /**
    * Method that redirect the user to the next page if they agreed with the terms of usage.
    */
    redirect() {
        sessionStorage.setItem('termsConfirm', 'true');
        this.props.history.push(`/SignUp`);
    }

    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                        <h1 className="text-left colorBlue mb-4">Términos y condiciones</h1>
                        <div className="row mt-4">
                            <div className="col-10 offset-1 text-justify">
                                <h2>Privacidad y uso de datos</h2>
                                <p>Para algunas funcionalidades, el sitio web solicita información al usuario a través de formularios. Al completarlos, el usuario otorga su consentimiento para que los datos que suministró sean utilizados con la finalidad establecida en el mismo formulario.
                                </p>
                                <p>En ocasiones, el presente sitio web podría recolectar datos de transmisión de la conexión del usuario que ingresa al sitio. Por ejemplo, datos como el tipo de dispositivo que se usó para ingresar al portal, esta información se utiliza para adaptar el contenido al dispositivo.
                                    En todo caso, la información que se recolecta es con el fin de darle una mejor experiencia al usuario.</p>
                                <h2>Normas para el uso del gimnasio</h2>
                                <p>1. Ser estudiante activo o funcionario/a del Recinto de Grecia, Sede de Occidente.</p>
                                <p>2. Estar debidamente inscrito en el Servicio de Deportes y Recreación, según los requerimientos solicitados.</p>
                                <p>3. Firmar la bitácora de usuarios/as y anotar la hora de ingreso y salida.</p>
                                <p>4. Es obligatorio usar un paño grande, no dejar residuos de sudor siempre que se siente o acueste en una banca o máquina.</p>
                                <p>5. Usar ropa y zapatos deportivos, no se permite entrenar sin blusa o camiseta, en sandalias o jeans, tampoco con la ropa mojada (sudada en exceso).</p>
                                <p>6. Mantener el orden y dejar discos, mancuernas, barras e implementos en su lugar (NO dejar barras con los discos puestos ni mancuernas en el piso).</p>
                                <p>7. No tirar ni golpear las mancuernas, los discos o las barras, no poner mancuernas o discos sobre las bancas ni subir los pies a las bancas.</p>
                                <p>8. No sacar ningún implemento de la sala ni subir los pies en las bancas.</p>
                                <p>9. Reportar daños o situaciones que pueden poner en riesgo a los usuarios.</p>
                                <p>10. No se permite ingerir alimentos en el gimnasio.</p>
                                <p>11. Este espacio es para su bienestar, es responsabilidad de la comunidad universitaria, cuidarlo y respetar todas las normas indicadas.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10 offset-1 col-md-2 offset-md-1 col-sm-4 offset-sm-1 text-left mt-2">
                                <div className="form-group">
                                    <button className="buttonSizeGeneral w-100" onClick={this.backButton}>Volver</button>
                                </div>
                            </div>
                            <div className="col-10 offset-1 col-md-2 offset-md-6 col-sm-4 offset-sm-2 text-right mt-2" >
                                <div className="form-group">
                                    <button className="buttonSizeGeneral w-100" onClick={this.redirect}>Aceptar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Terms;