import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  TableOutlined,
  
} from "@ant-design/icons";
import {  Button,  Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import STORAGEKEY from "../../config/APP/app.config";
import AuthStorage from "../../helper/AuthStorage";
import LogoutModal from "../../component/Modal/LogoutModal";
import { GrUserAdmin } from "react-icons/gr";
import { FaBoxOpen, FaOutdent, FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout, HiOutlineUsers } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaMoneyBillTransfer, FaUsersLine } from "react-icons/fa6";
// import Fade from "react-reveal/Fade";
import { ApiGet } from "../../helper/API/ApiData";
const { Header, Sider, Content } = Layout;

const Sidebar = ({ showSidebar, setSidebar }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setshowModal] = useState(false);
  // const [showItem, setShowItem] = useState("");
  // const [showSubItem, setShowSubItem] = useState("");
  const [userData, setUserData] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [logo, setLogo] = useState("");

  const adminId =
    AuthStorage.getStorageData(STORAGEKEY.roles) === "admin"
      ? AuthStorage.getStorageData("userId")
      : "";

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  let navbarData = [];

  const navbarDataForSuperAdmin = [
    {
      key: "1",
      icon: <AppstoreOutlined size={20} />,
      label: "Dashboard",
      path: "dashboard",
    },
    {
      key: "2",
      icon: <MdAdminPanelSettings size={20} />,
      label: "Administration",
      children: [
        {
          key: "2-1",
          icon: <TableOutlined />,
          label: "Master Data",
          children: [
            {
              key: "2-1-1",
              icon: <FileTextOutlined />,
              label: "Countries",
              path: "countries",
            },
            {
              key: "2-1-2",
              icon: <FileTextOutlined />,
              label: "Ports",
              path: "ports",
            },
            {
              key: "2-1-3",
              icon: <FileTextOutlined />,
              label: "Airports",
              path: "airports",
            },
            {
              key: "2-1-4",
              icon: <FileTextOutlined />,
              label: "Rating Agencies",
              path: "rating-agencies",
            },
          ],
        },
      ],
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: "Entities Role",
      path: "entities-role",
    },
    {
      key: "4",
      icon: <FaUsersLine size={20} />,
      label: "Entities",
      path: "entities",
    },
    {
      key: "5",
      icon: <FaBoxOpen />,
      label: "Products",
      path: "products",
    },
    {
      key: "6",
      icon: <HiOutlineUsers />,
      label: "Users",
      path: "users",
    },
    {
      key: "7",
      icon: <HiOutlineUsers />,
      label: "Corporations",
      path: "admins",
    },
    {
      key: "8",
      icon: <FaMoneyBillTransfer />,
      label: "Transactions",
      path: "transactions",
    },
  ];

  const navbarDataForAdmin = [
    {
      key: "1",
      icon: <GrUserAdmin />,
      label: "Administration",
      children: [
        {
          key: "1-1",
          icon: <AppstoreOutlined />,
          label: "Dashboard",
          path: "dashboard",
        },
        {
          key: "1-2",
          icon: <FaUsersLine />,
          label: "Profile",
          path: `admins`,
        },
        {
          key: "1-3",
          icon: <HiOutlineUsers />,
          label: "Users",
          path: "users",
        },
        {
          key: "1-4",
          icon: <FaMoneyBillTransfer />,
          label: "Transactions",
          path: "transactions",
        },

        {
          key: "1-5",
          icon: <FaOutdent />,
          label: "Workflow",
          path: "workflow",
        },
      ],
    },
  ];

  const navbarDataForUser = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      path: "dashboard",
    },
    {
      key: "2",
      icon: <FaUsersLine size={20} />,
      label: "Entities",
      path: "entities",
    },
    {
      key: "3",
      icon: <FaMoneyBillTransfer />,
      label: "Transactions",
      path: "transactions",
    },
  ];

  if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
    navbarData = navbarDataForUser;
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
    navbarData = navbarDataForAdmin;
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
    navbarData = navbarDataForSuperAdmin;
  }

  // const getData = AuthStorage.getStorageData(STORAGEKEY.roles);

  // useEffect(() => {
  //   if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
  //     setShowItem("Administration");
  //   }
  // }, [getData]);

  const getStorage = AuthStorage.getStorageData(STORAGEKEY.userData);

  useEffect(() => {
    setUserData(
      JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)) ?? {}
    );
    if (adminId.length > 0) {
      ApiGet(`admin/get-admin-by/${adminId}`)
        .then((res) => {
          setLogo(res.data[0]?.logo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getStorage, adminId]);

  const handleMenuClick = (item) => {
    setActiveItem(item.key);
    const clickedItem = navbarData
      .flatMap((item) =>
        item.children
          ? [
            item,
            ...item.children.flatMap((subItem) =>
              subItem.children ? [subItem, ...subItem.children] : subItem
            ),
          ]
          : item
      )
      .find((navItem) => navItem.key === item.key);

    if (clickedItem && clickedItem.path) {
      navigate(`/${clickedItem.path}`);
    }
  };

  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          // theme='dark'
          className="bg-gray-100"
          collapsible
          collapsed={collapsed}
          width={210}
        >
          <div className="demo-logo-vertical" />

          <div className="user-style">

            <div className={`align-items-center ${collapsed ? "justify-content-center w-100" : ""}`}>
              {logo?.length > 0 ? (<img src={logo} alt="user" className="user__logo" />
              ) : (
                <FaUserCircle size={30} />
              )}

            </div>
            {!collapsed && <span className="ms-2 fw-semibold">{userData?.name}</span>}
            {!collapsed && (
              <div className="mt-1">
                <button style={{ background: '#fff' }} onClick={() => setshowModal(true)}>
                  <HiOutlineLogout size={20} />
                </button>
              </div>
            )}
          </div>
          {/* <div className={`d-flex ${collapsed ? "justify-content-center" : "justify-content-between"} align-items-center p-3`} style={{ backgroundColor: "#F0F0F0" }}>
            <Dropdown overlay={
              <Menu>
                <Menu.Item key="logout" onClick={() => setshowModal(true)}>
                  <HiOutlineLogout size={20} /> Logout
                </Menu.Item>
              </Menu>
            }>
              <div className={`d-flex align-items-center ${collapsed ? "justify-content-center w-100" : ""}`}>
                {logo?.length > 0 ? (<img src={logo} alt="user" className="user__logo" />
                ) : (
                  <FaUserCircle size={30} />
                )}
                {!collapsed && <span className="ms-2">{userData?.name}</span>}
              </div>
            </Dropdown>

            {!collapsed && (
              <div className="">
                <button onClick={() => setshowModal(true)}>
                  <HiOutlineLogout size={20} />
                </button>
              </div>
            )}
          </div> */}
          <Menu
            className="fs-6 fw-semibold mt-10 bg-gray-100"
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[activeItem]}
            items={navbarData.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              children: item.children?.map((subItem) => ({
                key: subItem.key,
                icon: subItem.icon,
                label: subItem.label,
                path: subItem.path,
                children: subItem.children?.map((subSubItem) => ({
                  key: subSubItem.key,
                  icon: subSubItem.icon,
                  label: subSubItem.label,
                  path: subSubItem.path,
                })),
              })),
            }))}
            onClick={handleMenuClick}
          />
          <div
            className="footer"
            style={{
              position: "absolute",
              bottom: 10,
              width: "100%",
              textAlign: "center",
              color: "#a3a3a3",
            }}
          >
            <span>&copy;</span> 2024 Oramsys V1.0
          </div>
        </Sider>

        <Layout>
          <Header style={{ padding: 0, outline: "none" }}>
            <Button type="text"
              icon={collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: 18 }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: 18 }} />
                )
              } onClick={() => setCollapsed(!collapsed)} style={{fontSize: "16px", width: 64,  height: 64 }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              // background: 'colorBgContainer',
              borderRadius: borderRadiusLG,
            }}
          ></Content>
        </Layout>
      </Layout>

      {/* <!-- Vertical Navbar --> */}
      {/* <Fade left>
        <div className={`${showSidebar ? ' sidebar-main' : 'sidebar-main '}`}>
          <GrClose size={30} className="close_sidebar" onClick={() => setSidebar(!showSidebar)} />
          <div className='profile-content pe-5'>
            <img alt="" src='../../../assets/img/logo.png' className='align-items-center m-2 mx-auto mt-3 profile-img' />
            <FaUserCircle className='user_img' />
            <div className='profile-name text-center'>
              <h1>{userData?.name}</h1>
            </div>
          </div>

          <div className='sidebar-nav'>
            <Navbar>
              <div style={{ 'width': "100%", 'zIndex': '11111' }} className='navbar-light'>
                {
                  navbarData.map((item, i) => (
                    <div key={i} className={`${item.text === "Jobs" ? "d-block navbar-body" : 'navbar-body'}`}>
                      <div className={`d-flex align-items-center ps-3 gap-3 mx-2 my-4 ${activeItem === item.text ? 'active text-dark py-2 text-decoration-none rounded bg-indigo-100' : ''}`}>
                        <item.img size={25} />
                        <Nav.Link className={`p-0 font-bold text-md ${activeItem === item.text ? 'active' : ''}`} onClick={() => ShowSubItem({ text: item.text, path: item.path })}>{item.text} {item.text === "Administration" ? <img alt="" src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showItem === "Administration" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                      </div>
                      {
                        showItem === item.text && "subItem" in item &&
                        item.subItem?.map((subItem, i) => {
                          return <>
                            <div key={i} className={`d-flex align-items-center gap-3 mx-4 my-4 ps-2 ${activeItem === subItem.text ? 'active text-dark py-2 rounded bg-indigo-100' : ''}`}>
                              <subItem.img size={15} />
                              <Nav.Link className={`p-0 font-light `} onClick={() => ShowSubItem({ text: subItem.text, path: subItem.path })}>{subItem.text} {subItem.text === 'Master Data' ? <img alt="" src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showSubItem === "Master Data" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                            </div>
                            {
                              showSubItem === subItem.text && "subData" in subItem &&
                              subItem.subData?.map((subSubItem, i) => (
                                <div key={i} className={`d-flex align-items-center gap-3 my-4 mx-4 ps-3 ${activeItem === subSubItem.text ? 'active text-dark py-2 rounded bg-indigo-100' : ''}`}>
                                  <subSubItem.img size={16} />
                                  <NavLink className={`text-dark font-light text-decoration-none`} to={subSubItem.path} style={{ display: "block" }}>{subSubItem.text}</NavLink>
                                </div>
                              ))
                            }
                          </>
                        })
                      }
                    </div>
                  ))
                }

                <div className="d-flex flex-column mx-3 ps-2 gap-3  my-4">
                  <div className="p-3">
                  </div>
                  <div className="">
                    <Link onClick={() => setshowModal(true)} className="nav-link" href="#">
                      <HiOutlineLogout className='text-dark' size={25} /><span className='ps-3 fw-semibold'>Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Navbar>
          </div>
        </div>



        <div className="sidebar_responsive"></div>
      </Fade> */}
      {showModal && (
        <LogoutModal show={showModal} onHide={() => setshowModal(false)} />
      )}
    </>
  );
};

export default Sidebar;
