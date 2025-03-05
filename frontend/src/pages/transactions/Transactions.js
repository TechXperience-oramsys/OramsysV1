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
// import Paginate from "./Pagination";
// import Fade from "react-reveal/Fade";
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
import { Col, Form, Modal, Row } from "react-bootstrap";

const Transactions = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [sendId, setSendId] = useState();

  const navigate = useNavigate();
  const [showSubData, setShowSubData] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [transaction2, setTransaction2] = useState([]);
  // const [userName, setUserName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [setSearch] = useState("");
  const [isPreview, setIsPreview] = useState(false)
  const [workFlowNotes, setWorkFlowNotes] = useState([])

  const getAlltransactionData = useSelector(
    (state) => state.transactionData.getAllTransaction
  );

  const riskAssessment = useSelector(
    (state) => state.riskAssessmentData.getRiskAssessment
  );
  // const loginData = useSelector((state) => state.login.login);

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
        let data = res.data.data
        if (name === "view") {
          ViewRiskAssessment(data)
        } else if (name === "download") {
          converBase64toBlob(data)
        }
      })
      .catch((e) => console.log(e))
  }

  const converBase64toBlob = (content, contentType) => {
    const linkSource = `data:application/pdf;base64,${content}`
    const downloadLink = document.createElement("a")
    const fileName = "TermSheet.pdf"

    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }

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
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const indexOfLastTrans = currentPage * postsPerPage;
  const indexOfFirstTrans = indexOfLastTrans - postsPerPage;
  const currentTrans = transaction?.slice(indexOfFirstTrans, indexOfLastTrans);

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
      align: "center",
    },
    {
      title: "Borrower",
      dataIndex: "borrower_Applicant",
      key: "borrower_Applicant",
      align: "center",
    },
    {
      title: "Lender",
      dataIndex: "lenders",
      key: "lenders",
      align: "center",
    },
    {
      title: "Contract Value",
      dataIndex: ["details", "contractDetails", "value"],
      key: "contractValue",
      align: "center",
      render: (value) => formateCurrencyValue(value),
    },
    {
      title: "Product",
      dataIndex: ["details", "productDetails", "name", "name"],
      key: "product",
      align: "center",
    },
    {
      title: "Termsheet",
      dataIndex: "termSheet",
      key: "termSheet",
      className: "hide-on-md",
      render: (termSheet, record) => (
        <div className={`${termSheet === "Not Signed" ? "bg-red-100 text-danger" : "bg-green-100 text-success"} rounded-pill text-center cursor-pointer`}>
          <p onClick={() => {
            if (termSheet === "Not Signed") {
              setShowExcelModal(true);
              setSendId(record._id);
            }
          }}>
            {termSheet}
            {record.termSheet === "Signed" ? (
              <DownloadOutlined className="ms-3" onClick={() => { downloadTermSheet(record._id, "download") }} />
            ) : null}
          </p>
        </div>
      ),
    },
    {
      title: "Workflow Step Name",
      dataIndex: "workFlowSteps",
      key: "workflowStepName",
      render: (workFlowSteps) =>
        workFlowSteps && workFlowSteps.length > 0
          ? workFlowSteps[workFlowSteps.length - 1] // Show last step
          : "In Progress", // Show "In Progress" for empty array
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (record) => (
        <AntDropdown placement="bottomRight"
          overlay={
            <Menu>
              {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                <Menu.Item
                  onClick={() => {
                    navigate(`/edit-transactions?id=${record._id}`,
                      {
                        state: [{ type: record.type },
                        { type: record?.details?.productDetails?.nature ? record.details.productDetails.nature : "" },
                        { isView: false },
                        ],
                      });
                  }}
                >
                  <EditOutlined className='pe-2' /> Edit
                </Menu.Item>
              )}


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
                }}>
                <EyeOutlined className='pe-2' /> Preview
              </Menu.Item>

              {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                <Menu.Item
                  onClick={() => {
                    dispatch(getRiskAssessment(record._id));
                    setSelected(record._id);
                  }}
                >
                  <FormOutlined className='pe-2' /> Risk Assessment
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
                  setIsPreview(true)
                  console.log(record, 'recordrecordrecord');

                  setWorkFlowNotes(record?.workflowstepNotes);
                }}
              >
                <EyeOutlined className='pe-2' /> View Flowstep Notes
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
      <Menu.SubMenu title="Export" onTitleClick={() => setShowSubData(!showSubData)}>
        <Menu.Item key="Physical" onClick={handleRefresh}>
          Physical commodities
        </Menu.Item>
        <Menu.Item key="non-physical" onClick={() => handleItemClick("Export")}>
          Non-physical commodities
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const ViewNotes = () => {
    return (
      <Modal show={isPreview} onHide={() => setIsPreview(false)} centered className="w-90" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Workflow Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {workFlowNotes.length > 0 ? (
            <Row>
              {workFlowNotes.map((note, index) => (

                <Form.Group className="mb-1">


                  <div className="d-flex"> <p>     {note?.username}  </p>

                    <p className="text-muted mx-2">({note?.department})</p>

                  </div>

                  <div style={{ fontSize: 12 }}>  {note?.note} </div>
                </Form.Group>

              ))}
            </Row>
          ) : (
            <Form.Label className="text-muted">No notes available!</Form.Label>
          )}
        </Modal.Body>
      </Modal>


    )
  }

  return (
    <>

      <div className="product">
        <div className="container-fluid">
          <div id="dash" className="mb-npx">
            <header className="bg-surface-primary pt-6">
              <div className="row align-items-center text-white mb-3 product"
                style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                  <h1 className="h2 mb-0 fw-bold fs-4 ls-tight">Transactions</h1>
                </div>

                {/* <div className="col-sm-6 col-12 text-sm-end">
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
                </div> */}
              </div>
            </header>
          </div>
        </div>


        <div className="container mx-auto">
          <div className="row g-6 mb-4"></div>
          <div className='mx-auto mb-3 mb-2 d-flex justify-content-start align-items-center gap-0 column-gap-3'>
            <div className="position-relative">
              <span className="position-absolute search">
                <CiSearch size={25} />
              </span>
              <input
                type="text"
                id="search"
                onChange={(e) => checkSearch(e)}
                // onChange={(e) => setSearch(e.target.value)}
                className="form-control w-auto ps-5 fw-light"
                placeholder="Search transaction..."
              />
            </div>

            {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" ? (
              <AntDropdown overlay={menu} trigger={["click"]}>
                <AntButton
                  className="btn d-inline-flex btn-md btn-light mx-1 p-3 me-3"
                  id="dropdown-autoclose-outside"
                >
                  <span className="">Create transaction</span>
                </AntButton>
              </AntDropdown>
            ) : (
              <></>
            )}
          </div>

          <div className="table-responsive">
            <Table
              className="custom-header"
              columns={columns}
              dataSource={currentTrans}
              pagination={{
                total: getAlltransactionData?.data?.length,
                pageSize: postsPerPage,
                current: currentPage,
                onChange: paginate,
              }}
              loading={!currentTrans}
              rowKey={(record) => record._id}
            />
          </div>
        </div>
      </div>
      {ViewNotes()}
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
