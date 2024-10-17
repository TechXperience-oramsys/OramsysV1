import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import AuthFooter from "./footer/AuthFooter";
import AuthHeader from "./header/AuthHeader";
// import Loader from "./loader/Loader";
import Sidebar from "./sidebar/Sidebar";

const AuthLayOut = ({ children, ...props }) => {
  const [showSidebar, setSidebar] = useState(true);
  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        {showSidebar && (
          <Sidebar showSidebar={showSidebar} setSidebar={setSidebar} />
        )}
        {/* <Sidebar /> */}
        <div style={{ width: "100%", background: '#F8FBFB' }}>
          <AuthHeader showSidebar={showSidebar} setSidebar={setSidebar} />
          <div
            className=""
            style={{ height: "91vh", overflow: "auto" }}
            {...props}
          >
            {children}
          </div>
        </div>
      </div>
      {/* <AuthFooter /> */}
    </>
  );
};

export default AuthLayOut;
