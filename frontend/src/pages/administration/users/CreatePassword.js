import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../../config/API/api.config";
import { useNavigate } from "react-router-dom";

export const Create_new_password = () => {
  const [otp, setOtp] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [state, setState] = useState({
    password: "",
    confirm_password: "",
  });

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
      errors.confirm_password = "Password and confirm password should be same!";
    }
    setError(errors);
    return param;
  };

  const verify = () => {
    if (!otp) {
      setError({ otp: "Please enter the OTP!" });
      return;
    }
    axios
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validation();
    if (!isValid) {
      axios
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
    }
  };

  return (
    <div className="card mt-5">
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
    </div>
  );
};
