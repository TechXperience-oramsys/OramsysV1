// import { TextField, Autocomplete } from "@mui/material"
import React, { useEffect, useState } from 'react'
import LicencesEditModal from '../../../../component/Modal/LicencesEditModal'
import { useSelector, useDispatch } from 'react-redux'
import { companydataAction } from '../../../../redux/actions/companydataAction'
import moment from 'moment';
import { Row, Col, Form } from "react-bootstrap"
import { useLocation } from 'react-router-dom'
import { Table, Button, Space } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { OptionalSpan } from '../../../transactions/Helpers/OptionalTags'


const Licences = ({ handleNext, handleBack }) => {

    const [editModal, setEditModal] = useState(false)
    const [mode, setMode] = useState("")
    const dispatch = useDispatch()
    const [licenceTable, setLicenceTable] = useState([])
    const [editData, setEditData] = useState('')
    const location = useLocation()
    const isView = location.state[1]?.isView

    const companyData = useSelector((state) => state.companydata.companydata)
    const countryData = useSelector((state) => state.countryData.country)

    useEffect(() => {
        if (companyData && companyData.licenses && countryData?.data) {
            setLicenceTable(companyData.licenses.map((ele) => {
                return {
                    type: ele.type,
                    number: ele.number,
                    authority: ele.authority,
                    country: countryData.data.find((item) => item._id === ele.country)?.name,
                    dateofrating: moment(ele.dateOfRating).format("YYYY-MM-DD"),
                    expirydate: moment(ele.expiryDate).format("YYYY-MM-DD"),
                }
            }))
        }
    }, [companyData, countryData])

    const Delete = (data) => {
        let body = {
            ...companyData,
            licenses: companyData.licenses.filter((ele, i) => i !== data.key)
        }
        dispatch(companydataAction(body))
    }

    const handleOption = (value) => {
        let body = {
            ...companyData,
            isLicense: value,
        }
        dispatch(companydataAction(body))
    }

    let options = [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ]

    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Authority',
            dataIndex: 'authority',
            key: 'authority',
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
            title: 'Date Of Rating',
            dataIndex: 'dateofrating',
            key: 'dateofrating',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expirydate',
            key: 'expirydate',
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
                            setEditData(record.key);
                            setMode("View");
                        }}
                    />
                </Space>
            ),
        },
    ];
    const entityData = useSelector(state => state.entityData.entity)

    console.log('SHOW DATA', entityData?.data[0])

    return (
        <>

            <div className='add-edit-product'>
                <div className='product'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h4 className='fw-bold fs-5 mb-3 title-admin'>LICENCE</h4>

                        {companyData.isLicense &&
                            <button className='btn btn-primary btn-md mb-3' onClick={() => { setEditModal(true); setMode("Add") }}>
                                Add License
                            </button>
                        }
                    </div>
                    <div className='drop-down-container'>
                        <div className='form'>
                            <Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Do you want to add a license? <OptionalSpan /></Form.Label>
                                    <Form.Select
                                        className='no-border'
                                        onChange={(e) => {
                                            const selectedValue = e.target.value === "true" ? true : e.target.value === "false" ? false : "";
                                            handleOption(selectedValue);
                                        }}
                                        disabled={isView}
                                        value={companyData.isLicense !== null && companyData.isLicense !== undefined ? companyData.isLicense.toString() : ""}
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

                    {companyData.isLicense && (
                        <Table
                            columns={columns}
                            dataSource={licenceTable.map((item, index) => ({ ...item, key: index }))}
                            pagination={{ pageSize: 10 }}
                            loading={false}  // Change to true if you want to show a loading spinner
                            rowKey="key"
                            bordered
                        />
                    )}
                </div>

                <div className='footer_'>
                    <button onClick={() => { handleBack() }} className="footer_cancel_btn">Back</button>
                    <button onClick={() => { ((companyData?.licenses?.length > 0 && companyData.isLicense) || companyData.isLicense === false) && handleNext() }} className='footer_next_btn'> Next</button>
                </div>
            </div>


            {
                editModal && <LicencesEditModal show={editModal} onHide={() => { setEditModal(false); setEditData(''); setMode('') }} mode={mode} editData={editData} />
            }
        </>
    )
}

export default Licences