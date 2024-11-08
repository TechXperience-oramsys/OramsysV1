import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import STORAGEKEY from "../../config/APP/app.config";
// import { ApiPostNoAuth } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import { LOGIN } from "../../redux/types";
import { toast } from "react-hot-toast";
// import { useOktaAuth } from "@okta/okta-react";
// import svgIcon from "../../css/undraw_developer_activity_re_39tg.svg";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "../../css/login.css";
import "../../css/bootstrap.min.css";
import { admin } from "../../_Services/adminServices";

const FunctionalAdmin = () => {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginData) {
      // console.log("loginData", loginData);
      if (
        loginData.status === 200 &&
        loginData.message === "Login Successfully"
      ) {
        // toast.success(loginData.message);
        navigate("/Dashboard");
      }
    }
  }, [loginData, navigate]);

  const handelChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Login(e); // Trigger the Login function
    }
  };

  const validation = () => {
    let param = false;
    let error = {};
    if (!login.email) {
      param = true;
      error.email = "Please enter email!";
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
  const Login = async (e) => {
    e.preventDefault();

    if (validation()) {
      return;
    }

    let data = {
      email: login.email,
      password: login.password,
    };

    setLoading(true); // Start loading spinner

    admin
      .adminLogin(data)
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: { res: res.data, is_loggedin: true },
        });

        if (res.data.status === 200 && res.data.data.token) {
          toast.success(res.data.message);
          navigate("/dashboard");
          AuthStorage.setStorageData(STORAGEKEY.token, res.data.data.token, true);
          AuthStorage.setStorageData(STORAGEKEY.roles, "admin", true);
          AuthStorage.setStorageData(STORAGEKEY.userId, res.data.data.id, true);
          AuthStorage.setStorageData(
            STORAGEKEY.userData,
            JSON.stringify(res.data.data),
            true
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop loading spinner
      });
  };

  // const { oktaAuth } = useOktaAuth();
  // const loginWithRedirect = () =>
  //   oktaAuth.signInWithRedirect({ originalUri: `/` });
  // const logOut = () => oktaAuth.signOut();

  // const buttonText = authState?.isAuthenticated ? "Logout" : "Login";
  // const btnLogic = authState?.isAuthenticated ? logOut : loginWithRedirect;
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className=" contents">
              <div className="row justify-content-center">
                <div className="col-md-4" style={{ marginBottom: "5rem" }}>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
                      <li className="breadcrumb-item bg-gray-200 underline-none p-3 text-black">
                        <Link style={{ textDecoration: 'none' }} to="/signin">
                          Login as User
                        </Link>
                      </li>
                    </ol>
                  </nav>
                  <div className="mb-4">
                    <h3 className="title-admin">Admin Login</h3>
                    <p className="mb-4">
                      This is the admin login portal, if you are not an admin
                      you cannot have access. Click on the user login above to login as a user
                    </p>
                  </div>

                  <div className="form">
                    <div className="form-floating mb-4">
                      <input
                        type="email"
                        name="email"
                        onChange={handelChange}
                        onKeyDown={handleKeyPress}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Email"
                      />
                      <label htmlFor="floatingInputValue">Email address</label>
                      {loginFormError.email && (
                        <span
                          style={{
                            color: "#da251e",
                            width: "100%",
                            textAlign: "start",
                          }}
                        >
                          {loginFormError.email}
                        </span>
                      )}
                    </div>

                    <div className="position-relative form-floating mb-2">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        onChange={handelChange}
                        onKeyDown={handleKeyPress}
                        name="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <label htmlFor="floatingInputValue">Password</label>
                      {loginFormError.password && (
                        <span
                          style={{
                            color: "#da251e",
                            width: "100%",
                            textAlign: "start",
                          }}
                        >
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
                    <div className="d-flex mt-3 mb-4 align-items-center">
                      <div className="mx-auto">
                        <div className="col-12 text-center">
                          <span className="">
                            <Link to="/forget-password" className="mx-auto text-decoration-none forgot-pass">
                              Forgot Password?
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={(e) => Login(e)} className="btn btn-block btn-primary">
                      {!loading ? "Log In" : ""}
                      {loading && (
                        <div className="d-flex justify-content-center">
                          <strong className="me-2">Logging in...</strong>
                          <div className="spinner-border spinner-border-sm mt-1" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 
                        <div className="col-md-6">
                            <img src={svgIcon} style={{ height: '480x' }} alt="Image" className='img-slide img-responsive' />
                        </div> */}
          </div>
        </div>
      </div>

      {/* <section className="login">
                <div className="container">
                    <div className="sign-grd">
                        <div className="lft-pan">
                            <div className="form-box">
                                <div className='form'>
                                    <h1 className='mb-5 mt-5'>Sign In</h1>
                                    <input type="email" placeholder="Email" name='email' onChange={handelChange} />
                                    {loginFormError.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.email}</span>}
                                    <input type="password" placeholder="Password" name='password' onChange={handelChange} />
                                    {loginFormError.password && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.password}</span>}
                                    <a href="#" className="forgot">Forgot your password?</a>
                                    <button onClick={(e) => Login(e)}>Sign In</button>
                                </div>
                            </div>
                        </div>
                        <div className="rgt-pan">
                            <h1>Login with your </h1>
                            <p> Log in with your coopertae credentials
                            </p>
                            <p>OR</p>
                            <a onClick={() => navigate('/signup')} className="ghost">Create Account</a>

                        </div>
                    </div>
                </div>
            </section> */}
    </>
  );
};

export default FunctionalAdmin;
