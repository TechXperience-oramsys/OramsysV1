import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BsBox, BsFillPeopleFill } from "react-icons/bs";
// import { IoTimerOutline } from "react-icons/io5";
import { FcBusinessman } from "react-icons/fc";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthStorage from "../../helper/AuthStorage";
import STORAGEKEY from "../../config/APP/app.config";
import { useDispatch } from "react-redux";
import { productGetAction } from "../../redux/actions/productAction";
import { getAllTransaction } from "../../redux/actions/transactionDataAction";
import { entityGetAction } from "../../redux/actions/entityAction";
import { userGetAction } from "../../redux/actions/userAction";
import { ratingAgenciesAction } from "../../redux/actions/ratingAgenciesAction";
import { ApiGet } from "../../helper/API/ApiData";
import { BankOutlined, SearchOutlined, StockOutlined, BellOutlined, MailOutlined, RiseOutlined } from "@ant-design/icons";
import { Input, Menu } from "antd";
import ChartComponent from "./Analytics";
import Financials from "./Financials";
import NotificationSection from "./Notification";
import { adminGetAction } from "../../redux/actions/adminAction";
import { API } from "../../config/API/api.config";

const Dashboard = () => {
  // const token = AuthStorage.getToken();
  // const [showspan, setShowspan] = useState(false);
  // const [showSubData, setShowSubData] = useState(false);
  const [search] = useState("");

  // const { t } = useTranslation();

  const dispatch = useDispatch();
  const superAdminCard = [
    {
      title: "Transactions",
      img: "Transact",
      icon: GrTransaction,
      color: "bg-success",
      name: "transactions",
      status: "Completed",
    },
    {
      title: "Total Transactions Value",
      img: "sales",
      icon: StockOutlined,
      color: "bg-teal-500",
      name: "totalRev",
    },
    {
      title: "Available Products",
      img: "Product",
      icon: BsBox,
      color: "bg-primary",
      name: "products",
    },
    {
      title: "Registered Users",
      img: "Users",
      icon: BsFillPeopleFill,
      color: "bg-info",
      name: "users",
    },
    {
      title: "Entities",
      img: "entity",
      icon: FcBusinessman,
      color: "bg-warning",
      name: "entities",
    },
    {
      title: "Corporations",
      img: "admins",
      icon: CiUser,
      color: "bg-warning",
      name: "corporations",
    },
    {
      title: "Rating Agencies",
      img: "rating",
      icon: BankOutlined,
      color: "bg-red-600",
      name: "rating",
    },
  ];
  const adminCard = [
    {
      title: "Transactions",
      img: "Transact",
      icon: GrTransaction,
      color: "bg-success",
      name: "transactions",
      status: "Completed",
    },
    {
      title: "Transactions in progress",
      img: "Transact",
      icon: GrTransaction,
      color: "bg-danger",
      name: "inProgress",
      status: "Not Completed",
    },
    {
      title: "Transactions Value",
      img: "sales",
      icon: StockOutlined,
      color: "bg-teal-500",
      name: "totalRev",
    },

    {
      title: "Registered Users",
      img: "Users",
      icon: BsFillPeopleFill,
      color: "bg-info",
      name: "users",
    },

  ];
  const userCard = [
    {
      title: "Transactions",
      img: "Transact",
      icon: GrTransaction,
      color: "bg-success",
      name: "transactions",
      status: "Completed",
    },
    {
      title: "Transactions in progress",
      img: "Transact",
      icon: GrTransaction,
      color: "bg-danger",
      name: "inProgress",
      status: "Not Completed",
    },
    {
      title: "Your Transactions Value",
      img: "sales",
      icon: StockOutlined,
      color: "bg-teal-500",
      name: "totalRev",
    },

  ];

  const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction);
  const productGetDatas = useSelector((state) => state.product.product);
  const getAllUsers = useSelector((state) => state.userData.getUserData);
  const getAllEntities = useSelector((state) => state.entityData.entity);
  const ratingAgenciesDatas = useSelector((state) => state.ratingAgenciesData?.ratingAgencies);
  const adminDatas = useSelector((state) => state.adminData?.getAdminData);
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [worfFlowCount, setworkflowcount] = useState()

  const totalValue = useMemo(() => {
    if (!getAlltransactionData?.data) return "0";

    const sum = getAlltransactionData.data.reduce((acc, item) => {
      let value = item?.details?.contractDetails?.value;

      // Remove any non-numeric characters except the decimal point
      value = typeof value === "string" ? value.replace(/[^0-9.]/g, "") : value;

      return acc + (value ? parseFloat(value) : 0);
    }, 0);

    // Format the sum with commas
    return sum.toLocaleString();
  }, [getAlltransactionData]);

  const signedCount = [];
  const notSignedCount = [];
  //check to geet the number of signed transactions and un-signed transaction
  if (getAlltransactionData?.data) {
    getAlltransactionData.data.forEach((item) => {  // Use forEach instead of map
      if (item.termSheet === "Signed") {
        signedCount.push(item);
      } else {
        notSignedCount.push(item);
      }
    });
  }
  //Get data counts on everything
  const getCount = useCallback(
    (name) => {
      switch (name) {
        case "totalRev":
          return totalValue;
        case "transactions":
          return getAlltransactionData?.data?.length;
        case "products":
          return productGetDatas?.data?.length;
        case "users":
          return getAllUsers?.data?.length; // or the array of users like users.length;
        case "entities":
          return getAllEntities?.data?.length;
        case "corporations":
          return adminDatas?.data?.length;
        case "rating":
          return ratingAgenciesDatas?.data?.length;

        default:
          return;
      }
    },
    [
      getAllUsers,
      getAlltransactionData,
      productGetDatas,
      getAllEntities,
      adminDatas,
      ratingAgenciesDatas,
      totalValue
    ]
  );

  //get all transaction
  const Authsend = useCallback(() => {
    let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin" ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all";
    dispatch(getAllTransaction(id));
  }, [dispatch]);

  const prodAction = useCallback(() => {
    dispatch(productGetAction("all"));
  }, [dispatch]);

  const entityAction = useCallback(() => {
    dispatch(entityGetAction("all"));
  }, [dispatch]);
  const userAction = useCallback(() => {
    dispatch(userGetAction());
  }, [dispatch]);
  const agencyAction = useCallback(() => {
    dispatch(ratingAgenciesAction());
  }, [dispatch]);
  const adminAction = useCallback(() => {
    dispatch(adminGetAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(() => Authsend());
    dispatch(() => prodAction());
    dispatch(() => entityAction());
    dispatch(() => userAction());
    dispatch(() => agencyAction());
    dispatch(() => adminAction());
    // eslint-disable-next-line
    fetchData()
  }, []);

  const BaseURL = API;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BaseURL}api/workflow/getuserFlow?assignedUser=${currentUser?.email}&addedBy=${currentUser?.admin?._id}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      fetchTransactionCounts(result?.workflowDocument?.admin?.id, result?.workflowDocument?.department);

      // setworkFlow(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      // setError(err.message);
    }
  };

  const fetchTransactionCounts = async (adminId, workflowStepName) => {
    const url = `${BaseURL}api/workFlow/counts?admin=${adminId}&workflowStepName=${encodeURIComponent(workflowStepName)}`;

    try {
      const response = await fetch(url, {
        method: 'GET', // Use GET method to fetch data
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json(); // Parse the response body as JSON
      setworkflowcount(data?.counts)
      console.log('Counts:', data.counts); // Log the counts to the console
      return data.counts; // Return the counts
    } catch (error) {
      console.error('Error fetching counts:', error); // Handle errors
    }
  };



  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return value;
    } else {
      return data;
    }
  };
  const downloadTermSheet = (id, name) => {
    ApiGet(`transaction/termSheet/${id}`)
      .then((res) => {
        let data = res.data.data;
        if (name === "view") {
          ViewRiskAssessment(data);
        } else if (name === "download") {
          converBase64toBlob(data);
        }
      })
      .catch((e) => console.log(e));
  };
  const converBase64toBlob = (content, contentType) => {
    const linkSource = `data:application/pdf;base64,${content}`;
    const downloadLink = document.createElement("a");
    const fileName = "TermSheet.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const ViewRiskAssessment = (contents) => {
    const linkSources = `data:application/pdf;base64,${contents}`;
    let pdfWindow = window.open("");
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src=${linkSources}></iframe>`
    );
  };

  // tab menu iteems
  const items = [
    {
      label: "Overview",
      key: "overview",
      icon: <MailOutlined />,
    },
    {
      label: "Analytics",
      key: "analytics",
      icon: <RiseOutlined />,
    },
    {
      label: "Financials",
      key: "financials",
      icon: <FaMoneyCheckAlt />,
    },
    {
      label: "Notifications",
      key: "notifications",
      icon: <BellOutlined />,
    },
  ];

  const [current, setCurrent] = useState("overview");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  // render tab meu contents
  const renderContent = () => {
    switch (current) {
      case "overview":
        return (
          <div>
            <div className="container-fluid">
              <div className="row g-6 mb-6">

                {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" &&
                  superAdminCard.map((card, i) => (
                    <div className='col-xl-4 mb-3 col-sm-6 col-12' key={i}>
                      {/* <div className="bg-blue-400 pb-3"></div> */}
                      <div className='card shadow border-0'>
                        <div className='card-body'>
                          <div className='row'>

                            <div className='col'>
                              <span className='h6 font-semibold fw-2 text-muted text-md d-block mb-2'>
                                {card.title}
                              </span>
                              <span className='h3 font-bold mb-0'>
                                {getCount(card.name)}
                              </span>
                            </div>
                            <div className='col-auto'>
                              <div className={`icon icon-shape rounded-circle`}>
                                <card.icon size={30} />
                              </div>
                            </div>
                          </div>
                          <div className='mt-2 mb-0 text-sm'>
                            {card.status === "Completed" ? (
                              <>
                                {" "}
                                <span className='badge badge-pill bg-soft-success text-success me-2'>
                                  {signedCount.length}
                                </span>
                                <span className='text-nowrap text-xs text-muted'>
                                  Completed
                                </span>
                                <span className='badge mx-2 badge-pill bg-danger text-success-white me-2'>
                                  {notSignedCount.length}
                                </span>
                                <span className='text-nowrap text-xs text-muted'>
                                  In Progress...
                                </span>
                              </>
                            ) : (
                              <>
                                <span className='text-nowrap text-xs text-muted'>
                                  {card.title === "Available Products" ? (
                                    <Link className='text-decoration-none' to='/products'>
                                      View Products{" "} <i className='bi bi-arrow-right me-1'></i>
                                    </Link>
                                  ) : card.title === "Registered Users" ? (
                                    <Link className='text-decoration-none' to='/users'>
                                      View Users{" "} <i className='bi bi-arrow-right me-1'></i>
                                    </Link>
                                  ) : card.title === "Entities" ? (
                                    <Link className='text-decoration-none' to='/entities'>
                                      View Entities{" "} <i className='bi bi-arrow-right me-1'></i>
                                    </Link>
                                  ) : ( "" )}
                                </span>
                              </>
                            )}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))
                }


                {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && userCard.map((card, i) => (
                  // <>
                  <div className="col-6 mb-3 col-sm-6 col-12" key={i}>
                    <div className="card shadow border-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <span className="h6 font-semibold fw-2 text-muted text-md d-block mb-2">
                              {card.title}
                            </span>
                            {card.status === "Completed" ? (
                              <span className="h3 font-bold mb-0">
                                {signedCount.length}
                              </span>
                            ) : card.status === "Not Completed" ? (
                              <span className="h3 font-bold mb-0">
                                {notSignedCount.length}
                              </span>
                            ) : (
                              <span className="h3 font-bold mb-0">
                                {getCount(card.name)}
                              </span>
                            )}

                          </div>
                          <div className="col-auto">
                            <div className={`icon icon-shape rounded-circle`}>
                              <card.icon size={30} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 mb-0 text-sm">
                          {card.status === "Completed" ? (
                            <>
                              <span className="badge badge-pill bg-soft-success text-success me-2">
                                {signedCount.length}
                              </span>
                              <span className="text-nowrap text-xs text-muted">
                                Completed
                              </span>
                            </>
                          ) : card.status === "Not Completed" && (
                            <>
                              <span className="badge mx-2 badge-pill bg-danger text-success-white me-2">
                                {notSignedCount.length}
                              </span>
                              <span className="text-nowrap text-xs text-muted">
                                In Progress...
                              </span>
                            </>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>




                ))}


                {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" &&    // <>
                  <div className="col-6 mb-3 col-sm-6 col-12" >
                    <div className="card shadow border-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <span className="h6 font-semibold fw-2 text-muted text-md d-block mb-2">
                              Workflow
                            </span>



                          </div>
                          <div className="col-auto">
                            <div className={`icon icon-shape rounded-circle`}>
                              {/* <card.icon size={30} /> */}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 mb-0 text-sm">

                          <>
                            <span className="badge badge-pill bg-soft-success text-success me-2">
                              {worfFlowCount?.withWorkflowStep}
                            </span>
                            <span className="text-nowrap text-xs text-muted">
                              Completed
                            </span>
                          </>

                          <>
                            <span className="badge mx-2 badge-pill bg-danger text-success-white me-2">
                              {worfFlowCount?.withoutWorkflowStep}
                            </span>
                            <span className="text-nowrap text-xs text-muted">
                              In Progress...
                            </span>
                          </>


                        </div>
                      </div>
                    </div>
                  </div>
                }

                {AuthStorage.getStorageData(STORAGEKEY.roles) === "admin" && adminCard.map((card, i) => (

                  <div className="col-6 mb-3 col-sm-6 col-12" key={i}>
                    <div className="card shadow border-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <span className="h6 font-semibold fw-2 text-muted text-md d-block mb-2">
                              {card.title}
                            </span>
                            {card.status === "Completed" ? (
                              <span className="h3 font-bold mb-0">
                                {signedCount.length}
                              </span>
                            ) : card.status === "Not Completed" ? (
                              <span className="h3 font-bold mb-0">
                                {notSignedCount.length}
                              </span>
                            ) : (
                              <span className="h3 font-bold mb-0">
                                {getCount(card.name)}
                              </span>
                            )}

                          </div>

                          <div className="col-auto">
                            <div className={`icon icon-shape rounded-circle`}>
                              <card.icon size={30} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 mb-0 text-sm">
                          {card.status === "Completed" ? (
                            <>
                              <span className="badge badge-pill bg-soft-success text-success me-2">
                                {signedCount.length}
                              </span>
                              <span className="text-nowrap text-xs text-muted">
                                Completed
                              </span>
                            </>
                          ) : card.status === "Not Completed" ? (
                            <>
                              <span className="badge mx-2 badge-pill bg-danger text-success-white me-2">
                                {notSignedCount.length}
                              </span>
                              <span className="text-nowrap text-xs text-muted">
                                In Progress...
                              </span>
                            </>
                          ) : (
                            <>
                              <span className='text-nowrap text-xs text-muted'>
                                {card.title === "Registered Users" && (
                                  <Link className='text-decoration-none' to='/users'>
                                    View Users{" "} <i className='bi bi-arrow-right me-1'></i>
                                  </Link>
                                )}
                                {card.title === "Transactions Value" && (
                                  <Link className='text-decoration-none' to='/transactions'>
                                    See Transactions{" "} <i className='bi bi-arrow-right me-1'></i>
                                  </Link>
                                )}
                              </span></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                ))}

              </div>


              <div className="card shadow border-0 mb-7">
                <div className="card-header">
                  <div className="input-group w-50 ">
                    <h4>Transactions</h4>
                  </div>
                  <div className="table-responsive text-center">
                    <table className="table table-bordered border-light caption-top border-2 table-hover table-nowrap">
                      <thead className="thead-light ">
                        <tr>
                          <th scope="col">Date Created</th>
                          <th scope="col">Borrower</th>
                          <th scope="col">Lender</th>
                          <th scope="col">Value</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!getAlltransactionData ? (
                          <div className="text-center">
                            {" "}
                            No records were found
                          </div>
                        ) : (
                          getAlltransactionData &&
                          getAlltransactionData?.data
                            ?.filter((item) => {
                              return search.toLowerCase() === ""
                                ? item
                                : item.borrower_Applicant
                                  .toLowerCase()
                                  .includes(search);
                            })
                            .map((data, i) => (
                              <tr key={i}>
                                <td> {new Date(data.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)} </td>
                                <td> <div className="text-decoration-none text-heading font-semibold">{data.borrower_Applicant} </div>
                                </td>

                                <td>
                                  <div className="text-decoration-none  text-heading font-semibold">{data.lenders}</div>
                                </td>
                                <td>{formateCurrencyValue(data?.details?.contractDetails?.value)}
                                </td>
                                <td className={` ${data.termSheet === "Not Signed"
                                  ? "bg-red-100" : "bg-green-200"}`}>
                                  {data.termSheet === "Signed" ? (
                                    <span className="badge badge-lg text-heading badge-dot">
                                      <i className="bg-success"></i>Signed
                                    </span>
                                  ) : (
                                    <span className="badge badge-lg text-heading badge-dot">
                                      <i className="bg-danger"></i>Not Signed
                                    </span>
                                  )}
                                </td>
                                <td className="text-end text-center">
                                  <div onClick={() => {
                                    data.termSheet === "Not Signed"
                                    ? downloadTermSheet(data._id, "view") : ViewRiskAssessment();
                                  }}
                                    className="btn btn-sm btn-neutral">
                                    View Termsheet
                                  </div>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                    {getAlltransactionData?.data?.length < 1 && (
                      <div className="text-center mx-auto container py-5 my-5 m-5">
                        {" "}
                        No records were found
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      case "analytics":
        return (
          <div>
            <ChartComponent />
          </div>
        );
      case "financials":
        return (
          <div>
            <Financials />
          </div>
        );
      case "notifications":
        return (
          <div>
            <NotificationSection />
          </div>
        );
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <>
      <div className="mx-5 d-flex flex-column flex-lg-row h-lg-full">
        <div id="dash" className="h-screen flex-grow-1">
          {/* <!-- Header --> */}
          <header className="bg-surface-primary pt-6">
            <div className="container-fluid">
              <div id="dash" className="mb-npx">
                <div className="row align-items-center text-indigo-900 mb-4">
                  <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                    {/* <!-- Title --> */}
                    <h1 className="h2 mb-0 fw-bold fs-4 ls-tight">Dashboard</h1>

                    <Menu
                      onClick={onClick}
                      selectedKeys={[current]}
                      mode="horizontal"
                      items={items}
                    />
                  </div>
                  {/* <!-- Actions --> */}
                  <div className="col-sm-6 col-12 text-sm-end">
                    <div className="mx-n1">
                      {/* <Link to='/transactions' className='btn btn-primary rounded d-inline-flex btn-md border-base mx-1'>
                        <span className=' pe-2'><i className='bi bi-pencil'></i></span>
                        <span>Transactions</span>
                      </Link> */}
                      <Input
                        placeholder="Search "
                        prefix={<SearchOutlined />}
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 300 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Main --> */}
          <main className="py-6">
            {renderContent()}
            {/* <div className="container mt-5">
                <h2>My Graph</h2>
                <Bar data={data} />
              </div> */}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
