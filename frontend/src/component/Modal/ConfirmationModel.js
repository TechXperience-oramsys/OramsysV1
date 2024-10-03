import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModel = ({ show, message, onConfirm, onHide }) => {
  return (
    <>
      <Modal show={show} onHide={onHide}  backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Oramsys</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModel