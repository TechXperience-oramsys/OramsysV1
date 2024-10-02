import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ratingAgenciesAction } from "../../../../redux/actions/ratingAgenciesAction"
import { countrieAction } from "../../../../redux/actions/countrieAction"
// import { MdEdit, MdPreview } from "react-icons/md"
// import { Tooltip } from "react-tooltip"
// import Paginate from "./ratingPagination"
import { Button, Spin, Table } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"

const RatingAgencies = () => {
  const [ratingData, setratingData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const ratingAgenciesDatas = useSelector(
    (state) => state.ratingAgenciesData?.ratingAgencies
  )
  const countryOptions = useSelector((state) => state.countryData.country)

  useEffect(() => {
    dispatch(countrieAction("all"))
  }, [dispatch])

  useEffect(() => {
    setratingData(ratingAgenciesDatas)
  }, [ratingAgenciesDatas])

  useEffect(() => {
    // console.log('ratingAgenciesDatas', ratingAgenciesDatas.data)

    if (ratingAgenciesDatas.data) {
      setratingData(
        ratingAgenciesDatas.data?.map((item) => {
          return {
            name: item.name,
            city: item.city,
            street: item.street,
            postcode: item.postcode,
            country: countryOptions.data?.find(
              (ele) => ele._id === item.country
            )?.name,
            id: item._id,
          }
        })
      )
    }
  }, [ratingAgenciesDatas, countryOptions])

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAgencies = ratingData?.slice(indexOfFirstItem, indexOfLastItem)
  console.log('check agencies', getAgencies)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  useEffect(() => {
    dispatch(ratingAgenciesAction())
  }, [dispatch])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      align: 'center',
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      align: 'center',
    },
    {
      title: 'Postcode',
      dataIndex: 'postcode',
      key: 'postcode',
      align: 'center',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <div className="">

          <Button icon={<EditOutlined />} onClick={() => {
            navigate(`/rating-agencies-edit?id=${record.id}`, { state: { isView: false }, });
          }} className="me-2"> Edit
          </Button>

          <Button icon={<EyeOutlined />} onClick={() => {
            navigate(`/rating-agencies-edit?id=${record.id}`, {
              state: { isView: true },
            });
          }} > View </Button>

        </div>


      ),
    },
  ];

  return (
    <>
      <div className='product'>
        {/* <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h2 className='m-0'>Rating agencies</h2>
          <button
            className='add_btn me-3'
            onClick={() => navigate("/rating-agencies-edit")}
          >
            {" "}
            <img src='../../assets/img/about/plus.png' alt="like" className='me-2' />
            Add
          </button>
        </div> */}
        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary pt-6'>
              <div class='row align-items-center mb-3 text-white product' style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Rating Agencies</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>
                    <Link to='/rating-agencies-edit' style={{ borderColor: '#9E3E65' }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                      <span class=' pe-2'>
                        <i class="bi bi-plus"></i>
                      </span>
                      <span className='fw-bold'>Add Rating Agency</span>
                    </Link>

                  </div>
                </div>
              </div>
            </header>

          </div>
        </div>

        {/* TABLE */}


        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={getAgencies}
              rowKey={(record) => record.id}
              pagination={{
                pageSize: postsPerPage,
                total: ratingAgenciesDatas?.data?.length,
                onChange: paginate
              }}
              loading={!getAgencies && { indicator: <Spin /> }}
            />
            {/* {!getAgencies && (
              <div className="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
                <Spin size="large" />
              </div>
            )}
            {ratingData?.length < 1 && (
              <div className="text-center mx-auto container py-5 my-5 m-5">
                No records were found
              </div>
            )} */}
            {/* <div className="card-footer border-0 py-2 mb-5">
              <span className="text-muted text-sm">
                <Paginate
                  postsPerPage={postsPerPage}
                  totalPosts={totalPosts}
                  paginate={paginate}
                  prevPagefunc={() => setCurrentPage((prev) => prev - 1)}
                  nextPagefunc={() => setCurrentPage((prev) => prev + 1)}
                  currentPage={currentPage}
                />
              </span>
            </div> */}
          </div>
        </div>
       
      </div>
    </>
  )
}

export default RatingAgencies
