import { Backdrop, Fade, Modal, TextField, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import Autocomplete from "@material-ui/lab/Autocomplete";
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { entityGetAction } from '../../redux/actions/entityAction';
import { IoCloseSharp } from "react-icons/io5";

const LocalCreditStandingModal = ({ show, onHide, getModalData ,data}) => {

    const [localCreditStanding, setLocalCreditStanding] = useState({
        applicant: "",
        advisingBank: "",
        beneficiary: "",
        conformingBank: "",
        issuingBank: "",
        negotiatingBank: "",
        reimbursingBank: "",
        secondBeneficiary: "",
    })

    const [options, setOptions] = useState([])

    const dispatch = useDispatch()

    // const options = [
    //     'Bank One',
    //     'Bank Two',
    //     'Bank Four',
    //     'Centaur Bank',
    //     'Shipper 1',
    //     'Shipper 2',
    // ]
    const entityName = useSelector(state => state.entityData.entity)

    useEffect(() => {
        setOptions(entityName.data)
    }, [entityName])

    useEffect(() => {
        setLocalCreditStanding(data)
    }, [data])
    
    useEffect(() => {
        dispatch(entityGetAction('Company'))
    }, [dispatch])


    const save = (data) => {
        getModalData(data)
        onHide()
    }
    return (
        <div>
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
                    <div className='d-flex justify-content-between'>
                        <h2 id="transition-modal-title" className='modal-title'>Local Credit standing modal</h2>
                            <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row className='mb-3'>
                                    <Col lg={3}>
                                        <Autocomplete
                                            // className='ms-3 mb-3'
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Applicant"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Applicant" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, applicant: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.applicant) && options.find((ele) => ele._id === localCreditStanding?.applicant)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Advising Bank"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Advising Bank" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, advisingBank: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.advisingBank) && options.find((ele) => ele._id === localCreditStanding?.advisingBank)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Beneficiary"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Beneficiary" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, beneficiary: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.beneficiary) && options.find((ele) => ele._id === localCreditStanding?.beneficiary)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Conforming Bank"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Conforming Bank" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, conformingBank: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.conformingBank) && options.find((ele) => ele._id === localCreditStanding?.conformingBank)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col lg={3}>
                                        <Autocomplete
                                            // className='ms-3 mb-3'
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Issuing Bank"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Issuing Bank" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, issuingBank: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.issuingBank) && options.find((ele) => ele._id === localCreditStanding?.issuingBank)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Negotiating Bank"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Negotiating Bank" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, negotiatingBank: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.negotiatingBank) && options.find((ele) => ele._id === localCreditStanding?.negotiatingBank)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Reimbursing Bank"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Reimbursing Bank" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, reimbursingBank: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.reimbursingBank) && options.find((ele) => ele._id === localCreditStanding?.reimbursingBank)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Second Beneficiary"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Second Beneficiary" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLocalCreditStanding({ ...localCreditStanding, secondBeneficiary: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && localCreditStanding?.secondBeneficiary) && options.find((ele) => ele._id === localCreditStanding?.secondBeneficiary)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => save(localCreditStanding)} className='footer_next_btn'>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default LocalCreditStandingModal