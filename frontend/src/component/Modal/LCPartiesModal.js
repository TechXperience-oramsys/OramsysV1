import { Backdrop, Fade, Modal, TextField, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';
// import Autocomplete from "@mui/lab";
import { entityGetAction } from '../../redux/actions/entityAction';
import { useSelector, useDispatch } from 'react-redux';
import { IoCloseSharp } from "react-icons/io5";


const LCPartiesModal = ({ show, onHide, addParties, data }) => {

    // let numberReg = /^[1-7]\d{0,7}$/

    // const location = useLocation()
    // const isView = location.state[2]?.isView

    const [lcParties, setLcParties] = useState({
        applicant: "",
        issuingBank: "",
        beneficiary: "",
        advisingBank: "",
        conformingBank: "",
        negotiatingBank: "",
        secondBeneficiary: "",
        reimbursingBank: "",
        currency: "",
        valueOfCurrency: "",
    })

    const dispatch = useDispatch()
    const [applicant, setApplicant] = useState([])

    const applicants = useSelector(state => state.entityData.entity)

    useEffect(() => {
        if (applicants && applicants.data) {
            setApplicant(applicants.data)
        }
    }, [applicants])

    // const handleChange = (e, name, type) => {
    //     if (type === "lcParties") {
    //         if (name === "valueOfcurrency") {

    //           if (e.target.value === "" || numberReg.test(e.target.value)) {
    //             setLcParties({ ...lcParties, [e.target.name]: e.target.value })
    //         }
    //         }
    //     }
    // }

    useEffect(() => {
        if (data) {
            setLcParties({
                applicant: data.applicant,
                issuingBank: data.issuingBank,
                beneficiary: data.beneficiary,
                advisingBank: data.advisingBank,
                conformingBank: data.conformingBank,
                negotiatingBank: data.negotiatingBank,
                secondBeneficiary: data.secondBeneficiary,
                reimbursingBank: data.reimbursingBank,
                currency: data.currency,
                valueOfCurrency: data.valueOfCurrency,
            })
        }
    }, [data])

    useEffect(() => {
        dispatch(entityGetAction('Company'))
    }, [dispatch])

    const saveData = () => {
        addParties(lcParties)
        onHide()
    }

    return (
        <>
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
                                <h2 id="transition-modal-title" className='modal-title'>Add letter of credit</h2>
                                <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                            </div>
                            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                                <div className='form pt-2'>
                                    {/* <h2>Contract value</h2> */}
                                    <Row>
                                        {/* <Col lg={3}>
                                            <Autocomplete
                                            options={CurrencyOptions}
                                            getOptionLabel={(option) => option.label}
                                            id="disable-clearable"
                                            label="Contract currency"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Contract currency" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setLcParties({ ...lcParties, currency: newValue.label });
                                            }}
                                            disableClearable
                                            name='currency'
                                            value={CurrencyOptions && lcParties?.currency && CurrencyOptions.find(
                                                (ele) => ele.label === lcParties.currency)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                            label="Contract Value"
                                            variant="standard"
                                            color="warning"
                                            name='valueOfCurrency'
                                            value={lcParties.valueOfCurrency}
                                            onChange={(e) => handleChange(e, "valueOfCurrency", "lcParties")}
                                            disabled={isView}
                                            />
                                        </Col> */}
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Applicant"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Applicant" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, applicant: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.applicant?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Issuing bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Issuing bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, issuingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.issuingBank?.value) && applicant.find(item => item._id === lcParties.issuingBank.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Beneficiary"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Beneficiary" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, beneficiary: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.beneficiary?.value) && applicant.find(item => item._id === lcParties.beneficiary.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Advising bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Advising bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, advisingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.advisingBank?.value) && applicant.find(item => item._id === lcParties.advisingBank.value)}
                                            />
                                        </Col>

                                    </Row>
                                    <Row className='mt-3'>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Conforming bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Conforming bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, conformingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.conformingBank?.value) && applicant.find(item => item._id === lcParties.conformingBank.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Negotiating bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Negotiating bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, negotiatingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.negotiatingBank?.value) && applicant.find(item => item._id === lcParties.negotiatingBank.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Second beneficiary"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Second beneficiary" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, secondBeneficiary: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.secondBeneficiary?.value) && applicant.find(item => item._id === lcParties.secondBeneficiary.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Reimbursing bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Reimbursing bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, reimbursingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.reimbursingBank?.value) && applicant.find(item => item._id === lcParties.reimbursingBank.value)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    <button onClick={() => saveData()} className='footer_next_btn'>Save</button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default LCPartiesModal