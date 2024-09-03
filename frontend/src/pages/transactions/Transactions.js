import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthStorage from "../../helper/AuthStorage";
import STORAGEKEY from "../../config/APP/app.config";
import { getAllTransaction } from "../../redux/actions/transactionDataAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRiskAssessment } from "../../redux/actions/riskAssessmentAction";
import ExcelModal from "../../component/Modal/ExcelModal";
import { ApiGet } from "../../helper/API/ApiData";
import { GET_TRANSACTION_BY_ID } from "../../redux/types";
import { CiSearch } from "react-icons/ci";
import Paginate from "./Pagination";
import Fade from "react-reveal/Fade";
import {
  Table,
  Dropdown as AntDropdown,
  Button as AntButton,
  Menu,
} from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const Transactions = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [sendId, setSendId] = useState();

  const navigate = useNavigate();
  const [showSubData, setShowSubData] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [transaction2, setTransaction2] = useState([]);
  const [userName, setUserName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [setSearch] = useState("");

  const getAlltransactionData = useSelector(
    (state) => state.transactionData.getAllTransaction
  );
  const riskAssessment = useSelector(
    (state) => state.riskAssessmentData.getRiskAssessment
  );
  const loginData = useSelector((state) => state.login.login);

  useEffect(() => {
    let id =
      AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin"
        ? AuthStorage.getStorageData(STORAGEKEY.userId)
        : "all";
    dispatch(getAllTransaction(id));
  }, [dispatch]);

  const refreshPage = useCallback(() => {
    if (
      getAlltransactionData &&
      getAlltransactionData.data &&
      getAlltransactionData.data.length > 0
    ) {
      setTransaction(
        getAlltransactionData.data?.map((item) => {
          return {
            ...item,
            details: {
              ...item?.details,
              shippingOptions: {
                ...item?.details?.shippingOptions,
                portOfOrigin:
                  item?.details?.shippingOptions?.portOfOrigin ??
                  item?.details?.shippingOptions?.airbaseOfOrigin,
                destinationPort:
                  item?.details?.shippingOptions?.destinationPort ??
                  item?.details?.shippingOptions?.destinationAirbase,
              },
            },
          };
        })
      );

      setTransaction2(
        getAlltransactionData.data?.map((item) => {
          return {
            ...item,
            details: {
              ...item?.details,
              shippingOptions: {
                ...item?.details?.shippingOptions,
                portOfOrigin:
                  item?.details?.shippingOptions?.portOfOrigin ??
                  item?.details?.shippingOptions?.airbaseOfOrigin,
                destinationPort:
                  item?.details?.shippingOptions?.destinationPort ??
                  item?.details?.shippingOptions?.destinationAirbase,
              },
            },
          };
        })
      );
    }
  }, [getAlltransactionData]);

  useEffect(() => {
    dispatch(() => refreshPage());
    //eslint-disable-next-line
  }, [getAlltransactionData]);

  useEffect(() => {
    if (riskAssessment.status === 200 && selected) {
      // if (riskAssessment && riskAssessment.data && riskAssessment.data.transactionId   ) {
      navigate(`/risk-assessment?id=${selected}`);
      // }
    }
  }, [riskAssessment, selected, navigate]);

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

  const handleRefresh = () => {
    dispatch({
      type: GET_TRANSACTION_BY_ID,
      payload: {},
    });
    navigate("/edit-transactions", {
      state: [{ type: "Export" }, { type: "Physical" }],
    });
  };
  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return value;
    } else {
      return data;
    }
  };
  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const indexOfLastTrans = currentPage * postsPerPage;
  const indexOfFirstTrans = indexOfLastTrans - postsPerPage;
  const currentTrans = transaction?.slice(indexOfFirstTrans, indexOfLastTrans);
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const checkSearch = (e) => {
    const filtered = transaction2.filter((item) => {
      // Check if item.borrower_Applicant and item.lenders are strings
      if (
        typeof item.borrower_Applicant !== "string" ||
        typeof item.lenders !== "string"
      ) {
        return false;
      }

      // Check if item.details.productDetails.name is an object and contains the property 'name'
      if (
        typeof item.details.productDetails.name === "object" &&
        item.details.productDetails.name !== null &&
        "name" in item.details.productDetails.name
      ) {
        // Convert item.details.productDetails.name to lowercase if it's a string
        const productName = item.details.productDetails.name.name.toLowerCase();
        // Check if productName includes the search value
        return productName.includes(e.target.value.toLowerCase());
      }

      return false;
    });

    setTransaction(filtered);
  };

  const handleItemClick = (type) => {
    navigate("/edit-transactions", { state: [{ type }] });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        new Date(createdAt).toLocaleDateString("en-US", DATE_OPTIONS),
      className: "hide-on-md",
    },
    {
      title: "Created by",
      key: "createdBy",
      align: "center",
      className: "hide-on-md",
      render: () => loginData?.data?.name,
    },
    // {
    //   title: "Transaction Number",
    //   dataIndex: "_id",
    //   key: "_id",
    //   className: "hide-on-md",
    // },
    {
      title: "Borrower",
      dataIndex: "borrower_Applicant",
      key: "borrower_Applicant",
    },
    {
      title: "Lender",
      dataIndex: "lenders",
      key: "lenders",
    },
    {
      title: "Contract Value",
      dataIndex: ["details", "contractDetails", "value"],
      key: "contractValue",
      align: "center",
      render: (value) => formateCurrencyValue(value),
    },
    // {
    //   title: 'Created by',
    //   dataIndex: 'createdBy',
    //   key: 'lenders',
    //   render: (record) => {

    //   }
    // },
    // {
    //   title: 'Product',
    //   key: 'product',
    //   sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    //   render: (text, record) => {
    //     const productName = record.details.productDetails.name?.name;
    //     const otherProduct = record.details.productDetails.otherProduct;
    //     return productName || otherProduct;
    //   }
    // },
    {
      title: "Product",
      dataIndex: ["details", "productDetails", "name", "name"],
      key: "product",
    },
    {
      title: "Termsheet",
      dataIndex: "termSheet",
      key: "termSheet",
      className: "hide-on-md",
      render: (termSheet, record) => (
        <div
          className={`${termSheet === "Not Signed" ? "bg-red-100" : "bg-green-100"
            } text-center cursor-pointer`}
        >
          <p
            onClick={() => {
              if (termSheet === "Not Signed") {
                setShowExcelModal(true);
                setSendId(record._id);
              }
            }}
          >
            {termSheet}
            {termSheet === "Signed" ? (
              <DownloadOutlined
                className="ms-3"
                onClick={() => {
                  downloadTermSheet(record._id);
                }}
              />
            ) : null}
          </p>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <AntDropdown
          overlay={
            <Menu>
              <Menu.Item
                onClick={() => {
                  navigate(`/edit-transactions?id=${record._id}`, {
                    state: [
                      { type: record.type },
                      {
                        type: record?.details?.productDetails?.nature
                          ? record.details.productDetails.nature
                          : "",
                      },
                      { isView: false },
                    ],
                  });
                }}
              >
                <EditOutlined /> Edit
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  navigate(`/edit-transactions?id=${record._id}`, {
                    state: [
                      { type: record.type },
                      {
                        type: record?.details?.productDetails?.nature
                          ? record.details.productDetails.nature
                          : "",
                      },
                      { isView: true },
                    ],
                  });
                }}
              >
                <EyeOutlined /> Preview
              </Menu.Item>
              {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                <Menu.Item
                  onClick={() => {
                    dispatch(getRiskAssessment(record._id));
                    setSelected(record._id);
                  }}
                >
                  <FormOutlined /> Risk Assessment
                </Menu.Item>
              )}
              <Menu.Item
                onClick={() => {
                  record.termSheet === "Not Signed"
                    ? downloadTermSheet(record._id, "view")
                    : ViewRiskAssessment();
                }}
              >
                <EyeOutlined /> View Termsheet
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  record.termSheet === "Not Signed"
                    ? downloadTermSheet(record._id, "download")
                    : converBase64toBlob(record.termSheetUrl);
                }}
              >
                <DownloadOutlined /> Download Termsheet
              </Menu.Item>
            </Menu>
          }
        >
          <AntButton>
            <EllipsisOutlined />
          </AntButton>
        </AntDropdown>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="import" onClick={() => handleItemClick("Import")}>
        Import
      </Menu.Item>
      <Menu.SubMenu
        title="Export"
        onTitleClick={() => setShowSubData(!showSubData)}
      >
        <Menu.Item key="Physical" onClick={handleRefresh}>
          Physical commodities
        </Menu.Item>
        <Menu.Item key="non-physical" onClick={() => handleItemClick("Export")}>
          Non-physical commodities
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <>


      <div className='mx-5 d-flex flex-column flex-lg-row h-lg-full'>
        <div id='dash' className='h-screen flex-grow-1'>
          <header className='bg-surface-primary pt-6'>
            <div className='container-fluid'>
              <div id='dash' className='mb-npx'>
                <div className='row text-white align-items-center mb-3 product' style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                  <div className='col-sm-6 col-12 mb-4 mb-sm-0'>

                    <h1 className='h2 mb-0 fw-bold fs-4 ls-tight'>Transactions</h1>
                  </div>

                  <div className="col-sm-6 col-12 text-sm-end">
                    <div className="mx-n1 me-5 d-flex align-items-center justify-content-end gap-2">
                      {/* <Link to='/transactions' style={{ borderColor: '#9E3E65' }} className='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                        <span className=' pe-2'>
                          <i className='bi bi-pencil'></i>
                        </span>
                        <span className='fw-bold'>Edit</span>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <Fade>
            <main className="py-2">
              <div className="container-fluid">
                <div className="row g-6 mb-4"></div>

                <div className="container mx-auto">
                  <div className="mb-2 d-flex justify-content-start align-items-center">
                    <div className="position-relative">
                      <span className="position-absolute search">
                        <CiSearch size={25} />
                      </span>
                      <input
                        type="text"
                        id="search"
                        onKeyUp={(e) => checkSearch(e)}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control w-100 ps-5 fw-light border-none"
                        placeholder="Search transaction..."
                      />
                    </div>

                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" ? (
                      <AntDropdown overlay={menu} trigger={["click"]}>
                        <AntButton
                          className="btn d-inline-flex btn-md btn-light mx-1 py-2 me-3"
                          id="dropdown-autoclose-outside"
                        >
                          <span className="">Create transaction</span>
                        </AntButton>
                      </AntDropdown>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mt-10 table-responsive form ">
                    <Table
                      columns={columns}
                      dataSource={currentTrans}
                      rowKey="_id"
                      loading={!currentTrans}
                      pagination={{
                        total: getAlltransactionData?.data?.length,
                        pageSize: postsPerPage,
                        current: currentPage,
                        onChange: (page) => setCurrentPage(page),
                      }}
                    />
                  </div>
                  <div className=" border-0 mb-0">
                    <span className="text-muted text-sm">
                      <Paginate
                        postsPerPage={postsPerPage}
                        totalPosts={getAlltransactionData?.data?.length}
                        paginate={paginate}
                        prevPagefunc={() => setCurrentPage((prev) => prev - 1)}
                        nextPagefunc={() => setCurrentPage((prev) => prev + 1)}
                        currentPage={currentPage}
                        currentTrans={currentTrans}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </main>
          </Fade>
        </div>
      </div>

      {showExcelModal && (
        <ExcelModal
          refreshpage={() => dispatch(() => refreshPage())}
          show={showExcelModal}
          onHide={() => setShowExcelModal(false)}
          getId={sendId}
        />
      )}
    </>
  );
};

export default Transactions;
