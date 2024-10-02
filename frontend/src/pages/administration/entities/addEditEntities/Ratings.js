import React, { useEffect, useState } from 'react'
import RatingModal from '../../../../component/Modal/RatingModal'
import { useSelector, useDispatch } from 'react-redux';
import { companydataAction } from '../../../../redux/actions/companydataAction';
import { ratingAgenciesAction } from '../../../../redux/actions/ratingAgenciesAction';
import { useLocation } from 'react-router-dom';
import { Col, Form, Row } from "react-bootstrap"
// import { TextField, Autocomplete } from "@mui/material"
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { OptionalSpan } from '../../../transactions/Helpers/OptionalTags'
import moment from 'moment';

const Ratings = ({ handleNext, handleBack }) => {

    const dispatch = useDispatch()
    const [editModal, setEditModal] = useState(false)
    const [mode, setMode] = useState("")
    const [rating, setRating] = useState([])
    const [editData, setEditData] = useState('')
    const location = useLocation()
    const isView = location.state[1]?.isView
    let options = [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ]

    const companyData = useSelector((state) => state.companydata.companydata)
    const agencyData = useSelector((state) => state.ratingAgenciesData.ratingAgencies)

    useEffect(() => {
        dispatch(ratingAgenciesAction())
    }, [dispatch])

    useEffect(() => {
        if (companyData && companyData.ratings && agencyData?.data) {
            setRating(companyData.ratings.map((ele) => {
                return {
                    agency: agencyData.data.find((item) => item._id === ele.agency)?.name,
                    rating: agencyData.data.find((item) => item._id === ele.agency)?.ratingSchema?.find((elem) => elem._id === ele.rating)?.grade,
                    dateOfRating: moment(ele.dateOfRating).format("YYYY-MM-DD"),
                    expiryDate: moment(ele.expiryDate).format("YYYY-MM-DD"),
                }
            }))
        }
    }, [companyData, agencyData])

    const Delete = (data) => {
        let body = {
            ...companyData,
            ratings: companyData.ratings.filter((e, i) => i !== data.key)
        };
        dispatch(companydataAction(body));
    }

    const handleOption = (value) => {
        let body = {
            ...companyData,
            isRatings: value,
        }
        dispatch(companydataAction(body))
    }

    const columns = [
        {
            title: 'Agency',
            dataIndex: 'agency',
            key: 'agency',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Date Of Rating',
            dataIndex: 'dateOfRating',
            key: 'dateOfRating',
            sorter: true,
            filterMultiple: true,
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
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
                                    setEditData(record?.key);
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
                        <h4 className='fw-bold fs-5 mb-3 title-admin'>RATINGS</h4>

                        {companyData.isRatings &&
                            <button className='btn btn-primary btn-md mb-3' onClick={() => {
                                setEditModal(true); setMode("Add")
                            }}>
                                Add Rating
                            </button>
                        }
                    </div>
                    <div className='drop-down-container'>
                        <div className='form'>
                            <Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Do you want to add rating? <OptionalSpan /> </Form.Label>
                                    <Form.Select
                                        className='no-border'
                                        onChange={(e) => {
                                            const selectedValue = e.target.value === "true" ? true : e.target.value === "false" ? false : "";
                                            handleOption(selectedValue);
                                        }}
                                        disabled={isView}
                                        value={companyData.isRatings !== null && companyData.isRatings !== undefined ? companyData.isRatings.toString() : ""}
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

                    {companyData.isRatings && (
                        <Table
                            columns={columns}
                            dataSource={rating?.map((item, index) => ({ ...item, key: index }))}
                            pagination={{ pageSize: 10 }}
                            loading={false}  // Change to true if you want to show a loading spinner
                            rowKey="key"
                            bordered
                        />
                    )}
                </div>
                <div className='footer_'>
                    <button onClick={() => { handleBack() }} className="footer_cancel_btn">Back</button>
                    <button onClick={() => { ((companyData?.ratings?.length > 0 && companyData.isRatings) || companyData.isRatings === false) && handleNext() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
            {
                editModal && <RatingModal show={editModal} onHide={() => setEditModal(false)} mode={mode} editData={editData} />
            }
        </>
    )
}

export default Ratings