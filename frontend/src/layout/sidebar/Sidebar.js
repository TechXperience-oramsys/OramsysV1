import React, { useState, useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import STORAGEKEY from '../../config/APP/app.config';
// import { useDispatch } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import { Link } from "react-router-dom"
import LogoutModal from '../../component/Modal/LogoutModal';
import { BsAirplane } from 'react-icons/bs';
import { GrClose, GrFlagFill, GrUserAdmin } from 'react-icons/gr';
import { FaBoxOpen, } from 'react-icons/fa';
import { HiOutlineLogout, HiOutlineUsers } from "react-icons/hi";
import { GiCargoShip } from "react-icons/gi";
import { ImOffice } from "react-icons/im";
import { FcHome, FcLock, FcInvite, FcCollaboration, FcWorkflow, FcViewDetails, FcPositiveDynamic } from "react-icons/fc";
import Fade from 'react-reveal/Fade';


const Sidebar = ({ showSidebar, setSidebar }) => {

  const navigate = useNavigate();
  const [showModal, setshowModal] = useState(false)
  const [showItem, setShowItem] = useState('')
  const [showSubItem, setShowSubItem] = useState('')
  const [userData, setUserData] = useState('')
  const ShowSubItem = (item) => {
    const { text, path } = item
    if (text === "Administration") {
      if (text !== showItem) {
        setShowItem(text)
      } else {
        setShowItem('')
      }
    } else {
      if (text === "Master Data") {
        if (text !== showSubItem) {
          setShowSubItem(text)
        } else {
          setShowSubItem('')
        }
      } else {
        navigate(`/${path}`)
      }
    }
  }
  // const dispatch = useDispatch()
  let navbarData = [];

  const navbarDataForSuperAdmin = [
    {
      img: FcHome,
      text: 'Dashboard',
      path: "homeLanding"
    },
    {
      img: FcLock,
      text: 'Administration',
      path: "",
      subItem: [
        {
          img: FcCollaboration,
          text: 'Entities',
          path: "entities"
        },
        {
          img: FcWorkflow,
          text: 'Entities Role',
          path: "entities-role"
        },
        {
          img: FcViewDetails,
          size: 25,
          text: 'Master Data',
          path: "",
          subData: [
            {
              img: GrFlagFill,
              text: 'Countries',
              path: "countries",
            },
            {
              img: GiCargoShip,
              text: 'Ports',
              path: "ports",
            },
            {
              img: BsAirplane,
              text: 'Airports',
              path: "airports",
            },
            {
              img: ImOffice,
              text: 'Rating Agencies',
              path: "rating-agencies",
            },
          ]
        },

      ]
    },
    {
      img: FaBoxOpen,
      text: 'Products',
      path: "products",
    },
    {
      img: HiOutlineUsers,
      text: 'Users',
      path: "users"
    },
    {
      img: FcPositiveDynamic,
      text: 'Transactions',
      path: "transactions"
    },

  ]

  const navbarDataForAdmin = [
    {
      img: GrUserAdmin,
      text: 'Administration',
      path: "",
      subItem: [
       
        // {
        //   img: FcWorkflow,
        //   text: 'Entities Role',
        //   path: "entities-role"
        // },
        {
          img: FcHome,
          text: 'Dashboard',
          path: "homeLanding"
        },
        // {
        //   img: FcPositiveDynamic,
        //   text: 'Staff Transactions',
        //   path: "transactions"
        // },
        {
          img: FcCollaboration,
          text: 'Profile',
          path: "entities"
        },
        // {
        //   img: HiOutlineUsers,
        //   text: 'Users',
        //   path: "transactions"
        // },
        // {
        //   img: FcInvite,
        //   text: 'Invite',
        //   path: "invite"
        // },
      ]
    }
  ]

  const navbarDataForUser = [
    {
      img: FcHome,
      text: 'Dashboard',
      path: "homeLanding"
    },

    {
      img: FcPositiveDynamic,
      text: 'Transactions',
      path: "transactions"
    },
  ]

  if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
    navbarData = navbarDataForUser
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
    navbarData = navbarDataForAdmin
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
    navbarData = navbarDataForSuperAdmin
  }

  const getData = AuthStorage.getStorageData(STORAGEKEY.roles)
  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
      setShowItem("Administration")
    }
  }, [getData])

  const getStorage = AuthStorage.getStorageData(STORAGEKEY.userData)

  useEffect(() => {
    setUserData(JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)) ?? {})
  }, [getStorage])

  // useEffect(() => {
  //   setUserData(JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)))
  // }, [])



  return (
    <>


      {/* <!-- Vertical Navbar --> */}
      <Fade left>
        <div className={`${showSidebar ? ' sidebar-main' : 'sidebar-main '}`}>
          <GrClose size={30} className="close_sidebar" onClick={() => setSidebar(!showSidebar)} />
          <div className='profile-content pe-5'>
            <img alt="" src='../../../assets/img/logo.png' className='align-items-center m-2 mx-auto mt-3 profile-img' />
            <img alt="" src='../../../assets/img/wired.gif' className='user_img' />
            <div className='profile-name text-center'>
              <h1>{userData?.name}</h1>
              {/* <img alt="" src='../../../assets/img/about/logout.png' onClick={(e) => Logout(e)} className='mt-2' style={{ cursor: "pointer" }} /> */}
            </div>
          </div>

          <div className='sidebar-nav'>
            <Navbar>
              <div style={{ 'width': "100%", 'zIndex': '11111' }} className='navbar-light'>
                {
                  navbarData.map((item, i) => (
                    <div key={item} className={`${item.text === "Jobs" ? "d-block navbar-body" : 'navbar-body'} text-white`}>
                      <div className='d-flex align-items-center ps-3 gap-3 mx-2 my-4'>
                        <item.img size={20} />
                        <Nav.Link className=' p-0' onClick={() => ShowSubItem({ text: item.text, path: item.path })}>{item.text} {item.text === "Administration" ? <img alt="" src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showItem === "Administration" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                      </div>
                      {
                        showItem === item.text && "subItem" in item &&
                        item.subItem?.map((subItem, i) => {
                          return <>
                            <div key={subItem} className='d-flex align-items-center gap-3 mx-4 my-4 ps-2'>
                              <subItem.img size={20} />
                              <Nav.Link className=' p-0 ' onClick={() => ShowSubItem({ text: subItem.text, path: subItem.path })}>{subItem.text} {subItem.text === 'Master Data' ? <img alt="" src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showSubItem === "Master Data" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                            </div>
                            {
                              showSubItem === subItem.text && "subData" in subItem &&
                              subItem.subData?.map((subSubItem, i) => (
                                <div key={subSubItem} className='d-flex align-items-center gap-3 my-4 mx-4 ps-3'>
                                  <subSubItem.img size={16} />
                                  <NavLink className='text-white text-decoration-none' to={subSubItem.path} style={{ display: "block" }}>{subSubItem.text}</NavLink>
                                </div>
                              ))
                            }
                          </>
                        })
                      }
                    </div>
                  ))
                }
                {/* <!-- Divider --> */}
                <hr className="navbar-divider my-2 opacity-20" />
                {/* <!-- Navigation --> */}
                <div className="d-flex flex-column mx-3 ps-2 gap-3  my-4">
                  <div className="p-3">
                    {/* <Link className="nav-link">
                      <i className="bi bi-person-square"></i> <span className='ps-5'>Account</span>
                    </Link> */}
                  </div>
                  <hr width='100%' className="my-2 text-white opacity-10" />
                  <div className="">
                    <Link onClick={() => setshowModal(true)} className="nav-link" href="#">
                      <HiOutlineLogout className='text-white' size={22} /><span className='ps-3 fw-semibold text-danger'>Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Navbar>
          </div>
        </div>



        <div className="sidebar_responsive"></div>
      </Fade>
      {showModal && <LogoutModal show={showModal} onHide={() => setshowModal(false)} />}
    </>
  )
}

export default Sidebar