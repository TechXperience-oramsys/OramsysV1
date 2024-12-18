import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { userGetAction } from '../../../redux/actions/userAction';
import { Table, Badge, Button, Menu, Dropdown, Avatar } from "antd";

import { EditOutlined, EllipsisOutlined, UserOutlined } from "@ant-design/icons";
import { adminGetAction, adminGetByIdAction } from "../../redux/actions/adminAction";
import AuthStorage from "../../helper/AuthStorage";
import STORAGEKEY from "../../config/APP/app.config";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getUserDatas, setGetUserDatas] = useState([]);
  const [ setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const userData = useSelector((state) => state.adminData?.getAdminData);
  // console.log('get admin data', userData.data)
  let userId = AuthStorage.getStorageData(STORAGEKEY.roles) === "admin" ? AuthStorage.getStorageData(STORAGEKEY.userId) : "";

  useEffect(() => {
    setGetUserDatas(userData?.data);
  }, [userData]);

  useEffect(() => {
    if (userId) {
      dispatch(adminGetByIdAction(userId));
    } else {
      dispatch(adminGetAction());
    }
  }, [userId, dispatch]);

  // const indexOfLastItem = currentPage * postsPerPage;
  // const indexOfFirstItem = indexOfLastItem - postsPerPage;
  // const getAllUsers = getUserDatas?.data?.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      align: "center",
      render: (logo) => (
        <Avatar
          size={40} // Adjust size as needed
          src={logo}
          icon={<UserOutlined />} // Default icon if no logo is provided
          alt="Logo"
          style={{ backgroundColor: "#f0f0f0" }} // Optional: background color for the avatar
        />
      ),
    },
    {
      title: "Organisation",
      dataIndex: "corporationName",
      key: "corporationName",
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      render: (text) => <Badge className="" status="success" text={text} />,
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
   
    {
      title: "Admin Name",
      dataIndex: "adminName",
      key: "adminName",
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Email",
      dataIndex: "businessEmail",
      key: "businessEmail",
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    // {
    //   title: "Department",
    //   // dataIndex: 'department',
    //   key: "department",
    //   render: (text) => <Badge className="" status="success" text={text} />,
    //   align: "center",
    //   sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    // },

    // {
    //   title: "Profile",
    //   // dataIndex: 'profile',
    //   key: "profile",
    //   align: "center",
    //   sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "right",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                onClick={() => navigate(`/admin-edit?id=${record?._id}`)}
              >
                <EditOutlined /> Edit
              </Menu.Item>

              {/* <Menu.Item
                key="preview"
                onClick={() => {
                  navigate(`/profile?id=${record?._id}`, {
                    state: [{ type: `${record.type}` }, { isView: false }],
                  });
                }}
              >
                <EyeOutlined /> Preview
              </Menu.Item> */}
            </Menu>
          }
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="product">
        <div class="container-fluid">
          <div id="dash" class="mb-npx">
            <header class="bg-surface-primary pt-6">
              <div
                class="row align-items-center text-white mb-3 product"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)",
                }}
              >
                <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                  <h1 class="h2 mb-0 fw-bold fs-4 ls-tight">
                    {userId ? "Your profile" : "Corporations"}
                  </h1>
                </div>

                <div class="col-sm-6 col-12 text-sm-end">
                  <div class="mx-n1 me-5 d-flex align-items-center justify-content-end gap-2">
                    {AuthStorage.getStorageData(STORAGEKEY.roles) ===
                      "superAdmin" ? (
                      <Link
                        to="/create-admin"
                        style={{ borderColor: "#9E3E65" }}
                        class="btn d-inline-flex btn-md btn-light border-base mx-1 me-3"
                      >
                        <span class=" pe-2">
                          <i class="bi bi-plus"></i>
                        </span>
                        <span className="fw-bold">Add Organisation</span>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
        <div className="container mx-auto">
          <div class="row g-6 mb-4"></div>
          <div className="table-responsive">
            <Table
              dataSource={getUserDatas}
              columns={columns}
              pagination={{
                pageSize: postsPerPage,
                total: getUserDatas?.length,
                onChange: paginate,
              }}
              loading={!getUserDatas} // Show loading spinner if getAllUsers is not available yet
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
