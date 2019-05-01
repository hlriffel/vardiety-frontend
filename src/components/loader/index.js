import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';

export class Loader extends Component {

  render() {
    return (
      <div id="loader">
        <Modal
          size="sm"
          show={true}
          centered>
    
          <Modal.Body className="d-flex justify-content-center">
            <div className="spinner-border text-secondary" role="status" />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
