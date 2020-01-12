import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class ModalComponent extends Component {

    render() {

        if (!this.props.show) {
            return null;
        }

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