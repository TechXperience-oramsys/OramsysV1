import React, { useEffect, useState, useCallback } from "react"
import { Dropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import AuthStorage from "../../helper/AuthStorage"
import STORAGEKEY from "../../config/APP/app.config"
import { getAllTransaction } from "../../redux/actions/transactionDataAction"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getRiskAssessment, riskAssessmentAction } from "../../redux/actions/riskAssessmentAction"
import ExcelModal from "../../component/Modal/ExcelModal"
import { ApiGet} from "../../helper/API/ApiData"
import { Button } from "@material-ui/core"
import { GET_TRANSACTION_BY_ID } from "../../redux/types"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Paginate from './Pagination'
import Fade from 'react-reveal/Fade';
import { Table, Dropdown as AntDropdown, Button as AntButton, Menu } from 'antd';
import { DownloadOutlined, EditOutlined, EyeOutlined, FormOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons';

const Transactions = () => {
  const dispatch = useDispatch()
  const [showspan, setShowspan] = useState(false)
  const [selected, setSelected] = useState("")
  const [showExcelModal, setShowExcelModal] = useState(false)
  const [sendId, setSendId] = useState()

  const navigate = useNavigate()
  const [showSubData, setShowSubData] = useState(false)
  const [transaction, setTransaction] = useState([])
  const [transaction2, setTransaction2] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(true)

  const getAlltransactionData = useSelector(
    (state) => state.transactionData.getAllTransaction
  )
  const riskAssessment = useSelector(
    (state) => state.riskAssessmentData.getRiskAssessment
  )

  useEffect(() => {
    let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin"
      ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all"
    dispatch(getAllTransaction(id))
  }, [])

  const refreshPage = useCallback(() => {
    console.log(getAlltransactionData.data);

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
          }
        })
      )


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
          }
        })
      )

    }
  }, [getAlltransactionData])


  useEffect(() => {
    dispatch(() => refreshPage())
    //eslint-disable-next-line
  }, [getAlltransactionData])


  useEffect(() => {
    if (riskAssessment.status === 200 && selected) {
      // if (riskAssessment && riskAssessment.data && riskAssessment.data.transactionId   ) {
      navigate(`/risk-assessment?id=${selected}`)
      // }
    }
  }, [riskAssessment, selected])

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
    const linkSources = `data:application/pdf;base64,${contents}`
    let pdfWindow = window.open("")
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src=${linkSources}></iframe>`
    )
  }

  const handleRefresh = () => {
    dispatch({
      type: GET_TRANSACTION_BY_ID,
      payload: {},
    })
    navigate("/edit-transactions", {
      state: [{ type: "Export" }, { type: "Physical" }],
    })
  }
  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return value
    } else {
      return data
    }
  }
  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const indexOfLastTrans = currentPage * postsPerPage
  const indexOfFirstTrans = indexOfLastTrans - postsPerPage
  const currentTrans = transaction?.slice(indexOfFirstTrans, indexOfLastTrans)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const checkSearch = (e) => {
    const filtered = transaction2.filter((item) => {
        // Check if item.borrower_Applicant and item.lenders are strings
        if (typeof item.borrower_Applicant !== 'string' || typeof item.lenders !== 'string') {
            return false;
        }
        
        // Check if item.details.productDetails.name is an object and contains the property 'name'
        if (typeof item.details.productDetails.name === 'object' && item.details.productDetails.name !== null && 'name' in item.details.productDetails.name) {
            // Convert item.details.productDetails.name to lowercase if it's a string
            const productName = item.details.productDetails.name.name.toLowerCase();
            // Check if productName includes the search value
            return productName.includes(e.target.value.toLowerCase());
        }
        
        return false;
    });
    
    setTransaction(filtered);
};

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (createdAt) => new Date(createdAt).toLocaleDateString("en-US", DATE_OPTIONS)
    },
    {
      title: 'Transaction Number',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Borrower',
      dataIndex: 'borrower_Applicant',
      key: 'borrower_Applicant'
    },
    {
      title: 'Lender',
      dataIndex: 'lenders',
      key: 'lenders'
    },
    {
      title: 'Contract Value',
      dataIndex: ['details', 'contractDetails', 'value'],
      key: 'contractValue',
      render: (value) => formateCurrencyValue(value)
    },
    {
      title: 'Product',
      dataIndex: ['details', 'productDetails', 'name', 'name'],
      key: 'product'
    },
    {
      title: 'Termsheet',
      dataIndex: 'termSheet',
      key: 'termSheet',
      render: (termSheet, record) => (
        <span class='cursor-pointer'>
          <p onClick={() => { termSheet === "Not Signed" && setShowExcelModal(true); setSendId(record._id) }}>
            {termSheet}
            {termSheet === "Signed" ? (
              <Button onClick={() => { downloadTermSheet(record._id) }}><DownloadOutlined /></Button>
            ) : (<></>)}
          </p>
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <AntDropdown overlay={(
          <Menu>
            <Menu.Item onClick={() => { navigate(`/edit-transactions?id=${record._id}`, { state: [{ type: record.type }, { type: record?.details?.productDetails?.nature ? record.details.productDetails.nature : "" }, { isView: false },], }) }}>
              <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item onClick={() => { navigate(`/edit-transactions?id=${record._id}`, { state: [{ type: record.type }, { type: record?.details?.productDetails?.nature ? record.details.productDetails.nature : "", }, { isView: true },], }) }}>
              <EyeOutlined /> Preview
            </Menu.Item>
            {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
              <Menu.Item onClick={() => { dispatch(getRiskAssessment(record._id)); setSelected(record._id) }}>
                <FormOutlined /> Risk Assessment
              </Menu.Item>
            )}
            <Menu.Item onClick={() => { record.termSheet === "Not Signed" ? downloadTermSheet(record._id, "view") : ViewRiskAssessment() }}>
              <EyeOutlined /> View Termsheet
            </Menu.Item>
            <Menu.Item onClick={() => { record.termSheet === "Not Signed" ? downloadTermSheet(record._id, "download") : converBase64toBlob(record.termSheetUrl) }}>
              <DownloadOutlined /> Download Termsheet
            </Menu.Item>
          </Menu>
        )}>
          <AntButton><EllipsisOutlined /></AntButton>
        </AntDropdown>
      )
    }
  ];


  return (
    <>


      <div class='mx-5 d-flex flex-column flex-lg-row h-lg-full'>
        <div id='dash' class='h-screen flex-grow-1'>
          <header class='bg-surface-primary border-bottom pt-6'>
            <div class='container-fluid'>
              <div id='dash' class='mb-npx'>
                <div class='row align-items-center mb-3'>
                  <div class='col-sm-6 col-12 mb-4 mb-sm-0'>

                    <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Transaction</h1>
                  </div>

                  <div class='col-sm-6 col-12 text-sm-end'>
                    <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>

                      {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" ? (
                        <Dropdown className="me-2" autoClose="outside">
                          <Dropdown.Toggle variant="light" className="btn btn-md items-center" id="dropdown-autoclose-outside" key='start'>
                            <i class="bi bi-plus pe-2 "></i><span className="fs-6 fw-bold">Add</span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="mt-3">
                            <Dropdown.Item onClick={() => navigate("/edit-transactions", { state: [{ type: "Import" }], })}>Import</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowSubData(!showSubData)}>Export <MdOutlineKeyboardArrowDown size={42} className='ps-3' /></Dropdown.Item>
                            {(showSubData && (
                              <>
                                <Dropdown.Item className='ps-3' onClick={handleRefresh}>Physical commodities</Dropdown.Item>
                                <Dropdown.Item className='ps-3' onClick={() => navigate("/edit-transactions", { state: [{ type: "Export" }, { type: "Non-physical" }], })}>Non-physical commodities</Dropdown.Item>
                              </>
                            ))}

                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <></>
                      )}


                      {/* <Link to='/transactions' style={{ borderColor: '#9E3E65' }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                        <span class=' pe-2'>
                          <i class='bi bi-pencil'></i>
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
            <main class='py-2'>
              <div class='container-fluid'>
                <div class='row g-6 mb-4'></div>

                <div class="container mx-auto">

                  <div class="mb-2 d-flex justify-content-end align-items-center">

                    <div class="position-relative">
                      <input type="text" id='search' onKeyUp={e => checkSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control w-100 ps-5 fw-light border-none" placeholder="Search transaction..." />
                    </div>


                  </div>
                  <div className="mt-10 table-responsive form">
                    <Table
                      columns={columns}
                      dataSource={currentTrans}
                      rowKey="_id"
                      loading={!currentTrans}
                      pagination={{
                        total: getAlltransactionData?.data?.length,
                        pageSize: postsPerPage,
                        current: currentPage,
                        onChange: (page) => setCurrentPage(page)
                      }}
                    />
                  </div>
                  <div class=" border-0 mb-0">

                      <span class="text-muted text-sm">
                        <Paginate postsPerPage={postsPerPage} totalPosts={getAlltransactionData?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} currentTrans={currentTrans} />
                      </span>
                    </div>

                </div>

              </div>
            </main>
          </Fade>
        </div>
      </div>


      {showExcelModal && (<ExcelModal refreshpage={() => dispatch(() => refreshPage())} show={showExcelModal} onHide={() => setShowExcelModal(false)}
        getId={sendId}
      />
      )}
    </>
  )
}

export default Transactions