import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userGetByIdAction, userUpdateAction } from '../../../redux/actions/userAction';
import { toast } from 'react-hot-toast'
import { REGISTER, USER_GET_BY_ID, USER_UPDATE } from '../../../redux/types';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { registerAction } from '../../../redux/actions/registerAction';
import { RequiredSpan } from '../../transactions/Helpers/OptionalTags';

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
        createdBy: ''
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
                createdBy: localStorage.getItem('userId')
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
            delete state.createdBy
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
                <div className='form mt-5'>

                    <h4 className='fw-bold fs-5 mb-3 title-admin'>ADD USER</h4>

                    <Row>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Name <RequiredSpan /></Form.Label>
                            <Form.Control className=''
                                value={state.name}
                                onChange={(e) => {
                                    setState({ ...state, name: e.target.value });
                                }}
                                disabled={isView}
                            />
                            {error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.name}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Email <RequiredSpan /></Form.Label>
                            <Form.Control className=''
                                value={state.email}
                                onChange={(e) => {
                                    setState({ ...state, email: e.target.value });
                                }}
                                disabled={isView}
                            />
                            {error?.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.email}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Department <RequiredSpan /></Form.Label>
                            <Form.Select className=''
                                onChange={(e, newVal) => setState({ ...state, department: e.target.value })}
                                disabled={isView}
                                disableClearable
                                value={state.department}
                            >
                                <option value="" disabled selected>Choose...</option>
                                {departmentOption.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}

                            </Form.Select>
                            {error?.department && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.department}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Profile <RequiredSpan /></Form.Label>
                            <Form.Select className=''
                                onChange={(e, newVal) => setState({ ...state, profile: e.target.value })}
                                disabled={isView}
                                disableClearable
                                value={state.profile}
                            >
                                <option value="" disabled selected>Choose...</option>
                                {profileOption.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}

                            </Form.Select>
                            {error?.profile && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.profile}</span>}
                        </Form.Group>
                    </Row>

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