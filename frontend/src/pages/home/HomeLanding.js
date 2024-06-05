import React, { useState, useEffect, useCallback } from "react"
import Nav from "react-bootstrap/Nav"
import { FaAngleRight, FaSearch } from "react-icons/fa"
import { BsCheckCircle, BsBox, BsFillPeopleFill } from "react-icons/bs"
import { IoTimerOutline } from "react-icons/io5"
import { FcBusinessman, FcApproval, FcClock } from "react-icons/fc"
import { GrTransaction } from "react-icons/gr"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import AuthStorage from "../../helper/AuthStorage"
import STORAGEKEY from "../../config/APP/app.config"
import { useDispatch } from "react-redux"
import { GET_TRANSACTION_BY_ID } from "../../redux/types"
import { productGetAction } from "../../redux/actions/productAction"
import { getAllTransaction } from "../../redux/actions/transactionDataAction"
import { entityGetAction } from "../../redux/actions/entityAction"
import { userGetAction } from "../../redux/actions/userAction"
import { ApiGet, ApiGet2 } from "../../helper/API/ApiData"
import Slide from 'react-reveal/Slide';
import { Bar } from 'react-chartjs-2';

const HomeLanding = () => {
  const token = AuthStorage.getToken()
  const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)
  const [search, setSearch] = useState('')
  console.log(search)

  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Graph Data',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [12, 19, 8, 10, 9],
      },
    ],
  };

  const dispatch = useDispatch()
  const cards = [
    {
      title: "Transactions",
      img: "Transact",
      icon: GrTransaction,
      color: "bg-success",
      name: "transactions",
      status: "Completed",
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
  ]

  const getAlltransactionData = useSelector(
    (state) => state.transactionData.getAllTransaction
  )
  const productGetDatas = useSelector((state) => state.product.product)
  const getAllUsers = useSelector((state) => state.userData.getUserData)
  const getAllEntities = useSelector((state) => state.entityData.entity)
  // console.log("alltransactionn", getAlltransactionData)

  //Get data counts on everything
  const getCount = useCallback(
    (name) => {
      switch (name) {
        case "transactions":
          return getAlltransactionData?.data?.length
        case "products":
          return productGetDatas?.data?.length
        case "users":
          return getAllUsers?.data?.length // or the array of users like users.length;
        case "entities":
          return getAllEntities?.data?.length
        default:
          return
      }
    },
    [getAllUsers, getAlltransactionData, productGetDatas, getAllEntities]
  )

  const signedCount = []
  const notSignedCount = []
  //check to geet the number of signed transactions and un-signed transaction
  if (getAlltransactionData?.data) {
    getAlltransactionData.data.map((item) => {
      if (item.termSheet === "Signed") {
        signedCount.push(item)
      }
      if (item.termSheet !== "Signed") {
        notSignedCount.push(item)
      }
      // return alltransCount
    })
  }

  //get all transaction
  const Authsend = useCallback(() => {
    let id =
      AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin"
        ? AuthStorage.getStorageData(STORAGEKEY.userId)
        : "all"
    dispatch(getAllTransaction(id))
  }, [dispatch])

  const prodAction = useCallback(() => {
    dispatch(productGetAction("all"))
  }, [dispatch])

  const entityAction = useCallback(() => {
    dispatch(entityGetAction("all"))
  }, [dispatch])
  const userAction = useCallback(() => {
    dispatch(userGetAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(() => Authsend())
    dispatch(() => prodAction())
    dispatch(() => entityAction())
    dispatch(() => userAction())
    // console.log(getAlltransactionData)
    // eslint-disable-next-line
  }, [])

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return value
    } else {
      return data
    }
  }
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
  console.log('getArr', getAlltransactionData)

  return (
    <>
      <div className='mx-5 d-flex flex-column flex-lg-row h-lg-full'>
        <div id='dash' className='h-screen flex-grow-1'>
          {/* <!-- Header --> */}
          <header className='bg-surface-primary border-bottom pt-6'>
            <div className='container-fluid'>
              <div id='dash' className='mb-npx'>
                <div className='row align-items-center mb-4'>
                  <div className='col-sm-6 col-12 mb-4 mb-sm-0'>
                    {/* <!-- Title --> */}
                    <h1 className='h2 mb-0 fw-bold fs-4 ls-tight'>Dashboard</h1>
                  </div>
                  {/* <!-- Actions --> */}
                  <div className='col-sm-6 col-12 text-sm-end'>
                    <div className='mx-n1'>
                      <Link to='/transactions' className='btn btn-primary rounded d-inline-flex btn-md border-base mx-1'>
                        <span className=' pe-2'><i className='bi bi-pencil'></i></span>
                        <span>Transactions</span>
                      </Link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Main --> */}
          <main className='py-6'>
            <div className='container-fluid'>
              <div className='row g-6 mb-6'>
                <Slide down>
                  {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" &&
                    cards.map((card, i) => (
                      <div className='col-xl-4 mb-3 col-sm-6 col-12' key={i}>
                        <div className='card shadow border-0'>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                                  {card.title}
                                </span>
                                <span className='h3 font-bold mb-0'>
                                  {getCount(card.name)}
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div
                                  className={`icon icon-shape ${card.color} text-white text-lg rounded-circle`}
                                >
                                  <card.icon size={56} />
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
                                  <span className='badge badge-pill bg-soft-success text-success me-2'>
                                    <i className='bi bi-arrow-up me-1'></i>13%
                                  </span>
                                  <span className='text-nowrap text-xs text-muted'>
                                    {card.title === "Available Products" ? (
                                      <Link
                                        className='text-decoration-none'
                                        to='/products'
                                      >
                                        View Products{" "}
                                        <i className='bi bi-arrow-right me-1'></i>
                                      </Link>
                                    ) : card.title === "Registered Users" ? (
                                      <Link
                                        className='text-decoration-none'
                                        to='/users'
                                      >
                                        View Users{" "}
                                        <i className='bi bi-arrow-right me-1'></i>
                                      </Link>
                                    ) : card.title === "Entities" ? (
                                      <Link
                                        className='text-decoration-none'
                                        to='/entities'
                                      >
                                        View Entities{" "}
                                        <i className='bi bi-arrow-right me-1'></i>
                                      </Link>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </Slide>


                {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" &&
                  <div className='col-6 mb-3 col-sm-6 col-12'>
                    <div className='card shadow border-0'>
                      <div className='card-body'>
                        <div className='row'>
                          <div className='col'>
                            <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                              Transactions
                            </span>
                            <span className='h3 font-bold mb-0'>
                              {signedCount.length}
                            </span>
                          </div>
                          <div className='col-auto'>
                            <div
                              className={`icon icon-shape bg-success text-white text-lg rounded-circle`}
                            >
                              <GrTransaction size={56} />
                            </div>
                          </div>
                        </div>
                        <div className='mt-2 mb-0 text-sm'>
                          <>
                            {" "}
                            <span className='badge badge-pill bg-soft-success text-success me-2'>
                              {signedCount.length}
                            </span>
                            <span className='text-nowrap text-xs text-muted'>
                              Completed
                            </span>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" &&
                  <>
                    <div className='col-6 mb-3 col-sm-6 col-12'>
                      <div className='card shadow border-0'>
                        <div className='card-body'>
                          <div className='row'>
                            <div className='col'>
                              <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                                Transactions in Progress
                              </span>
                              <span className='h3 font-bold mb-0'>
                                {notSignedCount.length}
                              </span>
                            </div>
                            <div className='col-auto'>
                              <div
                                className={`icon icon-shape bg-primary text-white text-lg rounded-circle`}
                              >
                                <IoTimerOutline size={56} />
                              </div>
                            </div>
                          </div>
                          <div className='mt-2 mb-0 text-sm'>
                            <>
                              {" "}
                              <span className='badge badge-pill bg-soft-gray text-success me-2'>
                                {notSignedCount.length}
                              </span>
                              <span className='text-nowrap text-xs text-muted'>
                                In progress...
                              </span>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }
                {AuthStorage.getStorageData(STORAGEKEY.roles) === "admin" &&
                  <div className='col-6 mb-3 col-sm-6 col-12'>
                    <div className='card shadow border-0'>
                      <div className='card-body'>
                        <div className='row'>
                          <div className='col'>
                            <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                              Transactions
                            </span>
                            <span className='h3 font-bold mb-0'>
                              {signedCount.length}
                            </span>
                          </div>
                          <div className='col-auto'>
                            <div
                              className={`icon icon-shape bg-success text-white text-lg rounded-circle`}
                            >
                              <GrTransaction size={56} />
                            </div>
                          </div>
                        </div>
                        <div className='mt-2 mb-0 text-sm'>
                          <>
                            {" "}
                            <span className='badge badge-pill bg-soft-success text-success me-2'>
                              {signedCount.length}
                            </span>
                            <span className='text-nowrap text-xs text-muted'>
                              Completed
                            </span>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                {AuthStorage.getStorageData(STORAGEKEY.roles) === "admin" &&
                  <>
                    <div className='col-6 mb-3 col-sm-6 col-12'>
                      <div className='card shadow border-0'>
                        <div className='card-body'>
                          <div className='row'>

                            <div className='col'>
                              <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                                Transactions in Progress
                              </span>
                              <span className='h3 font-bold mb-0'>
                                {notSignedCount.length}
                              </span>
                            </div>
                            
                            <div className='col-auto'>
                              <div
                                className={`icon icon-shape bg-primary text-white text-lg rounded-circle`}
                              >
                                <IoTimerOutline size={56} />
                              </div>
                            </div>
                          </div>
                          <div className='mt-2 mb-0 text-sm'>
                            <>
                              {" "}
                              <span className='badge badge-pill bg-soft-gray text-success me-2'>
                                {notSignedCount.length}
                              </span>
                              <span className='text-nowrap text-xs text-muted'>
                                In progress...
                              </span>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }
              </div>



              <Slide up>
                <div className='card shadow border-0 mb-7'>
                  <div className='card-header'>

                    <div className="input-group w-50 ">
                      {/* <input type="text" id='search' onChange={(e) => setSearch(e.target.value)} placeholder="Search transaction..." className="form-control" /> */}
                      {/* <button type="button" className="btn btn-primary btn-lg">
                      <FaSearch />
                    </button> */}
                      <h4>Transactions</h4>
                    </div>
                    <div className='table-responsive text-center'>
                      <table className='table table-bordered border-light caption-top border-2 table-hover table-nowrap'>
                        <thead className='thead-light '>
                          <tr>
                            <th scope='col'>Date Created</th>
                            <th scope='col'>Borrower</th>
                            <th scope='col'>Lender</th>
                            <th scope='col'>Value</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!getAlltransactionData ? <div className='text-center'> No records were found</div> : getAlltransactionData &&
                            getAlltransactionData?.data?.filter((item) => {
                              return search.toLowerCase() === '' ? item : item.borrower_Applicant.toLowerCase().includes(search)
                            }).map((data, i) => (
                              <tr key={data} >
                                <td>
                                  {new Date(data.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)}
                                </td>
                                <td>
                                  {/* <img alt='...' src='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80' className='avatar avatar-sm rounded-circle me-2' /> */}
                                  <Link className='text-decoration-none text-heading font-semibold' to='/'>
                                    {data.borrower_Applicant}
                                  </Link>
                                </td>

                                <td>
                                  {/* <img alt='...' src='https://preview.webpixels.io/web/img/other/logos/logo-1.png' className='avatar avatar-xs rounded-circle me-2' /> */}
                                  <Link className='text-decoration-none  text-heading font-semibold' to='/'>
                                    {data.lenders}
                                  </Link>
                                </td>
                                <td>
                                  {formateCurrencyValue(data?.details?.contractDetails?.value)}
                                </td>
                                <td>
                                  {data.termSheet === "Signed" ? (
                                    <span className='badge badge-lg text-heading badge-dot'>
                                      <i className='bg-success'></i>Signed
                                    </span>
                                  ) : (
                                    <span className='badge badge-lg text-heading badge-dot'>
                                      <i className='bg-danger'></i>Not Signed
                                    </span>
                                  )}
                                </td>
                                <td className='text-end text-center'>
                                  <Link to='#' onClick={() => {
                                    data.termSheet === 'Not Signed' ? downloadTermSheet(data._id, 'view') : ViewRiskAssessment()
                                  }} className='btn btn-sm btn-neutral'>
                                    View Termsheet
                                  </Link>
                                  
                                </td>
                              </tr>
                            ))}

                        </tbody>
                      </table>
                      {getAlltransactionData?.data?.length < 1 && <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>}

                    </div>
                   
                  </div>
                </div>
              </Slide>
            </div>
            {/* <div className="container mt-5">
                <h2>My Graph</h2>
                <Bar data={data} />
              </div> */}
          </main>
        </div>
      </div>
    </>
  )
}

export default HomeLanding

