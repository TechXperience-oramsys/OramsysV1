import React, { useState } from 'react'
import { Fade, Modal, Backdrop, TextField, Autocomplete } from '@mui/material'
import { Col, Row } from 'react-bootstrap';
// import { toast } from 'sonner'


const AddInsuranceModal = ({ onHide, show }) => {

    // const toastError = () => toast.success('Please check required success');

    const [state] = useState({

    })

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     setState({
    //         ...state,
    //         [name]: event.target.value,
    //     });
    // };

    const options = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua",
        "Argentina",
        "India",
    ];

    const getOptions = (q) => {
        let query = new RegExp(q);
        return options.filter(o => query.test(o));
    };


    const [text, setText] = React.useState("");

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
                        {/* <Fade > */}
                        <div className='modal-content'>
                            <div className='d-flex justify-content-between'>
                                <h2 id="transition-modal-title" className='modal-title'>Add Insurances</h2>
                                <img alt='porp' src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                            </div>
                            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                                <div className='form'>
                                    <Row>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Insurer</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.insurer}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'insurer',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'AIR'}>AIR</option>
                                                    <option value={'LAND'}>LAND</option>
                                                    <option value={'SEA'}>SEA</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Insurer"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Broker</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.broker}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'broker',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'AIR'}>AIR</option>
                                                    <option value={'LAND'}>LAND</option>
                                                    <option value={'SEA'}>SEA</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Broker"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Insurance Type</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.insurance_type}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'shipment_mode',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'AIR'}>AIR</option>
                                                    <option value={'LAND'}>LAND</option>
                                                    <option value={'SEA'}>SEA</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Insurance Type"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Currency of coverage</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.shipment_mode}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'shipment_mode',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'AIR'}>AIR</option>
                                                    <option value={'LAND'}>LAND</option>
                                                    <option value={'SEA'}>SEA</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Currency of coverage"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>

                                    </Row>
                                    <Row className='mt-3'>
                                        <Col lg={3}>
                                            <TextField

                                                label="Value"
                                                variant="standard"
                                                color="warning"
                                                name='value'
                                                value={state.value}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Insured Party</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.broker}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'broker',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'One Bank'}>One Bank</option>
                                                    <option value={'Two Bank'}>Two Bank</option>
                                                    <option value={'Centaur Bank'}>Centaur Bank</option>
                                                    <option value={'Bank Four'}>Bank Four</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Insured Party"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Re-Insurer</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.insurance_type}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'shipment_mode',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'One Bank'}>One Bank</option>
                                                    <option value={'Two Bank'}>Two Bank</option>
                                                    <option value={'Centaur Bank'}>Centaur Bank</option>
                                                    <option value={'Bank Four'}>Bank Four</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Re-Insurer"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Underwriter</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.shipment_mode}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'shipment_mode',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'One Bank'}>One Bank</option>
                                                    <option value={'Two Bank'}>Two Bank</option>
                                                    <option value={'Centaur Bank'}>Centaur Bank</option>
                                                    <option value={'Bank Four'}>Bank Four</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Underwriter"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>

                                    </Row>
                                    <Row className='mt-3'>
                                        <Col lg={3}>
                                            {/* <FormControl className="">
                                                <InputLabel htmlFor="age-native-simple">Any restriction ?</InputLabel>
                                                <Select
                                                    native
                                                    focused
                                                    value={state.any_restriction}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'any_restriction',
                                                        id: 'age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={'Yes'}>Yes</option>
                                                    <option value={'No'}>No</option>
                                                </Select>
                                            </FormControl> */}
                                            <Autocomplete
                                                label="Any restriction ?"
                                                onChange={q => setText(q)}
                                                selectOnBlur
                                                requireMatch
                                                getOptions={getOptions}
                                                query={text}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <div className='drag-and-drop'>
                                                <label>Upload Evidence</label>
                                                {/* <DropzoneArea
                                                    Icon="none"
                                                    filesLimit={1}
                                                    showPreviews={true}
                                                    showPreviewsInDropzone={false}
                                                    useChipsForPreview
                                                    previewGridProps={{ container: { spacing: 1, } }}
                                                    dropzoneText='Drop file here'
                                                    previewText=""
                                                    onChange={(files) => console.log('Files:', files)}
                                                /> */}
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                                label="Clauses"
                                                variant="standard"
                                                color="warning"
                                                name='value'
                                            // value={state.value}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                                label="Restrictions Comments"
                                                variant="standard"
                                                color="warning"
                                                name='value'
                                                value={state.value}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    <button onClick={() => { }} className='footer_next_btn'> Next</button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default AddInsuranceModal