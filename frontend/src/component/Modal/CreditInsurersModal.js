import { Backdrop, Fade, Modal, TextField, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
// import {Autocomplete }from "@mui/lab";
import TextEditerModal from './TextEditerModal';
import { useDispatch } from 'react-redux';
import { entityGetAction } from '../../redux/actions/entityAction';
import { useSelector } from 'react-redux';
import { CurrencyOptions } from '../../helper/common';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { IoCloseSharp } from 'react-icons/io5';

const { Dragger } = Upload;


const CreditInsurersModal = ({ show, onHide, getModalData, data }) => {

    const [creaditInsurers, setCreaditInsurers] = useState({
        type: "",
        insurer: "",
        broker: "",
        insuredParty: "",
        reInsurer: "",
        currencyOfCoverage: "",
        value: "",
        clauses: "",
        evidence: "",
        underwriter: ""
    })

    // const hadleChange = (e) => {
    //     setCreaditInsurers({
    //         ...creaditInsurers,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const [commentModal, setCommentModal] = useState(false)
    const [selectedName] = useState('')
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])

    const entityName = useSelector(state => state.entityData.entity)

    useEffect(() => {
        setOptions(entityName.data)
        console.log('entityName', entityName)
    }, [entityName])

    useEffect(() => {
        dispatch(entityGetAction('Company'))
    }, [dispatch])

    useEffect(() => {
        setCreaditInsurers(data)
    }, [data])
    const HedgingMethodOption = [
        'Primary',
        'Secondary',
        'Tertiary',
    ]
    // const EvidenceOptions = [
    //     "Guarantees"
    // ]

    const handleChangeNumber = (e, name) => {
        let numberReg = /^[0-9\b]+$/;
        if (name === 'value') {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setCreaditInsurers({ ...creaditInsurers, [name]: e.target.value })
            }
        }
    }

    const hadleChangeModal = (e) => {
        setCreaditInsurers({ ...creaditInsurers, clauses: e.value })
    }

    // const handleChangeFile = (file) => {
    //     if (file) {
    //         new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = () => resolve(reader.result);
    //             reader.onerror = error => reject(error);
    //         }).then((res) => setCreaditInsurers({ ...creaditInsurers, evidence: res }));
    //     }
    // }
    const handleFileChange = (info) => {
        const file = info.fileList[0];
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            }).then((res) => {
                // Update your state here, e.g.
                setCreaditInsurers({ ...creaditInsurers, evidence: res });
            });
        }
    };

    const save = (data) => {
        console.log('data', data)
        getModalData(data)
        onHide()
    }

    const handleChnage = (e) => {
        setCreaditInsurers({
            ...creaditInsurers,
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
                            <h2 id="transition-modal-title" className='modal-title'>Use credit insurance issued by acceptable credit insurers</h2>
                            <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row className='mb-3'>
                                    <Col lg={3}>
                                        <Autocomplete
                                            // className='ms-3 mb-3'
                                            options={HedgingMethodOption}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Type"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCreaditInsurers({ ...creaditInsurers, type: newValue });
                                            }}
                                            disableClearable
                                            value={creaditInsurers?.type}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Insurer"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Insurer" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCreaditInsurers({ ...creaditInsurers, insurer: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && creaditInsurers?.insurer) && options.find((ele) => ele._id === creaditInsurers?.insurer)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Broker"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Broker" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCreaditInsurers({ ...creaditInsurers, broker: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && creaditInsurers?.broker) && options.find((ele) => ele._id === creaditInsurers?.broker)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Insured Party"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Insured Party" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCreaditInsurers({ ...creaditInsurers, insuredParty: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && creaditInsurers?.insuredParty) && options.find((ele) => ele._id === creaditInsurers?.insuredParty)}
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
                                            label="Underwriter"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Underwriter" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCreaditInsurers({ ...creaditInsurers, underwriter: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && creaditInsurers?.underwriter) && options.find((ele) => ele._id === creaditInsurers?.underwriter)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option?.details?.name}
                                            id="disable-clearable"
                                            label="Re-Insurer"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Re-Insurer" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCreaditInsurers({ ...creaditInsurers, reInsurer: newValue._id });
                                            }}
                                            disableClearable
                                            value={(options && creaditInsurers?.reInsurer) && options.find((ele) => ele._id === creaditInsurers?.reInsurer)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={3}>
                                        <Autocomplete
                                            options={CurrencyOptions}
                                            getOptionLabel={(option) => option?.label}
                                            id="disable-clearable"
                                            label="Currency of coverage"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Currency of coverage" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCreaditInsurers({ ...creaditInsurers, currencyOfCoverage: newValue?.label });
                                            }}
                                            disableClearable
                                            value={(CurrencyOptions && creaditInsurers?.currencyOfCoverage) && CurrencyOptions.find((ele) => ele.label === creaditInsurers?.currencyOfCoverage)}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                    <Col lg={3}>
                                        <TextField
                                            label="Value"
                                            variant="standard"
                                            color="warning"
                                            name='value'
                                            value={creaditInsurers?.value}
                                            onChange={(e) => handleChangeNumber(e, 'value')}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                </Row>
                                <Row className='justify-content-center align-items-center mb-3'>
                                    <Col lg={6}>
                                        <TextField
                                            label="clauses"
                                            variant="standard"
                                            color="warning"
                                            name='clauses'
                                            value={creaditInsurers?.clauses}
                                            onChange={(e) => handleChnage(e)}
                                            multiline
                                            maxRows={3}
                                        // onClick={() => { setCommentModal(true); setSelectedName('clauses') }}
                                        // onClick={() => { setCommentModal(true); setType('Justification'); setSelectedName('justification') }}
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <div className='drag-and-drop'>
                                            <label>Upload Evidence</label>
                                            <Dragger beforeUpload={() => false} onChange={handleFileChange} className="upload">
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">
                                                    Click or drag file to this area to upload
                                                </p>
                                            </Dragger>
                                            {/* <DropzoneArea
                                                Icon="none"
                                                filesLimit={1}
                                                showPreviews={true}
                                                showPreviewsInDropzone={false}
                                                useChipsForPreview
                                                previewGridProps={{ container: { spacing: 1, } }}
                                                dropzoneText='Drop file here'
                                                previewText=""
                                                onChange={(file) => handleChangeFile(file[0])}
                                            /> */}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => save(creaditInsurers)} className='footer_next_btn'>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} inputName={selectedName} data={creaditInsurers?.clauses} />}
        </div>
    )
}

export default CreditInsurersModal