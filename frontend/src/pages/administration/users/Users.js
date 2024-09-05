import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userGetAction } from "../../../redux/actions/userAction";
import { Table, Badge, Button, Menu, Dropdown } from "antd";

import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getUserDatas, setGetUserDatas] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const userData = useSelector((state) => state.userData?.getUserData);

  // console.log("userData==================", userData);

  useEffect(() => {
    setGetUserDatas(userData);
  }, [userData]);

  // console.log('getUserData====================', getUserDatas)

  useEffect(() => {
    dispatch(userGetAction());
  }, []);

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const getAllUsers = getUserDatas?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text) => <Badge className="" status="success" text={text} />,
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },

    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      align: "center",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
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
                onClick={() => navigate(`/edit-user?id=${record?._id}`)}
              >
                <EditOutlined /> Edit
              </Menu.Item>

              <Menu.Item
                key="preview"
                onClick={() => {
                  navigate(`/edit-user?id=${record?._id}`, {
                    state: [{ type: `${record.type}` }, { isView: false }],
                  });
                }}
              >
                <EyeOutlined /> Preview
              </Menu.Item>
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
        <div className="container-fluid">
          <div id="dash" className="mb-npx">
            <header className="bg-surface-primary pt-6">
              <div
                className="row align-items-center text-white mb-3 product"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)",
                }}
              >
                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                  <h1 className="h2 mb-0 fw-bold fs-4 ls-tight">Users</h1>
                </div>

                <div className="col-sm-6 col-12 text-sm-end">
                  <div className="mx-n1 me-5 d-flex align-items-center justify-content-end gap-2">
                    {(localStorage.getItem("roles").toLowerCase() == "admin" ||
                      localStorage.getItem("roles").toLowerCase() ==
                        "superAdmin") && (
                      <Link to="/add-user" style={{ borderColor: "#9E3E65" }} className="btn d-inline-flex btn-md btn-light border-base mx-1 me-3">
                        <span className=" pe-2"> <i className="bi bi-plus"></i></span>
                        <span className="fw-bold">Add User</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="row g-6 mb-4"></div>
          <div className="table-responsive">
            <Table
              dataSource={getAllUsers}
              rowKey="_id"
              columns={columns}
              pagination={{
                pageSize: postsPerPage,
                total: userData?.data?.length,
                onChange: paginate,
              }}
              loading={!getAllUsers} // Show loading spinner if getAllUsers is not available yet
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
