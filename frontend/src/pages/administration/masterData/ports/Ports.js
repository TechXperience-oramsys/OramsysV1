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
import { portsAction } from '../../../../redux/actions/portsAction';
import { toast } from 'react-hot-toast'
import { MdEdit } from 'react-icons/md';
// import { Tooltip } from 'react-tooltip';
import { FcSearch } from 'react-icons/fc';
import { Spin, Table } from 'antd';



const Ports = ({ showSidebar, setSidebar }) => {


  const [show, setShow] = useState(false)
  const [PortData, setPortData] = useState()
  const [PortForEdit, setPortForEdit] = useState()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)

  useEffect(() => {
    dispatch(portsAction(search ? search : "all"))
    // console.log('search===============??', search)
  }, [search])

  const ports = useSelector(state => state.ports.port)
  useEffect(() => {
    // console.log('countryData.country=================', country);
  }, [ports])

  useEffect(() => {
    setPortData(ports)
  }, [ports])

  const editPort = () => {
    ApiPost(`port/edit`, PortForEdit).then(res => {
      if (res.status === 200) {
        dispatch(portsAction(search ? search : "all"))
        setShow(false)
        PortForEdit(null)
        toast.success(res.message)
      }
    })
  }

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getPorts = PortData?.data?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const navigate = useNavigate()

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
      render: (_, record) => (
        <MdEdit
          onClick={() => {
            setShow(true);
            setPortForEdit(PortData?.data?.find(item => item._id === record._id));
          }}
          className='cursor-pointer'
          size={18}
        />
      ),
      align: 'right',
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
        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary  pt-6'>
              <div class='row align-items-center mb-3 text-white product' style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Ports</h1>
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

        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className='table-responsive'>
            <Table
              columns={columns}
              dataSource={getPorts}
              pagination={{
                pageSize: postsPerPage,
                total: ports?.data?.length,
                onChange: paginate
              }}
              rowKey="_id"
              loading={!getPorts && { indicator: <Spin /> }}
            />
            {/* {!getPorts && (
              <div className="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
                <Spin />
              </div>
            )}
            {getPorts?.length < 1 && (
              <div className='text-center mx-auto container py-5 my-5 m-5'>
                No records were found
              </div>
            )} */}
            {/* <div className="card-footer border-0 py-2 mb-5">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={PortData?.data?.length}
                onChange={handlePageChange}
                showSizeChanger
                onShowSizeChange={handlePageChange}
              />
            </div> */}
          </div>
        </div>

        {/* <MaterialTable
          title=""
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Country', field: 'country' },
            { title: 'Ref. code', field: 'refcode' },
            { title: 'Flag', render: rowData => <Col xs={2} className="mt-auto p-0"><img className="img-fluid" src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${rowData.code}.svg`} alt="" /></Col> }
          ]}
          data={PortData?.data}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Port',
              // onClick: (event, rowData) => { setShow(true);console.log('rowData', rowData)}
              onClick: (event, rowData) => { setShow(true); setPortForEdit(PortData?.data?.find(item => item._id === rowData._id)) }
            },
            {
              icon: 'preview',
              tooltip: 'View User',
              onClick: (event, rowData) => navigate(`/edit-product?id=${rowData?._id}`, { state: { isView: true } })
            }
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
                      value={PortForEdit?.name}
                      onChange={(e) => setPortForEdit({ ...PortForEdit, name: e.target.value })}
                    />
                  </Col>
                  <Col lg={6} className="mb-4">
                    <TextField
                      label="Enter code"
                      variant="standard"
                      color="warning"
                      name='refcode'
                      value={PortForEdit?.refcode}
                      onChange={(e) => setPortForEdit({ ...PortForEdit, refcode: e.target.value })}
                    />
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <div>
                  <button onClick={() => setShow(false)} className="footer_cancel_btn">cancel</button>
                </div>
                <button onClick={() => { editPort() }} className={`footer_next_btn`}>Save</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default Ports