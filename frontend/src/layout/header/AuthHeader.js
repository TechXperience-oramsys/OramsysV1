import React, { useState, useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import LogoutModal from '../../component/Modal/LogoutModal'
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
import { GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu } from 'antd';


const AuthHeader = ({ showSidebar, setSidebar }) => {
  const [showspan, setShowspan] = useState(false);
  const [showSubData, setShowSubData] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setUserData(
      JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)) ?? {}
    );
  }, [AuthStorage.getStorageData(STORAGEKEY.userData)]);

  const handleMenuClick = (e) => {
    // Handle language change here
    console.log('Selected language:', e.key);
    // Example: navigate to different language route or update state
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="en">
        English
      </Menu.Item>
      <Menu.Item key="es">
        Español
      </Menu.Item>
      <Menu.Item key="fr">
        Français
      </Menu.Item>
      {/* Add more languages as needed */}
    </Menu>
  );

  return (
    <>
      {/* <div className='authheader_main'>
        <img src='../../assets/img/about/more.png' className='sidebar_img' onClick={() => setSidebar(!showSidebar)} />
        <h1>Transactions</h1>
        <div className='btn_input_content'>
          <button className='add_btn me-3' onClick={() => setShowspan(!showspan)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
          {
            showspan &&
            <div className='add_content'>
              <p>Import</p>
              
              <div >
                <p onClick={() => setShowSubData(!showSubData)} className='d-flex justify-content-between align-items-center'>Export
                  <img className={`${showSubData && "imgrotet"}`} src='../../assets/img/about/down-filled-triangular-arrow.png' />
                </p>
              </div>
              {
                showSubData &&
                <>
                  <p className="ps-3">Physical commodities</p>
                  <p className="ps-3">Non-physical commodities</p>
                </>
              }
            </div>
          }
          <div className='search_content'>
            <input className='serch_input' id='search' />
            <label htmlFor='search'>
              <img src='../../assets/img/about/search.png' />
            </label>
          </div>
        </div>
      </div> */}
      <div
        className="open-sidebar d-flex align-items-center"
        style={{
          // backgroundColor: "#f1f1f1",
          padding: "15px",
        }}
      >
        {/* <div className="d-flex align-items-center">
          <MenuOutlined className='fs-5' onClick={() => setSidebar(!showSidebar)} />
          <span className="ms-2 fw-bold fs-5"></span>
        </div> */}
        <div className="d-flex align-items-center me-5 ms-auto">
          <div className='me-2'>
            <Badge className="font-semibold" size={30} status="success" text={userData?.name} />
          </div>

          <div className='ms-2 mx-auto'>
            <button onClick={() => setshowModal(true)} className="nav-link text-dark">
              <HiOutlineLogout className='me-1' size={15} />
              <span>Logout</span>
              {/* <HiOutlineLogout className='text-white' size={22} /><span className='ps-3 fw-semibold text-danger'>Logout</span> */}
            </button>
          </div>

          <Dropdown overlay={menu} className="ms-2" trigger={['click']}>
            <Button
              icon={<GlobalOutlined style={{ fontSize: '24px' }} />} // Increase the icon size here
              shape="square"
              style={{ width: '30px', height: '30px' }} // Ensure the button is square
            />
          </Dropdown>
        </div>
      </div>
      {showModal && (
        <LogoutModal show={showModal} onHide={() => setshowModal(false)} />
      )}
    </>
  );
};

export default AuthHeader;
