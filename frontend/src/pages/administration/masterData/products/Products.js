import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productGetAction } from '../../../../redux/actions/productAction';
import { Table, Dropdown, Menu, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
// import { navigate } from '@reach/router';

const Products = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [productGetData, setProductGetData] = useState()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const productGetDatas = useSelector(state => state.product.product)



  useEffect(() => {
    setProductGetData(productGetDatas)
  }, [productGetDatas])
  console.log("get products", productGetData)

  useEffect(() => {
    dispatch(productGetAction(search ? search : "all"))
  }, [search])

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAllProduct = productGetData?.data?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const DATE_OPTIONS = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Nature',
      dataIndex: 'nature',
      key: 'nature',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      align: 'center',
      render: (text) => <p className="fw-normal m-2">{new Date(text).toLocaleDateString("en-US", DATE_OPTIONS)}</p>,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Family',
      dataIndex: 'family',
      key: 'family',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),

    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Dropdown overlay={(
          <Menu>
            <Menu.Item onClick={() => { navigate({ pathname: '/edit-product', search: `?id=${record?._id}` }) }}>
              <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item onClick={() => navigate(`/edit-product?id=${record?._id}`, { state: { isView: true } })}>
              <EyeOutlined /> Preview
            </Menu.Item>
          </Menu>
        )}>

          <Button><EllipsisOutlined /></Button>
        </Dropdown>
        // <div className="d-flex justify-content-end m-2">
        //   <div className="align-items-center">
        //     <MdEdit
        //       onClick={() => navigate({ pathname: '/edit-product', search: `?id=${record._id}` })}
        //       data-tooltip-id='edit-id'
        //       data-tooltip-content='Edit Product'
        //       className='cursor-pointer'
        //       size={18}
        //     />
        //     <Tooltip id='edit-id' placement='top' effect='solid' />
        //   </div>
        //   <div className="align-items-center ms-3">
        //     <MdPreview
        //       onClick={() => navigate(`/edit-product?id=${record._id}`, { state: { isView: true } })}
        //       data-tooltip-id='preview-id'
        //       data-tooltip-content='Preview Information'
        //       className='cursor-pointer'
        //       size={18}
        //     />
        //     <Tooltip id='preview-id' placement='top' effect='solid' />
        //   </div>
        // </div>
      ),
    },
  ];

  //   const checkSearch = (e) => {
  //     const filtered = transaction2.filter((item) => {
  //         // Check if item.borrower_Applicant and item.lenders are strings
  //         if (typeof item.borrower_Applicant !== 'string' || typeof item.lenders !== 'string') {
  //             return false;
  //         }

  //         // Check if item.details.productDetails.name is an object and contains the property 'name'
  //         if (typeof item.details.productDetails.name === 'object' && item.details.productDetails.name !== null && 'name' in item.details.productDetails.name) {
  //             // Convert item.details.productDetails.name to lowercase if it's a string
  //             const productName = item.details.productDetails.name.name.toLowerCase();
  //             // Check if productName includes the search value
  //             return productName.includes(e.target.value.toLowerCase());
  //         }

  //         return false;
  //     });

  //     setTransaction(filtered);
  // };

  return (
    <>
      {/* <div className='authheader_main'>
        <h1>Products</h1>
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
            <header class='bg-surface-primary pt-6'>
              <div class='row align-items-center text-white mb-3 product' style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Product</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>
                    <div className=''>
                      <input type="text" id='search' value={search} onChange={(e) => setSearch(e.target.value)} className="form-control ps-5 fw-light border-none" placeholder="Search product..." />
                    </div>

                    <Link to='/add-product' style={{ borderColor: '#9E3E65' }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                      <span class=' pe-2'>
                        <i class="bi bi-plus"></i>
                      </span>
                      <span className='fw-bold'>Add Product</span>
                    </Link>



                    {/* <div class="position-relative">
                      <span class="position-absolute search"><HarmonyOSOutlined /></span>
                      <input type="text" id='search' onKeyUp={e => checkSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control w-100 ps-5 fw-light border-none" placeholder="Search transaction..." />
                    </div> */}

                  </div>
                </div>
              </div>
            </header>

          </div>
        </div>

        {/* TABLE */}
        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <Table
            dataSource={getAllProduct}
            columns={columns}
            pagination={{
              pageSize: postsPerPage,
              total: productGetData?.data?.length,
              onChange: paginate,
            }}
            loading={!getAllProduct}
            rowKey={(record) => record._id}
          />
          {/* {!getAllProduct && (
            <div className="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )} */}
          {/* {productGetData?.length < 1 && (
            <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>
          )} */}
        </div>


      </div>
    </>
  )
}

export default Products