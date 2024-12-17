import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
// import CountriesCard from '../../../../component/CountriesCard'
// import { countrieAction } from '../../../../redux/actions/countrieAction';
// import { useNavigate } from 'react-router-dom';
import { Backdrop, Fade, Modal, TextField } from '@mui/material';
// import axios from 'axios';
import { ApiPost } from '../../../../helper/API/ApiData';
import { airPortsAction } from '../../../../redux/actions/portsAction';
import { toast } from 'sonner'
import { MdEdit } from 'react-icons/md';
// import { Tooltip } from 'react-tooltip';
import { Spin, Table } from 'antd';


const AirBases = ({ showSidebar, setSidebar }) => {


  const [show, setShow] = useState(false)
  const [airPortData, setAirPortData] = useState()
  const [airPortForEdit, setAirPortForEdit] = useState()
  const [search] = useState('')
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(20)
  useEffect(() => {
    dispatch(airPortsAction(search ? search : "all"))
    // console.log('search===============??', search)
  }, [search, dispatch])

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

  // const navigate = useNavigate()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p className="fw-normal m-2">{text}</p>,
    },
    {
      title: 'Nature',
      dataIndex: 'country',
      key: 'country',
      render: (text) => <p className="fw-normal m-2">{text}</p>,
    },
    {
      title: 'Flag',
      dataIndex: 'refcode',
      key: 'refcode',
      render: (text) => <p className="fw-normal m-2">{text}</p>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (text, record) => (
        <MdEdit
          onClick={() => {
            setShow(true);
            setAirPortForEdit(airPortData?.data?.find(item => item._id === record._id));
          }}
          className='cursor-pointer'
          size={18}
        />
      ),
    },
  ];

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
        {/* <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
          <h1 class='h2 mb-0 fw-bold fs-2 ls-tight'>AirPorts</h1>
        </div> */}

        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary pt-6'>
              <div class='row align-items-center mb-3 text-white product' style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Airports</h1>
                </div>

                {/* <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>
                    <div class="position-relative">
                      <span class="position-absolute search"><FcSearch size={25} /></span>
                      <input type="text" id='search' value={search} onChange={(e) => setSearch(e.target.value)} className="form-control w-100 ps-5" placeholder="Search..." />
                    </div>

                  </div>
                </div> */}
              </div>
            </header>

          </div>
        </div>

        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className='table-responsive'>
            <Table
              columns={columns}
              dataSource={getAirbases}
              rowKey={record => record._id}
              pagination={{
                pageSize: postsPerPage,
                total: airPort?.data?.length,
                onChange: paginate
              }}
              loading={!getAirbases && {
                indicator: <Spin />,
                tip: "Loading..."
              }}
              locale={{
                emptyText: airPortData?.length < 1 ? 'No records were found' : 'Loading...'
              }}
            />
          </div>
        </div>

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
              <img alt='property' src='../../assets/img/my-img/Close.png' onClick={() => setShow(false)} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
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