import React, { useState } from "react";
import { admin } from "../../_Services/adminServices";
import { Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { emailRegex, passwordRegex } from "../../helper/utils";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
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
      admin
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
    admin
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
    if (passwordRegex.test(password) === false) {
      toast.warning("Password must contains 8 characters(A-Z,a-z,0-9,#@$%...)");
      setLoading(false);
      return false;
    }
    if (password !== confirPass) {
      toast.warning("Confirm Password must be same as Password!");
      setLoading(false);
      return false;
    }

    const data = {
      email: mail,
      password: password,
    };

    admin
      .setPassword(data)
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message);
        navigate("/fa-login");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '8rem', marginBottom: '10rem' }}>
      <div className="col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <h4 className="text-center mb-4">{isSent && !isVerified ? 'Verify OTP' : isVerified ? 'Set Password' : 'Forget Password'}</h4>
            {!isSent && (
              <>
                <div className="form-floating mb-3">
                  <input type="email" name="email" onChange={(e) => setMail(e.target.value)} className="form-control" id="floatingInput" placeholder="Email" />
                  <label htmlFor="floatingInputValue">Email address</label>

                  <button className="btn btn-primary w-100 mt-3" onClick={() => handleSendOTP()}>
                    Send OTP {loading && <Spinner size="sm" />}
                  </button>
                </div>



              </>
            )}
            {isSent && !isVerified && (
              <>
                <div className="form-floating mb-3">
                  <input type="email" name="email" onChange={(e) => setOtp(e.target.value)} className="form-control" id="floatingInput" placeholder="OTP" />
                  <label htmlFor="floatingInputValue">Enter OTP</label>

                  <button className="btn btn-primary w-100 mt-3" onClick={() => handleVerifyOTP()}>
                    Confirm {loading && <Spinner size="sm" />}
                  </button>
                </div>


              </>
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

export default ForgetPassword;
