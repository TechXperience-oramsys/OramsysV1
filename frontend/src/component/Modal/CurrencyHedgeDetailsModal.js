import { Backdrop, Modal, Fade, TextField, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone';
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { entityGetAction } from '../../redux/actions/entityAction';
// import Autocomplete from "@mui/lab";

const CurrencyHedgeDetailsModal = ({ show, onHide, getModalData, editRowData,data }) => {

    const [currencyHedgeDetails, setCurrencyHedgeDetails] = useState({
        hedgingMethod: "",
        counterparty: "",
        evidence: "",
    })
    const [id, setId] = useState('')

    const dispatch = useDispatch()
    const [counterpartyOption, setCounterpartyOption] = useState([])

    const counterpartyOptions = useSelector(state => state.entityData.entity)

    useEffect(() => {
        if (counterpartyOptions?.data) {
            setCounterpartyOption(counterpartyOptions?.data)
        }
    }, [counterpartyOptions])
    useEffect(() => {
        setCurrencyHedgeDetails(data)
    }, [data])
    useEffect(() => {
        dispatch(entityGetAction('Company'))
    }, [dispatch])

    useEffect(() => {
        if (editRowData) {
            console.log("editRowData===", editRowData)
            setId(editRowData.tableData.id)
            setCurrencyHedgeDetails({
                hedgingMethod: editRowData?.hedgingMethod,
                counterparty: { value: editRowData?.counterparty?.value, label: editRowData?.counterparty?.label }
            })
        }
    }, [editRowData])

    const hedgingMethodOptions = [
        'Futures',
        'Options',
        'SWAPS',
        'Forwards',
        'Other',
    ]

    const saveData = () => {
        if (editRowData) {
            console.log('id', id)
            getModalData(currencyHedgeDetails, id)
            onHide()
        } else {
            getModalData(currencyHedgeDetails)
            onHide()
        }
    }

    useEffect(() => {
        console.log('currencyHedgeDetails===', currencyHedgeDetails)
        console.log('counterpartyOption==', counterpartyOption)
    }, [currencyHedgeDetails, counterpartyOption])

    
    const handleChangeFile = (file) => {
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            }).then((res) => setCurrencyHedgeDetails({ ...currencyHedgeDetails, evidence: res }));
        }
    }

    return (
        <>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className='model'
                    open={show}
                    onClose={() => onHide()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={show}>
                        <div className='modal-content'>
                            <div className='d-flex justify-content-between'>
                                <h2 id="transition-modal-title" className='modal-title'>Enter a price hedge</h2>
                                <img alt='props' src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                            </div>
                            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                                <div className='form'>
                                    <Row>
                                        <Col lg={6}>
                                            <Autocomplete
                                                options={hedgingMethodOptions}
                                                getOptionLabel={(option) => option}
                                                id="disable-clearable"
                                                label="Hedging method"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Hedging method" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setCurrencyHedgeDetails({ ...currencyHedgeDetails, hedgingMethod: newValue });
                                                }}
                                                disableClearable
                                                value={currencyHedgeDetails?.hedgingMethod}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <Autocomplete
                                                options={counterpartyOption}
                                                getOptionLabel={(option) => option?.details?.name}
                                                id="disable-clearable"
                                                label="Counterparty"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Counterparty" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setCurrencyHedgeDetails({ ...currencyHedgeDetails, counterparty: { value: newValue?._id, label: newValue?.details?.name } });
                                                    console.log('newValue._id==', newValue._id)
                                                }}
                                                disableClearable
                                                value={(currencyHedgeDetails?.counterparty && counterpartyOption.length > 0) && counterpartyOption.find((elem) => elem._id === currencyHedgeDetails?.counterparty?.value)}
                                            />
                                        </Col>
                                        <div className='drag-and-drop'>
                                                    <label>Upload Evidence</label>
                                                    <DropzoneArea
                                                        Icon="none"
                                                        filesLimit={1}
                                                        showPreviews={true}
                                                        showPreviewsInDropzone={false}
                                                        useChipsForPreview
                                                        previewGridProps={{ container: { spacing: 1, } }}
                                                        dropzoneText='Drop file here'
                                                        previewText=""
                                                        onChange={(file) => handleChangeFile(file[0])}
                                                    />
                                                </div>
                                    </Row>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    <button onClick={() => saveData()} className='footer_next_btn'>{editRowData ? "Edit" : "Save"}</button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default CurrencyHedgeDetailsModal