/**
 * @fileoverview ModalComponent is used to simplify the way in that the 
 * information about anything necessary to be shown to the user 
 *
 * @version 1.0
 *
 * @author    Antony Jimenez G <antony.jimenez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of ModalComponent was written by Antony Jimenez G.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalComponent extends Component {

    render() {

        if (!this.props.show) {
            return null;
        }

        return (

            <div className="backdropStyle">

                <div className="modalStyle">

                    <div className="modal-header">
                        <h2>{this.props.tittle}</h2>
                    </div>

                    <div className="modal-body">
                        <h3>{this.props.children}</h3>
                    </div>

                    <div className="modal-footer">
                        <button className="buttonSizeGeneral mt-3" onClick={this.props.onClose}>Aceptar</button>
                    </div>

                </div>

            </div>

        );
    }

}

ModalComponent.propTypes = {
    tittle: PropTypes.node,
    children: PropTypes.node,
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

export default ModalComponent;