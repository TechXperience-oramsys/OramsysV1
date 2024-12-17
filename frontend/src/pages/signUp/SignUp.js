import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions/registerAction";
import { toast } from "sonner";
import svgIcon from "../../css/signup.svg";
import "../../css/login.css";
import "../../css/bootstrap.min.css";

const SignUp = () => {
  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registeredData = useSelector((state) => state.registerData.register);
  const [registerData, setRegisterData] = useState({});
  const [registerError, setRegisterError] = useState({});

  useEffect(() => {
    if (registeredData && registeredData.status === 200) {
      toast.success(registeredData.message);
      navigate("/");
    }
  }, [registeredData, navigate]);

  const handelChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    // debugger
    let param = false;
    let error = {};
    if (!registerData.name) {
      param = true;
      error.name = "Please enter name!";
    }
    if (!registerData.email) {
      param = true;
      error.email = "Please enter email!";
    } else {
      if (!emailReg.test(registerData.email)) {
        param = true;
        error.email = "Please enter a valid email!";
      }
    }
    if (!registerData.password) {
      param = true;
      error.password = "Please enter password!";
    }
    if (!registerData.conformPassword) {
      param = true;
      error.conformPassword = "Please enter conform password!";
    } else if (registerData.password !== registerData.conformPassword) {
      param = true;
      error.conformPassword = "Please enter same password!";
    }
    setRegisterError(error);
    return param;
  };

  const register = (e) => {
    e.preventDefault();
    // debugger
    if (validation()) {
      return;
    }
    delete registerData.conformPassword;
    dispatch(registerAction(registerData));
  };
  return (
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-md-6 contents">
            <div class="row justify-content-center">
              <div class="col-md-8">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="/" onClick={() => navigate("/")}>
                        Home
                      </a>
                    </li>
                  </ol>
                </nav>
                <div class="mb-4">
                  <h3 className="title">Sign Up</h3>
                </div>

                <div className="form">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handelChange(e)}
                      class="form-control"
                      id="floatingInput1"
                      placeholder="Name"
                    />
                    <label htmlFor="floatingInputValue">Name</label>
                    {registerError.name && (
                      <span
                        style={{
                          color: "#da251e",
                          width: "100%",
                          textAlign: "start",
                        }}
                      >
                        {registerError.name}
                      </span>
                    )}{" "}
                  </div>

                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => handelChange(e)}
                      class="form-control"
                      id="floatingInput"
                      placeholder="Email"
                    />
                    <label htmlFor="floatingInputValue">Email address</label>
                    {registerError.email && (
                      <span
                        style={{
                          color: "#da251e",
                          width: "100%",
                          textAlign: "start",
                        }}
                      >
                        {registerError.email}
                      </span>
                    )}
                  </div>

                  <div class="form-floating mb-4">
                    <input
                      type="password"
                      onChange={(e) => handelChange(e)}
                      name="password"
                      class="form-control"
                      id="floatingPassword1"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingInputValue">Password</label>
                    {registerError.password && (
                      <span
                        style={{
                          color: "#da251e",
                          width: "100%",
                          textAlign: "start",
                        }}
                      >
                        {registerError.password}
                      </span>
                    )}
                  </div>
                  <div class="form-floating mb-4">
                    <input
                      type="password"
                      onChange={(e) => handelChange(e)}
                      name="conformPassword"
                      class="form-control"
                      id="floatingConfirmPassword"
                      placeholder="Confirm password"
                    />
                    <label htmlFor="floatingInputValue">Confirm password</label>
                    {registerError.conformPassword && (
                      <span
                        style={{
                          color: "#da251e",
                          width: "100%",
                          textAlign: "start",
                        }}
                      >
                        {registerError.conformPassword}
                      </span>
                    )}
                  </div>

                  <div class="d-flex mb-5 align-items-center">
                    <div className="row">
                      <div className="col-12 text-center">
                        <label class="control control--checkbox mb-0">
                          <span class="caption">
                            Already Registered?{" "}
                            <a href="/"
                              className="fw-semibold"
                              onClick={() => navigate("/")}
                            >
                              Log In
                            </a>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => register(e)}
                    class="btn btn-block btn-primary"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <img
              src={svgIcon}
              style={{ height: "480x" }}
              alt="hei"
              className="img-slide img-responsive"
            />
          </div>
        </div>
      </div>
    </div>

    // <section className="login signup">
    //     <div className="container">
    //         <div className="sign-grd">
    //             <div className="rgt-pan">
    //                 <h1>Sign In</h1>
    //                 {/* <p>
    //                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore modi omnis vero a autem harum quidem quo deserunt quos minus
    //                 </p> */}
    //                 <a onClick={() => navigate('/')} className="ghost">Sign In</a>
    //             </div>
    //             <div className="lft-pan">
    //                 <div className="form-box">
    //                     <div className='form'>
    //                         <h1 className='mb-5 mt-5'>Create Account</h1>

    //                         <input type="text" placeholder="Name" name='name' onChange={(e) => handelChange(e)} />
    //                         {registerError.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.name}</span>}

    //                         <input type="email" placeholder="Email" name='email' onChange={(e) => handelChange(e)} />
    //                         {registerError.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.email}</span>}

    //                         <input type="password" placeholder="Password" name='password' onChange={(e) => handelChange(e)} />
    //                         {registerError.password && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.password}</span>}

    //                         <input type="password" placeholder="Conform password" name='conformPassword' onChange={(e) => handelChange(e)} />
    //                         {registerError.conformPassword && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{registerError.conformPassword}</span>}
    //                         <button onClick={(e) => register(e)}>Sign Up</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </section>
  );
};

export default SignUp;
