import { InputLabel, TextField, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { countrieAction } from '../../../../redux/actions/countrieAction';
import moment from 'moment'


const IndividualDetail = ({ hendelNext, getDetailData, entityType, getCommonData }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)
    // const id = queryParams.get("id")
    const isView = location.state?.[1]?.isView ?? false;

    const country = useSelector(state => state.countryData.country)
    const entityGetById = useSelector((state) => state.entityData.getEntityById)

    const [state, setState] = useState({
        _id: '',
        title: '',
        givenName: '',
        surname: '',
        otherNames: '',
        birthDate: '',
        country: '',
        townOfBirth: '',
        stateOfBirth: '',
    })
    const [common, setCommon] = useState({
        email: '',
        password: '',
        type: entityType
    })

    const [detailsError, setDetailsError] = useState()
    const [countryData, setCountryData] = useState([])

    useEffect(() => {
        dispatch(countrieAction("all"))
    }, [dispatch])

    useEffect(() => {
        console.log('isView', isView)
    }, [isView])


    useEffect(() => {
        if (entityGetById && entityGetById.data && entityGetById.status === 200) {
            setState({
                _id: entityGetById.data.details?._id,
                title: entityGetById.data.details?.title,
                givenName: entityGetById.data.details?.givenName,
                surname: entityGetById.data.details?.surname,
                otherNames: entityGetById.data.details?.otherNames,
                birthDate: entityGetById.data.details?.birthDate ? moment(entityGetById.data.details.birthDate).format("YYYY-MM-DD") : '',
                country: entityGetById.data.details?.country?._id,
                townOfBirth: entityGetById.data.details?.townOfBirth,
                stateOfBirth: entityGetById.data.details?.stateOfBirth,
            })
            setCommon({
                ...common,
                email: entityGetById.data.email,
                password: entityGetById.data.password,
            })
        }
    }, [entityGetById, common])

    useEffect(() => {
        if (country && country.data) {
            setCountryData(country?.data)
        }
    }, [country])

    const validation = () => {
        let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        let flag = false
        let error = {}
        if (!state.title) {
            flag = true
            error.title = "Title is required!"
        }
        if (!common.email) {
            flag = true
            error.email = "Email is required!"
        }
        else if (!emailReg.test(common.email)) {
            flag = true
            error.email = "Please enter valid email!"
        }
        if (!common.password) {
            flag = true
            error.password = "Password is required!"
        }
        if (!state.givenName) {
            flag = true
            error.givenName = "Given name is required!"
        }
        if (!state.otherNames) {
            flag = true
            error.otherNames = "Other names is required!"
        }
        if (!state.surname) {
            flag = true
            error.surname = "Surname is required!"
        }
        if (!state.birthDate) {
            flag = true
            error.birthDate = "Birth date is required!"
        }
        if (!state.country) {
            flag = true
            error.country = "Country of birth is required!"
        }
        if (!state.townOfBirth) {
            flag = true
            error.townOfBirth = "Town of birth is required!"
        }
        if (!state.stateOfBirth) {
            flag = true
            error.stateOfBirth = "State of birth is required!"
        }
        setDetailsError(error);
        return flag;
    }

    const handleChange = (event) => {
        if (event.target.name === "country") {
            setState({
                ...state,
                country: countryData.find(item => item._id === event.target.value)
            })
        }
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    const save = () => {
        if (validation()) {
            return
        }
        getDetailData(state)
        getCommonData(common)
        hendelNext()

    }

    const titleOptions = ["Mr", "Mrs", "Mr", "Dr", "Hr"];


    return (
        <>
            <div className='add-edit-product'>
                <div className='form'>
                    <h2 className='mb-3'>Details</h2>
                    <div>
                        <Row>
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
                                {detailsError && detailsError.email && <span style={{ color: 'red' }}>{detailsError.email}</span>}
                            </Col>
                            <Col lg={6}>
                                <TextField
                                    type='password'
                                    label="Password"
                                    variant="standard"
                                    color="warning"
                                    value={common.password}
                                    name='password'
                                    onChange={(e) => setCommon({ ...common, password: e.target.value })}
                                    // disabled={id}
                                    disabled={isView}
                                />
                                {detailsError && detailsError.password && <span style={{ color: 'red' }}>{detailsError.password}</span>}

                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={3}>
                                <Autocomplete
                                    options={titleOptions}
                                    getOptionLabel={(option) => option}
                                    id="disable-clearable"
                                    label="Title"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Title" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, title: newValue });
                                    }}
                                    disableClearable
                                    disabled={isView}
                                    value={(titleOptions.length && state.title) ? titleOptions.find(item => item === state?.title) : {}}
                                />
                                {detailsError && detailsError.title && <span style={{ color: 'red' }}>{detailsError.title}</span>}
                            </Col>
                            <Col lg={3}>
                                <InputLabel htmlFor="age-native-simple">Given name</InputLabel>
                                <TextField
                                    variant="standard"
                                    color="warning"
                                    value={state.givenName}
                                    name='givenName'
                                    onChange={handleChange}
                                    disabled={isView}
                                />
                                {detailsError && detailsError.givenName && <span style={{ color: 'red' }}>{detailsError.givenName}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Surname"
                                    variant="standard"
                                    color="warning"
                                    value={state.surname}
                                    name='surname'
                                    onChange={handleChange}
                                    disabled={isView}
                                />
                                {detailsError && detailsError.surname && <span style={{ color: 'red' }}>{detailsError.surname}</span>}

                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Other names"
                                    variant="standard"
                                    color="warning"
                                    value={state.otherNames}
                                    name='otherNames'
                                    onChange={handleChange}
                                    disabled={isView}
                                />
                                {detailsError && detailsError.otherNames && <span style={{ color: 'red' }}>{detailsError.otherNames}</span>}
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={3}>
                                <form className="" noValidate>
                                    <TextField
                                        id="date"
                                        label="Birth date"
                                        type="date"
                                        name='birthDate'
                                        value={state.birthDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {detailsError && detailsError.birthDate && <span style={{ color: 'red' }}>{detailsError.birthDate}</span>}
                                </form>
                            </Col>
                            <Col lg={3}>
                                <Autocomplete
                                    options={countryData}
                                    getOptionLabel={(option) => option.name}
                                    id="disable-clearable"
                                    label="Country of birth"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Country of birth" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, country: newValue._id });
                                    }}
                                    disableClearable
                                    value={(countryData.length && state?.country) ? countryData.find(item => item._id === state.country) : {}}
                                    disabled={isView}
                                />
                                {detailsError && detailsError.country && <span style={{ color: 'red' }}>{detailsError.country}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Town of birth"
                                    variant="standard"
                                    color="warning"
                                    value={state.townOfBirth}
                                    name='townOfBirth'
                                    onChange={handleChange}
                                    disabled={isView}
                                />
                                {detailsError && detailsError.townOfBirth && <span style={{ color: 'red' }}>{detailsError.townOfBirth}</span>}
                            </Col>

                            <Col lg={3}>
                                <TextField
                                    label="State of birth"
                                    variant="standard"
                                    color="warning"
                                    value={state.stateOfBirth}
                                    name='stateOfBirth'
                                    onChange={handleChange}
                                    disabled={isView}
                                />
                                {detailsError && detailsError.stateOfBirth && <span style={{ color: 'red' }}>{detailsError.stateOfBirth}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>


            <div className='footer_'>
                <button onClick={() => navigate('/entities')} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { save() }} className='footer_next_btn'> Next</button>
            </div>
        </>
    )
}

export default IndividualDetail