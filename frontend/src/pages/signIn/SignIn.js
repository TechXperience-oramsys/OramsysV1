import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import "../../css/login.css";
import "../../css/bootstrap.min.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginData = useSelector((state) => state.login.login);

  const [login, setLogin] = useState({});
  const [loginFormError, setLoginFormError] = useState({});

  useEffect(() => {
    if (loginData) {
      if (loginData.status === 200 && loginData?.data?.token) {
        // toast.success(loginData.message);
        navigate("/dashboard");
      }
    }
  }, [loginData, navigate]);

  const handelChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const validation = () => {
    let param = false;
    let error = {};
    if (!login.email) {
      param = true;
      error.email = "Please enter an email!";
    } else {
      if (!emailReg.test(login.email)) {
        param = true;
        error.email = "Please enter a valid email!";
      }
    }
    if (!login.password) {
      param = true;
      error.password = "Please enter password!";
    }
    setLoginFormError(error);
    return param;
  };
  const Login = (e) => {
    e.preventDefault();
    if (validation()) {
      return;
    }
    let data = {
      user_name: login.email,
      password: login.password,
    };
    dispatch(loginAction(data));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Login(e); // Trigger the Login function
    }
  };

  // const { authState, oktaAuth } = useOktaAuth();
  // const loginWithRedirect = () =>
  //   oktaAuth.signInWithRedirect({ originalUri: `/` });
  // const logOut = () => oktaAuth.signOut();

  // const buttonText = authState?.isAuthenticated ? "Logout" : "Login";
  // const btnLogic = authState?.isAuthenticated ? logOut : loginWithRedirect;

  return (
    <div className="content">
      <div className="">
        <div className="">
          {/* <div className="col-md-6">
                        <img src={svgIcon} style={{ height: '480x' }} alt="Image" className='img-slide img-responsive' />
                    </div> */}
          <div className=" contents">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
                    <li className="breadcrumb-item bg-gray-200 underline-none p-3 text-dark">
                      <Link style={{ textDecoration: 'none' }} to="/fa-login">
                        Login as Corporate Admin
                      </Link>
                    </li>
                  </ol>
                </nav>
                <div className="mb-4">
                  <h3 className="title">User Login</h3>
                  <p className="mb-4">
                    This is the user login portal
                  </p>
                </div>

                <div className="form">
                  <div className="form-floating mb-3">
                    <input type="email" name="email" onChange={(e) => handelChange(e)} onKeyDown={handleKeyPress} className="form-control" id="floatingInput" placeholder="Email" />
                    <label htmlFor="floatingInputValue">Email address</label>
                    {loginFormError.email && (
                      <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>
                        {loginFormError.email}
                      </span>
                    )}
                  </div>

                  <div className="position-relative form-floating mb-4">
                    <input type={passwordVisible ? "text" : "password"} onChange={(e) => handelChange(e)} onKeyDown={handleKeyPress}
                      name="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password" />
                    <label htmlFor="floatingInputValue">Password</label>
                    {loginFormError.password && (
                      <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>
                        {loginFormError.password}
                      </span>
                    )}

                    <span className="position-absolute end-0 top-50 text-lg translate-middle-y me-3 cursor-pointer" onClick={togglePasswordVisibility}>
                      {passwordVisible ? (
                        <EyeInvisibleOutlined />
                      ) : (
                        <EyeOutlined />
                      )}
                    </span>
                  </div>

                  <div className="d-flex mb-4 align-items-center">
                    <div className="mx-auto">
                      {/* <div className='col-12 text-center'>
                                                <label className="control control--checkbox mb-0">
                                                    <span className="caption">Don't Have an account? {" "}
                                                        <a className='fw-semibold' onClick={() => navigate('/signup')}>Register here{" "}<FontAwesomeIcon icon={faArrowRightLong} style={{ color: "#da251e" }}></FontAwesomeIcon></a></span>
                                                </label>
                                            </div> */}
                      <div className="col-12 text-center mt-2">
                        <span className="">
                          <Link to="/user/forget" className="mx-auto text-decoration-none forgot-pass">
                            Forgot Password?
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => Login(e)}
                    className="btn btn-block btn-primary"
                  >
                    Log In
                  </button>

                  {/* <span className="d-block text-left my-4 text-muted">&mdash; or login as &mdash;</span> */}

                  {/* 
                                    <div classname="social-login">
                                         <a href='#' onClick={() => navigate('/admin-login')}> Admin </a>{" "} <i className='fa-1.5x bi bi-arrow-right'></i>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
