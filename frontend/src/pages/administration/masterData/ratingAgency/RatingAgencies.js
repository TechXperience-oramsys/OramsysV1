import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MaterialTable from "material-table"
import { useDispatch, useSelector } from "react-redux"
import { ratingAgenciesAction } from "../../../../redux/actions/ratingAgenciesAction"
import { countrieAction } from "../../../../redux/actions/countrieAction"
import { MdEdit, MdPreview } from "react-icons/md"
// import { Tooltip } from "react-tooltip"
import Paginate from "./ratingPagination"

const RatingAgencies = () => {
  const [ratingData, setratingData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

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
            <header class='bg-surface-primary border-bottom pt-6'>
              <div class='row align-items-center mb-3'>
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
          <div className='table-responsive'>
            <table class="table align-middle mb-0 bg-white border-light border-5">
              <thead class="bg-light">
                <tr className="">
                  <th>Name</th>
                  <th>City</th>
                  <th>Street</th>
                  <th>Postcode</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {getAgencies?.length > 0 && getAgencies?.map((data, index) => (
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
                          <p class="fw-normal m-2">{data.city}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                        <p class="fw-normal m-2">{data.street}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                          <p class="fw-bold m-2">{data.postcode}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                          <p class="fw-bold m-2">{data.country}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center m-2">

                        <div class="align-items-center">
                          <MdEdit onClick={() => {
                            navigate(`/rating-agencies-edit?id=${data?.id}`, {
                              state: { isView: false }
                            })
                          }}
                            // data-tooltip-id='edit-id'
                            // data-tooltip-content='Edit Agency'
                            className='cursor-pointer'
                            size={18} />
                          {/* <Tooltip id='edit-id' place='top' effect='solid' /> */}
                        </div>
                        <div class="align-items-center ms-3">
                          <MdPreview 
                          // data-tooltip-id='preview-id' 
                          // data-tooltip-content='Preview Information'
                            onClick={() => navigate(`/rating-agencies-edit?id=${data?.id}`, {
                              state: { isView: true },
                            })}
                            className='cursor-pointer'
                            size={18}
                          />
                          {/* <Tooltip id='preview-id' place='top' effect='solid' /> */}
                        </div>
                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
            {!getAgencies && <div class="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div> }
            {ratingData?.length < 1 && <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>}
            <div class="card-footer border-0 py-2 mb-5">

              <span class="text-muted text-sm">
                <Paginate postsPerPage={postsPerPage} totalPosts={ratingAgenciesDatas?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} getAgencies={getAgencies} /> </span>
            </div>
          </div>
        </div>
        {/* <MaterialTable
          title=''
          columns={[
            { title: "Name", field: "name" },
            { title: "City", field: "city" },
            { title: "Street", field: "street" },
            { title: "Postcode", field: "postcode" },
            { title: "Country", field: "country" },
          ]}
          data={ratingData}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit RatingAgencie",
              onClick: (e, rowData) => {
                navigate(`/rating-agencies-edit?id=${rowData?.id}`, {
                  state: { isView: false }})
                console.log("rowData", rowData)
              },
            },
            {
              icon: "preview",
              tooltip: "View RatingAgencie",
              onClick: (e, rowData) =>
                navigate(`/rating-agencies-edit?id=${rowData?.id}`, {
                  state: { isView: true },
                }),
            },
          ]}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            sorting: true,
            pageSize: 10,
            search: false,
          }}
        /> */}
      </div>
    </>
  )
}

export default RatingAgencies
