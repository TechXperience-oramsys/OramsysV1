import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EntitiesRoleAddModal from '../../component/Modal/EntitiesRoleAddModal'
import { entitiesRoleAction, entityRoleDeleteAction } from '../../redux/actions/entitiesRoleAction'
import ConfirmationModel from "../../component/Modal/ConfirmationModel";
import { Link, useNavigate } from 'react-router-dom'

import { Table, Dropdown, Button, Menu } from 'antd';
import { MdEdit, MdDelete,  } from 'react-icons/md';
import { EditOutlined, EllipsisOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
const EntitiesRole = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [entityRole, setEntityRole] = useState()
    const [addEntityModal, setAddEntityModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [formType, setFormType] = useState('add')
    const [rowData, setRowData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    const entityRoleData = useSelector(state => state.entityRoleData.entityRole)
    useEffect(() => {
        if (!addEntityModal || isDelete || isAdd) {
            setIsDelete(false)
            setIsAdd(false)
            dispatch(entitiesRoleAction());
        }
    }, [addEntityModal, dispatch, isDelete, isAdd]);

    useEffect(() => {
        setEntityRole(entityRoleData);
    }, [entityRoleData]);
    console.log('entityRole', entityRoleData)

    const handleAdd = () => {
        setRowData({})
        setFormType('add');
        setAddEntityModal(true);
        dispatch(entitiesRoleAction());
    };

    const handleDelete = (rowData) => {
        dispatch(entityRoleDeleteAction(rowData._id));
        setIsDelete(true);
        setShowModal(false);
        dispatch(entitiesRoleAction());
    };
    const indexOfLastItem = currentPage * postsPerPage
    const indexOfFirstItem = indexOfLastItem - postsPerPage
    const getAllEntities = entityRole?.data?.slice(indexOfFirstItem, indexOfLastItem)
    //page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const columns = [
        {
            title: 'Role',
            dataIndex: 'roleName',
            key: 'roleName',
            align: 'left',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (text, record) => (
                <Dropdown overlay={(
                    <Menu>
                      <Menu.Item  onClick={() => {
                                    setFormType('edit');
                                    setAddEntityModal(true);
                                    setRowData(record);
                                }}>
                      <EditOutlined /> Edit
                      </Menu.Item>
          
                      <Menu.Item onClick={() => {
                                    setRowData(record);
                                    setShowModal(true);
                                }}>
                      <DeleteOutlined /> Delete
                      </Menu.Item>
                    </Menu>
                  )}>
                      <Button><EllipsisOutlined /></Button>
                  </Dropdown>

              
            ),
        },
    ];

    return (
        <>
            <div className='add-edit-product'>
                {/* <h1 className=''>RatingAgencies</h1> */}
                <div className='product p-0'>
                    {/* <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h5 className="title-color">Entities Role</h5>
                        <button className='add_btn me-3' onClick={() => handleAdd()}><img
                            src='../../assets/img/about/plus.png' className='me-2' alt='' />Add
                        </button>
                    </div> */}

                    <div class='container-fluid'>
                        <div id='dash' class='mb-npx'>
                            <header class='bg-surface-primary border-bottom pt-6'>
                                <div class='row align-items-center mb-3'>
                                    <div class='col-sm-6 col-12 mb-4 mb-sm-0'>

                                        <h2 class=' mb-0 fw-bold fs-4 ls-tight'>Entities Role</h2>
                                    </div>

                                    <div class='col-sm-6 col-12 text-sm-end'>
                                        <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>
                                            <button onClick={() => handleAdd()} style={{ borderColor: '#9E3E65' }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                                                <span class=' pe-2'>
                                                    <i class="bi bi-plus"></i>
                                                </span>
                                                <span className='fw-bold'>Add Role</span>
                                            </button>

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
                                dataSource={getAllEntities}
                                columns={columns}
                                pagination={{
                                    pageSize: postsPerPage,
                                    total: entityRoleData?.data?.length,
                                    onChange: paginate,
                                }}
                                loading={!getAllEntities}
                                rowKey={(record) => record.id}
                            />
                            {/* {!getAllEntities && (
                                <div className="d-flex justify-content-center mx-auto container py-5 my-5 m-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )} */}
                            {/* {entityRoleData?.length < 1 && (
                                <div className="text-center mx-auto container py-5 my-5 m-5"> No records were found</div>
                            )} */}
                        </div>
                    </div>

                    {/* <MaterialTable
                        title=""
                        columns={[
                            { title: 'Grade', field: 'roleName' },
                            { title: 'Value', field: 'product' },
                            { title: 'Acceptable', field: 'type' },
                            { title: 'Comments', field: 'comments' },
                        ]}
                        data={entityRole?.data}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Role',
                                onClick: (e, rowData) => {
                                    setFormType('edit');
                                    setAddEntityModal(true);
                                    setRowData(rowData)
                                }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Role',
                                onClick: (e, rowData) => {
                                    setRowData(rowData)
                                    setShowModal(true)
                                }
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

                </div>
                {/* <div className='footer_'>
                    <button onClick={() => { }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { }} className='footer_next_btn'>Save</button>
                </div> */}
            </div>
            {addEntityModal &&
                <EntitiesRoleAddModal formType={formType} data={rowData} show={addEntityModal} onHide={() => {
                    setAddEntityModal(false);
                    if (formType === 'add') {
                        setIsAdd(true)
                    }
                }} />}
            {showModal &&
                <ConfirmationModel show={showModal} message={"Are you sure you want to delete?"} onConfirm={() => handleDelete(rowData)} onHide={() => setShowModal(false)} />}
        </>
    )
}

export default EntitiesRole