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
    constructor(props) {
        super(props);
        this.onKeyEvent = this.onKeyEvent.bind(this);
    }

    onKeyEvent(e) {
        if (e.key == "Enter") {
           document.getElementById("acptBtn").clicked = true;
        }
    }

    render() {

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 150,
            margin: '0 auto',
            padding: 20
        };

        if (!this.props.show) {
            return null;
        }

        return (

            <div style={backdropStyle}>

                <div style={modalStyle}>

                    <div className="modal-header">
                        <h2>{this.props.tittle}</h2>
                    </div>

                    <div className="modal-body">
                        <h3>{this.props.children}</h3>
                    </div>

                    <div className="modal-footer">
                        <button className="buttonSizeGeneral mt-3" id="acptBtn" onKeyPress={this.onKeyEvent} autoFocus="true" onClick={this.props.onClose}>Aceptar</button>
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