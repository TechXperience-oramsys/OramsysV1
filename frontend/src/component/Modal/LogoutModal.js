import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import { LOGIN } from '../../redux/types';
import { useNavigate } from 'react-router-dom';


const LogoutModal = ({ show, onHide }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const Logout = (e) => {
    dispatch({
      type: LOGIN,
      payload: []
    })
    e.preventDefault();
    AuthStorage.deauthenticateUser()
    navigate('/');
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={onHide} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Oramsys</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button variant="primary" onClick={(e) => Logout(e)}>
            Yes, Log me out.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogoutModal