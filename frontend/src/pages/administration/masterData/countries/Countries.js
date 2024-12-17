import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
// import CountriesCard from '../../../../component/CountriesCard'
import { countrieAction } from '../../../../redux/actions/countrieAction';
// import {  useNavigate } from 'react-router-dom';
import { Backdrop, Fade, Modal, TextField } from '@mui/material';
// import axios from 'axios';
import { ApiPost } from '../../../../helper/API/ApiData';
import { toast } from 'sonner'
import { FcSearch } from 'react-icons/fc';
import { MdEdit } from 'react-icons/md';
// import { Tooltip } from 'react-tooltip';
import { Spin, Table } from 'antd';



const Countries = ({ showSidebar, setSidebar }) => {


  const [show, setShow] = useState(false)
  const [contryData, setContryData] = useState()
  const [contryForEdit, setContryForEdit] = useState()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(20)
  useEffect(() => {
    dispatch(countrieAction(search ? search : "all"))
    // console.log('search===============??', search)
  }, [search, dispatch])

  const country = useSelector(state => state.countryData.country)
  useEffect(() => {
    console.log('countryData.country=================', country);
  }, [country])

  useEffect(() => {
    setContryData(country)
  }, [country])

  const editContry = () => {
    ApiPost(`country/edit`, contryForEdit).then(res => {
      if (res.status === 200) {
        dispatch(countrieAction(search ? search : "all"))
        setShow(false)
        contryForEdit(null)
        toast.success(res.message)
      }
    })
  }
  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getCountries = contryData?.data?.slice(indexOfFirstItem, indexOfLastItem)
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
      dataIndex: 'code',
      key: 'code',
      render: (text) => <p className="fw-normal m-2">{text}</p>,
    },
    {
      title: 'Flag',
      dataIndex: 'code',
      key: 'flag',
      render: (code) => (
        <Col xs={2} className="mt-auto p-0">
          <img className="img-fluid" src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`} alt="" />
        </Col>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (text, record) => (
        <MdEdit
          onClick={() => {
            setShow(true);
            setContryForEdit(contryData?.data?.find(item => item._id === record._id));
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
        {/* <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h2 className='m-0'> Countries</h2>
          <button className='add_btn me-3' onClick={() => navigate('/add-product')}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
          <div className='search_content  me-3'>
            <input className='serch_input' id='search' value={search} onChange={(e) => setSearch(e.target.value)} />
            <label htmlFor='search'>
              <img src='../assets/img/about/search.png' />
            </label>
          </div>
        </div> */}
        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary pt-6'>
              <div class='row align-items-center mb-3 text-white product' style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Countires</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>
                    <div class="position-relative">
                      <span class="position-absolute search"><FcSearch size={25} /></span>
                      <input type="text" id='search' value={search} onChange={(e) => setSearch(e.target.value)} className="form-control w-100 ps-5" placeholder="Search..." />
                    </div>

                  </div>
                </div>
              </div>
            </header>

          </div>
        </div>
        {/* TABLE */}

        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className='table-responsive'>
            <Table
              columns={columns}
              dataSource={getCountries}
              rowKey={record => record._id}
              pagination={{
                pageSize: postsPerPage,
                total: country?.data?.length,
                onChange: paginate
              }}
              loading={!getCountries && { indicator: <Spin /> }}
              locale={{ emptyText: contryData?.length < 1 ? 'No records were found' : 'Loading...' }}
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
                      value={contryForEdit?.name}
                      onChange={(e) => setContryForEdit({ ...contryForEdit, name: e.target.value })}
                    />
                  </Col>
                  <Col lg={6} className="mb-4">
                    <TextField
                      label="Enter code"
                      variant="standard"
                      color="warning"
                      name='code'
                      value={contryForEdit?.code}
                      onChange={(e) => setContryForEdit({ ...contryForEdit, code: e.target.value })}
                    />
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <div>
                  <button onClick={() => setShow(false)} className="footer_cancel_btn">cancel</button>
                </div>
                <button onClick={() => { editContry() }} className={`footer_next_btn`}>Save</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default Countries