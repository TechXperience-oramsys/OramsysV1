import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { API } from "../../../config/API/api.config";
import { useNavigate } from "react-router-dom";
import '../../../css/login.css'
import '../../../css/bootstrap.min.css'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

export const Create_new_password = () => {
  const [otp, setOtp] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [state, setState] = useState({
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const validation = () => {
    let param = false;
    let errors = {};
    if (!state.password) {
      param = true;
      errors.password = "Please enter your password!";
    }

    if (!state.confirm_password) {
      param = true;
      errors.confirm_password = "Please enter confirm password!";
    }
    if (state.password !== state.confirm_password) {
      param = true;
      errors.confirm_password = "Passwords do not match!";
    }
    setError(errors);
    return param;
  };

  const verify = async () => {
    if (!otp) {
      setError({ otp: "Please enter the OTP!" });
      return;
    }
    setLoading(true)
    await axios
      .post(`${API}user/verifyOtp`, { otp: otp })
      .then((response) => {
        console.log(response.data);
        setUserId(response.data.data._id);
        setVisible(true);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
    setLoading(false)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validation();
    if (!isValid) {
      setLoading(true)
      await axios
        .put(`${API}user/updatePassword/${userId}`, {
          password: state.password,
          confirm_password: state.confirm_password,
        })
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data.message);
        });
      setLoading(false)
    }
  };

  return (
    <>
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-md-12 contents">
              <div class="row justify-content-center">
                <div class="col-md-6">

                  {/* bread crumb */}
                  <div class="mb-4">
                    <h3 className='title justify-content-center'>{!visible ? "Verify OTP" : "Create Password"}</h3>
                  </div>

                  {/* forms */}

                  {!visible ? (
                    <>
                      <div className="form">
                        <div class="form-floating mb-4">
                          <input type="number" onChange={(e) => setOtp(e.target.value)} name='otp' value={otp} className="form-control" id="otp" placeholder="Enter the 4-digit code" />
                          <label className="text-muted" htmlFor="floatingInputValue">enter otp</label>
                          {error && error.otp && <span className="error">{error.otp}</span>}
                        </div>

                        <button onClick={verify} class="btn btn-block btn-primary">
                          {!loading ? 'Submit' : ''}
                          {loading && <div class="d-flex justify-content-center">
                            <strong className='me-2'></strong>
                            <div className="spinner-border spinner-border-sm mt-1" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>}
                        </button>

                      </div>
                    </>
                  ) : (
                    <form className='form img-slide' onSubmit={handleSubmit}>
                      <div className="position-relative form-floating mb-4">
                        <input type={passwordVisible ? 'text' : 'password'} onChange={handleChange} name='password' value={state.password} className="form-control" id="password" placeholder="password" />
                        <label htmlFor="floatingInputValue">Password:</label>
                        {error && error.password && (
                          <span className="error">{error.password}</span>
                        )}
                        <span className="position-absolute end-0 top-50 text-lg translate-middle-y me-3 cursor-pointer"
                          onClick={togglePasswordVisibility}>
                          {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </span>
                      </div>

                      <div className="position-relative form-floating mb-4">
                        <input type={passwordVisible ? 'text' : 'password'} onChange={handleChange} value={state.confirm_password} name='confirm_password' className="form-control" id="confirm_password" placeholder="confirm password" />
                        <label htmlFor="floatingInputValue">Confirm password</label>
                        {error && error.confirm_password && (
                          <span className="error">{error.confirm_password}</span>
                        )}
                        <span className="position-absolute end-0 top-50 text-lg translate-middle-y me-3 cursor-pointer"
                          onClick={togglePasswordVisibility}>
                          {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </span>
                      </div>

                      <button type="submit" class="btn btn-block btn-primary">
                        {!loading ? 'Create password' : ''}
                        {loading && <div class="d-flex justify-content-center">
                          <strong className='me-2'></strong>
                          <div className="spinner-border spinner-border-sm mt-1" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>}
                      </button>
                    </form>
                  )}



                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* <div className="card mt-5">
        <div className="card-body">
          <h4 className="card-title">Create your new password here</h4>
          {!visible ? (
            <>
              <div className="form-group ">
                <label htmlFor="otp">Verify OTP:</label>
                <input
                  type="number"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-control"
                  placeholder="Enter the 4-digit code"
                />
                {error && error.otp && <span className="error">{error.otp}</span>}
              </div>
              <button className="btn btn-primary mt-3" onClick={verify}>
                Verify
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">New Password:</label>
                <div className="input-group">
                  <input
                    type={"password"}
                    id="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                {error && error.password && (
                  <span className="error">{error.password}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={state.confirm_password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter confirm password"
                />
                {error && error.confirm_password && (
                  <span className="error">{error.confirm_password}</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          )}
        </div>
      </div> */}

    </>
  );
};
