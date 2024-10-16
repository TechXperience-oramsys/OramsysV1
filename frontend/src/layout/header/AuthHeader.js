import React, { useState, useEffect } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import LogoutModal from '../../component/Modal/LogoutModal'
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
// import { CaretDownOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useSelector } from "react-redux";
// import { useTranslation } from 'react-i18next';


const AuthHeader = ({ showSidebar, setSidebar }) => {
  // const [showspan, setShowspan] = useState(false);
  // const [showSubData, setShowSubData] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [userData, setUserData] = useState("");
  const getAllUsers = useSelector((state) => state.userData.getUserData);

  console.log("user data", getAllUsers)

  useEffect(() => {
    const userDataFromStorage = AuthStorage.getStorageData(STORAGEKEY.userData);
    setUserData(JSON.parse(userDataFromStorage) ?? {});
}, []); 

  // const { i18n, } = useTranslation();
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  // const handleMenuClick = (e) => {
  //   console.log('Selected language:', e.key);
  //   changeLanguage(e.key); // Change language based on the selected menu item
  // };

  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="en">
  //       English
  //     </Menu.Item>
  //     <Menu.Item key="es">
  //       Español
  //     </Menu.Item>
  //     <Menu.Item key="fr">
  //       Français
  //     </Menu.Item>
  //   </Menu>
  // );

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
      <div className="open-sidebar d-flex align-items-center justify-content-between" style={{ padding: "15px" }}>
        <div className="d-flex align-items-center">
          {/* <Badge className="font-semibold me-4" size={30} status="success" text={userData?.name} />  */}
        </div>

        <div className="d-flex align-items-center">
          <Badge className="font-semibold me-4" size={30} status="success" text={userData?.name} /> {/* Added some right margin */}

          {/* <Dropdown overlay={menu} className="me-3" trigger={['click']}>
            <Button
              icon={<GlobalOutlined style={{ fontSize: '24px' }} />} // Increased the icon size
              shape="square"
              style={{ width: 'auto', height: '30px' }} // Ensure the button adjusts with text
            >
              <span style={{ marginLeft: '8px' }}><CaretDownOutlined /></span>
            </Button>
          </Dropdown> */}

          <button onClick={() => setshowModal(true)} className="nav-link text-dark me-4"> {/* Added some right margin */}
            <HiOutlineLogout className="me-1" size={15} />
            <span>Logout</span>
          </button>


        </div>
      </div>

      {showModal && (
        <LogoutModal show={showModal} onHide={() => setshowModal(false)} />
      )}
    </>
  );
};

export default AuthHeader;
