import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userGetAction } from "../../../redux/actions/userAction";
import { Table, Badge, Button, Menu, Dropdown, Input, Select, Tag } from "antd";

import { EditOutlined, EllipsisOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getUserDatas, setGetUserDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");


  const userData = useSelector((state) => state.userData?.getUserData);

  // useEffect(() => {
  //   if (userData?.data) {
  //     setGetUserDatas(userData.data); // Initialize with full data
  //   }
  // }, [userData]);
  useEffect(() => {
    if (userData?.data) {
      const sortedData = [...userData.data].sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded) 
      );
      setGetUserDatas(sortedData); 
    }
  }, [userData]);

  useEffect(() => {
    dispatch(userGetAction());
  }, [dispatch]);

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;

  // Filter data based on search term
  const filteredData = getUserDatas
  .filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
  )
  .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Ensure newest first


  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (value) => {
    setPostsPerPage(value); // Update postsPerPage state
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };
  const DATE_OPTIONS = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };



  const columns = [
    {
      title: "Date Added",
      dataIndex: "createdAt", // Key from your data
      key: "createdAt", // Sorting function
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // Sorting logic for Ant Design
      // defaultSortOrder: "descend", 
      render: (createdAt) =>
      new Date(createdAt).toLocaleDateString("en-US", DATE_OPTIONS), // Format the date for display
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text) => <Badge className="" status="success" text={text} />,
      align: "center",
    },

    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      align: "center",
    },

    {
      title: "Registration Status",
      dataIndex: "registrationStatus", // Match the field name sent from the backend
      key: "registrationStatus",
      align: "center",
      render: (text) => (
        <Tag color={text === "Registered" ? "green" : "orange"}>
          {text}
        </Tag>
      ),
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
              <div className="row align-items-center text-white mb-3 product"
                style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                  <h1 className="h2 mb-0 fw-bold fs-4 ls-tight">Users</h1>
                </div>

                <div className="col-sm-6 col-12 text-sm-end">
                  <div className="mx-n1 me-5 d-flex align-items-center justify-content-end gap-2">
                    {(localStorage.getItem("roles").toLowerCase() === "admin" ||
                      localStorage.getItem("roles").toLowerCase() ===
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
          <div className='mx-auto'>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: 300, marginBottom: 16 }}
            />

            <Select
              defaultValue={10} // Default rows per page
              style={{ width: 100, marginLeft: '10px' }}
              onChange={handleRowsPerPageChange}
              options={[
                { value: 5, label: "5 / page" },
                { value: 10, label: "10 / page" },
                { value: 20, label: "20 / page" },
                { value: 50, label: "50 / page" },
              ]}
            />
          </div>

          <div className="table-responsive">
            <Table
              dataSource={paginatedData}
              rowKey="_id"
              columns={columns}
              pagination={{
                pageSize: postsPerPage,
                total: filteredData?.length,
                onChange: handlePageChange,
              }}
              loading={!userData?.data} // Show loading spinner if getAllUsers is not available yet
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
