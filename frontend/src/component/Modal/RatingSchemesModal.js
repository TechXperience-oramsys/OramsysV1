import { Backdrop, Fade, TextField, Modal, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import TextEditerModal from './TextEditerModal';
import { IoCloseSharp } from "react-icons/io5";
// import { useDispatch } from 'react-redux'
// import Autocomplete from "@material-ui/lab/Autocomplete";

const RatingSchemesModal = ({ onHide, show, getModalData, data, viewData }) => {

    const [state, setState] = useState({
        grade: "",
        value: "",
        acceptable: false,
        comments: ""
    })
    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')
    const location = useLocation();
    const isView = location.state?.isView
    const [error, setError] = useState()
    const [type, setType] = useState('')

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (data) {
            setState({
                grade: data?.grade,
                value: data?.value,
                acceptable: data?.acceptable,
                comments: data?.comments
            })
        }
        console.log('data', data)
    }, [data])

    const validation = () => {
        let param = false
        let error = {}

        if (!state.grade) {
            param = true
            error.grade = 'Please enter Grade!'
        }

        if (!state.value) {
            param = true
            error.value = 'Please enter Value!'
        }

        if (state.acceptable === "") {
            param = true
            error.acceptable = 'Please enter acceptable!'
        }

        if (!state.comments) {
            param = true
            error.comments = 'Please enter comments!'
        }

        setError(error)
        return param
    }

    const handleBack = (data) => {
        if (validation()) {
            return
        }
        if (id) {
            getModalData(data, id)
            onHide()
        } else {
            getModalData(data)
            onHide()
        }
    }
    const hadleChangeModal = (e) => {
        setState({
            ...state,
            [e.name]: e.value
        })
    }
    const [selectedName, setSelectedName] = useState('')

    const [commentModal, setCommentModal] = useState(false)

    const AcceptableOption = [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
    ];

    const handleChnage = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
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
                            <h2 id="transition-modal-title" className='modal-title'>Rating schema</h2>
                            <IoCloseSharp alt='' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={3} className="mb-4">
                                        <TextField
                                            label="Grade"
                                            variant="standard"
                                            color="warning"
                                            name='grade'
                                            value={state.grade}
                                            onChange={handleChange}
                                            disabled={viewData}
                                        />
                                        {error?.grade && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.grade}</span>}
                                    </Col>
                                    <Col lg={3} className="mb-4">
                                        <TextField
                                            label="Value"
                                            variant="standard"
                                            color="warning"
                                            name='value'
                                            value={state.value}
                                            onChange={handleChange}
                                            disabled={viewData}
                                        />
                                        {error?.value && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.value}</span>}
                                    </Col>
                                    <Col lg={3} className="mb-4">
                                        <Autocomplete
                                            label="Acceptable"
                                            id="disable-clearable"
                                            onChange={(e, newVal) => { 
                                                setState({ ...state, acceptable: newVal.value })
                                            }}
                                            getOptionLabel={(option) => option.label}
                                            options={AcceptableOption}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField {...params} label="Acceptable" variant="standard" />
                                            )}
                                            value={(
                                                AcceptableOption.length > 0 &&
                                                (state.acceptable === true || state.acceptable === false)
                                            ) && AcceptableOption.find((ele) => ele.value === state.acceptable)}                                            disabled={isView}
                                        />
                                        {error?.acceptable && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.acceptable}</span>}
                                    </Col>
                                    <Col lg={3} className="mb-4">
                                        <TextField
                                            label="Comments"
                                            variant="standard"
                                            color="warning"
                                            name='comment'
                                            value={state.comments}
                                            disabled={viewData}
                                            onChange={(e) => handleChnage(e)}
                                            multmultiline
                                            maxRows={3}
                                        onClick={() => { setCommentModal(true); setType('Comments'); setSelectedName('comments') }}
                                        />
                                        {error?.comments && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.comments}</span>}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button disable={isView} onClick={() => { handleBack(state) }} className='footer_next_btn'>save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {commentModal && <TextEditerModal data={state?.comments} show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} />}
        </div>

    )
}

export default RatingSchemesModal