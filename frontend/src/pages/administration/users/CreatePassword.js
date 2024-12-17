import React, { useState } from "react";
import { toast } from 'sonner';
import axios from "axios";
import { API } from "../../../config/API/api.config";
import { useNavigate } from "react-router-dom";
import '../../../css/login.css'
import '../../../css/bootstrap.min.css'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

export const CreateNewPassword = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
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
  const handleOtpChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === '') {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input box if not empty
      if (value !== '' && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  // Combine OTP for submission
  const combinedOtp = otp.join('');


  const handleChange = (event) => {
    // const name = event.target.name;
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

  const verify = async (combinedOtp) => {
    // Convert the OTP string into a number
    const otpAsNumber = Number(combinedOtp);

    // Check if the combined OTP is valid before sending it to the backend
    if (!otpAsNumber || combinedOtp.length !== 4) {
      setError({ otp: "Please enter a valid 4-digit OTP!" });
      return;
    }

    setLoading(true);
    await axios
      .post(`${API}user/verifyOtp`, { otp: otpAsNumber })
      .then((response) => {
        // console.log(response.data);
        setUserId(response.data.data._id);
        setVisible(true);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
    setLoading(false);
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
          // console.log(response.data);
          toast.success(response.data.message);
          navigate("/signin");
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
      <div className="content d-flex align-items-center justify-content-center" style={{ marginBottom: '9rem' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-sm-12">
              <div className="text-center mb-4">
                <h3 className="title">{!visible ? "Verify OTP" : "Create Password"}</h3>
              </div>

              {!visible ? (
                <>
                  <div className="form text-center">
                    <div className="otp-input-wrapper mb-4">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          id={`otp-${index}`}
                          className="otp-input-box"
                        />
                      ))}
                    </div>
                    {error && error.otp && <span className="text-danger">{error.otp}</span>}

                    <button onClick={() => verify(combinedOtp)} className="btn btn-primary w-100 mb-3">
                      {!loading ? 'Submit' : (
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-floating mb-4 position-relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      onChange={handleChange}
                      name="password"
                      value={state.password}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password:</label>
                    {error && error.password && <span className="text-danger">{error.password}</span>}
                    <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={togglePasswordVisibility}>
                      {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                  </div>

                  <div className="form-floating mb-4 position-relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      onChange={handleChange}
                      value={state.confirm_password}
                      name="confirm_password"
                      className="form-control"
                      id="confirm_password"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="confirm_password">Confirm password</label>
                    {error && error.confirm_password && <span className="text-danger">{error.confirm_password}</span>}
                    <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={togglePasswordVisibility}>
                      {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    {!loading ? 'Create Password' : (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </button>
                </form>
              )}
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