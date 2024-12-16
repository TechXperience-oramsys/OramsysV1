import { Backdrop, Fade, Modal, TextField, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { IoCloseSharp } from 'react-icons/io5';

const { Dragger } = Upload;

const CounterpartiesModal = ({ show, onHide, getModalData, type, modalOption, data }) => {

    const [counterparties, setCounterparties] = useState({
        type: "",
        instrument: "",
        evidence: "",
    })
    const HedgingMethodOption = [
        'Primary',
        'Secondary',
        'Tertiary',
    ]

    useEffect(() => {
        console.log('modalOptions', modalOption)
    }, [modalOption])
    console.log('data', data)
    useEffect(() => {
        setCounterparties(data[type])
    }, [data, type])

    const save = (data) => {
        let newData = {
            value: data,
            name: type
        }
        getModalData(newData)
        onHide()
    }

    // const handleChangeFile = (file) => {
    //     if (file) {
    //         new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = () => resolve(reader.result);
    //             reader.onerror = error => reject(error);
    //         }).then((res) => setCounterparties({ ...counterparties, evidence: res }));
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
                setCounterparties({ ...counterparties, evidence: res });
            });
        }
    };

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
                            <h2 id="transition-modal-title" className='modal-title'>Enter a Mitigant</h2>
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
                                            label="Type"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCounterparties({ ...counterparties, type: newValue });
                                            }}
                                            disableClearable
                                            value={counterparties?.type}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    <Col lg={6}>
                                        <Autocomplete
                                            options={modalOption ?? []}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Instrument"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Instrument" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCounterparties({ ...counterparties, instrument: newValue });
                                            }}
                                            disableClearable
                                            value={counterparties?.instrument}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>

                                    {/* <Col lg={4}>
                                        <Autocomplete
                                            options={modalOption ?? []}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Evidence"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Evidence" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setCounterparties({ ...counterparties, evidence: newValue });
                                            }}
                                            disableClearable
                                            value={counterparties?.evidence}
                                        />
                                        {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>}
                                    </Col> */}
                                    <Col lg={12}>
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
                                <button onClick={() => save(counterparties)} className='footer_next_btn'>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={loanPurposeRisk?.justification} />} */}
        </div>
    )
}

export default CounterpartiesModal