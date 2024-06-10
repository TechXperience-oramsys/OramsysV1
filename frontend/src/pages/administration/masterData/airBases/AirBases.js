import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import CountriesCard from '../../../../component/CountriesCard'
import { countrieAction } from '../../../../redux/actions/countrieAction';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Fade, Modal, TextField } from '@material-ui/core';
import axios from 'axios';
import { ApiPost, BaseURL } from '../../../../helper/API/ApiData';
import { airPortsAction } from '../../../../redux/actions/portsAction';
import { toast } from 'react-hot-toast'
import { MdEdit } from 'react-icons/md';
// import { Tooltip } from 'react-tooltip';
import Paginate from './airbasePagination';


const AirBases = ({ showSidebar, setSidebar }) => {


  const [show, setShow] = useState(false)
  const [airPortData, setAirPortData] = useState()
  const [airPortForEdit, setAirPortForEdit] = useState()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)
  useEffect(() => {
    dispatch(airPortsAction(search ? search : "all"))
    // console.log('search===============??', search)
  }, [search])

  const airPort = useSelector(state => state.airPorts.airPort)
  useEffect(() => {
    // console.log('countryData.country=================', country);
  }, [airPort])

  useEffect(() => {
    setAirPortData(airPort)
  }, [airPort])

  const editAirBase = () => {
    ApiPost(`airBase/edit`, airPortForEdit).then(res => {
      if (res.status === 200) {
        dispatch(airPortsAction(search ? search : "all"))
        setShow(false)
        airPortForEdit(null)
        toast.success(res.message)
      }
    })
  }
  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAirbases = airPortData?.data?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const navigate = useNavigate()

  return (
    <>
      {/* <div className='authheader_main'>
        <img src='../../assets/img/about/more.png' className='sidebar_img' onClick={() => { }} />
        <h1>Countries</h1>
        <div className='d-flex'>
         
          <div className='search_content'>
            <input className='serch_input' id='search' value={search} onChange={(e) => setSearch(e.target.value)} />
            <label htmlFor='search'>
              <img src='../assets/img/about/search.png' />
            </label>
          </div>
        </div>
      </div> */}
      <div className='product'>
        <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
          <h1 class='h2 mb-0 fw-bold fs-2 ls-tight'>AirPorts</h1>
        </div>

        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className='table-responsive'>
            <table class="table align-middle mb-0 bg-white border-light border-5">
              <thead class="bg-light">
                <tr className=''>
                  <th className='fw-bold'>Name</th>
                  <th className='fw-bold'>Nature</th>
                  <th className='fw-bold'>Flag</th>
                  <th className='fw-bold text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>

                {getAirbases?.length > 0 && getAirbases?.map((data, index) => (
                  <tr key={index} className='text-center'>
                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                          <p class="fw-normal m-2">{data.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="align-items-center">
                          <p class="fw-normal m-2">{data.country}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">
                        <div class="align-items-center">
                          <p class="fw-normal m-2">{data.refcode}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex justify-content-end m-2">
                        <div class="align-items-center">
                          <MdEdit onClick={() => {
                            setShow(true); setAirPortForEdit(airPortData?.data?.find(item => item._id === data._id))
                          }}
                            // data-tooltip-id='edit-id'
                            // data-tooltip-content='Edit Product'
                            className='cursor-pointer'
                            size={18} />
                          {/* <Tooltip id='edit-id' place='top' effect='solid' /> */}
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
            {!getAirbases && <div class="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>}
            {airPortData?.length < 1 && <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>}
            <div class="card-footer border-0 py-2 mb-5">

              <span class="text-muted text-sm">
                <Paginate postsPerPage={postsPerPage} totalPosts={airPort?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} getAirbases={getAirbases} /> </span>
            </div>
          </div>
        </div>
        {/* <MaterialTable
          title=""
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Country', field: 'country' },
            { title: 'Ref. code', field: 'refcode' },
            // { title: 'Flag', render: rowData => <Col xs={2} className="mt-auto p-0"><img className="img-fluid" src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${rowData.code}.svg`} alt="" /></Col> }
          ]}
          data={airPortData?.data}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit AirBase',
              // onClick: (event, rowData) => { setShow(true);console.log('rowData', rowData)}
              onClick: (event, rowData) => { setShow(true); setAirPortForEdit(airPortData?.data?.find(item => item._id === rowData._id)) }
            },
            // {
            //   icon: 'preview',
            //   tooltip: 'View User',
            //   onClick: (event, rowData) => navigate(`/edit-product?id=${rowData?._id}`, { state: { isView: true } })
            // }
          ]}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            sorting: true,
            pageSize: 10,
            search: false
          }}
        /> */}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='model'
        open={show}
        onClose={() => setShow(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className='modal-content'>
            <div className='d-flex justify-content-end'>
              <img src='../../assets/img/my-img/Close.png' onClick={() => setShow(false)} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
            </div>
            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
              <div className='form'>
                <Row>
                  <Col lg={6} className="mb-4">
                    <TextField
                      label="Enter name"
                      variant="standard"
                      color="warning"
                      name='name'
                      value={airPortForEdit?.name}
                      onChange={(e) => setAirPortForEdit({ ...airPortForEdit, name: e.target.value })}
                    />
                  </Col>
                  <Col lg={6} className="mb-4">
                    <TextField
                      label="Enter code"
                      variant="standard"
                      color="warning"
                      name='refcode'
                      value={airPortForEdit?.refcode}
                      onChange={(e) => setAirPortForEdit({ ...airPortForEdit, refcode: e.target.value })}
                    />
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <div>
                  <button onClick={() => setShow(false)} className="footer_cancel_btn">cancel</button>
                </div>
                <button onClick={() => editAirBase()} className={`footer_next_btn`}>Save</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default AirBases