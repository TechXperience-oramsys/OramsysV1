
import MaterialTable from 'material-table'
import { DropzoneArea } from 'material-ui-dropzone'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import PartiesEditModal from '../../component/Modal/PartiesEditModal'
import { useDispatch, useSelector } from 'react-redux';
import { transactionDataAction } from '../../redux/actions/transactionDataAction'
import { entityGetAction } from '../../redux/actions/entityAction'

const KeyParties = ({ hendelCancel, hendelNext, transactionType, getShippingCompany, getCounterParty, pricingHedgingStatus, getWarehouseCompany, warehouseStatus, getLender, getBorrower }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showEditModal, setShowEditModal] = useState(false)
    const [tableData, setTableData] = useState([])
    const [rowEditData, setRowEditData] = useState('')
    const [editId, setEditId] = useState('')
    const location = useLocation()
    const isView = location?.state[2]?.isView
    const [view, setView] = useState()
    const [borrower_Applicant, setBorrower_Applicant] = useState("")
    const [lenders, setLenders] = useState("")
    const [warehouseComp, setWarehouseComp] = useState("")
    const [counterPart, setCounterPart] = useState("")
    const [shippingComp, setShippingComp] = useState("")
    const [error, setError] = useState({})
    const [names, setNames] = useState([])
    const [buyers, setBuyer] = useState([])
    const [partiesData, setpartiesData] = useState([])
    const nameOption = useSelector(state => state.entityData.entity)
    const [keyParties, setkeyParties] = useState([{
        'party_relation': '', 'buyer': '', 'shipper': '', 'upload_evidence': ''
    }])
    const [relatedPartyDetails, setRelatedPartyDetails] = useState([{
        'buyer': '',
        'shipper': '',
        'party_relation': '',
        'upload_evidence': ''
    }])

    const [apiFetched, setApiFetched] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [relation, setRelation] = useState();

    const [warehouses, setWarehouses] = useState([])
    const [party, setParty] = useState({
        name: "",
        type: ""
    })
    const parties = [
        "Subsidiary",
        "Owners",
        "Associate",
        "None",
    ]
    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

    const handleRelatedParties = () => {
        let tempRelated = [...relatedPartyDetails, { 'buyer': '', 'shipper': '', 'party_relation': '', 'upload_evidence': '' }];
        console.log(tempRelated);
        setApiFetched(true);
        setRelatedPartyDetails(tempRelated)
    }

    useEffect(() => {
        dispatch(entityGetAction('all'))
    }, []);

    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            setTableData(getTransactionByIdData.data.keyParties[0].parties.map((ele) => {
                console.log(ele);
                return {
                    name: { label: (ele.name?.details?.name != null ? ele.name?.details?.name : ele.name?.details?.givenName), value: ele.name?._id },
                    type: { label: ele.type?.roleName, value: ele.type?._id }
                }
            }))
            setApiFetched(true)
            setEditId(getTransactionByIdData?.data?.keyParties[0]?._id)
            setBorrower_Applicant(getLender.borrower_Applicant)
            setLenders(getBorrower.lenders)
            setCounterPart(getTransactionByIdData?.data?.details?.pricingDetails
                ?.pricingCounterParty?.details.name)
            setShippingComp(getTransactionByIdData?.data?.details?.shippingOptions
                ?.shippingCompany?.details.name)
            
            if (getTransactionByIdData.data?.keyParties[0].relatedParties != undefined && getTransactionByIdData.data?.keyParties[0].relatedParties.length > 0) {
                // console.log('keyparties at useEffect', keyParties);
                setkeyParties(getTransactionByIdData.data?.keyParties[0].relatedParties);

                console.log('relatedparties from database, new edition', getTransactionByIdData.data);
                setEditMode(true);
            }
            console.log('CUNTERPARTY', getCounterParty?.pricingCounterParty?.details?.name)
        }
    }, [getTransactionByIdData])

    useEffect(() => {
        if (getTransactionByIdData.data?.keyParties[0].relatedParties != undefined && getTransactionByIdData.data?.keyParties[0].relatedParties.length > 0) {
            console.log('RELATEDPARTIES FROM API', relatedPartyDetails);
            setRelatedPartyDetails(getTransactionByIdData.data?.keyParties[0].relatedParties);
        }
    }, [getTransactionByIdData])

    useEffect(() => {
        console.log('RELATEDPARTIES useeffect 2', relatedPartyDetails);
    }, [relatedPartyDetails])

    let temp = keyParties;
   

    const handleParties = (e, newValue, ind, type) => {
        console.log(newValue, 'fund mw')
        let temp = keyParties;
        let tempRelatedPartyDetails = relatedPartyDetails;
        if (temp[ind] == undefined) {
            temp = [...keyParties, {
                'party_relation': '', 'buyer': '', 'shipper': '', 'upload_evidence': ''
            }];
            tempRelatedPartyDetails = [...relatedPartyDetails, {
                'party_relation': '', 'buyer': '', 'shipper': '', 'upload_evidence': ''
            }];
        }
        var temp_name = newValue
        if (type == "buyer") {
            if (temp[ind].shipper !== temp_name) {
                if (temp[ind] != undefined && temp[ind].buyer != undefined) {
                    temp[ind].buyer = temp_name;
                    tempRelatedPartyDetails[ind].buyer = temp_name;
                }
            } else {
                alert('Party 1 and Party 2 should not be identical');
            }
        } else {
            if (temp[ind].buyer !== temp_name) {
                temp[ind].shipper = temp_name;
                tempRelatedPartyDetails[ind].shipper = temp_name;

            } else {
                alert('Party 1 and Party 2 should not be identical');
            }
        }
        console.log('handleParties temp', temp);
        // setParty({ ...party, name: { value: newValue._id, label: temp_name } })
        setRelatedPartyDetails([...relatedPartyDetails]);
        setkeyParties(temp)
    }



    useEffect(() => {
        if (nameOption?.data) {
            // console.log(nameOption?.data);
            var temp_names = [];
            nameOption?.data.forEach((element, index) => {
                element.details.name = element.details?.name != null ? element.details?.name : element.details?.givenName;
                temp_names.push(element)
            });
            console.log("GET RELATED PARTIES DATA-----", temp_names);
            setNames(temp_names)
        }
    }, [nameOption])

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
    const validation = () => {
        let flag = false
        let error = {}

        if (!relatedPartyDetails.buyer) {
            flag = true
            error.buyer = 'Please select a party'
        }
        if (!relatedPartyDetails.shipper) {
            flag = true
            error.shipper = 'Please select a party'
        }
        if (!relatedPartyDetails.party_relation) {
            flag = true
            error.party_relation = 'Please select a relation'
        }
        if (relatedPartyDetails.length < 1) {
            flag = true
            error.relatedPartyDetails = 'Please enter document remittance'
        }
        setError(error)
        return flag
    }


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
    console.log('TAbLE dATa', tableData)
    useEffect(() => {
        let buyer_arr = [];
        let warehouses = [];
        if (names) {
            names.forEach(element => {
                element.roles.forEach(roleDetail => {
                    if (roleDetail.roleId?.roleName == "Buyer") {
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
    }, [names])

    const handleChangeFile = (file, ind) => {
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            }).then((res) => {
                var temp = keyParties;
                temp[ind].upload_evidence = { type: 'img', name: file.name, file: res };
                setkeyParties(temp);
            });
            console.log('handleChangeFile keyparties', keyParties);
        }

    }
    const tdata = []
    tableData.map((item) => {
        tdata.push(item?.name?.label)
    })
    const warehouseCo = getWarehouseCompany.warehouses[0]?.warehouseCompany?.label
    const AddUpParties = useCallback(() => {
        const storeData = [
            getBorrower,
            getLender,
            getShippingCompany,
            warehouseCo,
            getCounterParty,
            ...tdata,
        ]
        setpartiesData(storeData);
    }, [tableData])
    console.log('warehouse company', getWarehouseCompany.warehouses[0]?.warehouseCompany?.label)
    console.log('Shipping company', getShippingCompany.shippingCompany?.label)
    // console.log('Hedging Counterparty', getCounterParty.pricingCounterParty?.details?.name)
    useEffect(() => {
        AddUpParties()
    }, [AddUpParties])

    return (
        <>
            <div className='product'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <h6 className="fs-5 fw-bold title-admin text-muted">PARTIES</h6>
                </div>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2} className='text-muted'> Borrower/Applicant </Form.Label>
                        <Col lg={4} sm={10}>
                            <Form.Control className='text-muted no-border' type="text"
                                name='borrower_Applicant'
                                value={getBorrower}
                                disabled={true} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2} className='text-muted'>Lender</Form.Label>
                        <Col lg={4} sm={10}>
                            <Form.Control className='text-muted no-border'
                                name='lenders'
                                value={getLender}
                                disabled={true} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2} className='text-muted'>Shipping Company</Form.Label>
                        <Col lg={4} sm={10}>
                            <Form.Control className='text-muted no-border'
                                name='lenders'
                                value={getShippingCompany}
                                disabled={true} />
                        </Col>
                    </Form.Group>

                    {warehouseStatus &&
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2} className='text-muted'>Warehouse Company</Form.Label>
                            <Col lg={4} sm={10}>
                                <Form.Control className='text-muted no-border' name='warehouse company'
                                    value={warehouseCo}
                                    disabled={true} />
                            </Col>
                        </Form.Group>
                    }

                    {pricingHedgingStatus &&
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2} className='text-muted'>Hedging Counterparty</Form.Label>
                            <Col lg={4} sm={10}>
                                <Form.Control className='text-muted no-border'
                                    name='Counterparty'
                                    value={getCounterParty}
                                    disabled={true} />
                            </Col>
                        </Form.Group>}

                </Form>


                <div className='mb-2 pt-4 d-flex justify-content-between align-items-center'>
                    <h6 className='fs-5 fw-bold title-admin' >KEY PARTIES</h6>

                    <Button onClick={() => { setShowEditModal(!showEditModal) }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-1'>
                        <span class=' pe-2'><i class="bi bi-plus pe-1 "></i></span>
                        <span className='fw-bold'>Add</span>
                    </Button>
                </div>
                <MaterialTable
                    title=""
                    columns={[
                        
                        { title: 'Party', field: 'name.label' },
                        { title: 'Role', field: 'type.label' },

                    ]}
                    data={tableData}

                    actions={isView ? [{
                        icon: 'preview',
                        tooltip: 'View Product',
                        onClick: (event, rowData) => { setShowEditModal(!showEditModal); setRowEditData(rowData); setView(isView) }
                    }] : [
                        {
                            icon: 'edit',
                            tooltip: 'Edit Product',
                            onClick: (event, rowData) => { setRowEditData(rowData); setShowEditModal(!showEditModal); console.log('rowData ==', rowData) }
                        },
                        {
                            icon: 'preview',
                            tooltip: 'View Product',
                            onClick: (event, rowData) => { setShowEditModal(!showEditModal); setRowEditData(rowData) }
                        }
                    ]}
                    options={{
                        filtering: false,
                        actionsColumnIndex: -1,
                        sorting: false,
                        pageSize: 10,
                        search: false,
                        emptyRowsWhenPaging: false,
                    }}
                />
            </div>
            <div className='add-edit-product parties_main mb-4'>
                <div className='p-4 mb-3 pb-4'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h6 className="fs-5 fw-bold title-admin">RELATED PARTIES</h6>
                        <Button onClick={handleRelatedParties} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-1'>
                            <span class=' pe-2'><i class="bi bi-plus pe-1 "></i></span>
                            <span className='fw-bold'>Add</span>
                        </Button>
                    </div>

                    <>
                        {apiFetched && relatedPartyDetails && relatedPartyDetails.map((party, index) => (
                            <Row key={index}>
                                <>
                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label>Party 1</Form.Label>
                                        <Form.Select
                                            onChange={(event) => {
                                                const newValue = event.target.value;
                                                handleParties(event, newValue, index, 'buyer');
                                            }}
                                            disabled={isView}
                                            value={party.buyer}
                                            className='no-border'
                                        >
                                            <option value="">Choose...</option>
                                            {partiesData.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.buyer && <span style={{ color: 'red' }}>{error.buyer}</span>}
                                    </Form.Group>

                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label>Party 2</Form.Label>
                                        <Form.Select
                                            onChange={(event) => {
                                                const newValue = event.target.value;
                                                handleParties(event, newValue, index, 'shipper');
                                            }}
                                            disabled={isView}
                                            value={party.shipper}
                                            className='no-border'
                                        >
                                            <option value="">Choose...</option>
                                            {partiesData.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.shipper && <span style={{ color: 'red' }}>{error.shipper}</span>}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Relation</Form.Label>
                                        <Form.Select
                                            onChange={(e) => {
                                                const updatedPartyDetails = relatedPartyDetails.map((ele) => {
                                                    if (ele.party_relation === party.party_relation) {
                                                        return {
                                                            ...ele,
                                                            party_relation: e.target.value,
                                                        };
                                                    }
                                                    return ele;
                                                });

                                                setRelatedPartyDetails(updatedPartyDetails);
                                                setRelation(parties);
                                            }}
                                            disabled={isView}
                                            value={party.party_relation || 'Choose...'} // Ensure that the initial value is set to 'Choose...' or the correct default
                                        >
                                            <option disabled>Choose...</option>
                                            {parties.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.party_relation && (
                                            <span style={{ color: 'red' }}>{error.party_relation}</span>
                                        )}
                                    </Form.Group>


                                   
                                    {relation && <Col lg={2}>
                                        <div className='drag-and-drop'>
                                            <DropzoneArea
                                                Icon="none"
                                                filesLimit={1}
                                                showPreviews={true}
                                                // defaultValue={relatedPartyDetails.upload_evidence}
                                                showPreviewsInDropzone={false}
                                                useChipsForPreview
                                                previewGridProps={{ container: { spacing: 1, } }}
                                                dropzoneText='Upload Evidence'
                                                dropzoneProps={
                                                    { disabled: false }
                                                }
                                                previewText=""
                                                onChange={(file) => handleChangeFile(file[0], index)}
                                                disabled={party.buyer === '' || party.shipper === '' || party.party_relation === ''}
                                            />
                                        </div>
                                        {error && error?.upload_evidence && <span style={{ color: 'red' }}>{error?.upload_evidence}</span>}
                                    </Col>}

                                </>
                            </Row>
                        ))}
                    </>
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => { transactionType === "Export" ? hendelCancel() : navigate('/transactions') }} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { tableData.length > 0 && next() }} className='footer_next_btn'> Next</button>
            </div>

            {showEditModal && <PartiesEditModal show={showEditModal} onHide={() => { setShowEditModal(false); setRowEditData('') }} getModalData={(e, id) => partiesEditData(e, id)} editData={rowEditData} isView={view} />}
        </>
    )
}

export default KeyParties