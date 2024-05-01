import React, { useEffect, useState, useCallback } from "react"
import { ButtonGroup, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Transactionscard from "../../component/Transactionscard"
import MaterialTable from "material-table"
import AuthStorage from "../../helper/AuthStorage"
import STORAGEKEY from "../../config/APP/app.config"
import { getAllTransaction } from "../../redux/actions/transactionDataAction"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getRiskAssessment, riskAssessmentAction } from "../../redux/actions/riskAssessmentAction"
import ExcelModal from "../../component/Modal/ExcelModal"
import { ApiGet, ApiGet2 } from "../../helper/API/ApiData"
import { Button, Icon } from "@material-ui/core"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { GET_TRANSACTION_BY_ID } from "../../redux/types"
import { MdAssessment, MdEdit, MdPreview, MdVisibility } from "react-icons/md"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Tooltip } from "react-tooltip"
import Paginate from './Pagination'
import { FaSearch } from "react-icons/fa"
import Fade from 'react-reveal/Fade';
import Loader from "../../layout/loader/Loader"
import { FcSearch, FcSettings } from "react-icons/fc"

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
    // setTransaction(getAllTransaction(id))
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

  // const cllickOnRiskAssessment = (id) => {
  //     dispatch(getRiskAssessment(id))
  //     setSelected(id)
  // }
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
    const filtered = transaction2.filter((item) => (
      item.borrower_Applicant.toLowerCase().includes(e.target.value) || item.lenders.toLowerCase().includes(e.target.value)
    ))
    setTransaction(filtered)
  }

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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

                  <div class="mb-2 d-flex justify-content-between align-items-center">

                    <div class="position-relative">
                      <span class="position-absolute search"><FcSearch size={25} /></span>
                      <input type="text" id='search' onKeyUp={e => checkSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control w-100 ps-5" placeholder="Search transaction..." />
                    </div>


                  </div>
                  <div class="table-responsive form">
                    <table class="table border-light border-5 table-nowrap caption-top table-hover">

                      <thead>
                        <tr className="bg-light text-center">
                          <th  className='fw-bold fs-normal' onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }} scope="col" width="5%">Date {' '}
                            {sortConfig.key === 'createdAt' && (
                              <i className={`bi bi-arrow-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
                            )}
                          </th>
                          <th className='fw-bold fs-normal' scope="col" width="15%">Transaction Number</th>
                          <th className='fw-bold fs-normal' scope="col" width="10%">Borrower</th>
                          <th className='fw-bold fs-normal' scope="col" width="15%">Lender</th>
                          <th className='fw-bold fs-normal' scope="col" width="10%">Contract Value</th>
                          <th className='fw-bold fs-normal' scope="col" width="20%">Product</th>
                          <th className='fw-bold fs-normal' scope="col" width="20%">Termsheet</th>
                          <th className='fw-bold fs-normal' scope="col" width="20%"><span>Actions</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTrans?.length > 0 &&
                          currentTrans?.map((data) => (
                            <tr key={data.id} className='text-center'>
                              <td style={{ fontSize: "0.9rem" }} className='py-4 fst-normal'>
                                {new Date(data.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)}
                              </td>
                              <td style={{ fontSize: "0.9rem" }} className='py-4 fst-normal'>
                                {data._id}
                              </td>
                              <td style={{ fontSize: "0.9rem" }} className='py-4 fst-normal'>

                                {data.borrower_Applicant}

                              </td>

                              <td style={{ fontSize: "0.9rem" }} className='py-4 fst-normal'>
                                {data.lenders}
                              </td>
                              <td style={{ fontSize: "0.9rem" }} className='py-4 fst-normal'>
                                {formateCurrencyValue(data?.details?.contractDetails?.value)}
                              </td>
                              <td style={{ fontSize: "0.9rem" }} className='py-4 fst-normal'>
                                {data?.details?.productDetails?.name?.name}
                              </td>
                              <td style={{ fontSize: "0.9rem" }} className='py-4 fst-normal cursor-pointer'>
                                <p onClick={() => { data.termSheet === "Not Signed" && setShowExcelModal(true); setSendId(data._id) }}>
                                  {data.termSheet}
                                  {data.termSheet === "Signed" ? (
                                    <Button onClick={() => { downloadTermSheet(data._id) }}><FileDownloadIcon /></Button>
                                  ) : (<></>)
                                  }
                                </p>
                              </td>

                              <td class=''>
                                <div className='container '>
                                  <div className='d-flex py-3 justify-content-center gap-3'>


                                    <Dropdown size='sm'>
                                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        <FcSettings size={17} />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu variant="light" className="text-white" active="true">
                                        <Dropdown.Item onClick={() => navigate(`/edit-transactions?id=${data?._id}`, { state: [{ type: data.type }, { type: data?.details?.productDetails?.nature ? data.details.productDetails.nature : "" }, { isView: false },], })}><MdEdit className="me-2 mb-1" size={15} />Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(`/edit-transactions?id=${data?._id}`, { state: [{ type: data.type }, { type: data?.details?.productDetails?.nature ? data.details.productDetails.nature : "", }, { isView: true },], })}><MdPreview className="me-2 mb-1" size={15} />Preview</Dropdown.Item>
                                        {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" ?
                                          <Dropdown.Item onClick={() => { dispatch(getRiskAssessment(data._id)); setSelected(data._id) }}><MdAssessment className="me-2 mb-1" size={15} />Risk Assesment
                                          </Dropdown.Item> : ""}

                                        <Dropdown.Item onClick={() => { data.termSheet === "Not Signed" ? downloadTermSheet(data._id, "view") : ViewRiskAssessment() }}><MdVisibility className="me-2 mb-1" size={15} />View Termsheet</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { data.termSheet === "Not Signed" ? downloadTermSheet(data._id, "download") : converBase64toBlob(data.termSheetUrl) }}><FileDownloadIcon className="me-2 mb-1" size={15} />Download Termsheet</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}

                      </tbody>

                    </table>
                    {!currentTrans && <div class="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>}
                    {transaction.length < 1 && <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>}
                    <div class="card-footer border-0 py-2 mb-5">

                      <span class="text-muted text-sm">
                        <Paginate postsPerPage={postsPerPage} totalPosts={getAlltransactionData?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} currentTrans={currentTrans} /> </span>
                    </div>
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

// const userTableAction = [
//   {
//       icon: 'edit',
//       tooltip: 'Edit transaction',
//       onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: false }] })
//   },
//   {
//       icon: 'download',
//       tooltip: 'Download term sheet',

//       onClick: (event, rowData) => { downloadTermSheet(rowData._id) }

//   },
// ]
// const tableAction = [
//   {
//       icon: 'edit',
//       tooltip: 'Edit transaction',
//       onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: false }] })
//   },
//   {
//       icon: 'preview',
//       tooltip: 'View transaction',
//       onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: true }] })
//   },
//   {
//       icon: 'assessment',
//       tooltip: 'Risk Assessment',
//       onClick: (event, rowData) => { dispatch(getRiskAssessment(rowData._id)); setSelected(rowData._id) }
//   },
//   {
//       icon: 'visibilityIcon',
//       tooltip: 'view term sheet',
//       onClick: (event, rowData) => { rowData.termSheet === 'Not Signed' ? downloadTermSheet(rowData._id, 'view') : ViewRiskAssessment() }
//   },
//   {
//       icon: 'download',
//       tooltip: 'Download term sheet',
//       onClick: (event, rowData) => { rowData.termSheet === 'Not Signed' ? downloadTermSheet(rowData._id, 'download') : converBase64toBlob(rowData.termSheetUrl) }
//   },
// ]
{/* <MaterialTable
  title=""
  columns={[
      { title: 'Transaction Date', field: 'createdAt', type: 'date' },
      { title: 'Transaction Number', field: '_id' },
      { title: 'Applicant', field: 'borrower_Applicant' },
      { title: 'Lenders', field: 'lenders' },
      { title: 'Product', field: 'details.productDetails.name.name' },
      { title: 'Value', render: rowData => formateCurrencyValue(rowData.details.contractDetails.value) },

      { title: 'Term Sheet', render: rowData => <p onClick={() => { rowData.termSheet === 'Not Signed' && setShowExcelModal(true); setSendId(rowData._id) }}>{rowData.termSheet}{rowData.termSheet === 'Signed' ? <Button onClick={() => { downloadTermSheet(rowData._id) }}><FileDownloadIcon /></Button> : <></>}</p> },

  data={transaction || <Skeleton />}

  actions={AuthStorage.getStorageData(STORAGEKEY.roles) === 'superAdmin' ? (tableAction.splice(2, 1), tableAction) : AuthStorage.getStorageData(STORAGEKEY.roles) === 'user' ? tableAction : tableAction.slice(1, 2)}


  options={{
      filtering: true,
      actionsColumnIndex: -1,
      sorting: true,
      pageSize: 10,
      search: false,
  }}
  /> */}