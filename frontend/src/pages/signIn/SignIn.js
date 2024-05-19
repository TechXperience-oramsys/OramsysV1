import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import { loginAction } from '../../redux/actions/loginAction';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { toast } from 'react-toastify'
import { LOGIN } from '../../redux/types';
import svgIcon from '../../css/undraw_remotely_2j6y.svg'
import '../../css/login.css'
import '../../css/bootstrap.min.css'

const SignIn = () => {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginData = useSelector(state => state.login.login)

    const [login, setLogin] = useState({})
    const [loginFormError, setLoginFormError] = useState({})

    useEffect(() => {
        if (loginData) {
            console.log('loginData', loginData)
            if (loginData.status === 200 && loginData?.data?.token) {
                // toast.success(loginData.message);
                navigate('/homeLanding')
            }
        }
    }, [loginData])

    const handelChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const validation = () => {
        let param = false
        let error = {}
        if (!login.email) {
            param = true
            error.email = "Please enter an email!"
        } else {
            if (!emailReg.test(login.email)) {
                param = true
                error.email = "Please enter a valid email!"
            }
        }
        if (!login.password) {
            param = true
            error.password = "Please enter password!"
        }
        setLoginFormError(error);
        return param
    }
    const Login = (e) => {
        e.preventDefault();
        if (validation()) {
            return
        }
        let data = {
            user_name: login.email,
            password: login.password
        }
        dispatch(loginAction(data))
    }
     

    const { authState, oktaAuth } = useOktaAuth();
    const loginWithRedirect = () =>
        oktaAuth.signInWithRedirect({ originalUri: `/` });
    const logOut = () => oktaAuth.signOut();

    const buttonText = authState?.isAuthenticated ? "Logout" : "Login";
    const btnLogic = authState?.isAuthenticated ? logOut : loginWithRedirect;


    return (
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <img src={svgIcon} style={{ height: '480x' }} alt="Image" className='img-slide img-responsive' />
                    </div>
                    <div class="col-md-6 contents">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                                        <li class="breadcrumb-item"><a href='#' onClick={() => navigate('/fa-login')}>Admin</a></li>
                                    </ol>
                                </nav>
                                <div class="mb-4">
                                    <h3 className='title'>Sign In</h3>
                                </div>

                                <div className='form'>

                                    <div class="form-floating mb-3">
                                        <input type="email" name='email' onChange={(e) => handelChange(e)} class="form-control" id="floatingInput" placeholder="Email" />
                                        <label for="floatingInputValue">Email address</label>
                                        {loginFormError.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.email}</span>}
                                    </div>

                                    <div class="form-floating mb-4">
                                        <input type="password" onChange={(e) => handelChange(e)} name='password' class="form-control" id="floatingPassword" placeholder="Password" />
                                        <label for="floatingInputValue">Password</label>
                                        {loginFormError.password && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.password}</span>}
                                    </div>

                                    <div class="d-flex mb-5 align-items-center">
                                        <div className='row'>
                                            <div className='col-12 text-center'>
                                                <label class="control control--checkbox mb-0">
                                                    <span class="caption">Don't Have an account? {" "}
                                                        <a className='fw-semibold' onClick={() => navigate('/signup')}>Register here{" "}<FontAwesomeIcon icon={faArrowRightLong} style={{ color: "#da251e" }}></FontAwesomeIcon></a></span>
                                                </label>
                                            </div>
                                            <div className='col-12 text-center mt-4'>
                                                <span class="ml-auto"><a href="#" class="text-decoration-none forgot-pass">Forgot Password?</a></span>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={(e) => Login(e)} class="btn btn-block btn-primary">Log In</button>

                                    {/* <span class="d-block text-left my-4 text-muted">&mdash; or login as &mdash;</span> */}

                                    {/* 
                                    <div class="social-login">
                                         <a href='#' onClick={() => navigate('/admin-login')}> Admin </a>{" "} <i className='fa-1.5x bi bi-arrow-right'></i>
                                    </div> */}
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignIn