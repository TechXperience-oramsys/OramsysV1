import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import WarehouseEditModal from '../../../../component/Modal/WarehouseEditModal'
import { useSelector, useDispatch } from 'react-redux'
import { companydataAction } from '../../../../redux/actions/companydataAction'
import { useLocation } from 'react-router-dom'
import { Col, Form, Row } from "react-bootstrap"
import { TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { OptionalSpan } from '../../../transactions/Helpers/OptionalTags'
import { Button, Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'

const Warehouse = ({ handleNext, handleBack }) => {

    const dispatch = useDispatch()

    const [editModal, setEditModal] = useState(false)
    const [mode, setMode] = useState("")
    const [editData, setEditData] = useState('')
    const [warehouse, setWarehouse] = useState([])
    const location = useLocation()
    const isView = location.state[1]?.isView

    const companyData = useSelector((state) => state.companydata.companydata)
    const countryData = useSelector((state) => state.countryData.country)

    useEffect(() => {
        if (companyData && companyData.warehouses && countryData?.data) {
            setWarehouse(companyData.warehouses.map((ele) => {
                return {
                    nature: ele.nature,
                    name: ele.name,
                    type: ele.type,
                    city: ele.city,
                    country: countryData?.data.find((item) => item._id === ele.country)?.name,
                    governingLaw: ele.governingLaw,
                }
            }))
        }
    }, [companyData, countryData])

    const Delete = (data) => {
        let body = {
            ...companyData,
            warehouses: companyData.warehouses.filter((e, i) => i !== data.key)
        }
        dispatch(companydataAction(body))
    }

    let options = [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ]

    const handleOption = (value) => {
        let body = {
            ...companyData,
            isWarehouse: value,
        }
        dispatch(companydataAction(body))
    }


    const columns = [
        {
            title: 'Nature',
            dataIndex: 'nature',
            key: 'nature',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Governing Law',
            dataIndex: 'governingLaw',
            key: 'governingLaw',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    {!isView && (
                        <>
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setEditModal(true);
                                    setEditData(record.key);
                                    setMode("Edit");
                                }}
                            />
                            <Button
                                icon={<DeleteOutlined />}
                                onClick={() => Delete(record)}
                            />
                        </>
                    )}
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setEditModal(true);
                            setMode("View");
                            setEditData(record.key)
                        }}
                    />
                </Space>
            ),
        },
    ];


    return (
        <>
            <div className='add-edit-product'>

                <div className='product'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h4 className='fw-bold fs-5 mb-3 title-admin'>WAREHOUSE</h4>
                        {companyData.isWarehouse &&
                            <button className='btn btn-primary btn-md mb-3' onClick={() => { setEditModal(true); setMode("Add") }}>
                                Add Warehouse
                            </button>
                        }
                    </div>
                    <div className='drop-down-container'>
                        <div className='form'>
                            <Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Do you want to add a Warehouse? <OptionalSpan /></Form.Label>
                                    <Form.Select
                                        className='no-border'
                                        onChange={(e) => {
                                            const selectedValue = e.target.value === "true" ? true : e.target.value === "false" ? false : "";
                                            handleOption(selectedValue);
                                        }}
                                        disabled={isView}
                                        value={companyData.isWarehouse !== null && companyData.isWarehouse !== undefined ? companyData.isWarehouse.toString() : ""}
                                    >
                                        <option value="" disabled>Choose...</option>
                                        {options.map((item, i) => (
                                            <option key={i} value={item.value.toString()}>{item.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </Row>
                        </div>
                    </div>

                    {companyData.isWarehouse && (
                        <Table
                            columns={columns}
                            dataSource={warehouse.map((item, index) => ({ ...item, key: index }))}
                            pagination={{ pageSize: 10 }}
                            loading={false}  // Change to true if you want to show a loading spinner
                            rowKey="key"
                            bordered
                        />
                    )}
                </div>
                <div className='footer_'>
                    <button onClick={() => { handleBack() }} className="footer_cancel_btn">Back</button>
                    <button onClick={() => { ((companyData?.warehouses?.length > 0 && companyData.isWarehouse) || companyData.isWarehouse === false) && handleNext() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
            {
                editModal && <WarehouseEditModal show={editModal} onHide={() => setEditModal(false)} mode={mode} editData={editData} />
            }
        </>
    )
}

export default Warehouse