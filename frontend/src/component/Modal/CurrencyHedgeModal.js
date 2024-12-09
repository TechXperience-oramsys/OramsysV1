import { Backdrop, Fade, Modal, TextField, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";
// import Autocomplete from "@mui/lab";
import { useDispatch } from 'react-redux';
import { entityGetAction } from '../../redux/actions/entityAction';
import { useSelector } from 'react-redux';
import { IoCloseSharp } from "react-icons/io5";

const CurrencyHedgeModal = ({ show, onHide, getModalData, type, data }) => {
    // const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)

    const [currencyHedgeModal, setCurrencyHedgeModal] = useState({
        hedgingMethod: "",
        counterparty: "",
    })
    const [counterpartyOptions, setCounterpartyOptions] = useState([])

    const dispatch = useDispatch()


    const HedgingMethodOption = [
        'Futures',
        'Options',
        'SWAPS',
        'Forwards',
        'Other',
    ]

    const counterparty = useSelector(state => state.entityData.entity)
    useEffect(() => {
        setCurrencyHedgeModal(data)
    }, [data])

    // useEffect(() => {
    //     if (riskAssessment?.currencyHedge) {
    //         setCurrencyHedgeModal({
    //             hedgingMethod: riskAssessment?.currencyHedge?.hedgingMethod,
    //             counterparty: riskAssessment?.currencyHedge?.counterparty
    //         })
    //     }
    // }, [riskAssessment])

    useEffect(() => {
        if (counterparty && counterparty.data) {
            setCounterpartyOptions(counterparty?.data)
        }
        // console.log('counterparty', counterparty)
    }, [counterparty])

    console.log('counterpartyOptions', counterpartyOptions)


    useEffect(() => {
        dispatch(entityGetAction('Company'))
    }, [dispatch])



    // const counterpartyOptions = [
    //     'Futures',
    //     'Options',
    //     'SWAPS',
    //     'Forwards',
    //     'Other',
    // ]

    const save = (data) => {

        let newData = {
            value: data,
            name: type
        }
        getModalData(newData)
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
                            <h2 id="transition-modal-title" className='modal-title'>Enter a currency hedge</h2>
                            <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={6}>
                                        <Autocomplete
                                            // className='ms-3 mb-3'
                                            options={HedgingMethodOption}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Hedging method"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Hedging method" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCurrencyHedgeModal({ ...currencyHedgeModal, hedgingMethod: newValue });
                                            }}
                                            disableClearable
                                            value={currencyHedgeModal?.hedgingMethod}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={6}>
                                        <Autocomplete
                                            options={counterpartyOptions}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Counterparty"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Counterparty" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCurrencyHedgeModal({ ...currencyHedgeModal, counterparty: newValue._id });
                                            }}
                                            disableClearable
                                            value={(counterpartyOptions && currencyHedgeModal?.counterparty) && counterpartyOptions.find((ele) => ele._id === currencyHedgeModal?.counterparty)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => save(currencyHedgeModal)} className='footer_next_btn'>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={loanPurposeRisk?.justification} />} */}
        </div>
    )
}

export default CurrencyHedgeModal