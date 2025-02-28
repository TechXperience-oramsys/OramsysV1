
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import PartiesEditModal from '../../component/Modal/PartiesEditModal'
import { useDispatch, useSelector } from 'react-redux';
import { transactionDataAction } from '../../redux/actions/transactionDataAction'
import { entityGetAction } from '../../redux/actions/entityAction'
import { tableDataAtom, rowEditDataAtom, relatedPartyDetailsAtom, keyPartiesAtom, partiesDataAtom, buyersAtom, namesAtom } from '../transactions/Helpers/atoms'
import { useAtom } from 'jotai'
import { OptionalSpan } from './Helpers/OptionalTags'
import { EditOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons';
import { Table, Button, Form as AntdForm, Tooltip, Upload } from 'antd';
import { toast } from 'sonner';
import { transactionServices } from '../../_Services/transactions';

const { Dragger } = Upload;

const KeyParties = ({ hendelCancel, hendelNext, transactionType, getShippingCompany, getCounterParty, pricingHedgingStatus, getWarehouseCompany, warehouseStatus, getLender, getBorrower , stype }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isView = location?.state[2]?.isView

    const [showEditModal, setShowEditModal] = useState(false)
    const [tableData, setTableData] = useAtom(tableDataAtom)
    const [rowEditData, setRowEditData] = useAtom(rowEditDataAtom)
    const [editId, setEditId] = useState('')
    const [view, setView] = useState()
    // const [error, setError] = useState({})
    const [names, setNames] = useAtom(namesAtom)
    const [buyer, setBuyer] = useAtom(buyersAtom)
    const [partiesData, setpartiesData] = useAtom(partiesDataAtom)
    const [keyParties, setkeyParties] = useAtom(keyPartiesAtom)
    const [relatedPartyDetails, setRelatedPartyDetails] = useAtom(relatedPartyDetailsAtom)
    const [warehouses, setWarehouses] = useState([])
    const parties = [
        "Subsidiary",
        "Owners",
        "Associate",
        "None",
    ]

    const nameOption = useSelector(state => state.entityData.entity)
    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)


    console.log(getTransactionByIdData , 'getTransactionByIdDatagetTransactionByIdData' , transactionData);
    

    useEffect(() => {
        dispatch(entityGetAction('all'))
    }, [dispatch]);

    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            const keyPartiesData = getTransactionByIdData.data.keyParties?.[0]?.parties?.map((ele) => {
                return {
                    name: { label: ele.name?.details?.name ?? ele.name?.details?.givenName, value: ele.name?._id },
                    type: { label: ele.type?.roleName, value: ele.type?._id }
                };
            }) || [];

            setTableData(keyPartiesData);
            setEditId(getTransactionByIdData.data.keyParties?.[0]?._id);
            // setBorrower_Applicant(getTransactionByIdData.data?.details?.pricingDetails?.pricingCounterParty?.details.name);
            // setLenders(getTransactionByIdData.data?.details?.lenders);
            // setCounterPart(getTransactionByIdData.data?.details?.counterParty?.details.name);
            // setShippingComp(getTransactionByIdData.data?.details?.shippingOptions?.shippingCompany?.details?.name);


            // if (getTransactionByIdData.data.keyParties?.[0]?.relatedParties) {
            //     setkeyParties(getTransactionByIdData.data.keyParties[0].relatedParties);
            //     setEditMode(true);
            // }
        }
    }, [getTransactionByIdData, setTableData]);



    useEffect(() => {
        if (getTransactionByIdData.data?.keyParties[0].relatedParties !== undefined && getTransactionByIdData.data?.keyParties[0].relatedParties.length > 0) {
            setRelatedPartyDetails(getTransactionByIdData.data?.keyParties[0].relatedParties);
        }
    }, [getTransactionByIdData, relatedPartyDetails, setRelatedPartyDetails])

    const handleParties = (e, newValue, index, type) => {
        const updatedKeyParties = [...keyParties];
        const updatedRelatedPartyDetails = [...relatedPartyDetails];

        if (!updatedKeyParties[index]) {
            updatedKeyParties[index] = { party_relation: '', buyer: '', shipper: '', upload_evidence: '' };
        }

        if (!updatedRelatedPartyDetails[index]) {
            updatedRelatedPartyDetails[index] = { party_relation: '', buyer: '', shipper: '', upload_evidence: '' };
        }

        if (type === 'buyer') {
            if (updatedKeyParties[index].shipper !== newValue) {
                updatedKeyParties[index].buyer = newValue;
                updatedRelatedPartyDetails[index].buyer = newValue;
            } else {
                toast.error('Party 1 and Party 2 should not be identical');
            }
        } else {
            if (updatedKeyParties[index].buyer !== newValue) {
                updatedKeyParties[index].shipper = newValue;
                updatedRelatedPartyDetails[index].shipper = newValue;
            } else {
                toast.error('Party 1 and Party 2 should not be identical');
            }
        }

        setkeyParties(updatedKeyParties);
        setRelatedPartyDetails(updatedRelatedPartyDetails);
    };

    // const handleRelatedParties = () => {
    //     setRelatedPartyDetails([...relatedPartyDetails, { party_relation: '', buyer: '', shipper: '', upload_evidence: '' }]);
    //     console.log(relatedPartyDetails); 
    // };
    const handleRelatedParties = () => {
        setRelatedPartyDetails(prevDetails => [
            ...prevDetails,
            { party_relation: '', buyer: '', shipper: '', upload_evidence: '' }
        ]);
        console.log(relatedPartyDetails); // Make sure this logs the new array.
    };


    const handleRelationChange = (e, index) => {
        const newRelation = e.target.value;
        setRelatedPartyDetails(prevDetails =>
            prevDetails.map((party, i) =>
                i === index ? { ...party, party_relation: newRelation } : party
            )
        );
    };
    const [fileList, setFileList] = useState([]);
    const handleChangeFile = (file, index) => {
        const selectedFile = file?.originFileObj || file;

        if (selectedFile && selectedFile instanceof Blob) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);

            reader.onload = () => {
                const updatedKeyParties = [...keyParties];

                // Ensure the keyParties array has an object at the specified index
                if (!updatedKeyParties[index]) {
                    updatedKeyParties[index] = { party_relation: '', buyer: '', shipper: '', upload_evidence: [] };
                }

                // Update the upload_evidence property
                updatedKeyParties[index].upload_evidence = [
                    { type: 'img', name: selectedFile.name, file: reader.result }
                ];

                setkeyParties(updatedKeyParties);
            };
        } else {
            console.error("Selected file is not a Blob or File instance:", file);
        }
    };


    const handleFileChange = (info, index) => { // Accept index as an argument
        const newFileList = info.fileList.slice(-1); // Only keep the last file
        setFileList(newFileList); // Update local file list state
        if (newFileList.length > 0) {
            handleChangeFile(newFileList[0], index); // Pass index to handleChangeFile
        }
    };



    useEffect(() => {
        if (nameOption?.data) {
            let temp_names = [];
            nameOption?.data?.forEach((element) => {
                if (element.details) {
                    // Safely assign name
                    element.details.name = element.details.name || element.details.givenName;
                }
                temp_names.push(element);
            });
            setNames(temp_names);
        }
    }, [nameOption, setNames]);


    const partiesEditData = (data, id) => {
        if (id !== undefined) {
            setTableData(
                tableData.map((ele, i) => {
                    if (id === i) {
                        return data
                    } else {
                        return ele
                    }
                })
            )
            setRowEditData('')
        } else {
            setTableData([...tableData, data])
        }
    }
    // const validation = () => {
    //     let flag = false
    //     let error = {}

    //     if (!relatedPartyDetails.buyer) {
    //         flag = true
    //         error.buyer = 'Please select a party'
    //     }
    //     if (!relatedPartyDetails.shipper) {
    //         flag = true
    //         error.shipper = 'Please select a party'
    //     }
    //     if (!relatedPartyDetails.party_relation) {
    //         flag = true
    //         error.party_relation = 'Please select a relation'
    //     }
    //     if (relatedPartyDetails.length < 1) {
    //         flag = true
    //         error.relatedPartyDetails = 'Please enter document remittance'
    //     }
    //     setError(error)
    //     return flag
    // }


    const next = () => {
        // if (validation()) {
        //     return
        // }
        let relatedParties = keyParties;

        let body = {
            ...transactionData,
            keyParties: {
                _id: editId,
                keyParties: tableData.map((ele) => {
                    return {
                        type: ele.type,
                        name: ele.name
                    }
                }),
                relatedParties: relatedParties,
            },
            type: transactionType
        }

        dispatch(transactionDataAction(body))
        hendelNext()
    }
    // console.log('TAbLE dATa', tableData)
    useEffect(() => {
        let buyer_arr = [];
        let warehouses = [];
        if (names) {
            names.forEach(element => {
                element.roles.forEach(roleDetail => {
                    if (roleDetail.roleId?.roleName === "Buyer") {
                        var temp = {
                            label: element.details.name != null ? element.details.name : element.details.givenName,
                            value: element.details.name != null ? element.details.name : element.details.givenName,
                            prefix: ''
                        };
                        buyer_arr.push(temp);
                        element.warehouses.forEach(warehose => {
                            warehouses.push(warehose);
                        })
                    }
                });

            });
        }
        setBuyer(buyer_arr);
        setWarehouses(warehouses);
    }, [names, setBuyer])


    const tdata = useMemo(() => tableData.map(item => item?.name?.label), [tableData]);
    const warehouseCo = useMemo(() => getWarehouseCompany?.warehouses?.[0]?.warehouseCompany?.label, [getWarehouseCompany]);
    const AddUpParties = useCallback(() => {
        const storeData = [
            getBorrower,
            getLender,
            // getShippingCompany,
            warehouseCo,
            getCounterParty,
            ...tdata,
        ].filter(item => item);

        setpartiesData(storeData);
    }, [getBorrower, getLender,
        // getShippingCompany,
        warehouseCo, getCounterParty, tdata, setpartiesData]);

    useEffect(() => {
        AddUpParties()
    }, [AddUpParties])

    const columns = [
        {
            title: 'Party',
            dataIndex: ['name', 'label'], // Nested field access
            key: 'party',
        },
        {
            title: 'Role',
            dataIndex: ['type', 'label'], // Nested field access
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    {isView ? (
                        <Tooltip title="View Product">
                            <Button
                                type="default"
                                shape="circle"
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    setShowEditModal(!showEditModal);
                                    setRowEditData(record);
                                    setView(isView);
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="Edit Product">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        setRowEditData(record);
                                        setShowEditModal(!showEditModal);
                                        // console.log('rowData ==', record);
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                            </Tooltip>
                            <Tooltip title="View Product">
                                <Button
                                    type="default"
                                    shape="circle"
                                    icon={<EyeOutlined />}
                                    onClick={() => {
                                        setShowEditModal(!showEditModal);
                                        setRowEditData(record);
                                    }}
                                />
                            </Tooltip>
                        </>
                    )}
                </>
            ),
        },
    ];


    return (
        <>
            <div className='product'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <h6 className="fs-5 fw-bold title-admin text-muted">PARTIES INVOLVED</h6>
                </div>
                <Form>
                    <Row>
                        <Form.Group as={Col} lg={4} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label className='text-muted'> Borrower/Applicant </Form.Label>

                            <Form.Control className='text-muted no-border' type="text"
                                name='borrower_Applicant'
                                value={getBorrower ? getBorrower : getTransactionByIdData?.keyParties&& getTransactionByIdData?.keyParties[0]?.parties[0]?.name?.email                               }
                                disabled={true} />

                        </Form.Group>

                        <Form.Group as={Col} lg={4} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label className='text-muted'>Lender</Form.Label>

                            <Form.Control className='text-muted no-border'
                                name='lenders'
                                value={getLender ? getLender : getTransactionByIdData?.lenders }
                                disabled={true} />

                        </Form.Group>

                        {/* <Form.Group as={Col} lg={4} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label className='text-muted'>Shipping Company</Form.Label>

                            <Form.Control className='text-muted no-border'
                                name='lenders'
                                value={getShippingCompany}
                                disabled={true} />

                        </Form.Group> */}
                        {warehouseStatus &&
                            <Form.Group as={Col} lg={4} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label className='text-muted'>Warehouse Company</Form.Label>

                                <Form.Control className='text-muted no-border' name='warehouse company'
                                    value={warehouseCo}
                                    disabled={true} />

                            </Form.Group>
                        }
                    </Row>
                    <Row>


                        {pricingHedgingStatus &&
                            <Form.Group as={Col} lg={4} md={6} sm={12} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label className='text-muted'>Hedging Counterparty</Form.Label>

                                <Form.Control className='text-muted no-border'
                                    name='Counterparty'
                                    value={getCounterParty}
                                    disabled={true} />

                            </Form.Group>}
                    </Row>



                </Form>


                <div className='mb-2 pt-4 d-flex justify-content-between align-items-center'>
                    <h6 className='fs-5 fw-bold title-admin' >KEY PARTIES</h6>

                    <Button onClick={() => { setShowEditModal(!showEditModal) }} className={`btn d-inline-flex btn-md btn-light border-base mx-1 me-1`} disabled={isView}>
                        <span className=' pe-2'><i className="bi bi-plus pe-1 "></i></span>
                        <span className='fw-bold'>Add</span>
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 10 }}
                    rowKey={(record) => record.id} // Assuming each record has a unique `id`
                />
            </div>

            <div className='add-edit-product parties_main mb-4'>
                <div className='p-4 mb-3 pb-4'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h6 className="fs-5 fw-bold title-admin">RELATED PARTIES</h6>
                        {/* <Button onClick={handleRelatedParties} className='btn d-inline-flex btn-md btn-light border-base mx-1 me-1'>
                            <span className=' pe-2'><i className="bi bi-plus pe-1 "></i></span>
                            <span className='fw-bold'>Add</span>
                        </Button> */}
                    </div>

                    <>
                        {relatedPartyDetails.map((party, index) => (
                            <Row key={index}>
                                <Form.Group as={Col} lg={3}>
                                    <Form.Label>Party 1 <OptionalSpan /></Form.Label>
                                    <Form.Select
                                        onChange={(e) => handleParties(e, e.target.value, index, 'buyer')}
                                        value={party.buyer}
                                        className='no-border'
                                        disabled={isView}
                                    >
                                        <option value="">Choose...</option>
                                        {partiesData.map((item, i) => (
                                            <option key={i} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} lg={3}>
                                    <Form.Label>Party 2 <OptionalSpan /></Form.Label>
                                    <Form.Select
                                        onChange={(e) => handleParties(e, e.target.value, index, 'shipper')}
                                        value={party.shipper}
                                        className='no-border'
                                        disabled={isView}
                                    >
                                        <option value="">Choose...</option>
                                        {partiesData.map((item, i) => (
                                            <option key={i} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Relation</Form.Label>
                                    <Form.Select
                                        onChange={(e) => handleRelationChange(e, index)}
                                        value={party.party_relation || 'Choose...'}
                                        disabled={isView}>
                                        <option disabled>Choose...</option>
                                        {parties.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Form.Select>

                                </Form.Group>

                                <Col lg={2}>
                                    <AntdForm>
                                        <Dragger
                                            fileList={fileList} // Controlled file list
                                            beforeUpload={() => false} // Prevent automatic upload
                                            onChange={handleFileChange} // Handle file change event
                                            onRemove={() => setFileList([])} // Reset file list when removing
                                            className="upload"
                                            maxCount={1}
                                            style={{ width: '10rem', height: '10rem', border: '2px dashed #1890ff' }}
                                        >

                                            <p className="ant-upload-drag-icon"> <InboxOutlined /> </p>
                                            <p className="ant-upload-text text-center">Upload Relationship Evidence</p>
                                        </Dragger>

                                        {fileList.length > 0 && (
                                            <div style={{ marginTop: 16 }}>
                                                <p>Preview:</p>
                                                <img src={URL.createObjectURL(fileList[0].originFileObj)} alt="Preview" style={{ width: '100px' }} />
                                            </div>
                                        )}
                                    </AntdForm>

                                </Col>
                            </Row>
                        ))}

                    </>
                </div>
            </div>
           {stype == undefined &&  <div className='footer_'>
                <button onClick={() => { transactionType === "Export" ? hendelCancel() : navigate('/transactions') }} className="footer_cancel_btn">Back</button>
                <button onClick={() => { tableData.length > 0 && next() }} className='footer_next_btn'> Next</button>
            </div>}

            {showEditModal && <PartiesEditModal show={showEditModal} onHide={() => { setShowEditModal(false); setRowEditData('') }} getModalData={(e, id) => partiesEditData(e, id)} editData={rowEditData} isView={view} />}
        </>
    )
}

export default KeyParties