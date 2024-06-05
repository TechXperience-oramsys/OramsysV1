import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export const Create_new_password = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });

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

    if (!state.confirmPassword) {
      param = true;
      errors.confirmPassword = "Please enter confirm password!";
    }
    if (state.password !== state.confirmPassword) {
      param = true;
      errors.confirmPassword = "Password and confirm password should be same!";
    }
    setError(errors);
    return param;
  };

  const verify = () => {
    console.log(otp, "otp entered");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validation();
    if (!isValid) {
      submit(state);
    }
  };

  const submit = (state) => {
    console.log(state);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="text-align-center">Create your new password here</h1>
          <InputLabel>Verify Otp :</InputLabel>
          <input
            type="number"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="form-control"
            placeholder="Enter the 4-digit code"
          />
          <button className="btn btn-primary m-3" onClick={verify}>
            Verify
          </button>
        </div>

        <div>
          <InputLabel>New Password :</InputLabel>
          <FormControl>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
            />
            {error && error.password && (
              <span
                style={{ color: "#da251e", width: "100%", textAlign: "start" }}
              >
                {error.password}
              </span>
            )}
          </FormControl>
          <InputLabel>Confirm Password :</InputLabel>
          <FormControl>
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter confirm password"
            />
            {error && error.confirmPassword && (
              <span
                style={{ color: "#da251e", width: "100%", textAlign: "start" }}
              >
                {error.confirmPassword}
              </span>
            )}
          </FormControl>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};
