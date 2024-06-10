import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { countrieAction } from '../../../../redux/actions/countrieAction';
import { editEntityAction, entityAddAction } from '../../../../redux/actions/entityAction';
import { Autocomplete } from "@material-ui/lab";
import { COMPANY_DATA, EDIT_ENTITY, ENTITY_ADD, ENTITY_GET_BY_ID } from '../../../../redux/types';
import { toast } from 'react-hot-toast';

const IndividualAddress = ({ handleNext, hendelCancel, sendDetailData, common }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const isView = location.state[1]?.isView

    const country = useSelector(state => state.countryData.country)
    const [countryData, setCountryData] = useState([])
    const [formErrors, setFormErrors] = useState()

    let numberReg = /^[0-9\b]+$/;
    let faxReg = /^\+?[0-9]{6,}$/;
    let telephoneReg = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    const [ResidentialState, setResidentialState] = useState({
        _id: '',
        type: 'Residential',
        flatNumber: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        postcode: '',
        state: '',
        city: '',
        country: '',
        mobile: '',
        telephone: '',
        fax: '',
        email: '',
    })
    const [ProfessionalState, setProfessionalState] = useState({
        _id: '',
        type: 'Professional',
        flatNumber: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        postcode: '',
        state: '',
        city: '',
        country: '',
        mobile: '',
        telephone: '',
        fax: '',
        email: '',
    })
    const [loading, setLoading] = useState(false)

    const entityGetById = useSelector((state) => state.entityData.getEntityById)
    const entityAddData = useSelector((state) => state.entityData.entityAdd)
    const editEntityData = useSelector((state) => state.entityData.entityUpdate)

    useEffect(() => {
        if (country && country.data) {
            setCountryData(country?.data)
        } else {
            dispatch(countrieAction("all"))
        }
    }, [country])

    useEffect(() => {
        if (entityGetById && entityGetById.data && entityGetById.status === 200) {
            let tempResidential = entityGetById.data.addresses.find((item) => item.type === "Residential")
            setResidentialState({
                _id: tempResidential?._id,
                type: tempResidential?.type,
                flatNumber: tempResidential?.flatNumber,
                addressLine1: tempResidential?.addressLine1,
                addressLine2: tempResidential?.addressLine2,
                addressLine3: tempResidential?.addressLine3,
                postcode: tempResidential?.postcode,
                state: tempResidential?.state,
                city: tempResidential?.city,
                country: tempResidential?.country?._id,
                mobile: tempResidential?.mobile,
                telephone: tempResidential?.telephone,
                fax: tempResidential?.fax,
                email: tempResidential?.email,
            })
            let tempProfessional = entityGetById.data.addresses.find((item1) => item1.type === "Professional")
            setProfessionalState({
                _id: tempProfessional?._id,
                type: tempProfessional?.type,
                flatNumber: tempProfessional?.flatNumber,
                addressLine1: tempProfessional?.addressLine1,
                addressLine2: tempProfessional?.addressLine2,
                addressLine3: tempProfessional?.addressLine3,
                postcode: tempProfessional?.postcode,
                state: tempProfessional?.state,
                city: tempProfessional?.city,
                country: tempProfessional?.country?._id,
                mobile: tempProfessional?.mobile,
                telephone: tempProfessional?.telephone,
                fax: tempProfessional?.fax,
                email: tempProfessional?.email,
            })
        }
    }, [entityGetById])


    const handleResidentialChange = (event) => {
        if (event.target.name === "flatNumber" || event.target.name === "postcode" || event.target.name === "mobile" || event.target.name === "telephone" || event.target.name === "fax") {
            if (event.target.value === "" || numberReg.test(event.target.value)) {
                setResidentialState({ ...ResidentialState, [event.target.name]: event.target.value })
            }
        } else if (event.target.name === "addressLine1" || event.target.name === "addressLine2" || event.target.name === "addressLine3" || event.target.name === "state" || event.target.name === "city" || event.target.name === "email") {
            setResidentialState({ ...ResidentialState, [event.target.name]: event.target.value })
        }
    }

    const handleProfessionalChange = (event) => {
        if (event.target.name === "flatNumber" || event.target.name === "postcode" || event.target.name === "mobile" || event.target.name === "telephone" || event.target.name === "fax") {
            setProfessionalState({ ...ProfessionalState, [event.target.name]: event.target.value })
        } else if (event.target.name === "addressLine1" || event.target.name === "addressLine2" || event.target.name === "addressLine3" || event.target.name === "state" || event.target.name === "city" || event.target.name === "email") {
            setProfessionalState({ ...ProfessionalState, [event.target.name]: event.target.value })
        }
    }

    const validation = () => {
        let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        let flag = false
        let error = {
            Residential: {},
            Professional: {}
        }
        if (!ResidentialState.flatNumber) {
            flag = true
            error.Residential.flatNumber = "Please enter flatNumber!"
        }
        if (!ResidentialState.addressLine1) {
            flag = true
            error.Residential.addressLine1 = "Please enter addressLine1!"
        }
        if (!ResidentialState.addressLine2) {
            flag = true
            error.Residential.addressLine2 = "Please enter addressLine2!"
        }
        if (!ResidentialState.addressLine3) {
            flag = true
            error.Residential.addressLine3 = "Please enter addressLine3!"
        }
        if (!ResidentialState.postcode) {
            flag = true
            error.Residential.postcode = "Please enter postcode!"
        }
        if (!ResidentialState.state) {
            flag = true
            error.Residential.state = "Please enter state!"
        }
        if (!ResidentialState.city) {
            flag = true
            error.Residential.city = "Please enter city!"
        }
        if (!ResidentialState.country) {
            flag = true
            error.Residential.country = "Please select country!"
        }
        if (!ResidentialState.mobile) {
            flag = true
            error.Residential.mobile = "Please enter mobile!"
        }
        else if (ResidentialState.mobile.length < 10) {
            flag = true
            error.Residential.mobile = "Please enter valid mobile!"
        }
        if (!ResidentialState.telephone) {
            flag = true
            error.Residential.telephone = "Please enter telephone!"
        }
        else if (!telephoneReg.test(ResidentialState.telephone)) {
            flag = true
            error.Residential.telephone = "Please enter valid telephone!"
        }
        if (!ResidentialState.fax) {
            flag = true
            error.Residential.fax = "Please enter fax!"
        }
        else if (!faxReg.test(ResidentialState.fax)) {
            flag = true
            error.Residential.fax = "Please enter valid fax!"
        }
        if (!ResidentialState.email) {
            flag = true
            error.Residential.email = "Please enter email!"
        }
        else if (!emailReg.test(ResidentialState.email)) {
            flag = true
            error.Residential.email = "Please enter valid email!"
        }
        if (!ProfessionalState.flatNumber) {
            flag = true
            error.Professional.flatNumber = "Please enter flatNumber!"
        }
        if (!ProfessionalState.addressLine1) {
            flag = true
            error.Professional.addressLine1 = "Please enter addressLine1!"
        }
        if (!ProfessionalState.addressLine2) {
            flag = true
            error.Professional.addressLine2 = "Please enter addressLine2!"
        }
        if (!ProfessionalState.addressLine3) {
            flag = true
            error.Professional.addressLine3 = "Please enter addressLine3!"
        }
        if (!ProfessionalState.postcode) {
            flag = true
            error.Professional.postcode = "Please enter postcode!"
        }
        if (!ProfessionalState.state) {
            flag = true
            error.Professional.state = "Please enter state!"
        }
        if (!ProfessionalState.city) {
            flag = true
            error.Professional.city = "Please enter city!"
        }
        if (!ProfessionalState.country) {
            flag = true
            error.Professional.country = "Please select country!"
        }
        if (!ProfessionalState.mobile) {
            flag = true
            error.Professional.mobile = "Please enter mobile!"
        }
        else if (ProfessionalState.mobile.length < 10) {
            flag = true
            error.Professional.mobile = "Please enter valid mobile!"
        }
        if (!ProfessionalState.telephone) {
            flag = true
            error.Professional.telephone = "Please enter telephone!"
        }
        else if (!telephoneReg.test(ProfessionalState.telephone)) {
            flag = true
            error.Professional.telephone = "Please enter valid telephone!"
        }
        if (!ProfessionalState.fax) {
            flag = true
            error.Professional.fax = "Please enter fax!"
        }
        else if (!faxReg.test(ProfessionalState.fax)) {
            flag = true
            error.Professional.fax = "Please enter valid fax!"
        }
        if (!ProfessionalState.email) {
            flag = true
            error.Professional.email = "Please enter email!"
        }
        else if (!emailReg.test(ProfessionalState.email)) {
            flag = true
            error.Professional.email = "Please enter valid email!"
        }
        setFormErrors(error);
        return flag;
    }

    const Save = async () => {
        if (validation()) {
            return;
        }
        delete sendDetailData._id
        delete ResidentialState._id
        delete ProfessionalState._id
        let final = {
            detail: sendDetailData,
            email: common?.email,
            password: common?.password,
            type: common?.type,
            addresses: [ResidentialState, ProfessionalState]
        }
        setLoading(true)
        await dispatch(entityAddAction(final))
        setLoading(false)
    }

    useEffect(() => {
        if (entityAddData && entityAddData.status === 200) {
            navigate('/entities')
            dispatch({
                type: ENTITY_ADD,
                payload: []
            })
            toast.success(entityAddData.message);
        }
    }, [entityAddData])

    const edit = async () => {
        if (validation()) {
            return;
        }
        let final = {
            detail: sendDetailData,
            email: common?.email,
            password: common?.password,
            type: common?.type,
            addresses: [ResidentialState, ProfessionalState]
        }
        setLoading(true)
        await dispatch(editEntityAction(id, final))
        setLoading(false)
    }

    useEffect(() => {
        if (editEntityData && editEntityData.status === 200) {
            navigate('/entities')
            dispatch({
                type: EDIT_ENTITY,
                payload: []
            })
            // dispatch({
            //     type: ENTITY_GET_BY_ID,
            //     payload: []
            // })
            // dispatch({
            //     type: COMPANY_DATA,
            //     payload: [],
            // });
            toast.success(editEntityData.message);
        }
    }, [editEntityData])

    return (
        <>
            <div className='add-edit-product'>
                <div className='form'>
                    <h2 className='mb-3'>Residential Address</h2>
                    <div>
                        <Row>
                            <Col lg={3}>
                                <TextField
                                    label="Flat number"
                                    variant="standard"
                                    color="warning"
                                    name='flatNumber'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.flatNumber}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.flatNumber && <span style={{ color: 'red' }}>{formErrors.Residential.flatNumber}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Address Line 1"
                                    variant="standard"
                                    color="warning"
                                    name='addressLine1'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.addressLine1}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.addressLine1 && <span style={{ color: 'red' }}>{formErrors.Residential.addressLine1}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Address Line 2"
                                    variant="standard"
                                    color="warning"
                                    name='addressLine2'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.addressLine2}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.addressLine2 && <span style={{ color: 'red' }}>{formErrors.Residential.addressLine2}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Address Line 3"
                                    variant="standard"
                                    color="warning"
                                    name='addressLine3'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.addressLine3}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.addressLine3 && <span style={{ color: 'red' }}>{formErrors.Residential.addressLine3}</span>}
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={3}>
                                <TextField
                                    label="Postcode"
                                    variant="standard"
                                    color="warning"
                                    name='postcode'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.postcode}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.postcode && <span style={{ color: 'red' }}>{formErrors.Residential.postcode}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="State/Province"
                                    variant="standard"
                                    color="warning"
                                    name='state'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.state}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.state && <span style={{ color: 'red' }}>{formErrors.Residential.state}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="City"
                                    variant="standard"
                                    color="warning"
                                    name='city'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.city}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.city && <span style={{ color: 'red' }}>{formErrors.Residential.city}</span>}
                            </Col>

                            <Col lg={3}>
                                <Autocomplete
                                    options={countryData}
                                    getOptionLabel={(option) => option.name}
                                    id="disable-clearable"
                                    label="Country"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Country" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setResidentialState({ ...ResidentialState, country: newValue._id });
                                    }}
                                    disabled={isView}
                                    disableClearable
                                    value={(countryData.length && ResidentialState?.country) ? countryData.find(item => item._id === ResidentialState.country) : {}}
                                />
                                {formErrors && formErrors?.Residential?.country && <span style={{ color: 'red' }}>{formErrors.Residential.country}</span>}
                            </Col>
                        </Row>

                        <Row className='mt-4'>
                            <Col lg={3}>
                                <TextField
                                    label="Mobile #"
                                    variant="standard"
                                    color="warning"
                                    name='mobile'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.mobile}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.mobile && <span style={{ color: 'red' }}>{formErrors.Residential.mobile}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Telephone #"
                                    variant="standard"
                                    color="warning"
                                    name='telephone'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.telephone}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.telephone && <span style={{ color: 'red' }}>{formErrors.Residential.telephone}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Fax"
                                    variant="standard"
                                    color="warning"
                                    name='fax'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.fax}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.fax && <span style={{ color: 'red' }}>{formErrors.Residential.fax}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    color="warning"
                                    name='email'
                                    onChange={handleResidentialChange}
                                    value={ResidentialState.email}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Residential?.email && <span style={{ color: 'red' }}>{formErrors.Residential.email}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            <div className='add-edit-product pt-0 pb-5'>
                <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                    <h2 className='mb-3'>Professional Address</h2>
                    <button className='footer_next_btn mb-3' onClick={() => setProfessionalState({ ...ResidentialState, type: "Professional" })}>Use Residential Address</button>

                    <div>
                        <Row>
                            <Col lg={3}>
                                <TextField
                                    label="Flat number"
                                    variant="standard"
                                    color="warning"
                                    name='flatNumber'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.flatNumber}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.flatNumber && <span style={{ color: 'red' }}>{formErrors.Professional.flatNumber}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Address Line 1"
                                    variant="standard"
                                    color="warning"
                                    name='addressLine1'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.addressLine1}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.addressLine1 && <span style={{ color: 'red' }}>{formErrors.Professional.addressLine1}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Address Line 2"
                                    variant="standard"
                                    color="warning"
                                    name='addressLine2'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.addressLine2}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.addressLine2 && <span style={{ color: 'red' }}>{formErrors.Professional.addressLine2}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Address Line 3"
                                    variant="standard"
                                    color="warning"
                                    name='addressLine3'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.addressLine3}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.addressLine3 && <span style={{ color: 'red' }}>{formErrors.Professional.addressLine3}</span>}
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={3}>
                                <TextField
                                    label="Postcode"
                                    variant="standard"
                                    color="warning"
                                    name='postcode'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.postcode}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.postcode && <span style={{ color: 'red' }}>{formErrors.Professional.postcode}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="State/Province"
                                    variant="standard"
                                    color="warning"
                                    name='state'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.state}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.state && <span style={{ color: 'red' }}>{formErrors.Professional.state}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="City"
                                    variant="standard"
                                    color="warning"
                                    name='city'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.city}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.city && <span style={{ color: 'red' }}>{formErrors.Professional.city}</span>}
                            </Col>

                            <Col lg={3}>
                                <Autocomplete
                                    options={countryData}
                                    getOptionLabel={(option) => option.name}
                                    id="disable-clearable"
                                    label="Country"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Country" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setProfessionalState({ ...ProfessionalState, country: newValue._id });
                                    }}
                                    disabled={isView}
                                    disableClearable
                                    value={(countryData.length && ProfessionalState?.country) ? countryData.find(item => item._id === ProfessionalState.country) : {}}
                                />
                                {formErrors && formErrors?.Professional?.country && <span style={{ color: 'red' }}>{formErrors.Professional.country}</span>}
                            </Col>
                        </Row>

                        <Row className='mt-4'>
                            <Col lg={3}>
                                <TextField
                                    label="Mobile #"
                                    variant="standard"
                                    color="warning"
                                    name='mobile'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.mobile}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.mobile && <span style={{ color: 'red' }}>{formErrors.Professional.mobile}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Telephone #"
                                    variant="standard"
                                    color="warning"
                                    name='telephone'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.telephone}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.telephone && <span style={{ color: 'red' }}>{formErrors.Professional.telephone}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Fax"
                                    variant="standard"
                                    color="warning"
                                    name='fax'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.fax}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.fax && <span style={{ color: 'red' }}>{formErrors.Professional.fax}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    color="warning"
                                    name='email'
                                    onChange={handleProfessionalChange}
                                    value={ProfessionalState.email}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.Professional?.email && <span style={{ color: 'red' }}>{formErrors.Professional.email}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            <div className='footer_'>
                <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { id ? edit() : Save() }} className={`footer_next_btn ${isView ? 'd-none' : 'd-block'}`}>
                    {!loading ? <>{id ? "Edit" : "Save"}</> : null}
                    {loading && <div class="d-flex justify-content-center">
                        <strong className='me-2'>Saving...</strong>
                        <div className="spinner-border spinner-border-sm mt-1" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                </button>
            </div>
        </>
    )
}

export default IndividualAddress