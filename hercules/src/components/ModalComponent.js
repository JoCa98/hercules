import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class ModalComponent extends Component {

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render() {

        if(!this.props.show){
            return null;
        }

        return (
            <Modal handleClose={this.onClose}>
                <Modal.Header closeButton onClick={this.onClose}>
                    <Modal.Title>{this.props.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>                     
                       {this.props.children}
                    </div>
                </Modal.Body>
                <Modal.Footer>                    
                    <button className="buttonSizeGeneral" onClick={this.onClose}>Aceptar</button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default ModalComponent;

