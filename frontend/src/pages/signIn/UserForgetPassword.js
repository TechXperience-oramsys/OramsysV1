import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../helper/utils";
import { toast } from "react-hot-toast";
import { userServices } from "../../_Services/userServices";
import { Spinner } from "react-bootstrap";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

function UserForgetPassword() {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirPass, setConfirmPass] = useState("");

  const handleSendOTP = () => {
    if (emailRegex.test(mail) === false) {
      toast.error("Please enter a valid E-mail.");
      return;
    }
    if (mail.length > 0) {
      setLoading(true);
      userServices
        .sendOtp({ email: mail })
        .then((res) => {
          console.log(res.data);
          toast.success(res?.data?.message);
          setIsSent(true);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          console.log(error?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    const data = {
      email: mail,
      otp: otp,
    };
    if (otp.length === 0) {
      toast.error("Please enter OTP!");
      setLoading(false);
      return;
    }
    console.log(data);
    userServices
      .verifyOtp(data)
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message);
        setIsVerified(true);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const [error, setError] = useState({})

  const validation = () => {
    let flag = false;
    let error = {};

    // Validate Password
    if (!password) {
      flag = true;
      error.password = "Please enter a password";
      toast.error(error.password);
    } else if (passwordRegex.test(password) === false) {
      flag = true;
      error.password = "Password must contain 8 characters (A-Z, a-z, 0-9, #@$%...)";
      toast.error(error.password);
    }

    // Validate Confirm Password
    if (!confirPass) {
      flag = true;
      error.confirPass = "Please confirm your password";
      toast.error(error.confirPass);
    } else if (password !== confirPass) {
      flag = true;
      error.confirPass = "Passwords do not match";
      toast.error(error.confirPass);
    } else if (passwordRegex.test(confirPass) === false) {
      flag = true;
      error.confirPass = "Password must contain 8 characters (A-Z, a-z, 0-9, #@$%...)";
      toast.error(error.confirPass);
    }

    setError(error);
    return flag;
  };

  const handelChangePassword = () => {
    if (validation()) {
      return
    }
    setLoading(true);
    // if (passwordRegex.test(password) === false) {
    //   toast.error("Password must contains 8 characters(A-Z,a-z,0-9,#@$%...)");
    //   setLoading(false);
    //   return false;
    // }
    // if (password !== confirPass) {
    //   toast.error("Confirm Password must be same as Password!");
    //   setLoading(false);
    //   return false;
    // }

    const data = {
      email: mail,
      password: password,
    };

    userServices
      .setPassword(data)
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message);
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendOTP(); // Trigger the Login function
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '8rem', marginBottom: '10rem' }}>
      <div className="col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body">
            <h4 className="text-center mb-4">{isSent && !isVerified ? 'Verify OTP' : isVerified ? 'Set Password' : 'Forget Password'}</h4>

            {!isSent && (
              <>
                <div className="form-floating mb-3">
                  <input type="email" name="email" onChange={(e) => setMail(e.target.value)} onKeyDown={handleKeyPress} className="form-control" id="floatingInput" placeholder="Email" />
                  <label htmlFor="floatingInputValue">Email address</label>

                  <button className="btn btn-primary w-100 mt-3" onClick={() => handleSendOTP()} >
                    Send OTP {loading && <Spinner size="sm" />}
                  </button>
                </div>

              </>
            )}

            {isSent && !isVerified && (
              <>
                <div className="form-floating mb-3">
                  <input type="email" name="email" onChange={(e) => setOtp(e.target.value)} onKeyDown={handleKeyPress} className="form-control" id="floatingInput" placeholder="OTP" />
                  <label htmlFor="floatingInputValue">Enter OTP</label>

                  <button className="btn btn-primary w-100 mt-3" onClick={() => handleVerifyOTP()}>
                    Confirm {loading && <Spinner size="sm" />}
                  </button>
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => handleVerifyOTP()}
                  >
                    Verify OTP {loading && <Spinner size="sm" />}
                  </button>
                </div> */}
              </>
            )}

            {isVerified && (
              <div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New password</label>
                  <div className="input-group position-relative">
                    <input type={show ? "text" : "password"} className="form-control" placeholder="" onChange={(e) => setPassword(e.target.value)} />
                    <span  className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={() => setShow((prev) => !prev)}>
                      {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                  </div>
                  {error && error?.password && <span style={{ color: 'red' }}>{error.password}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">Confirm new password</label>
                  <div className="input-group">
                    <input type={show ? "text" : "password"} className="form-control"  placeholder="" onChange={(e) => setConfirmPass(e.target.value)} />
                    <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={() => setShow((prev) => !prev)}>
                      {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                  </div>
                  {error && error?.confirPass && <span style={{ color: 'red' }}>{error.confirPass}</span>}
                </div>

                <button className="btn btn-primary w-100 mt-3" onClick={() => handelChangePassword()}>
                  Submit {loading && <Spinner size="sm" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default UserForgetPassword;
