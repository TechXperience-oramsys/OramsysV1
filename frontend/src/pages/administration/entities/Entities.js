import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { entityGetAction } from '../../../redux/actions/entityAction';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../../helper/AuthStorage';
import STORAGEKEY from '../../../config/APP/app.config';
import { COMPANY_DATA, EDIT_ENTITY, ENTITY_GET_BY_ID } from '../../../redux/types';
import { Table, Button, Menu, Dropdown, Spin } from 'antd';
import { EditOutlined, EyeOutlined, EllipsisOutlined } from '@ant-design/icons';
import { CiSearch } from 'react-icons/ci';
// import { companydataReducer } from '../../../redux/redusers/companydataReducer';
import { companydataAction } from '../../../redux/actions/companydataAction';

const Entities = () => {

  // const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)
  // const [entitySearch, setEntitySearch] = useState([])
  const [entityTableData, setEntityTableData] = useState([])
  const [setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const entityData = useSelector(state => state.entityData.entity)
  // console.log('GET ALL ENTITY', entityData)
  let userId = AuthStorage.getStorageData(STORAGEKEY.roles) === 'admin' ? AuthStorage.getStorageData(STORAGEKEY.userId) : ""
  // let userRoleId = AuthStorage.getStorageData(STORAGEKEY.roles) === "user" ? AuthStorage.getStorageData(STORAGEKEY.userId) : ""
  const userRole = AuthStorage.getStorageData(STORAGEKEY.roles) === "user"
  const superAdminRole = AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin"

  useEffect(() => {
    if (userId) {
      dispatch(entityGetAction(userId))
    } else {
      dispatch(entityGetAction("all"))
    }
  }, [userId, dispatch])

  useEffect(() => {
    dispatch({
      type: EDIT_ENTITY,
      payload: []
    })
    dispatch({
      type: ENTITY_GET_BY_ID,
      payload: []
    })
    dispatch({
      type: COMPANY_DATA,
      payload: [],
    });
  }, [dispatch])

  const refreshPage = useCallback(() => {
    if (entityData.data) {
      setEntityTableData(entityData.data?.map(item => {
        return {
          ...item,
          name: item?.details?.name ?? item?.details?.givenName,
          type: item?.type,
          email: item?.email,
          country: item?.details?.country?.name,
        }
      }))

      // setEntitySearch(entityData.data?.map(item => {
      //   return {
      //     ...item,
      //     name: item?.details?.name ?? item?.details?.givenName,
      //     type: item?.type,
      //     email: item?.email,
      //     country: item?.details?.country?.name,
      //   }
      // }))
    }
  }, [entityData])

  useEffect(() => {
    dispatch(() => refreshPage())
  }, [entityData, dispatch, refreshPage])


  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAllEntity = entityTableData?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleItemClick = (type) => {
    navigate('/add-edit-entities', { state: [{ type }] });
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Name',
      dataIndex: ['details', 'name'],
      key: 'name',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Counrty',
      dataIndex: 'country',
      key: 'country',
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },

    // {
    //   title: 'Sector',
    //   dataIndex: ['details', 'sector',],
    //   key: 'sector',
    //   align: 'center',
    //   sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    // },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Dropdown overlay={(
          <Menu>
            {superAdminRole && (
              <Menu.Item onClick={() => {
                companydataAction(record);
                navigate(`/add-edit-entities?id=${record._id}`, { state: [{ type: `${record.type}` }, { isView: false }], })
              }}>
                <EditOutlined /> Edit
              </Menu.Item>
            )}

            <Menu.Item onClick={() => {
              navigate(`/add-edit-entities?id=${record._id}`, {
                state: [{ type: `${record.type}` }, { isView: true }],
              });
            }}>
              <EyeOutlined /> Preview
            </Menu.Item>
          </Menu>
        )}>

          <Button><EllipsisOutlined /></Button>
        </Dropdown>



      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="individual" onClick={() => handleItemClick('Individual')}>
        Individual
      </Menu.Item>
      <Menu.SubMenu title="Company" onTitleClick={() => setShowSubData(!showSubData)}>
        <Menu.Item key="corporation" onClick={() => handleItemClick('Company')}>
          Corporation
        </Menu.Item>
        <Menu.Item key="financialInstitution" onClick={() => handleItemClick('Company')}>
          Financial Institution
        </Menu.Item>
        <Menu.Item key="sovereign" onClick={() => handleItemClick('Company')}>
          Sovereign
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const checkSearch = (e) => {
    const filtered = entityTableData?.filter((item) => {
      // Check if item.details.productDetails.name is an object and contains the property 'name'
      if (typeof item.details.name === 'object' && item.details.name !== null && 'name' in item.details.name) {
        // Convert item.details.name to lowercase if it's a string
        const productName = item.details.name.name.toLowerCase();
        // Check if productName includes the search value
        return productName.includes(e.target.value.toLowerCase());
      }

      return false;
    });

    setEntityTableData(filtered);
  };


  return (
    <>
      <div className='product'>


        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary  pt-6'>
              <div class='row align-items-center mb-3 product text-white' style={{ backgroundImage: "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)" }}>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>{userId ? 'Profile' : 'Entities'}</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-4'>

                    {/* <div className=''>
                      {userId ? '' : <input type="text" id='search' onKeyUp={e => checkSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control rounded-0 w-100 ps-5 fw-light border-none" placeholder="Search Entity..." />}
                    </div> */}

                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" || userRole ? (
                      <Dropdown overlay={menu} className='rounded-0 px-5' trigger={['click']}>
                        <Button class='btn d-inline-flex btn-md btn-light border-base p-2' id="dropdown-autoclose-outside">
                          <span className='fw-bold'>Add Entity</span>
                        </Button>
                      </Dropdown>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </header>

          </div>
        </div>

        <div className='container mx-auto my-4'>
          <div class="mb-2 d-flex justify-content-start align-items-center">
            <div class="position-relative">
              <span class="position-absolute search"><CiSearch size={25} /></span>
              {userId ? '' : <input type="text" id='search' onKeyUp={e => checkSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control rounded-0 w-100 ps-5 fw-light border-none" placeholder="Search Entity..." />}
            </div>
          </div>
          <div class='row g-6 mb-4'></div>
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={getAllEntity}
              loading={!getAllEntity && { indicator: <Spin /> }}
              pagination={{
                pageSize: postsPerPage,
                total: entityData?.data?.length,
                onChange: paginate,
              }}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default Entities