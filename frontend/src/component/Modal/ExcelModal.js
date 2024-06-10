import React, { useEffect, useState } from 'react'
import { Backdrop, Fade, Modal, TextField } from '@material-ui/core'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { termSheetAction } from '../../redux/actions/termSheetAction'
// import { termSheetAction } from '../../redux/actions/termSheetAction'
import { toast } from 'react-hot-toast'
import { TERM_SHEET } from '../../redux/types'
import Loader from '../../layout/loader/Loader'


const ExcelModal = ({ show, onHide, getId, refreshpage }) => {

    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const getExcelDate = useSelector(state => state.termSheet.termSheet)

    useEffect(() => {

        if (getExcelDate && getExcelDate.status === 200) {
            dispatch({
                type: TERM_SHEET,
                payload: []
            })
            toast.success(getExcelDate.message)
            onHide()
        }
        console.log('getExcelDate', getExcelDate)
    }, [getExcelDate])


    const onChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => setFile(reader.result?.split(",")[1]);
        reader.onerror = error => console.log(error);
    }

    const upLoadExcel = () => {
        let body = {
            _id: getId,
            termSheetUrl: file
        }
        console.log(body);
        setLoading(true)
        dispatch(termSheetAction(body))

        setTimeout(() => {
            refreshpage()
            setLoading(false)
        }, 3000);
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
                    {/* <Fade > */}
                    <div className='modal-content'>
                        <div className='d-flex justify-content-between'>
                            <h2 id="transition-modal-title" className='modal-title'>Upload Termsheet</h2>
                            <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col className="mb-4">
                                        <TextField
                                            label="upload termsheet here"
                                            variant="standard"
                                            color="warning"
                                            name='roleName'
                                            type='file'
                                            autoFocus={true}
                                            inputProps={{ accept: ".pdf" }}
                                            // value={state.roleName}
                                            // onChange={(e) => getBase64(e.target.file, (result) => {
                                            //     // idCardBase64 = result;
                                            //     console.log('result', result)
                                            //     setFile(result)
                                            // })}

                                            onChange={(e) => onChange(e)}
                                        // disable={isView}
                                        />
                                        {/* {error?.roleName && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.roleName}</span>} */}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => upLoadExcel()} className='footer_next_btn'>{loading ? <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div> : 'Save'}</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ExcelModal