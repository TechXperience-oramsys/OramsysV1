import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, DropdownButton, InputGroup, Dropdown, OverlayTrigger, Tooltip, FormControl } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { countrieAction } from '../../../../redux/actions/countrieAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { sectorAction } from '../../../../redux/actions/sectorAction';
import { companydataAction } from '../../../../redux/actions/companydataAction';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { OptionalSpan, RequiredSpan } from '../../../transactions/Helpers/OptionalTags';
import moment from 'moment';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import Select from 'react-select';
import { billingAddressAtom, countryDataAtom, detailsAtom, sectorAtom, shippingAddressAtom } from '../../../transactions/Helpers/atoms';
import { useAtom } from 'jotai';

const Details = ({ handleNext, entityType }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const isView = location.state[1]?.isView

    let numberReg = /^[0-9\b]+$/;
    let nigReg = /^[0-9]+$/
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let faxReg = /^\+?[0-9]{6,}$/;
    let telephoneReg = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    // const [billingCountryCode, setBillingCountryCode] = useState('+234');
    // const [shippingCountryCode, setShippingCountryCode] = useState('+234');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [common, setCommon] = useState({
        email: '',
        password: '',
        type: entityType
    })

    const [details, setDetails] = useAtom(detailsAtom)
    const [bilingAddress, setBilingAddress] = useAtom(billingAddressAtom)
    const [shippingAddress, setShippingAddress] = useAtom(shippingAddressAtom)
    const [countryData, setCountryData] = useAtom(countryDataAtom)
    const [sector, setSector] = useAtom(sectorAtom)
    const [formErrors, setFormErrors] = useState()

    const companyData = useSelector((state) => state.companydata.companydata)
    const entityData = useSelector(state => state.entityData.entity)
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
                // password: companyData.password,
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
                type: tempBilingData?.type || 'Biling',
                flatNumber: tempBilingData?.flatNumber,
                addressLine1: tempBilingData?.addressLine1,
                addressLine2: tempBilingData?.addressLine2,
                addressLine3: tempBilingData?.addressLine3,
                billingCountryCode: tempBilingData?.billingCountryCode,
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
                type: tempShipingData?.type || 'Shipping',
                flatNumber: tempShipingData?.flatNumber,
                addressLine1: tempShipingData?.addressLine1,
                addressLine2: tempShipingData?.addressLine2,
                addressLine3: tempShipingData?.addressLine3,
                postcode: tempShipingData?.postcode,
                state: tempShipingData?.state,
                shippingCountryCode: tempShipingData?.shippingCountryCode,
                city: tempShipingData?.city,
                country: tempShipingData?.country,
                mobile: tempShipingData?.mobile,
                telephone: tempShipingData?.telephone,
                fax: tempShipingData?.fax,
                email: tempShipingData?.email,
            })
            console.log('country code', companyData)
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
            if (name === "name" || name === 'email' || name === 'country' || name === 'dateOfIncorporation' || name === 'sector' || name === 'subSector' || name === 'mainActivity') {
                setDetails({ ...details, [name]: e.target.value })
            } else if (name === 'registrationNumber') {
                if (e.target.value === '' || numberReg.test(e.target.value)) {
                    setDetails({ ...details, [name]: e.target.value })
                }
            }
        }
        else if (type === 'common') {
            if (name === "email") {
                setCommon({ ...common, [name]: e.target.value })
            }
        }
        else if (type === 'biling') {
            if (name === "flatNumber" || name === "addressLine1" || name === "addressLine2" || name === "addressLine3" || name === "billingCountryCode" || name === "state" || name === "city" || name === "country" || name === "email") {
                setBilingAddress({ ...bilingAddress, [name]: e.target.value })
            } else if (name === "fax" || name === "postcode") {
                if (e.target.value === '' || numberReg.test(e.target.value)) {
                    setBilingAddress({ ...bilingAddress, [name]: e.target.value })
                }
            } else if (name === "mobile" || name === "telephone") {
                if (e.target.value === '' || nigReg.test(e.target.value)) {
                    setBilingAddress({ ...bilingAddress, [name]: e.target.value })
                }
            }
        }
        else if (type === 'shipping') {
            if (name === "flatNumber" || name === "addressLine1" || name === "addressLine2" || name === "shippingCountryCode" || name === "addressLine3" || name === "state" || name === "city" || name === "country" || name === "email") {
                setShippingAddress({ ...shippingAddress, [name]: e.target.value })
            } else if (name === "postcode" || name === "fax") {
                if (e.target.value === '' || numberReg.test(e.target.value)) {
                    setShippingAddress({ ...shippingAddress, [name]: e.target.value })
                }
            }
            else if (name === "mobile" || name === "telephone") {
                if (e.target.value === '' || nigReg.test(e.target.value)) {
                    setShippingAddress({ ...shippingAddress, [name]: e.target.value })
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
        // if (!common.password) {
        //     error.password = "Please enter password!"
        //     flag = true
        // }
        // else if (common.password.length < 8) {
        //     error.password = "Please enter minimun 8 character password!"
        //     flag = true
        // }
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
        // else if (details.registrationNumber.length < 10) {
        //     error.registrationNumber = "Valid registration number should be up to 10 digits!"
        //     flag = true
        // }
        if (!details.dateOfIncorporation) {
            error.dateOfIncorporation = "Please select date of incorporation!"
            flag = true
        }
        if (!details.sector) {
            error.sector = "Please select sector!"
            flag = true
        }
        // if (!details.subSector) {
        //     error.subSector = "Please enter subSector!"
        //     flag = true
        // }
        // if (!details.mainActivity) {
        //     error.mainActivity = "Please enter mainActivity!"
        //     flag = true
        // }

        console.log('Company data', companyData.addresses, error)
        console.log('Company data', bilingAddress.type)

        if (!bilingAddress?.flatNumber) {
            error.Biling.flatNumber = "Please enter flat number!"
            flag = true
        }
        if (!bilingAddress?.addressLine1) {
            error.Biling.addressLine1 = "Please enter addressLine1!"
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
        // if (!bilingAddress.postcode) {
        //     error.Biling.postcode = "Please enter postcode!"
        //     flag = true
        // }
        if (!bilingAddress.state) {
            error.Biling.state = "Please enter state!"
            flag = true
        }
        if (!bilingAddress.city) {
            error.Biling.city = "Please enter city!"
            flag = true
        }
        if (!bilingAddress.country) {
            error.Biling.country = "Please select country!"
            flag = true
        }
        if (!bilingAddress.mobile) {
            error.Biling.mobile = "Please enter mobile!"
            flag = true
        }
        else if (bilingAddress.mobile.length < 10) {
            error.Biling.mobile = "Please enter valid mobile!"
            flag = true
        }
        // if (!bilingAddress.telephone) {
        //     error[bilingAddress.type].telephone = "Please enter telephone!"
        //     flag = true
        // }
        // else if (!telephoneReg.test(bilingAddress.telephone)) {
        //     error[bilingAddress.type].telephone = "Please enter valid telephone!"
        //     flag = true
        // }
        // if (!bilingAddress.fax) {
        //     error[bilingAddress.type].fax = "Please enter fax!"
        //     flag = true
        // }
        // else if (!faxReg.test(bilingAddress.fax)) {
        //     error[bilingAddress.type].fax = "Please enter valid fax!"
        //     flag = true
        // }
        if (!bilingAddress.email) {
            error.Biling.email = "Please enter email!"
            flag = true
        }
        else if (!emailReg.test(bilingAddress.email)) {
            error.Biling.email = "Please enter valid email!"
            flag = true
        }
        if (!shippingAddress?.flatNumber) {
            error.Shipping.flatNumber = "Please enter flat number!"
            flag = true
        }
        if (!shippingAddress?.addressLine1) {
            error.Shipping.addressLine1 = "Please enter addressLine1!"
            flag = true
        }
        // if (!shippingAddress.addressLine2) {
        //     error.Shipping.addressLine2 = "Please enter addressLine2!"
        //     flag = true
        // }
        // if (!shippingAddress.addressLine3) {
        //     error.Shipping.addressLine3 = "Please enter addressLine3!"
        //     flag = true
        // }
        // if (!shippingAddress.postcode) {
        //     error.Shipping.postcode = "Please enter postcode!"
        //     flag = true
        // }
        if (!shippingAddress.state) {
            error.Shipping.state = "Please enter state!"
            flag = true
        }
        if (!shippingAddress.city) {
            error.Shipping.city = "Please enter city!"
            flag = true
        }
        if (!shippingAddress.country) {
            error.Shipping.country = "Please select country!"
            flag = true
        }
        if (!shippingAddress.mobile) {
            error.Shipping.mobile = "Please enter mobile!"
            flag = true
        }
        else if (shippingAddress.mobile.length < 10) {
            error.Shipping.mobile = "Please enter valid mobile!"
            flag = true
        }
        // if (!shippingAddress.telephone) {
        //     error.Shipping.telephone = "Please enter telephone!"
        //     flag = true
        // }
        // else if (!telephoneReg.test(shippingAddress.telephone)) {
        //     error.Shipping.telephone = "Please enter valid telephone!"
        //     flag = true
        // }
        // if (!shippingAddress.fax) {
        //     error.Shipping.fax = "Please enter fax!"
        //     flag = true
        // }
        // else if (!faxReg.test(shippingAddress.fax)) {
        //     error.Shipping.fax = "Please enter valid fax!"
        //     flag = true
        // }
        if (!shippingAddress.email) {
            error.Shipping.email = "Please enter email!"
            flag = true
        }
        else if (!emailReg.test(shippingAddress.email)) {
            error.Shipping.email = "Please enter valid email!"
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
            // password: common.password,
            type: entityType,
            detail: details,
            addresses: [bilingAddress, shippingAddress],
        }
        // return console.log('return body', body)
        dispatch(companydataAction(body))
        handleNext()
    }
    // const [checked, setChecked] = useState(false);

    // const countryCodes = [
    //     { name: 'Nigeria', code: '+234' },
    //     { name: 'United States', code: '+1' },
    //     { name: 'United Kingdom', code: '+44' },
    //     { name: 'Canada', code: '+1' },
    //     { name: 'Australia', code: '+61' },
    //     { name: 'India', code: '+91' },
    //     { name: 'Germany', code: '+49' },
    //     { name: 'France', code: '+33' },
    //     { name: 'Italy', code: '+39' },
    //     { name: 'Spain', code: '+34' },
    //     { name: 'China', code: '+86' },
    //     { name: 'Japan', code: '+81' },
    //     { name: 'South Korea', code: '+82' },
    //     { name: 'Brazil', code: '+55' },
    //     { name: 'Mexico', code: '+52' },
    //     { name: 'Russia', code: '+7' },
    //     { name: 'South Africa', code: '+27' },
    //     { name: 'Egypt', code: '+20' },
    //     { name: 'Turkey', code: '+90' },
    //     { name: 'Argentina', code: '+54' }
    // ];
    const [searchTerm, setSearchTerm] = useState('');

    const countryCodes = [
        { name: 'Algeria', code: '+213' },
        { name: 'Angola', code: '+244' },
        { name: 'Benin', code: '+229' },
        { name: 'Botswana', code: '+267' },
        { name: 'Burkina Faso', code: '+226' },
        { name: 'Burundi', code: '+257' },
        { name: 'Cabo Verde', code: '+238' },
        { name: 'Cameroon', code: '+237' },
        { name: 'Central African Republic', code: '+236' },
        { name: 'Chad', code: '+235' },
        { name: 'Comoros', code: '+269' },
        { name: 'Congo (Brazzaville)', code: '+242' },
        { name: 'Congo (Kinshasa)', code: '+243' },
        { name: 'Djibouti', code: '+253' },
        { name: 'Egypt', code: '+20' },
        { name: 'Equatorial Guinea', code: '+240' },
        { name: 'Eritrea', code: '+291' },
        { name: 'Eswatini', code: '+268' },
        { name: 'Ethiopia', code: '+251' },
        { name: 'Gabon', code: '+241' },
        { name: 'Gambia', code: '+220' },
        { name: 'Ghana', code: '+233' },
        { name: 'Guinea', code: '+224' },
        { name: 'Guinea-Bissau', code: '+245' },
        { name: 'Ivory Coast', code: '+225' },
        { name: 'Kenya', code: '+254' },
        { name: 'Lesotho', code: '+266' },
        { name: 'Liberia', code: '+231' },
        { name: 'Libya', code: '+218' },
        { name: 'Madagascar', code: '+261' },
        { name: 'Malawi', code: '+265' },
        { name: 'Mali', code: '+223' },
        { name: 'Mauritania', code: '+222' },
        { name: 'Mauritius', code: '+230' },
        { name: 'Morocco', code: '+212' },
        { name: 'Mozambique', code: '+258' },
        { name: 'Namibia', code: '+264' },
        { name: 'Niger', code: '+227' },
        { name: 'Nigeria', code: '+234' },
        { name: 'Rwanda', code: '+250' },
        { name: 'Sao Tome and Principe', code: '+239' },
        { name: 'Senegal', code: '+221' },
        { name: 'Seychelles', code: '+248' },
        { name: 'Sierra Leone', code: '+232' },
        { name: 'Somalia', code: '+252' },
        { name: 'South Africa', code: '+27' },
        { name: 'South Sudan', code: '+211' },
        { name: 'Sudan', code: '+249' },
        { name: 'Tanzania', code: '+255' },
        { name: 'Togo', code: '+228' },
        { name: 'Tunisia', code: '+216' },
        { name: 'Uganda', code: '+256' },
        { name: 'Zambia', code: '+260' },
        { name: 'Zimbabwe', code: '+263' }
    ];

    const filteredCountries = countryCodes.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // const handleCountryCodeChange = (countryCode, type) => {
    //     if (type === 'biling') {
    //         setBilingAddress((prevState) => ({
    //             ...prevState,
    //             billingCountryCode: countryCode,
    //         }));
    //     } else if (type === 'shipping') {
    //         setShippingAddress((prevState) => ({
    //             ...prevState,
    //             shippingCountryCode: countryCode,
    //         }));
    //     }
    // };



    return (
        <>
            <div className='add-edit-product'>
                <div className='form'>
                    <h4 className='fw-bold fs-5 mb-3 title-admin'>Details</h4>
                    <div>
                        <Row>
                            <Form.Group as={Col} controlId="formGridZip">
                                <div >
                                    <Form.Label className="mb-0">
                                        Corporation Name 
                                        <RequiredSpan />
                                    </Form.Label>

                                </div>
                                <Form.Control
                                    className="no-border"
                                    value={details.name}
                                    onChange={(e) => handleChange(e, 'name', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Email <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={common.email}
                                    name='email'
                                    onChange={(e) => handleChange(e, 'email', 'common')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Country <RequiredSpan /></Form.Label>
                                <Select
                                    className='no-border'
                                    onChange={(selectedOption) => {
                                        const selectedValue = selectedOption ? selectedOption.value : '';
                                        setDetails({ ...details, country: selectedValue });
                                    }}
                                    options={countryData.map(country => ({ value: country._id, label: country.name }))}
                                    isDisabled={isView} // Replace with your condition for disabling
                                    value={countryData.map(country => ({
                                        value: country._id, label: country.name
                                    })).find(option => option.value === details?.country)}
                                    placeholder="Choose..."
                                />
                                {formErrors && formErrors.country && <span style={{ color: 'red' }}>{formErrors.country}</span>}
                            </Form.Group>

                            {/* <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Country <RequiredSpan /></Form.Label>
                                <Form.Select className='no-border'
                                    onChange={(e, newVal) => setDetails({ ...details, country: e.target.value })}
                                    disabled={isView}
                                    value={details?.country}>
                                    <option value="" disabled selected>Choose...</option>
                                    {countryData.map((item) => (
                                        <option value={item._id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                                {formErrors && formErrors?.country && <span style={{ color: 'red' }}>{formErrors.country}</span>}
                            </Form.Group> */}
                        </Row>

                        <Row className='mt-4'>

                            <Form.Group as={Col} controlId="formGridZip">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Form.Label>Registration Number <RequiredSpan /></Form.Label>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="tooltip-top">This field requires your corporation registration number</Tooltip>}
                                    >
                                        <span className="ml-2">
                                            <i className="bi bi-info-circle" style={{ cursor: 'pointer' }}></i>
                                        </span>
                                    </OverlayTrigger>
                                </div>
                                <Form.Control className='no-border'
                                    value={details.registrationNumber}
                                    onChange={(e) => handleChange(e, 'registrationNumber', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.registrationNumber && <span style={{ color: 'red' }}>{formErrors.registrationNumber}</span>}
                            </Form.Group>

                            {/* <Form.Group className='position-relative' as={Col} controlId="formGridZip">
                                <Form.Label>Password <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={common.password}
                                    name='password'
                                    onChange={(e) => setCommon({ ...common, password: e.target.value })}
                                    disabled={isView}
                                />
                                <span className="position-absolute end-0 top-50 text-lg translate-middle-y me-3 cursor-pointer"
                                    onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </span>
                                {formErrors && formErrors?.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                            </Form.Group> */}

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Date of incorporation <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    type="date"
                                    name="dateOfIncorporation"
                                    placeholder="DD/MM/YYYY"
                                    value={details.dateOfIncorporation}
                                    onChange={(e) => handleChange(e, 'dateOfIncorporation', 'details')}
                                    disabled={isView}
                                    required
                                />
                                {formErrors && formErrors?.dateOfIncorporation && <span style={{ color: 'red' }}>{formErrors.dateOfIncorporation}</span>}
                            </Form.Group>
                        </Row>

                        <Row className='mt-4'>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Sector <RequiredSpan /></Form.Label>
                                <Form.Select className='no-border'
                                    onChange={(e, newVal) => setDetails({ ...details, sector: e.target.value })}
                                    disabled={isView}
                                    disableClearable
                                    value={(sector.length && details.sector) ? sector.find(item => item._id === details?.sector) : {}}
                                >
                                    <option value="" disabled selected>Choose...</option>
                                    {sector.map((item) => (
                                        <option value={item}>{item.name}</option>
                                    ))}

                                </Form.Select>
                                {formErrors && formErrors?.sector && <span style={{ color: 'red' }}>{formErrors.sector}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Sub sector <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    name='email'
                                    value={details.subSector}
                                    onChange={(e) => handleChange(e, 'subSector', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.subSector && <span style={{ color: 'red' }}>{formErrors.subSector}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Main activity <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={details.mainActivity}
                                    onChange={(e) => handleChange(e, 'mainActivity', 'details')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.mainActivity && <span style={{ color: 'red' }}>{formErrors.mainActivity}</span>}
                            </Form.Group>
                        </Row>
                    </div>
                </div>
            </div>


            {/* <div className='add-edit-product'>
                <h1 className=''>Entity</h1>
                <div className='form'>
                    <h2 className='mb-3'>Details</h2>
                    <div>
                        <Row>

                            <Col xxl={3} xl={4} lg={6} md={4} sm={6}>
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


                        </Row>

                    </div>
                </div>
            </div> */}


            <div className='add-edit-product'>
                <div className='form'>
                    <h4 className='fw-bold fs-5 mb-3 title-admin'>Registered Address</h4>
                    <div>
                        <Row>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>House/Building Number <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress?.flatNumber}
                                    onChange={(e) => handleChange(e, 'flatNumber', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.flatNumber && <span style={{ color: 'red' }}>{formErrors.Biling.flatNumber}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Address Line 1 {" "} <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress?.addressLine1}
                                    onChange={(e) => handleChange(e, 'addressLine1', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.addressLine1 && <span style={{ color: 'red' }}>{formErrors.Biling.addressLine1}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Address Line 2 {" "} <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.addressLine2}
                                    onChange={(e) => handleChange(e, 'addressLine2', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.addressLine2 && <span style={{ color: 'red' }}>{formErrors.Biling.addressLine2}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Address Line 3 {" "} <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.addressLine3}
                                    onChange={(e) => handleChange(e, 'addressLine3', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.addressLine3 && <span style={{ color: 'red' }}>{formErrors.Biling.addressLine3}</span>}
                            </Form.Group>
                        </Row>

                        <Row className='mt-4'>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Postcode{" "} <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.postcode}
                                    onChange={(e) => handleChange(e, 'postcode', 'biling')}
                                    disabled={isView}
                                />
                                {/* {formErrors && formErrors.Biling?.postcode && <span style={{ color: 'red' }}>{formErrors.Biling.postcode}</span>} */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>State/Province <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.state}
                                    onChange={(e) => handleChange(e, 'state', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.state && <span style={{ color: 'red' }}>{formErrors.Biling.state}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>City <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.city}
                                    onChange={(e) => handleChange(e, 'city', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.city && <span style={{ color: 'red' }}>{formErrors.Biling.city}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Country <RequiredSpan /></Form.Label>
                                <Select
                                    className='no-border'
                                    onChange={(selectedOption) => {
                                        const selectedValue = selectedOption ? selectedOption.value : '';
                                        setBilingAddress({ ...bilingAddress, country: selectedValue });
                                    }}
                                    options={countryData.map(country => ({ value: country._id, label: country.name }))}
                                    isDisabled={isView} // Replace with your condition for disabling
                                    value={countryData.map(country => ({
                                        value: country._id, label: country.name
                                    })).find(option => option.value === bilingAddress.country)}
                                    placeholder="Choose..."
                                />
                                {formErrors && formErrors.Biling?.country && <span style={{ color: 'red' }}>{formErrors.Biling.country}</span>}
                            </Form.Group>
                        </Row>

                        <Row className='mt-4'>
                            {/* <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Phone 1 <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.mobile}
                                    onChange={(e) => handleChange(e, 'mobile', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.mobile && <span style={{ color: 'red' }}>{formErrors.Biling.mobile}</span>}
                            </Form.Group> */}

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Phone 1 <RequiredSpan /></Form.Label>
                                <InputGroup>
                                    <DropdownButton variant="outline-secondary" title={bilingAddress.billingCountryCode} id="input-group-dropdown-1">
                                        <FormControl
                                            autoFocus
                                            placeholder="Search Country..."
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            value={searchTerm}
                                        />
                                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {filteredCountries.map((country, i) => (
                                                <Dropdown.Item key={i} onClick={() =>
                                                    setBilingAddress((prevState) => ({
                                                        ...prevState,
                                                        billingCountryCode: country.code
                                                    }))}>
                                                    {country.name} ({country.code})
                                                </Dropdown.Item>
                                            ))}
                                        </div>
                                    </DropdownButton>
                                    <Form.Control
                                        value={bilingAddress.mobile}
                                        onChange={(e) => handleChange(e, 'mobile', 'biling')}
                                        disabled={isView}
                                        placeholder="Enter phone number"
                                    />
                                </InputGroup>
                                {formErrors && formErrors.Biling?.mobile && <span style={{ color: 'red' }}>{formErrors.Biling.mobile}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Phone 2 <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.telephone}
                                    onChange={(e) => handleChange(e, 'telephone', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.mobile && <span style={{ color: 'red' }}>{formErrors.Biling.mobile}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Fax <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.fax}
                                    onChange={(e) => handleChange(e, 'fax', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.fax && <span style={{ color: 'red' }}>{formErrors.Biling.fax}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Billing Address Email <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={bilingAddress.email}
                                    onChange={(e) => handleChange(e, 'email', 'biling')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Biling?.email && <span style={{ color: 'red' }}>{formErrors.Biling.email}</span>}
                            </Form.Group>
                        </Row>
                    </div>
                </div>
            </div>

            <div className='add-edit-product'>
                <div className='form'>
                    <h4 className='fw-bold fs-5 mb-3 title-admin'>Operating Address</h4>
                    <button className='btn btn-primary btn-md mb-3' onClick={() => setShippingAddress({ ...bilingAddress, type: "Shipping" })}>Use Registered Address
                    </button>
                    <div>
                        <Row>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>House/Building Number <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress?.flatNumber}
                                    onChange={(e) => handleChange(e, 'flatNumber', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.flatNumber && <span style={{ color: 'red' }}>{formErrors.Shipping.flatNumber}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Address Line 1 {" "} <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.addressLine1}
                                    onChange={(e) => handleChange(e, 'addressLine1', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.addressLine1 && <span style={{ color: 'red' }}>{formErrors.Shipping?.addressLine1}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Address Line 2 {" "} <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.addressLine2}
                                    onChange={(e) => handleChange(e, 'addressLine2', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.addressLine2 && <span style={{ color: 'red' }}>{formErrors.Shipping.addressLine2}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Address Line 3 {" "} <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.addressLine3}
                                    onChange={(e) => handleChange(e, 'addressLine3', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.addressLine3 && <span style={{ color: 'red' }}>{formErrors.Shipping.addressLine3}</span>}
                            </Form.Group>
                        </Row>

                        <Row className='mt-4'>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Postcode{" "} <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.postcode}
                                    onChange={(e) => handleChange(e, 'postcode', 'shipping')}
                                    disabled={isView}
                                />
                                {/* {formErrors && formErrors.Shipping?.postcode && <span style={{ color: 'red' }}>{formErrors.Shipping.postcode}</span>} */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>State/Province <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.state}
                                    onChange={(e) => handleChange(e, 'state', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.state && <span style={{ color: 'red' }}>{formErrors.Shipping.state}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>City <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.city}
                                    onChange={(e) => handleChange(e, 'city', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.city && <span style={{ color: 'red' }}>{formErrors.Shipping.city}</span>}
                            </Form.Group>


                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Country <RequiredSpan /></Form.Label>
                                <Select
                                    className='no-border'
                                    onChange={(selectedOption) => {
                                        const selectedValue = selectedOption ? selectedOption.value : '';
                                        setShippingAddress({ ...shippingAddress, country: selectedValue });
                                    }}
                                    options={countryData.map(country => ({ value: country._id, label: country.name }))}
                                    isDisabled={isView} // Replace with your condition for disabling
                                    value={countryData.map(country => ({
                                        value: country._id, label: country.name
                                    })).find(option => option.value === shippingAddress.country)}
                                    placeholder="Choose..."
                                />
                                {formErrors && formErrors.Shipping?.country && <span style={{ color: 'red' }}>{formErrors.Shipping.country}</span>}
                            </Form.Group>
                        </Row>

                        <Row className='mt-4'>
                            {/* <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Phone 1 <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.mobile}
                                    onChange={(e) => handleChange(e, 'mobile', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.mobile && <span style={{ color: 'red' }}>{formErrors.Shipping.mobile}</span>}
                            </Form.Group> */}

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Phone 1 <RequiredSpan /></Form.Label>
                                <InputGroup>
                                    <DropdownButton variant="outline-secondary" title={shippingAddress.shippingCountryCode} id="input-group-dropdown-2">
                                        <FormControl
                                            autoFocus
                                            placeholder="Search Country..."
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            value={searchTerm}
                                        />
                                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {filteredCountries.map((country, i) => (
                                            <Dropdown.Item key={i} onClick={() => setShippingAddress((prevState) => ({
                                                ...prevState,
                                                shippingCountryCode: country.code
                                            }))
                                            }>
                                                {country.name} ({country.code})
                                            </Dropdown.Item>
                                        ))}
                                        </div>
                                    </DropdownButton>
                                    <Form.Control
                                        // className=''
                                        value={shippingAddress.mobile}
                                        onChange={(e) => handleChange(e, 'mobile', 'shipping')}
                                        disabled={isView}
                                        placeholder="Enter phone number"
                                    />
                                </InputGroup>
                                {formErrors && formErrors.Shipping?.mobile && <span style={{ color: 'red' }}>{formErrors.Shipping.mobile}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Phone 2 <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.telephone}
                                    onChange={(e) => handleChange(e, 'telephone', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.telephone && <span style={{ color: 'red' }}>{formErrors.Shipping.telephone}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Fax <OptionalSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.fax}
                                    onChange={(e) => handleChange(e, 'fax', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.fax && <span style={{ color: 'red' }}>{formErrors.Shipping.fax}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Operating Address Email <RequiredSpan /></Form.Label>
                                <Form.Control className='no-border'
                                    value={shippingAddress.email}
                                    onChange={(e) => handleChange(e, 'email', 'shipping')}
                                    disabled={isView}
                                />
                                {formErrors && formErrors.Shipping?.email && <span style={{ color: 'red' }}>{formErrors.Shipping.email}</span>}
                            </Form.Group>
                        </Row>
                    </div>
                </div>
            </div>



            <div className='footer_'>
                <button onClick={() => navigate('/entities')} className="footer_cancel_btn">Back</button>
                <button onClick={() => { next() }} className='footer_next_btn'> Next</button>
            </div>
        </>
    )
}

export default Details