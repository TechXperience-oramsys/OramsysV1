import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UserCard from '../../../component/UserCard';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { userGetAction } from '../../../redux/actions/userAction';
import { MdEdit, MdPreview } from 'react-icons/md';
// import { Tooltip } from "react-tooltip"
import Paginate from './userPagination';

const Users = () => {
  const [showspan, setShowspan] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [getUserDatas, setGetUserDatas] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  const userData = useSelector(state => state.userData?.getUserData)

  // console.log('userData==================', userData)

  useEffect(() => {
    setGetUserDatas(userData)
  }, [userData])

  // console.log('getUserData====================', getUserDatas)

  useEffect(() => {
    dispatch(userGetAction())
  }, [])

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAllUsers = getUserDatas?.data?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  return (
    <>


      <div className='product'>
        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary border-bottom pt-6'>
              <div class='row align-items-center mb-3'>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>

                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Users</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>



                    <Link to='/add-user' style={{ borderColor: '#9E3E65' }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                      <span class=' pe-2'>
                        <i class="bi bi-plus"></i>
                      </span>
                      <span className='fw-bold'>Add User</span>
                    </Link>

                  </div>
                </div>
              </div>
            </header>

          </div>
        </div>
        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className='table-responsive'>
            <table class="table align-middle mb-0 bg-white border-light border-5">
              <thead class="bg-light">
                <tr className=''>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Profile</th>
                  <th className='text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>

                {getAllUsers?.length > 0 && getAllUsers?.map((data, index) => (
                  <tr key={index} className='text-center'>
                    <td>
                      <div class="d-flex align-items-center">

                        <div class="">
                          <p class="fw-normal m-2">{data.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">

                        <div class="">
                          <p class="fw-normal m-2">{data.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                          <span class="badge badge-success rounded-pill m-2 me-3">{data.department}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                          <p class="fw-bold m-2">{data.profile}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex justify-content-end m-2">

                        <div class="align-items-center">
                          <MdEdit onClick={() => { navigate(`/edit-user?id=${data?._id}`) }}
                            // data-tooltip-id='edit-id'
                            // data-tooltip-content='Edit User'
                            className='cursor-pointer'
                            size={18} />
                          {/* <Tooltip id='edit-id' place='top' effect='solid' /> */}
                        </div>
                        <div class="align-items-center ms-3">
                          <MdPreview 
                          // data-tooltip-id='preview-id' 
                          // data-tooltip-content='Preview Information'
                            onClick={() => navigate(`/add-user?id=${data?._id}`, { state: { isView: true } })}
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
            {!getAllUsers && <div class="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div> }
            {getUserDatas?.length < 1 && <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>}
            <div class="card-footer border-0 py-2 mb-5">

              <span class="text-muted text-sm">
                <Paginate postsPerPage={postsPerPage} totalPosts={userData?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} getAllUsers={getAllUsers} /> </span>
            </div>
          </div>
        </div>

        {/* <MaterialTable
          title=""
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Department', field: 'department' },
            { title: 'Profile', field: 'profile' },
          ]}
          data={getUserDatas?.data}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Users',
              onClick: (e, rowData) => navigate(`/edit-user?id=${rowData?._id}`)
            },
            {
              icon: 'preview',
              tooltip: 'View Users',
              onClick: (e, rowData) => navigate(`/add-user?id=${rowData?._id}`, { state: { isView: true } })
            }
          ]}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            sorting: true,
            pageSize: 10,
            search: false,
          }}
        /> */}

        {/*  <div className='container mx-auto'>
          <div className='table-responsive'>
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Profile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                     
                      <div class="ms-3">
                        <p class="fw-bold mb-1">John Doe</p>
                        <p class="text-muted mb-0">john.doe@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Software engineer</p>
                    <p class="text-muted mb-0">IT department</p>
                  </td>
                  <td>
                    <span class="badge badge-success rounded-pill d-inline">Active</span>
                  </td>
                  <td>Senior</td>
                  <td>
                    <button type="button" class="btn btn-link btn-sm btn-rounded">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                     
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Alex Ray</p>
                        <p class="text-muted mb-0">alex.ray@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Consultant</p>
                    <p class="text-muted mb-0">Finance</p>
                  </td>
                  <td>
                    <span class="badge badge-primary rounded-pill d-inline"
                    >Onboarding</span
                    >
                  </td>
                  <td>Junior</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link btn-rounded btn-sm fw-bold"
                      data-mdb-ripple-color="dark"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                     
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Kate Hunington</p>
                        <p class="text-muted mb-0">kate.hunington@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Designer</p>
                    <p class="text-muted mb-0">UI/UX</p>
                  </td>
                  <td>
                    <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
                  </td>
                  <td>Senior</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link btn-rounded btn-sm fw-bold"
                      data-mdb-ripple-color="dark"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Users