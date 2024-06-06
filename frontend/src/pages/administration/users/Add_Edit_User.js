import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userGetByIdAction, userUpdateAction } from '../../../redux/actions/userAction';
import { toast } from 'react-toastify'
import { REGISTER, USER_GET_BY_ID, USER_UPDATE } from '../../../redux/types';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { registerAction } from '../../../redux/actions/registerAction';

const Add_Edit_User = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')
    const location = useLocation();
    const isView = location.state?.isView
    const dispatch = useDispatch()
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const [state, setState] = React.useState({
        name: '',
        email: "",
        department: "",
        profile: "",
     createdBy : ''
    });
    const [error, setError] = useState()

    const userEdit = useSelector(state => state.userData?.userGetId)
    const userUpdate = useSelector(state => state.userData?.userUpdate)
    const registeredData = useSelector(state => state.registerData.register)

    useEffect(() => {
        if (id) {
            dispatch(userGetByIdAction(id))
        }
        // console.log('id=============', id)
    }, [id])

    useEffect(() => {
        return (() => {
            dispatch({
                type: USER_GET_BY_ID,
                payload: null
            })
        })
    }, [])

    useEffect(() => {
        console.log('userEdit=======/=========', userEdit)
        if (userEdit?.data && id) {
            setState({
                ...state,
                name: userEdit.data?.name,
                email: userEdit.data?.email,
                department: userEdit.data?.department,
                profile: userEdit.data?.profile,
                createdBy : localStorage.getItem('userId')
            })
        }
    }, [userEdit])

    useEffect(() => {
        if (registeredData && registeredData.status === 200) {
            toast.success(registeredData.message)
            navigate('/users')
            dispatch({
                type: USER_UPDATE,
                payload: []
            })
        }
    }, [registeredData])

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        if (userUpdate && userUpdate.status === 200) {
            toast.success(userUpdate.message)
            dispatch({
                type: REGISTER,
                payload: []
            })
            navigate('/users')
        }
        console.log('userUpdate', userUpdate)
    }, [userUpdate])

    const validation = () => {
        let param = false
        let error = {}
        if (!state.name) {
            param = true
            error.name = "Please enter name!"
        }
        if (!state.email) {
            param = true
            error.email = "Please enter email!"
        } else {
            if (!emailReg.test(state.email)) {
                param = true
                error.email = "Please enter a valid email!"
            }
        }
        if (!state.department) {
            param = true
            error.department = "Please select department!"
        }
        if (!state.profile) {
            param = true
            error.profile = "Please select profile!"
        }
        setError(error);
        return param
    }

    const editUser = () => {
        if (validation()) {
            return
        }
        if (id) {
            state.createdBy = localStorage.getItem('userId')
            dispatch(userUpdateAction(state, id))
        }
    }
    const addUser = () => {
        if (validation()) {
            return
        }
        // if (id) {
          state.createdBy = localStorage.getItem('userId')
            dispatch(registerAction(state))
        // }
    }


    const navigate = useNavigate()

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

    const profileOption = [
        'User',
        'Admin',
        'Tester',
    ]

    const departmentOption = [
        'Credit',
        'Operations',
        'Compliance',
        'Information Technology',
        'Finance',
        'Credit Remediation',
        'Senior Management',
    ]

    return (
        <>
            <div className='add-edit-product'>
                <h1 className=''>User</h1>
                <div className='form'>
                    <h2 className='mb-3'>Details</h2>
                    <div>
                        <Row className='mt-4'>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Name"
                                    variant="standard"
                                    color="warning"
                                    name='name'
                                    value={state.name}
                                    onChange={handleChange}
                                    disabled={isView}
                                />
                                {error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.name}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    color="warning"
                                    name='email'
                                    value={state.email}
                                    onChange={handleChange}
                                    disabled={isView}
                                />
                                {error && error?.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.email}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                {/* <FormControl className="">
                                    <InputLabel htmlFor="age-native-simple">Department</InputLabel>
                                    <Select
                                        native
                                        focused
                                        value={state.department}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'department',
                                        }}
                                    >
                                        <option className='d-none' aria-label="None" value="" />
                                        <option value={'Credit'}>Credit</option>
                                        <option value={'Operations'}>Operations</option>
                                        <option value={'Compliance'}>Compliance</option>
                                        <option value={'Information Technology'}>Information Technology</option>
                                        <option value={'Finance'}>Finance</option>
                                        <option value={'Credit Remediation'}>Credit Remediation</option>
                                        <option value={'Senior Management'}>Senior Management</option>
                                    </Select>
                                </FormControl> */}
                                {/* <Autocomplete
                                    label="Department"
                                    onChange={q => setText(q)}
                                    selectOnBlur
                                    requireMatch
                                    getOptions={getOptions}
                                    query={text}
                                /> */}

                                <Autocomplete
                                    options={departmentOption}
                                    getOptionLabel={(option) => option}
                                    id="disable-clearable"
                                    label="Department"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Department" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, department: newValue });
                                    }}
                                    value={state.department}
                                    disabled={isView}
                                    disableClearable
                                />
                                {error?.department && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.department}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                {/* <FormControl className="">
                                    <InputLabel htmlFor="age-native-simple">Profile</InputLabel>
                                    <Select
                                        native
                                        focused
                                        value={state.profile}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'profile',
                                            // id: 'age-native-simple',
                                        }}
                                    >
                                        <option className='d-none' aria-label="None" value="" />
                                        <option value={'User'}>User</option>
                                        <option value={'Admin'}>Admin</option>
                                        <option value={'Tester'}>Tester</option>
                                    </Select>
                                </FormControl> */}
                                {/* <Autocomplete
                                    label="Profile"
                                    onChange={q => setText(q)}
                                    selectOnBlur
                                    requireMatch
                                    getOptions={getOptions}
                                    query={text}
                                /> */}

                                <Autocomplete
                                    options={profileOption}
                                    getOptionLabel={(option) => option}
                                    id="disable-clearable"
                                    label="Profile"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Profile" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, profile: newValue });
                                    }}
                                    value={state.profile}
                                    disableClearable
                                    disabled={isView}
                                />
                                {error?.profile && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.profile}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='footer_'>
                    <button onClick={() => navigate('/users')} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { !id ? addUser() : editUser() }} className={`footer_next_btn ${isView ? 'd-none' : 'd-block'}`}>Save</button>
                </div>
            </div>
        </>
    )
}

export default Add_Edit_User