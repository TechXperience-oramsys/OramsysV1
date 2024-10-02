import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Backdrop, Fade, Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { entityAddAction } from '../../redux/actions/entityAction';

const AddEntityModal = ({ show, onHide, getModalData, isView, editData }) => {

    const [entities, setEntities] = useState({})

    const dispatch = useDispatch()

    const handleChnage = (e) => {
        setEntities({
            ...entities,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log('entities', entities)
    }, [entities])


    const saveData = () => {

        const body = {
            type: "Company",
            detail: { name: entities.name },
            addresses: [{ addressLine1: entities.addressLine1, addressLine2: entities.addressLine2, addressLine3: entities.addressLine3, mobile: entities.phoneNumber, type: "Biling" }],
            email: entities.emailAddress,
            password: entities.password
        }
        console.log('body', body)
        dispatch(entityAddAction(body))
        // onHide()
    }
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className='model'
                open={show}
                onClose={onHide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show}>
                    <div className='modal-content'>
                        <div className='d-flex justify-content-end'>
                            {/* <h2 id="transition-modal-title" className='modal-title'>Edit Licence</h2> */}
                            <img alt='icon' src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Enter your name"
                                            variant="standard"
                                            color="warning"
                                            // disabled
                                            name='name'
                                            value={entities.name}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {/* {error && error?.type && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.type}</span>} */}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Enter address line 1"
                                            variant="standard"
                                            color="warning"
                                            // disabled
                                            name='addressLine1'
                                            value={entities.addressLine1}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {/* {error && error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>} */}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Enter address line 2"
                                            variant="standard"
                                            color="warning"
                                            // disabled
                                            name='addressLine2'
                                            value={entities.addressLine2}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {/* {error && error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>} */}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Enter address line 3"
                                            variant="standard"
                                            color="warning"
                                            // disabled
                                            name='addressLine3'
                                            value={entities.addressLine3}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {/* {error && error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>} */}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Enter your phone number"
                                            variant="standard"
                                            color="warning"
                                            // disabled
                                            name='phoneNumber'
                                            value={entities.phoneNumber}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {/* {error && error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>} */}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Enter your email address"
                                            variant="standard"
                                            color="warning"
                                            // disabled                                           
                                            name='emailAddress'
                                            value={entities.emailAddress}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {/* {error && error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>} */}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Enter password"
                                            variant="standard"
                                            color="warning"
                                            // disabled
                                            type='password'
                                            name='password'
                                            value={entities.password}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {/* {error && error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>} */}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <div>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    {/* {names.length && <button button onClick={() => setAddentity(true)} className="footer_next_btn ms-2">Add entity</button>} */}
                                </div>
                                <button onClick={() => saveData()} className={`footer_next_btn ${isView && 'd-none'}`}>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default AddEntityModal