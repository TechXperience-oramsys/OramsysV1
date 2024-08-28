import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../helper/utils";
import { toast } from "react-toastify";
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
    if (emailRegex.test(mail) == false) {
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
    if (otp.length == 0) {
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

  const handelChangePassword = () => {
    setLoading(true);
    if (passwordRegex.test(password) == false) {
      toast.warning("Password must contains 8 characters(A-Z,a-z,0-9,#@$%...)");
      setLoading(false);
      return false;
    }
    if (password != confirPass) {
      toast.warning("Confirm Password must be same as Password!");
      setLoading(false);
      return false;
    }

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
  return (
    <div class="container d-flex justify-content-center align-items-center my-2">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h4 class="text-center">Forget Password</h4>
            {!isSent && (
              <div class="mb-3">
                <label htmlFor="email" class="form-label">
                  E-mail
                </label>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter your E-mail"
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary my-2"
                  onClick={() => handleSendOTP()}
                >
                  Send OTP {loading && <Spinner size="sm" />}
                </button>
              </div>
            )}
            {isSent && !isVerified && (
              <div class="mb-3">
                <label htmlFor="otp" class="form-label">
                  OTP
                </label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary my-2"
                  onClick={() => handleVerifyOTP()}
                >
                  Verify OTP {loading && <Spinner size="sm" />}
                </button>
              </div>
            )}
            {isVerified && (
              <div class="mb-3">
                <label htmlFor="password" class="form-label">
                  Password
                </label>
                <div class="input-group">
                  <input
                    type={show ? "text" : "password"}
                    class="form-control"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute end-0 top-50 text-lg translate-middle-y me-3 cursor-pointer"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                </div>
                <label htmlFor="password" class="form-label">
                  Confirm Password
                </label>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Confirm Password must same as password"
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary my-2"
                  onClick={() => handelChangePassword()}
                >
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
