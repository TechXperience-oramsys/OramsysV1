import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { countrieAction } from '../../../../redux/actions/countrieAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { sectorAction } from '../../../../redux/actions/sectorAction';
import { companydataAction } from '../../../../redux/actions/companydataAction';
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from 'moment';

const Details = ({ hendelNext, entityType }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const isView = location.state[1]?.isView

    let numberReg = /^[0-9\b]+$/;
    let nigReg = /^[1-10]\d{0,10}$/
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let faxReg = /^\+?[0-9]{6,}$/;
    let telephoneReg = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    const [common, setCommon] = useState({
        email: '',
        password: '',
        type: entityType
    })

    const [details, setDetails] = useState({
        _id: '',
        name: '',
        country: '',
        registrationNumber: '',
        dateOfIncorporation: '',
        sector: '',
        subSector: '',
        mainActivity: '',
    })
    const [bilingAddress, setBilingAddress] = useState({
        _id: '',
        type: 'Biling',
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
    const [shippingAddress, setShippingAddress] = useState({
        _id: '',
        type: 'Shipping',
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
    const [countryData, setCountryData] = useState([])
    const [sector, setSector] = useState([])
    const [formErrors, setFormErrors] = useState()

    const companyData = useSelector((state) => state.companydata.companydata)
    const country = useSelector((state) => state.countryData.country)
    const sectorData = useSelector((state) => state.sectorData.sector)

    useEffect(() => {
        dispatch(countrieAction("all"))
        dispatch(sectorAction())
    }, [dispatch])

    useEffect(() => {
        if (companyData && id) {
            setCommon({
                email: companyData.email,
                password: companyData.password,
                type: companyData.type
            })
            setDetails({
                _id: companyData.detail?._id,
                name: companyData.detail?.name,
                country: companyData.detail?.country,
                registrationNumber: companyData.detail?.registrationNumber,
                dateOfIncorporation: companyData.detail?.dateOfIncorporation ? moment(companyData.detail?.dateOfIncorporation).format("YYYY-MM-DD") : '',
                sector: companyData.detail?.sector,
                subSector: companyData.detail?.subSector,
                mainActivity: companyData.detail?.mainActivity,
            })
            let tempBilingData = companyData?.addresses?.find((ele) => ele?.type === 'Biling')
            setBilingAddress({
                _id: tempBilingData?._id,
                type: tempBilingData?.type,
                flatNumber: tempBilingData?.flatNumber,
                addressLine1: tempBilingData?.addressLine1,
                addressLine2: tempBilingData?.addressLine2,
                addressLine3: tempBilingData?.addressLine3,
                postcode: tempBilingData?.postcode,
                state: tempBilingData?.state,
                city: tempBilingData?.city,
                country: tempBilingData?.country,
                mobile: tempBilingData?.mobile,
                telephone: tempBilingData?.telephone,
                fax: tempBilingData?.fax,
                email: tempBilingData?.email,
            })
            let tempShipingData = companyData?.addresses?.find((ele) => ele?.type === "Shipping")
            setShippingAddress({
                _id: tempShipingData?._id,
                type: tempShipingData?.type,
                flatNumber: tempShipingData?.flatNumber,
                addressLine1: tempShipingData?.addressLine1,
                addressLine2: tempShipingData?.addressLine2,
                addressLine3: tempShipingData?.addressLine3,
                postcode: tempShipingData?.postcode,
                state: tempShipingData?.state,
                city: tempShipingData?.city,
                country: tempShipingData?.country,
                mobile: tempShipingData?.mobile,
                telephone: tempShipingData?.telephone,
                fax: tempShipingData?.fax,
                email: tempShipingData?.email,
            })
        }
    }, [companyData])

    useEffect(() => {
        if (country && country.data) {
            setCountryData(country.data)
        }
    }, [country])

    useEffect(() => {
        if (sectorData && sectorData.data && sectorData.data.length > 0) {
            setSector(sectorData.data)
        }
    }, [sectorData])

    const handleChange = (e, name, type) => {
        if (type === 'details') {
            if (name === "name" || name === 'country' || name === 'dateOfIncorporation' || name === 'sector' || name === 'subSector' || name === 'mainActivity') {
                setDetails({ ...details, [name]: e.target.value })
            } else if (name === 'registrationNumber') {
                if (e.target.value === '' || numberReg.test(e.target.value)) {
                    setDetails({ ...details, [name]: e.target.value })
                }
            }
        }
        else if (type === 'biling') {
            if (name === "flatNumber" || name === "addressLine1" || name === "addressLine2" || name === "addressLine3" || name === "state" || name === "city" || name === "country" || name === "email") {
                setBilingAddress({ ...bilingAddress, [name]: e.target.value })
            } else if (name === "fax" || name === "postcode") {
                if (e.target.value === '' || numberReg.test(e.target.value)) {
                    setBilingAddress({ ...bilingAddress, [name]: e.target.value })
                }
            } else if(name === "mobile" || name === "telephone" ) {
                if (e.target.value === '' || nigReg.test(e.target.value)) {
                    setBilingAddress({ ...bilingAddress, [name]: e.target.value })
                }
            }
        }
        else if (type === 'shipping') {
            if (name === "flatNumber" || name === "addressLine1" || name === "addressLine2" || name === "addressLine3" || name === "state" || name === "city" || name === "country" || name === "email") {
                setShippingAddress({ ...shippingAddress, [name]: e.target.value })
            } else if (name === "postcode" || name === "fax") {
                if (e.target.value === '' || numberReg.test(e.target.value)) {
                    setShippingAddress({ ...shippingAddress, [name]: e.target.value })
                }
            }
            else if(name === "mobile" || name === "telephone" ) {
                if (e.target.value === '' || nigReg.test(e.target.value)) {
                    setBilingAddress({ ...bilingAddress, [name]: e.target.value })
                }
            }
        }
    }

    const validation = () => {
        let flag = false
        const error = {
            Biling: {},
            Shipping: {},
        };
        if (!common.email) {
            error.email = "Please enter email!"
            flag = true
        }
        else if (!emailReg.test(common.email)) {
            error.email = "Please enter valid email!"
            flag = true
        }
        if (!common.password) {
            error.password = "Please enter password!"
            flag = true
        }
        else if (common.password.length < 8) {
            error.password = "Please enter minimun 8 character password!"
            flag = true
        }
        if (!details.name) {
            error.name = "Please enter name!"
            flag = true
        }
        if (!details.country) {
            error.country = "Please select country!"
            flag = true
        }
        if (!details.registrationNumber) {
            error.registrationNumber = "Please enter registration number!"
            flag = true
        }
        else if (details.registrationNumber.length < 10) {
            error.registrationNumber = "Valid registration number should be up to 10 digits!"
            flag = true
        }
        if (!details.dateOfIncorporation) {
            error.dateOfIncorporation = "Please select date of incorporation!"
            flag = true
        }
        if (!details.sector) {
            error.sector = "Please select sector!"
            flag = true
        }
        if (!details.subSector) {
            error.subSector = "Please enter subSector!"
            flag = true
        }
        if (!details.mainActivity) {
            error.mainActivity = "Please enter mainActivity!"
            flag = true
        }
        if (!bilingAddress.flatNumber) {
            error[bilingAddress.type].flatNumber = "Please enter flat number!"
            flag = true
        }
        if (!bilingAddress.addressLine1) {
            error[bilingAddress.type].addressLine1 = "Please enter addressLine1!"
            flag = true
        }
        // if (!bilingAddress.addressLine2) {
        //     error[bilingAddress.type].addressLine2 = "Please enter addressLine2!"
        //     flag = true
        // }
        // if (!bilingAddress.addressLine3) {
        //     error[bilingAddress.type].addressLine3 = "Please enter addressLine3!"
        //     flag = true
        // }
        if (!bilingAddress.postcode) {
            error[bilingAddress.type].postcode = "Please enter postcode!"
            flag = true
        }
        if (!bilingAddress.state) {
            error[bilingAddress.type].state = "Please enter state!"
            flag = true
        }
        if (!bilingAddress.city) {
            error[bilingAddress.type].city = "Please enter city!"
            flag = true
        }
        if (!bilingAddress.country) {
            error[bilingAddress.type].country = "Please select country!"
            flag = true
        }
        if (!bilingAddress.mobile) {
            error[bilingAddress.type].mobile = "Please enter mobile!"
            flag = true
        }
        else if (bilingAddress.mobile.length < 10) {
            error[bilingAddress.type].mobile = "Please enter valid mobile!"
            flag = true
        }
        if (!bilingAddress.telephone) {
            error[bilingAddress.type].telephone = "Please enter telephone!"
            flag = true
        }
        else if (!telephoneReg.test(bilingAddress.telephone)) {
            error[bilingAddress.type].telephone = "Please enter valid telephone!"
            flag = true
        }
        if (!bilingAddress.fax) {
            error[bilingAddress.type].fax = "Please enter fax!"
            flag = true
        }
        else if (!faxReg.test(bilingAddress.fax)) {
            error[bilingAddress.type].fax = "Please enter valid fax!"
            flag = true
        }
        if (!bilingAddress.email) {
            error[bilingAddress.type].email = "Please enter email!"
            flag = true
        }
        else if (!emailReg.test(bilingAddress.email)) {
            error[bilingAddress.type].email = "Please enter valid email!"
            flag = true
        }
        if (!shippingAddress?.flatNumber) {
            error[shippingAddress.type].flatNumber = "Please enter flat number!"
            flag = true
        }
        if (!shippingAddress.addressLine1) {
            error[shippingAddress.type].addressLine1 = "Please enter addressLine1!"
            flag = true
        }
        // if (!shippingAddress.addressLine2) {
        //     error[shippingAddress.type].addressLine2 = "Please enter addressLine2!"
        //     flag = true
        // }
        // if (!shippingAddress.addressLine3) {
        //     error[shippingAddress.type].addressLine3 = "Please enter addressLine3!"
        //     flag = true
        // }
        if (!shippingAddress.postcode) {
            error[shippingAddress.type].postcode = "Please enter postcode!"
            flag = true
        }
        if (!shippingAddress.state) {
            error[shippingAddress.type].state = "Please enter state!"
            flag = true
        }
        if (!shippingAddress.city) {
            error[shippingAddress.type].city = "Please enter city!"
            flag = true
        }
        if (!shippingAddress.country) {
            error[shippingAddress.type].country = "Please select country!"
            flag = true
        }
        if (!shippingAddress.mobile) {
            error[shippingAddress.type].mobile = "Please enter mobile!"
            flag = true
        }
        else if (shippingAddress.mobile.length < 10) {
            error[shippingAddress.type].mobile = "Please enter valid mobile!"
            flag = true
        }
        if (!shippingAddress.telephone) {
            error[shippingAddress.type].telephone = "Please enter telephone!"
            flag = true
        }
        else if (!telephoneReg.test(shippingAddress.telephone)) {
            error[shippingAddress.type].telephone = "Please enter valid telephone!"
            flag = true
        }
        if (!shippingAddress.fax) {
            error[shippingAddress.type].fax = "Please enter fax!"
            flag = true
        }
        else if (!faxReg.test(shippingAddress.fax)) {
            error[shippingAddress.type].fax = "Please enter valid fax!"
            flag = true
        }
        if (!shippingAddress.email) {
            error[shippingAddress.type].email = "Please enter email!"
            flag = true
        }
        else if (!emailReg.test(shippingAddress.email)) {
            error[shippingAddress.type].email = "Please enter valid email!"
            flag = true
        }
        setFormErrors(error);
        return flag
    }

    const next = () => {
        if (validation()) {
            return;
        }
        let body = {
            ...companyData,
            email: common.email,
            password: common.password,
            type: entityType,
            detail: details,
            addresses: [bilingAddress, shippingAddress],
        }
        dispatch(companydataAction(body))
        hendelNext()
    }
    // const [checked, setChecked] = useState(false);

    return (
        <>
            <div className='add-edit-product'>
                <h1 className=''>Entity</h1>
                <div className='form'>
                    <h2 className='mb-3'>Details</h2>
                    <div>
                        <Row className='mb-3'>
                            <Col lg={6}>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    color="warning"
                                    value={common.email}
                                    name='email'
                                    onChange={(e) => setCommon({ ...common, email: e.target.value })}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                            </Col>
                            <Col lg={6}>
                                <TextField
                                    type="password"
                                    label="Password"
                                    variant="standard"
                                    color="warning"
                                    value={common.password}
                                    name='password'
                                    onChange={(e) => setCommon({ ...common, password: e.target.value })}
                                    // disabled={id}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                            </Col>
                        </Row>
                        <Row>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Name"
                                    variant="standard"
                                    color="warning"
                                    value={details.name}
                                    onChange={(e) => handleChange(e, 'name', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
                            </Col>
                            {/* <Col xxl={3} xl={4} lg={6} md={4} sm={6}>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    color="warning"
                                    value={common.email}
                                    name='email'
                                    onChange={(e) => setCommon({ ...common, email: e.target.value })}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                            </Col> */}
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <Autocomplete
                                    label="Country"
                                    id="disable-clearable"
                                    onChange={(e, newVal) => setDetails({ ...details, country: newVal._id })}
                                    getOptionLabel={(option) => option.name}
                                    options={countryData}
                                    disableClearable
                                    value={(countryData.length && details.country) ? countryData.find(item => item._id === details?.country) : {}}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Country" variant="standard" />
                                    )}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.country && <span style={{ color: 'red' }}>{formErrors.country}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Registration number"
                                    variant="standard"
                                    color="warning"
                                    value={details.registrationNumber}
                                    onChange={(e) => handleChange(e, 'registrationNumber', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.registrationNumber && <span style={{ color: 'red' }}>{formErrors.registrationNumber}</span>}
                            </Col>
                           
                        </Row>
                        <Row className='mt-4'>
                        <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <form className="" noValidate>
                                    <TextField
                                        id="date"
                                        label="Date of incorporation"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={details.dateOfIncorporation}
                                        onChange={(e) => handleChange(e, 'dateOfIncorporation', 'details')}
                                        disabled={isView}
                                    />
                                </form>
                                {formErrors && formErrors?.dateOfIncorporation && <span style={{ color: 'red' }}>{formErrors.dateOfIncorporation}</span>}
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <Autocomplete
                                    label="Sector"
                                    id="disable-clearable"
                                    onChange={(e, newVal) => setDetails({ ...details, sector: newVal._id })}
                                    getOptionLabel={(option) => option.name}
                                    options={sector}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField {...params} label="Sector" variant="standard" />
                                    )}
                                    value={(sector.length && details.sector) ? sector.find(item => item._id === details?.sector) : {}}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.sector && <span style={{ color: 'red' }}>{formErrors.sector}</span>}
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Sub sector"
                                    variant="standard"
                                    color="warning"
                                    value={details.subSector}
                                    onChange={(e) => handleChange(e, 'subSector', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.subSector && <span style={{ color: 'red' }}>{formErrors.subSector}</span>}
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Main activity"
                                    variant="standard"
                                    color="warning"
                                    value={details.mainActivity}
                                    onChange={(e) => handleChange(e, 'mainActivity', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.mainActivity && <span style={{ color: 'red' }}>{formErrors.mainActivity}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className='add-edit-product pt-0 pb-0'>
                <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                    <h2 className='mb-3'>Billing address</h2>
                    <div>
                        <Row>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Flat number"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress?.flatNumber}
                                    onChange={(e) => handleChange(e, 'flatNumber', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.flatNumber && <span style={{ color: 'red' }}>{formErrors.Biling.flatNumber}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Line 1"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.addressLine1}
                                    onChange={(e) => handleChange(e, 'addressLine1', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.addressLine1 && <span style={{ color: 'red' }}>{formErrors.Biling.addressLine1}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Line 2"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.addressLine2}
                                    onChange={(e) => handleChange(e, 'addressLine2', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.addressLine2 && <span style={{ color: 'red' }}>{formErrors.Biling.addressLine2}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Line 3"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.addressLine3}
                                    onChange={(e) => handleChange(e, 'addressLine3', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.addressLine3 && <span style={{ color: 'red' }}>{formErrors.Biling.addressLine3}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Postcode"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.postcode}
                                    onChange={(e) => handleChange(e, 'postcode', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.postcode && <span style={{ color: 'red' }}>{formErrors.Biling.postcode}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="State/Province"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.state}
                                    onChange={(e) => handleChange(e, 'state', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.state && <span style={{ color: 'red' }}>{formErrors.Biling.state}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="City"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.city}
                                    onChange={(e) => handleChange(e, 'city', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.city && <span style={{ color: 'red' }}>{formErrors.Biling.city}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <Autocomplete
                                    label="Country"
                                    id="disable-clearable"
                                    onChange={(e, newVal) => setBilingAddress({ ...bilingAddress, country: newVal._id })}
                                    getOptionLabel={(option) => option.name}
                                    options={countryData}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField {...params} label="Country" variant="standard" />
                                    )}
                                    value={(countryData.length && bilingAddress.country) ? countryData.find(item => item._id === bilingAddress?.country) : {}}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.country && <span style={{ color: 'red' }}>{formErrors.Biling.country}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Mobile #"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.mobile}
                                    onChange={(e) => handleChange(e, 'mobile', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.mobile && <span style={{ color: 'red' }}>{formErrors.Biling.mobile}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Telephone #"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.telephone}
                                    onChange={(e) => handleChange(e, 'telephone', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.telephone && <span style={{ color: 'red' }}>{formErrors.Biling.telephone}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Fax"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.fax}
                                    onChange={(e) => handleChange(e, 'fax', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.fax && <span style={{ color: 'red' }}>{formErrors.Biling.fax}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Billing Address Email"
                                    variant="standard"
                                    color="warning"
                                    value={bilingAddress.email}
                                    onChange={(e) => handleChange(e, 'email', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.email && <span style={{ color: 'red' }}>{formErrors.Biling.email}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className='add-edit-product'>
                <div className='form'>
                    <h2 className='mb-3'>Shipping address</h2> 
                    <button className='footer_next_btn mb-3' onClick={()=> setShippingAddress({...bilingAddress, type: "Shipping"})}>Use Billing Address</button>
                    <div>
                        <Row>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Flat number"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress?.flatNumber}
                                    onChange={(e) => handleChange(e, 'flatNumber', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.flatNumber && <span style={{ color: 'red' }}>{formErrors.Shipping.flatNumber}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Line 1"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.addressLine1}
                                    onChange={(e) => handleChange(e, 'addressLine1', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.addressLine1 && <span style={{ color: 'red' }}>{formErrors.Shipping.addressLine1}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Line 2"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.addressLine2}
                                    onChange={(e) => handleChange(e, 'addressLine2', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.addressLine2 && <span style={{ color: 'red' }}>{formErrors.Shipping.addressLine2}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Line 3"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.addressLine3}
                                    onChange={(e) => handleChange(e, 'addressLine3', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.addressLine3 && <span style={{ color: 'red' }}>{formErrors.Shipping.addressLine3}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Postcode"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.postcode}
                                    onChange={(e) => handleChange(e, 'postcode', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.postcode && <span style={{ color: 'red' }}>{formErrors.Shipping.postcode}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="State/Province"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.state}
                                    onChange={(e) => handleChange(e, 'state', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.state && <span style={{ color: 'red' }}>{formErrors.Shipping.state}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="City"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.city}
                                    onChange={(e) => handleChange(e, 'city', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.city && <span style={{ color: 'red' }}>{formErrors.Shipping.city}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <Autocomplete
                                    label="Country"
                                    id="disable-clearable"
                                    onChange={(e, newVal) => setShippingAddress({ ...shippingAddress, country: newVal._id })}
                                    getOptionLabel={(option) => option.name}
                                    options={countryData}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField {...params} label="Country" variant="standard" />
                                    )}
                                    value={(countryData.length && shippingAddress.country) ? countryData.find(item => item._id === shippingAddress?.country) : {}}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.country && <span style={{ color: 'red' }}>{formErrors.Shipping.country}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Mobile #"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.mobile}
                                    onChange={(e) => handleChange(e, 'mobile', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.mobile && <span style={{ color: 'red' }}>{formErrors.Shipping.mobile}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Telephone #"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.telephone}
                                    onChange={(e) => handleChange(e, 'telephone', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.telephone && <span style={{ color: 'red' }}>{formErrors.Shipping.telephone}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Fax"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.fax}
                                    onChange={(e) => handleChange(e, 'fax', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.fax && <span style={{ color: 'red' }}>{formErrors.Shipping.fax}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    color="warning"
                                    value={shippingAddress.email}
                                    onChange={(e) => handleChange(e, 'email', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.email && <span style={{ color: 'red' }}>{formErrors.Shipping.email}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => navigate('/entities')} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { next() }} className='footer_next_btn'> Next</button>
            </div>
        </>
    )
}

export default Details