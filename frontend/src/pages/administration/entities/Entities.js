import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { entityGetAction } from '../../../redux/actions/entityAction';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../../helper/AuthStorage';
import STORAGEKEY from '../../../config/APP/app.config';
import { COMPANY_DATA, EDIT_ENTITY, ENTITY_GET_BY_ID } from '../../../redux/types';
import { Table, Space, Tooltip, Button, Menu, Dropdown } from 'antd';
import { EditOutlined, EyeOutlined, EllipsisOutlined } from '@ant-design/icons';

const Entities = () => {

  const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)
  const [entitySearch, setEntitySearch] = useState([])
  const [entityTableData, setEntityTableData] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const entityData = useSelector(state => state.entityData.entity)
  console.log('entities====', entityData)
  let userId = AuthStorage.getStorageData(STORAGEKEY.roles) === 'admin' ? AuthStorage.getStorageData(STORAGEKEY.userId) : ""

  useEffect(() => {
    if (userId) {
      dispatch(entityGetAction(userId))
    } else {
      dispatch(entityGetAction("all"))
    }
  }, [userId])

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
  }, [])

  const refreshPage = useCallback(() => {
    if (entityData.data) {
      setEntityTableData(entityData.data?.map(item => {
        return {
          ...item,
          name: item?.details?.name ?? item?.details?.givenName,
          type: item.type,
          email: item.email,
          country: item?.details?.country?.name,
        }
      }))

      setEntitySearch(entityData.data?.map(item => {
        return {
          ...item,
          name: item?.details?.name ?? item?.details?.givenName,
          type: item.type,
          email: item.email,
          country: item?.details?.country?.name,
        }
      }))
    }
  }, [entityData])

  useEffect(() => {
    dispatch(() => refreshPage())
  }, [entityData])

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAllEntity = entityTableData?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log('SHOW DATA', entityTableData)

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      title: 'Country',
      dataIndex: ['details', 'country', 'name'],
      key: 'country',
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
            <Menu.Item onClick={() => {
              navigate(`/add-edit-entities?id=${record._id}`, { state: [{ type: `${record.type}` }, { isView: false }], })
            }}>
              <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item onClick={() => {
              navigate(`/add-edit-entities?id=${record._id}`, {
                state: [{ type: `${record.type}` }, { isView: false }],
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
            <header class='bg-surface-primary border-bottom pt-6'>
              <div class='row align-items-center mb-3'>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>{userId ? 'Profile' : 'Entities'}</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>

                  <div className=''>
                     <input type="text" id='search' onKeyUp={e => checkSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control w-100 ps-5 fw-light border-none" placeholder="Search product..." />

                    </div>

                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" ? (
                      <Dropdown overlay={menu} trigger={['click']}>
                        
                        <Button class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3' id="dropdown-autoclose-outside">
                          <span class=' pe-2'>
                            <i class="bi bi-plus"></i>
                          </span>
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

        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={getAllEntity}
              loading={!getAllEntity}
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