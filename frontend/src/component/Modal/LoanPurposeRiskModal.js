import { Backdrop, Fade, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import TextEditerModal from './TextEditerModal';
import { InboxOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import { IoCloseSharp } from "react-icons/io5";


const { Dragger } = Upload;

const LoanPurposeRiskModal = ({ show, onHide, getModalData, types, data }) => {

    const [loanPurposeRisk, setLoanPurposeRisk] = useState({
        justification: "",
        evidence: ""
    })

    const [commentModal, setCommentModal] = useState(false)
    const [type] = useState('')
    const [selectedName] = useState('')
    const [checkedval, setcheckedval] = useState(false)



    const hadleChangeModal = (e) => {
        setLoanPurposeRisk({ ...loanPurposeRisk, justification: e.value })
    }

    const save = (data) => {

        let newData = {
            value: data,
            name: types
        }
        getModalData(newData)
        onHide()
    }

    const handleChnage = (e) => {
        setLoanPurposeRisk({
            ...loanPurposeRisk,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        setLoanPurposeRisk(data)
    }, [data])

    const [fileList, setFileList] = useState([]);
    // Function to handle file reading and state update
    const handleChangeFile = (file) => {
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            }).then((res) => {
                setLoanPurposeRisk({ ...loanPurposeRisk, evidence: res });
            });
        }
    };

    // Handle file selection and limit to 1 file
    const handleFileChange = (info) => {
        const newFileList = info.fileList.slice(-1); // Limit to 1 file
        setFileList(newFileList);
        if (newFileList.length > 0) {
            handleChangeFile(newFileList[0].originFileObj); // Call the file processing function
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
                            <h2 id="transition-modal-title" className='modal-title'>Provide a Justification</h2>
                            <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col>
                                        <TextField
                                            label="Justification"
                                            variant="standard"
                                            color="warning"
                                            name='justification'
                                            value={loanPurposeRisk?.justification}
                                            multiline
                                            maxRows={3}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setCommentModal(true); setType('Justification'); setSelectedName('justification') }}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                        {types === "acceptableJurisdiction" ? <div className='d-flex justify-content-between mt-4 align-items-center'>
                                            <div style={{ margin: "20px" }}>
                                                <input type="checkbox" onChange={() => checkedval ? setcheckedval(false) : setcheckedval(true)}></input><span style={{ padding: "10px" }}>Marketable Assets</span>
                                            </div>
                                            <div className='w-50'>
                                                {checkedval === true ?
                                                    <div className='drag-and-drop'>
                                                        <label>Upload Evidence</label>
                                                        <Form.Item label="Logo" name="logo" valuePropName="file" rules={[{ required: true, message: "Please upload a logo!" }]}>
                                                            <Dragger
                                                                fileList={fileList}
                                                                beforeUpload={() => false} // Prevent automatic upload
                                                                onChange={handleFileChange} // Handle file change
                                                                maxCount={1} // Limit to 1 file
                                                                className="upload">
                                                                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                                                <p className="ant-upload-text">Upload Evidence</p>
                                                            </Dragger>
                                                        </Form.Item>
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
                                                    </div> : ''}
                                            </div>
                                        </div> : ''}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => save(loanPurposeRisk)} className='footer_next_btn'>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={loanPurposeRisk?.justification} />}
        </div>
    )
}

export default LoanPurposeRiskModal