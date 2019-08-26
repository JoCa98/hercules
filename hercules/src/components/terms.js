import React, { Component } from 'react';



class Terms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accept: 0
        }

        this.redirect = this.redirect.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    redirect() {
        this.props.history.push(`/SignUp`);
    }

    /**
* Method that redirect to the previous page
*/
    backButton() {
        this.props.history.push(`/LogIn`);
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

                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-10 offset-1 text-justify">
                                <h2>Normas para el uso del gimnasio</h2>                          
                                <p>1. Ser estudiante activo o funcionario/a del Recinto de Grecia, Sede de Occidente.</p>
                                <p>2. Estar debidamente inscrito en el Servicio de Deportes y Recreación, según los requerimientos solicitados.</p>
                                <p>3. Firmar la bitácora de usuarios/as y anotar la hora de ingreso y salida.</p>
                                <p>4. Es obligatorio usar un paño grande, no dejar residuos de sudor siempre que se siente o acueste en una banca o máquina.</p>
                                <p>5. Usar ropa y zapatos deportivos, no se permite entrenar sin camiseta, en sandalias o jeans, tampoco con la ropa mojada (sudada en exceso).</p>
                                <p>6. Mantener el orden y dejar discos, mancuernas, barras e implementos en su lugar (NO dejar barras con los discos puestos ni mancuernas en el piso).</p>
                                <p>7. No tirar ni golpear las mancuernas, los discos o las barras, no poner mancuernas o discos sobre las bancas ni subir los pies a las bancas.</p>
                                <p>8. No sacar ningún implemento de la sala ni subir los pies en las bancas.</p>
                                <p>9. Reportar daños o situaciones que pueden poner en riesgo a los usuarios.</p>
                                <p>10. Este espacio es para su bienestar, es responsabilidad de la comunidad universitaria, cuidarlo y respetar todas las normas indicadas.</p>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-10 col-md-5">
                                <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                            </div>
                            <div className="col-2 col-md-5">
                                <button  align="right" className="buttonSizeGeneral" onClick={this.redirect}>Aceptar</button>
                            </div>                              
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Terms;