import { Table, Form as AntdForm } from 'antd';
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { OptionalSpan } from './Helpers/OptionalTags'
import Dragger from 'antd/es/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons';
import { MultiSelectForm } from './Helpers/MultiselectForm';
import { transactionServices } from '../../_Services/transactions';

function WorkflowPreview() {
    const location = useLocation()
    const { data, step, contractValue } = location.state || {}
    const [shippingCompanyName, setShippingCompanyName] = useState('')
    const [warehouseCompany, setWarehouseCompany] = useState('')
    console.log(data, step)

    useEffect(() => {
        if (step === 'details') {
            const shippingCompanyId = data && data.shippingOptions && data.shippingOptions.shippingCompany && data.shippingOptions.shippingCompany._id;


            if (shippingCompanyId) {

                // setShippingCompanyName(()=>getCompnayName(shippingCompanyId))
                transactionServices.getEntityDetails(shippingCompanyId)
                    .then((res) => {
                        if (res && res.data && res.data.data.name) {
                            setShippingCompanyName(res.data.data.name);
                        }
                    })
                    .catch((err) => console.log('Failed to fetch company name!'));
            }
        }
    }, [step]);

    function getCompnayName(id) {
        transactionServices.getEntityDetails(id)
            .then((res) => res.data.data.name)
            .catch((err) => console.log('Failed to fetch company name!'));
    }


    const formateCurrencyValue = (data) => {
        if (data) {
            let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return value
        } else {
            return data
        }
    }

    const columns = [
        {
            title: 'Party',
            key: 'party',
            render: (record) => (<>{record?.name.email}</>)
        },
        {
            title: 'Role',
            key: 'role',
            render: (record) => (<>{record?.type.roleName}</>)
        },
    ];

    const warehouseColumns = [
        {
            title: "Warehouse Company", // Nested field access
            key: "warehouseCompany",
            render: (record) => <p>{record.warehouseCompany
                ?.email}</p>
        },
        {
            title: "Warehouse",
            key: "warehouse",
            render: (record) => <p>{record.warehouse?.name}</p>
        },
        // {
        //     title: "Actions",
        //     key: "actions",
        //     render: (text, record) => (
        //         <>
        //             {!isView && (
        //                 <Tooltip title="Edit Entities">
        //                     <Button
        //                         type="primary"
        //                         shape="circle"
        //                         icon={<EditOutlined />}
        //                         // onClick={() => {
        //                         //     setAddWarehouseModal(true);
        //                         //     setWareHouseId(record);
        //                         // }}
        //                         style={{ marginRight: 8 }}
        //                     />
        //                 </Tooltip>
        //             )}
        //             <Tooltip title="View Entities">
        //                 <Button
        //                     type="default"
        //                     shape="circle"
        //                     icon={<EyeOutlined />}
        //                     onClick={() => {
        //                         // Define what happens on view click here
        //                     }}
        //                 />
        //             </Tooltip>
        //         </>
        //     ),
        // },
    ];

    const LOCColumns = [
        {
            title: 'Name',
            dataIndex: ['applicant', 'email'], // Nested field access
            key: 'name',
        },
        {
            title: 'Label',
            dataIndex: ['issuingBank', 'email'],
            key: 'label',
        },
        {
            title: 'Countries',
            dataIndex: ['beneficiary', 'email'],
            key: 'countries',
        },
        {
            title: 'Advising Bank',
            dataIndex: ['advisingBank', 'email'],
            key: 'advisingBank',
        },
        {
            title: 'Conforming Bank',
            dataIndex: ['conformingBank'],
            key: 'conformingBank',
        },
        {
            title: 'Negotiating Bank',
            dataIndex: ['negotiatingBank', 'email'],
            key: 'negotiatingBank',
        },
        {
            title: 'Reimbursing Bank',
            dataIndex: ['reimbursingBank', 'email'],
            key: 'reimbursingBank',
        },
        {
            title: 'Second Beneficiary',
            dataIndex: ['secondBeneficiary', 'email'],
            key: 'secondBeneficiary',
        },
        // {
        //     title: 'Actions',
        //     key: 'actions',
        //     render: (text, record) => (
        //         <>
        //             {isView ? (
        //                 <Tooltip title="View LC Party">
        //                     <Button
        //                         type="default"
        //                         shape="circle"
        //                         icon={<EyeOutlined />}
        //                         onClick={() => setShowEditModal((prev) => !prev)}
        //                     />
        //                 </Tooltip>
        //             ) : (
        //                 <>
        //                     <Tooltip title="Edit LC Party">
        //                         <Button
        //                             type="primary"
        //                             shape="circle"
        //                             icon={<EditOutlined />}
        //                             onClick={() => {
        //                                 setShowEditModal((prev) => !prev);
        //                                 setEditeRowData(record);
        //                             }}
        //                             style={{ marginRight: 8 }}
        //                         />
        //                     </Tooltip>
        //                     <Tooltip title="View LC Party">
        //                         <Button
        //                             type="default"
        //                             shape="circle"
        //                             icon={<EyeOutlined />}
        //                             onClick={() => setShowEditModal((prev) => !prev)}
        //                         />
        //                     </Tooltip>
        //                 </>
        //             )}
        //         </>
        //     ),
        // },
    ];

    const sourceOfRepaymentColumn = [
        {
            title: 'Name',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Instrument',
            dataIndex: 'instrument',
            key: 'instrument',
        },
    ];

    const hedgingCol = [
        {
            title: 'Name',
            dataIndex: 'hedgingMethod', // Field access
            key: 'hedgingMethod',
        },
        {
            title: 'Label',
            dataIndex: ['counterParty', 'label'], // Nested field access
            key: 'counterPartyLabel',
        },
    ];

    return (
        <Container className="mt-4">
            Workflow Preview
            {data && step === 'details' && (
                <>
                    <div className='add-edit-product'>
                        <div className='form'>
                            <h4 className='fw-bold fs-5 mb-3 title-admin'>PRODUCT DETAILS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Nature</Form.Label>
                                        <Form.Control className='no-border mb-3'
                                            name='Product_nature'
                                            defaultValue={data?.productDetails.nature}
                                            disabled readOnly={true} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Type</Form.Label>
                                        <Form.Control
                                            className='no-border'
                                            defaultValue={data?.productDetails.type || "Commodity"}
                                            disabled readOnly={true}
                                        />

                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Commodity Type</Form.Label>
                                        <Form.Control className='no-border'
                                            disabled readOnly
                                            defaultValue={data?.productDetails.commodityType} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Commodity Sub-Type</Form.Label>
                                        <Form.Control className='no-border mb-3'
                                            name='commoditySubtype'
                                            defaultValue={data?.commoditySubTypeOption}
                                            disabled readOnly={true} />
                                    </Form.Group>


                                </Row>

                                <Row>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control className='no-border'

                                            disabled readOnly
                                            defaultValue={data?.productDetails.name.name} />
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Quantity</Form.Label>
                                        <Form.Control className='no-border'
                                            name='Product_nature'
                                            defaultValue={formateCurrencyValue(data?.productDetails.quantity)}
                                            disabled readOnly />
                                    </Form.Group>


                                    <Col lg={3} className='mb-3'>
                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Product Unit</Form.Label>
                                            <Form.Control className='no-border'
                                                name='netMetric'
                                                defaultValue={data?.productDetails.metric}
                                                disabled readOnly={true} />
                                        </Form.Group>
                                    </Col>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Quality</Form.Label>
                                        <Form.Control className='no-border'
                                            name='netMetric'
                                            defaultValue={data?.productDetails.quality}
                                            disabled readOnly={true} />
                                    </Form.Group>


                                </Row>
                            </div>
                        </div>
                    </div>
                    <div className='m-3' />

                    <div className='add-edit-product pt-0 pb-0'>
                        <div className='form'>
                            <h4 className='fw-bold mb-3 title-admin fs-5'>CONTRACT DETAILS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Contract Currency</Form.Label>
                                        <Form.Control className='no-border'
                                            defaultValue={data?.contractDetails.currency}
                                            disabled readOnly
                                        />
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Contract Value</Form.Label>
                                        <Form.Control className='no-border'
                                            defaultValue={formateCurrencyValue(data?.contractDetails.value)}
                                            disabled readOnly></Form.Control>
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Contract Date</Form.Label>
                                        <Form.Control className='no-border'
                                            type="date"
                                            name="contractDate"
                                            placeholder="dd-mm-yyyy"
                                            defaultValue={new Date(data?.contractDetails?.contractDate).toISOString().split("T")[0]}
                                            required
                                            disabled readOnly
                                        />
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control className='no-border'
                                            type="date"
                                            name="expiryDate"
                                            placeholder="dd-mm-yyyy"

                                            defaultValue={new Date(data?.contractDetails.contractDate).toISOString().split("T")[0]}
                                            required
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                </Row>
                                <Row className='mt-4'>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Conditions of Contract</Form.Label>
                                        <Form.Control className='no-border'
                                            name='conditionsOfContract'
                                            defaultValue={data?.contractDetails.conditionsOfContract}
                                            disabled readOnly />
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Description of Contract</Form.Label>
                                        <Form.Control className='no-border'
                                            name='descriptionOfContract'
                                            defaultValue={data?.contractDetails.descriptionOfContract}
                                            disabled readOnly />
                                    </Form.Group>

                                </Row>
                            </div>
                        </div>
                    </div>
                    <div className='m-3' />
                    <div className='add-edit-product'>
                        <div className='p-2 m-0 form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                            <h4 className='fw-bold fs-5 mb-3 title-admin'>SHIPPING OPTIONS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipping Company</Form.Label>

                                        <Form.Control className='no-border'
                                            disabled readOnly
                                            defaultValue={shippingCompanyName} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment Mode</Form.Label>
                                        <Form.Control className='no-border'
                                            disabled readOnly
                                            defaultValue={data?.shippingOptions.shipmentMode} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Country of Origin</Form.Label>
                                        <Form.Control
                                            className='no-border'
                                            disabled readOnly // Replace with your condition for disabling
                                            defaultValue={data?.shippingOptions?.countryOfOrigin.name}
                                            placeholder="Country Of Origin"
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mt-4">
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Port of Origin</Form.Label>
                                        <Form.Control className='no-border'
                                            disabled readOnly
                                            defaultValue={
                                                (data?.shippingOptions.shipmentMode === "SEA" && data?.shippingOptions.portOfOrigin?.name) ||
                                                (data?.shippingOptions.shipmentMode === "AIR" && data?.shippingOptions.airbaseOfOrigin?.name)
                                            } />
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment  Date</Form.Label>
                                        <Form.Control className='no-border'
                                            type="date"
                                            name="contractDate"
                                            placeholder="DD/MM/YYYY"
                                            min={data?.contractDetails.contractDate}
                                            max={data?.contractDetails.expiryDate}
                                            defaultValue={new Date(data?.shippingOptions.shipmentDate).toISOString().split("T")[0]}
                                            required
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment Terms</Form.Label>
                                        <Form.Control
                                            disabled readOnly
                                            defaultValue={data?.shippingOptions.shipmentTerms}
                                            placeholder="Choose..."

                                        />
                                    </Form.Group>

                                </Row>
                                <Row className='mt-4'>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Net Shipped Weights</Form.Label>
                                        <InputGroup>

                                            <Form.Control className='no-border'
                                                name='netShippedWeights'
                                                defaultValue={formateCurrencyValue(data?.shippingOptions.shippedWeights)}
                                                disabled readOnly
                                            />
                                            <InputGroup.Text className="bg-primary text-white">
                                                {data?.productDetails.metric}
                                            </InputGroup.Text>
                                        </InputGroup></Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Destination Country</Form.Label>
                                        <Form.Control
                                            className='no-border'
                                            disabled readOnly // Replace with your condition for disabling
                                            defaultValue={data?.shippingOptions.destinationCountry.name}
                                            placeholder="Choose..."
                                        /> </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Destination Port</Form.Label>
                                        <Form.Control className='no-border'

                                            disabled readOnly
                                            defaultValue={
                                                (data?.shippingOptions.shipmentMode === "SEA" && data?.shippingOptions.destinationPort) ||
                                                (data?.shippingOptions.shipmentMode === "AIR" && data?.shippingOptions.destinationAirbase)
                                            }
                                            placeholder='Port' /></Form.Group>

                                </Row>

                                <Row className='mt-4'>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment Frequency</Form.Label>
                                        <Form.Control className='no-border'
                                            disabled readOnly
                                            defaultValue={data?.shippingOptions.shipmentFrequency} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Warehouse required?</Form.Label>
                                        <Form.Control className='no-border'
                                            disabled readOnly
                                            defaultValue={data?.shippingOptions.warehouseRequired ? 'Yes' : "No"}
                                            placeholder="Yes/No"

                                        />   </Form.Group>

                                </Row>
                                {data?.shippingOptions.warehouseRequired && (
                                    <div className='product p-0'>
                                        <div className='d-flex justify-content-between mt-5 mb-3 align-items-center'>
                                            <h2 className='m-0 fw-bold title-admin fs-5'>WAREHOUSE</h2>
                                        </div>
                                        <div>
                                            {data?.shippingOptions.warehouses?.length > 0 ? (
                                                <Table
                                                    columns={warehouseColumns}
                                                    dataSource={data?.shippingOptions.warehouses}
                                                    pagination={{ pageSize: 10 }}
                                                    rowKey={(record) => record.id} // Assuming each warehouse has a unique `id`
                                                />
                                            ) : (
                                                "No data found"
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {data?.transShipmentOptions.tranShipmentRequired
                        &&
                        <div className='add-edit-product pt-0 pb-0'>
                            <div className='mb-3 form'>
                                <h4 className='fw-bold mb-3 fs-5 title-admin'>TRANSHIPMENT OPTIONS</h4>
                                <div>
                                    <Row className='mt-4'>
                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>House/Building Number</Form.Label>
                                            <Form.Control className='no-border'
                                                defaultValue={data?.transShipmentOptions.street}
                                                name='street'
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control className='no-border'
                                                defaultValue={data?.transShipmentOptions.city}
                                                name='city'
                                            />
                                        </Form.Group>


                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control className='no-border'
                                                disabled readOnly
                                                defaultValue={data?.transShipmentOptions.country} /> </Form.Group>

                                    </Row>

                                    <Row className='mt-4'>
                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Transshipment Quantity</Form.Label>
                                            <Form.Control className='no-border'
                                                name='conditions_of_contract'
                                                defaultValue={formateCurrencyValue(data?.transShipmentOptions.transShipmentQuantity)}
                                                disabled readOnly />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Transhipment Unit</Form.Label>
                                            <Form.Control className='no-border'
                                                name='conditions_of_contract'
                                                defaultValue={data?.transShipmentOptions.tranShipmentRequired && data?.productDetails.metric}
                                                disabled readOnly={data?.productDetails.metric} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Transshipment Date</Form.Label>
                                            <Form.Control className='no-border'
                                                type="date"
                                                name="contract_date"
                                                placeholder="dd-mm-yyyy"
                                                min={data?.shippingOptions.shipmentDate}
                                                max={data?.contractDetails.expiryDate}
                                                defaultValue={new Date(data?.transShipmentOptions.transShipmentDate).toISOString().split("T")[0]}
                                                required
                                            />
                                        </Form.Group>


                                    </Row>
                                </div>
                            </div>
                        </div>}
                    <div className='add-edit-product pt-1 pb-5'>
                        <div className='p-2 mb-3 pb-4 form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                            <h4 className='mb-3 fs-5 fw-bold title-admin'>PRICING DETAILS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} lg={data?.pricingDetails.pricingType === "Firm fixed price"
                                        ? 3 : 4 || data?.pricingDetails.pricingHedgingStatus === "Yes" ? 3 : 4} controlId="formGridZip">
                                        <Form.Label>Pricing Type</Form.Label>
                                        <Form.Control className='no-border'
                                            disabled readOnly
                                            defaultValue={data?.pricingDetails.pricingType} />
                                    </Form.Group>


                                    {data?.pricingDetails.pricingType === "Firm fixed price" && (
                                        <>
                                            <Form.Group as={Col} lg={data?.pricingDetails.pricingType === "Firm fixed price" ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Amount</Form.Label>
                                                <Form.Control className='no-border'
                                                    defaultValue={formateCurrencyValue(data?.pricingDetails.pricingAmount)}
                                                    name='contract_value'
                                                    disabled readOnly />
                                            </Form.Group>

                                            <Form.Group as={Col} lg={data?.pricingDetails.pricingType === "Firm fixed price" ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Unit</Form.Label>
                                                <Form.Control className='no-border'
                                                    defaultValue={data?.productDetails.unit}
                                                    disabled readOnly={true}
                                                    placeholder='Pricing Unit' />
                                            </Form.Group>

                                            <Form.Group as={Col} lg={data?.pricingDetails.pricingType === "Firm fixed price" ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Previous Day Closing Amount</Form.Label>
                                                <Form.Control className='no-border'
                                                    defaultValue={data?.pricingDetails.previousDayClosingAmount}
                                                    name='previous_day_closing_amount'
                                                    disabled readOnly />
                                            </Form.Group>

                                        </>
                                    )}


                                    {data?.pricingDetails.pricingType === "Price to be fixed" && (
                                        <>
                                            <Form.Group as={Col} lg={data?.pricingDetails.pricingHedgingStatus ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Formula</Form.Label>
                                                <Form.Control className='no-border'
                                                    disabled readOnly
                                                    defaultValue={data?.pricingDetails.pricingFormula} /></Form.Group>
                                            <Form.Group as={Col} lg={data?.pricingDetails.pricingHedgingStatus ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Hedging status</Form.Label>
                                                <Form.Control className='no-border'
                                                    disabled readOnly
                                                    defaultValue={data?.pricingDetails.pricingHedgingStatus.toString()} /> </Form.Group>


                                            {data?.pricingDetails.pricingHedgingStatus && (
                                                <>
                                                    <Row className="mt-4">
                                                        <Form.Group as={Col} controlId="formGridZip">
                                                            <Form.Label>Hedging Method</Form.Label>
                                                            <Form.Control className='no-border' disabled readOnly
                                                                defaultValue={data?.pricingDetails.pricingHedgingMethod} /> </Form.Group>

                                                        <Form.Group as={Col} controlId="formGridZip">
                                                            <Form.Label>CounterParty</Form.Label>
                                                            <Form.Control className='no-border'
                                                                disabled readOnly
                                                                defaultValue={data?.pricingDetails.pricingCounterParty} /> </Form.Group>
                                                    </Row>
                                                </>
                                            )}

                                        </>
                                    )}
                                </Row>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {data.length && step === 'keyParties' && (
                <>
                    <div className='product'>
                        <div className='mb-2 pt-4 d-flex justify-content-between align-items-center'>
                            <h6 className='fs-5 fw-bold title-admin' >KEY PARTIES</h6>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data[0]?.parties}
                            pagination={{ pageSize: 10 }}
                            rowKey={(record) => record.id} // Assuming each record has a unique `id`
                        />
                    </div>
                    <div className='add-edit-product parties_main mb-4'>
                        <div className='p-4 mb-3 pb-4'>
                            <div className='mb-3 d-flex justify-content-between align-items-center'>
                                <h6 className="fs-5 fw-bold title-admin">RELATED PARTIES</h6>

                            </div>
                            {data[0].relatedParties.map((party, index) => (
                                <Row key={index}>
                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label>Party 1 <OptionalSpan /></Form.Label>
                                        <Form.Control
                                            defaultValue={party.buyer}
                                            className='no-border'
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label>Party 2 <OptionalSpan /></Form.Label>
                                        <Form.Control
                                            defaultValue={party.shipper}
                                            className='no-border'
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Relation</Form.Label>
                                        <Form.Control
                                            defaultValue={party.party_relation || 'Choose...'}
                                            disabled readOnly />
                                    </Form.Group>

                                    <Col lg={2}>
                                        <AntdForm>
                                            <Dragger
                                                // fileList={fileList} // Controlled file list
                                                beforeUpload={() => false} // Prevent automatic upload
                                                // onChange={handleFileChange} // Handle file change event
                                                // onRemove={() => setFileList([])} // Reset file list when removing
                                                className="upload"
                                                maxCount={1}
                                                style={{ width: '10rem', height: '10rem', border: '2px dashed #1890ff' }}
                                            >

                                                <p className="ant-upload-drag-icon"> <InboxOutlined /> </p>
                                                <p className="ant-upload-text text-center">Upload Relationship Evidence</p>
                                            </Dragger>

                                            {/* {fileList.length > 0 && (
                                            <div style={{ marginTop: 16 }}>
                                                <p>Preview:</p>
                                                <img src={URL.createObjectURL(fileList[0].originFileObj)} alt="Preview" style={{ width: '100px' }} />
                                            </div>
                                        )} */}
                                        </AntdForm>

                                    </Col>
                                </Row>
                            ))}
                        </div></div>
                </>
            )}
            {data && step === 'documentFlow' && (
                <>
                    <div className='add-edit-product'>
                        <div className='form'>
                            <h5 className="fs-5 fw-bold mb-4 title-admin">DOCUMENT FLOW</h5>
                            <Row>
                                <Form.Group as={Col} lg={data?.documentRemittance === "Approved electronic method" || data?.documentRemittance === "Other" ? 6 : 12} controlId="formGridZip">
                                    <Form.Label>Document Remittance</Form.Label>
                                    <Form.Control
                                        disabled readOnly
                                        defaultValue={data?.documentRemittance}
                                        placeholder="Choose..." /></Form.Group>
                                {
                                    data?.documentRemittance === "Approved electronic method" &&
                                    <Form.Group as={Col} lg={6} controlId="formGridZip">
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control
                                            defaultValue={data?.details}
                                            name="details"
                                            disabled readOnly
                                        />
                                    </Form.Group>
                                }
                                {
                                    data?.documentRemittance === "Other" &&
                                    <Form.Group as={Col} lg={6} controlId="formGridZip">
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control
                                            defaultValue={data?.details}
                                            name="details"
                                            disabled readOnly />
                                    </Form.Group>

                                }
                            </Row>
                        </div>

                    </div>
                </>
            )}
            {data && step === 'fundFlow' && (
                <>
                    <div className='add-edit-product'>
                        {/* <div className='form'>
                            <h4 className="text-muted fs-5 fw-bold mb-4 title-admin">CONTRACT DETAILS</h4>
                            <Row>
                                <Form.Group as={Col} lg={6} controlId="formGridZip">
                                    <Form.Label className='text-muted'>Contract Currency</Form.Label>
                                    <Form.Control
                                        className='text-muted'
                                        defaultValue={getTrans.currency}
                                        name="currency"
                                        disabled readOnly={true} />
                                </Form.Group>

                                <Form.Group as={Col} lg={6} controlId="formGridZip">
                                    <Form.Label className='text-muted'>Contract Value</Form.Label>
                                    <Form.Control
                                        className='text-muted'
                                        defaultValue={formateCurrencyValue(getTrans.value)}
                                        name="value"
                                        
                                        disabled readOnly={true} />
                                </Form.Group>


                            </Row>
                        </div> */}
                        <div className='add-edit-product p-0'>
                            <div className='form' style={{ backgroundColor: "#F4F4F4", border: "none" }}>
                                <h4 className='fs-5 fw-bold mb-4 title-admin'>PAYMENT METHOD</h4>
                                <div>
                                    <Row>
                                        <Form.Group as={Col} lg={data?.paymentMethod === 'Open account' ? 6 : 12} controlId="formGridZip">
                                            <Form.Label>Payment Method</Form.Label>
                                            <Form.Control
                                                disabled readOnly
                                                defaultValue={data?.paymentMethod}
                                                placeholder="Choose..." />
                                        </Form.Group>


                                        {data?.paymentMethod === 'Open account' &&
                                            <Form.Group as={Col} lg={6} controlId="formGridZip">
                                                <Form.Label>For 'Open account', specify terms as per contract</Form.Label>
                                                <Form.Control
                                                    name='openAccount'
                                                    defaultValue={data?.openAccount}
                                                />
                                            </Form.Group>
                                        }
                                        {
                                            data?.paymentMethod === 'Letter of Credit (LC)' &&
                                            <>
                                                <div className='product'>
                                                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                                                        <h5 className="fs-5 mb-2 title-admin">Letters of credit</h5>
                                                    </div>
                                                    {data?.lettersOfCredit.length > 0 ? (
                                                        <Table
                                                            columns={LOCColumns}
                                                            dataSource={data?.lettersOfCredit}
                                                            pagination={{ pageSize: 10 }} // You can adjust this as per requirement
                                                            rowKey={(record) => record.id} // Assuming each record has a unique `id`
                                                        />
                                                    ) : (
                                                        'No data found'
                                                    )}
                                                </div>
                                            </>
                                        }
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className='form'>
                            <h4 className="fs-5 fw-bold mb-4 title-admin">PAYMENT TERMS</h4>
                            <Row className='mb-3'>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Payment Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="paymentDate"
                                        placeholder="dd-mm-yyyy"
                                        defaultValue={data?.paymentDate}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Terms</Form.Label>
                                    <Form.Control
                                        disabled readOnly
                                        defaultValue={data?.terms}
                                        placeholder="Choose..." />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Payment Origin</Form.Label>
                                    <Form.Control
                                        disabled readOnly
                                        defaultValue={data?.paymentOrigin.name}
                                        placeholder="Choose..." />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Beneficiary</Form.Label>
                                    <Form.Control
                                        disabled readOnly
                                        defaultValue={data?.beneficiary?.email}
                                        placeholder="Choose..." />
                                </Form.Group>

                            </Row>
                            {
                                data?.additonalCharges && <Row>
                                    <Form.Group as={Col} lg={12} controlId="formGridZip">
                                        <Form.Label>Additional Charges?</Form.Label>

                                        <>
                                            <div className='add-edit-product p-0'>
                                                <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                                                    <h3 className='fs-5 fw-bold mb-4'>ADDITIONAL CHARGES</h3>
                                                    <div>
                                                        <Row>
                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Payer</Form.Label>
                                                                <Form.Control
                                                                    disabled readOnly
                                                                    defaultValue={data?.payer}
                                                                    placeholder="Payer" /></Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Duties Currency</Form.Label>
                                                                <Form.Control
                                                                    defaultValue={data?.dutiesCurrency}
                                                                    disabled readOnly
                                                                    placeholder='Duties Currency' /></Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Duties Value</Form.Label>
                                                                <Form.Control
                                                                    name="dutiesValue"
                                                                    defaultValue={formateCurrencyValue(data?.dutiesValue)}
                                                                    disabled readOnly />
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Taxes currency</Form.Label>
                                                                <Form.Control
                                                                    defaultValue={data?.taxesCurrency}
                                                                    disabled readOnly
                                                                    placeholder="Choose..." /> </Form.Group>

                                                        </Row>



                                                        <Row className='mt-3'>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Taxes Value</Form.Label>
                                                                <Form.Control
                                                                    name="taxesValue"
                                                                    defaultValue={formateCurrencyValue(data?.taxesValue)}
                                                                    disabled readOnly />
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Certification Currency</Form.Label>
                                                                <Form.Control
                                                                    defaultValue={data?.certificationCurrency}
                                                                    disabled readOnly
                                                                    placeholder="Certification Currency" />
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Certification Value</Form.Label>
                                                                <Form.Control
                                                                    name='certificationValue'
                                                                    defaultValue={formateCurrencyValue(data?.certificationValue)}
                                                                    disabled readOnly
                                                                />
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Levies Currency</Form.Label>
                                                                <Form.Control
                                                                    defaultValue={data?.leviesCurrency}
                                                                    disabled readOnly
                                                                    placeholder='Levies Currency' />
                                                            </Form.Group>


                                                        </Row>

                                                        <Row className='mt-3'>
                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label>Levies Value</Form.Label>
                                                                <Form.Control
                                                                    name='leviesValue'
                                                                    defaultValue={formateCurrencyValue(data?.leviesValue)}
                                                                    disabled readOnly />
                                                            </Form.Group>

                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='add-edit-product p-0'>
                                                <div className='form'>
                                                    <h3 className='fs-5 fw-bold mb-4'>TAXES COMPUTATION</h3>
                                                    <div>
                                                        <Row>
                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label className='text-muted'>Taxes Value</Form.Label>
                                                                <Form.Control className='text-muted'
                                                                    defaultValue={data?.dutiesValue ? data?.taxesValue ? formateCurrencyValue(JSON.stringify(parseInt(data?.taxesValue.replace(",", "")) + parseInt(data?.dutiesValue.replace(",", "")))) : formateCurrencyValue(data?.dutiesValue) : (data?.taxesValue ? formateCurrencyValue(data?.taxesValue) : formateCurrencyValue(data?.dutiesValue))}
                                                                    disabled readOnly />
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label className='text-muted'>Taxes Currency</Form.Label>
                                                                <Form.Control className='text-muted'
                                                                    defaultValue={data?.taxesCurrency}
                                                                    disabled readOnly />
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label className='text-muted'>Receiver Payout</Form.Label>
                                                                <Form.Control className='text-muted'
                                                                    defaultValue={data?.certificationValue ? data?.leviesValue ? formateCurrencyValue(JSON.stringify(parseInt(data?.leviesValue.replace(",", "")) + parseInt(data?.certificationValue.replace(",", "")))) : formateCurrencyValue(data?.certificationValue) : (data?.leviesValue ? formateCurrencyValue(data?.leviesValue) : formateCurrencyValue(data?.certificationValue))}
                                                                    disabled readOnly />
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridZip">
                                                                <Form.Label className='text-muted'>Receiver Payout Currency</Form.Label>
                                                                <Form.Control className='text-muted'
                                                                    defaultValue={data?.certificationCurrency}
                                                                    disabled readOnly />
                                                            </Form.Group>

                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </Form.Group>

                                </Row>
                            }
                        </div>
                    </div>
                </>
            )}
            {data && step === 'facility' && (
                <div className="add-edit-product p-0 mb-5">
                    <div className="form">
                        <h4 className="fs-5 fw-bold mb-4 title-admin">INTEREST</h4>
                        <Row>
                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Interest Rate Type</Form.Label>
                                <Form.Control
                                    disabled readOnly
                                    defaultValue={data?.interestRateType
                                    }
                                    placeholder="Interest Rate Type"
                                />
                            </Form.Group>

                            {data?.interestRateType === "Fixed Rate" && (
                                <>
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Interest Rate</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name="interestRate"
                                                defaultValue={data?.interestRate}

                                            />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                </>
                            )}
                            {data?.interestRateType === "Variable Rate" && (
                                <>
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Base Rate</Form.Label>
                                        <Form.Control

                                            disabled readOnly
                                            defaultValue={data?.baseRate}
                                            placeholder="Base Rate"
                                        />
                                    </Form.Group>
                                    {data?.baseRate === "LIBOR" && (
                                        <Form.Group as={Col} lg={3} controlId="formGridZip">
                                            <Form.Label>LIBOR Rate</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    name="liborRate"
                                                    defaultValue={data?.liborRate}
                                                />
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>


                                        </Form.Group>
                                    )}
                                    {data?.baseRate === "SOFR" && (
                                        <Form.Group as={Col} lg={3} controlId="formGridZip">
                                            <Form.Label>SOFR Rate</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    name="sofrRate"
                                                    defaultValue={data?.sofrRate}
                                                />
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    )}
                                    {data?.baseRate === "Other(Please Specify)" && (
                                        <Form.Group as={Col} lg={3} controlId="formGridZip">
                                            <Form.Label>Specify Rate</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    name="otherRate"
                                                    defaultValue={data?.otherRate}
                                                />
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    )}

                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Margin</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name="margin"
                                                defaultValue={data?.margin}
                                            />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                </>
                            )}
                        </Row>
                    </div>
                    <div className="form">
                        <h4 className="fs-5 fw-bold mb-4 title-admin">PRICING</h4>
                        <div>
                            <Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Interest Period</Form.Label>
                                    <Form.Control
                                        disabled readOnly
                                        defaultValue={data?.interestPeriod}
                                        placeholder="Interest Period"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Interest Payment Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="interestPaymentDate"
                                        placeholder="dd-mm-yyyy"
                                        defaultValue={new Date(
                                            data?.interestPaymentDate
                                        )
                                            .toISOString()
                                            .split("T")[0]}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Tenor of Each Drawdown</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name=" tenor"
                                            defaultValue={data?.tenor}
                                            placeholder='Tenor of Each Drawdown'
                                        />
                                        <InputGroup.Text>months</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Annual Management Fee <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="managementFee"
                                            defaultValue={data?.managementFee}
                                            disabled readOnly
                                            placeholder='Annual Management Fee'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mt-3">
                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Drawdown Fee <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="drawdownFee"
                                            defaultValue={data?.drawdownFee}
                                            placeholder='Drawdown Fee'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup> </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Commitment Fee <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="commitmentFee"
                                            defaultValue={data?.commitmentFee}
                                            placeholder='Commitment Fee'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Late Interest Charges</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="lateInterestCharges"
                                            defaultValue={data?.lateInterestCharges}
                                            placeholder='Late Interest Charges'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup> </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Pre-Payment <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="prePayment"
                                            defaultValue={data?.prePayment}
                                            placeholder='Pre-Payment'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className="mt-3">
                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Cancellation Fee <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="cancellationFee"
                                            defaultValue={data?.cancellationFee}
                                            placeholder='Cancellation Fee'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup> </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Agency Fee <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="agencyFee"
                                            defaultValue={data?.agencyFee}
                                            placeholder='Agency Fee'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup> </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Advisory Fee <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="advisoryFee"
                                            defaultValue={data?.advisoryFee}
                                            placeholder='Advisory Fee'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup> </Form.Group>

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Default Interest <OptionalSpan /></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="defaultInterest"
                                            defaultValue={data?.defaultInterest}
                                            placeholder='Default Interest'
                                        />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                        </div>
                    </div>
                    <div className="form">
                        <h6 className="fs-5 fw-bold mb-4">FACILITY DETAILS</h6>
                        <div>
                            <Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Facility Type</Form.Label>
                                    <Form.Control
                                        disabled readOnly
                                        defaultValue={data?.type}
                                        placeholder="Facility Type"
                                    />
                                </Form.Group>

                                {data?.type === "Others(please specify)" && (
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Specify Facility Type</Form.Label>
                                        <Form.Control
                                            name="specifyFacilityType"
                                            defaultValue={data?.specifyFacilityType}
                                            placeholder='Other Type'
                                        />
                                    </Form.Group>
                                )}
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Facility Currency</Form.Label>
                                    <Form.Control
                                        defaultValue={data?.currency}
                                        disabled readOnly
                                        placeholder="Facility Currency"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Facility Amount</Form.Label>
                                    <Form.Control
                                        name="amount"
                                        defaultValue={formateCurrencyValue(data?.amount)}
                                        disabled readOnly
                                        placeholder='Amount'
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Repayment Currency</Form.Label>
                                    <Form.Control
                                        defaultValue={data?.rePaymentCurrency}
                                        disabled readOnly
                                        placeholder="Repayment Currency"
                                    />
                                </Form.Group>
                            </Row>

                            {data?.currency !== data?.rePaymentCurrency &&
                                data?.rePaymentCurrency && (
                                    <Row className="mt-4">
                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>
                                                Did you contract a currency Hedge?
                                            </Form.Label>
                                            <Form.Control
                                                disabled readOnly
                                                defaultValue={data?.currencyHedge.toString()} // Convert to string
                                                placeholder={"Choose..."}
                                            />
                                        </Form.Group>

                                    </Row>
                                )}

                            {data?.currencyHedge &&
                                data?.currency !== data?.rePaymentCurrency &&
                                data?.rePaymentCurrency && (
                                    <>
                                        <div className="product">
                                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                                <h6 className="fs-5 fw-bold title-admin">
                                                    Currency Hedge Details
                                                </h6>

                                            </div>
                                            <Table
                                                columns={hedgingCol}
                                                dataSource={data?.currencyHedgeDetails.length ? data?.currencyHedgeDetails : []}
                                                pagination={{ pageSize: 10 }}
                                                rowKey={(record) => record.id} // Ensure `id` exists or replace with unique field
                                            />
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                    <div className="form">
                        <h4 className="fs-5 fw-bold mb-4">LOAN TO COLLATERAL VALUE</h4>
                        <Row>
                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label><span className='text-danger text-red fw-lighter fst-italic'>This field is not editable</span></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name=""
                                        defaultValue={(
                                            (parseInt(data?.amount) /
                                                parseInt(
                                                    contractValue?.replace(
                                                        /,/g,
                                                        ""
                                                    )
                                                ) || 0) * 100
                                        ).toFixed(2)}
                                        disabled readOnly
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </div>
                    <div className="add-edit-product p-0">
                        <div className="form">
                            <h6 className="fs-5 fw-bold mb-4">LOAN PURPOSE JUSTIFICATION</h6>
                            <div>
                                <Row>
                                    <Form.Group
                                        as={Col}
                                        lg={data?.loanPurposeValidity ? 4 : 6}
                                        controlId="formGridZip"
                                    >
                                        <Form.Label>Loan Purpose</Form.Label>
                                        <Form.Control
                                            name="loanPurposJustification"
                                            defaultValue={data?.loanPurposJustification}
                                            disabled readOnly
                                            placeholder='Loan Purpose'
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        as={Col}
                                        lg={data?.loanPurposeValidity ? 4 : 6}
                                        controlId="formGridZip"
                                    >
                                        <Form.Label>Loan Purpose Validity</Form.Label>
                                        <Form.Control
                                            className="no-border"
                                            placeholder='Validity'
                                            disabled readOnly
                                            defaultValue={
                                                data?.loanPurposeValidity === null
                                                    ? ""
                                                    : data?.loanPurposeValidity?.toString()
                                            } // Ensure null is handled properly
                                        />
                                    </Form.Group>
                                    {data?.loanPurposeValidity && (
                                        <Form.Group as={Col} lg={4} controlId="formGridZip">
                                            <Form.Label>Loan Purpose Reason</Form.Label>
                                            <Form.Control
                                                defaultValue={data?.loanPurposeReason}
                                                name="loanPurposeReason"
                                                placeholder='Reason'
                                            />
                                        </Form.Group>
                                    )}
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div className="add-edit-product p-0">
                        <div
                            className="form"
                            style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}
                        >
                            <div className="product p-0">
                                <div className="mb-5">
                                    <div className="mb-3 d-flex justify-content-between align-items-center">
                                        <h6 className="fs-5 fw-bold">SOURCE OF REPAYMENT</h6>


                                    </div>
                                    {data?.sourceOfRepayment.length ? (
                                        <Table
                                            columns={sourceOfRepaymentColumn}
                                            dataSource={data?.sourceOfRepayment.length ? data?.sourceOfRepayment : []}
                                            pagination={{ pageSize: 10 }}
                                            rowKey={(record) => record.id} // Ensure you have a unique `id` or `key` for each record
                                        />
                                    ) : (
                                        'No data found'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="form">
                        <div className="">
                            <h4 className="fs-5 fw-bold mb-3">TERMS</h4>

                            <div>
                                <Row className="mb-4">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>
                                            Disbursement Mechanism <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.disbursementMechanism}
                                            name="disbursementMechanism"
                                            disabled readOnly
                                            placeholder='Disbursement Mechanism'
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Security Undertaking <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.securityUndertaking}
                                            name="securityUndertaking"
                                            placeholder='Security Undertaking'
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Control Accounts <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.controlAccounts}
                                            name="controlAccounts"
                                            disabled readOnly
                                            placeholder='Control Accounts'
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Final Maturity</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name="finalMaturity"
                                                defaultValue={data?.finalMaturity}
                                                placeholder='Final Maturity'
                                            />
                                            <InputGroup.Text>Days</InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-4">
                                    <Form.Group
                                        as={Col}
                                        lg={
                                            data?.documentation === "Others (Please specify)" ? 3 : 4
                                        }
                                        controlId="formGridZip"
                                    >
                                        <Form.Label>Documentation</Form.Label>
                                        <Form.Control
                                            disabled readOnly
                                            defaultValue={data?.documentation}
                                            placeholder="Documentation"
                                        />
                                    </Form.Group>

                                    {data?.documentation === "Others (Please specify)" && (
                                        <Form.Group as={Col} lg={3} controlId="formGridZip">
                                            <Form.Label>Specify Documentation</Form.Label>
                                            <Form.Control
                                                defaultValue={data?.specifyDocumentation}
                                                name="specifyDocumentation"
                                                placeholder='Others'
                                            />
                                        </Form.Group>
                                    )}
                                    <Form.Group
                                        as={Col}
                                        lg={
                                            data?.documentation === "Others (Please specify)" ? 3 : 4
                                        }
                                        controlId="formGridZip"
                                    >
                                        <Form.Label>
                                            Taxation Duties <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.taxationDuties}
                                            name="taxationDuties"
                                            placeholder='Taxation Duties'
                                            disabled readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        lg={
                                            data?.documentation === "Others (Please specify)" ? 3 : 4
                                        }
                                        controlId="formGridZip"
                                    >
                                        <Form.Label>Enforcement Courts</Form.Label>
                                        <Form.Control
                                            defaultValue={data?.jurisdiction}
                                            name="jurisdiction"
                                            placeholder='Enforcement Courts'
                                            disabled readOnly
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-4">
                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="conditionsPrecedent"
                                        label="Conditions Precedent"
                                        setFacility={(e) => console.log(e)}
                                    />
                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="conditionsSubsequent"
                                        label="Conditions Subsequent"
                                        setFacility={(e) => console.log(e)}
                                    />
                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="borrowerAffirmativeCovenants"
                                        label="Borrower Affirmative Covenants"
                                        setFacility={(e) => console.log(e)}
                                    />
                                </Row>
                                <Row className="mb-4">
                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="financialCovenants"
                                        label="Financial Covenants"
                                        setFacility={(e) => console.log(e)}
                                    />
                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="informationCovenants"
                                        label="Information Covenants"
                                        setFacility={(e) => console.log(e)}
                                    />
                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="generalUndertakings"
                                        label="General Undertakings"
                                        setFacility={(e) => console.log(e)}
                                    />
                                </Row>
                                <Row className="mb-4">
                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="representations"
                                        label="Representations"
                                        setFacility={(e) => console.log(e)}
                                    />

                                    <MultiSelectForm
                                        facility={data}
                                        propertyName="eventsOfDefault"
                                        label="Events of Default"
                                        setFacility={(e) => console.log(e)}
                                    />
                                </Row>

                                <Row className="mb-4">
                                    <Form.Group
                                        as={Col}
                                        lg={6}
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>
                                            Cost and Expenses <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            defaultValue={data?.expenses}
                                            name="expenses"
                                            placeholder='Cost and Expenses'
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} lg={6} controlId="formGridZip">
                                        <Form.Label>
                                            Approvals <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            defaultValue={data?.approvals}
                                            name="approvals"
                                            placeholder='Approvals'
                                            disabled readOnly
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-4">
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Availability Period</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name="availabilityPeriod"
                                                defaultValue={data?.availabilityPeriod}
                                                placeholder='Availability Period'
                                            />
                                            <InputGroup.Text>Months</InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Repayment <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.repayment}
                                            name="repayment"
                                            placeholder='Repayment'
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Transaction Structure <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.transactionStructure}
                                            name="transactionStructure"
                                            placeholder='Transaction Structure'
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Permitted Accounts <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.permittedAccounts}
                                            name="permittedAccounts"
                                            placeholder='Permitted Accounts'
                                            disabled readOnly
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-4">
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Governing Law</Form.Label>
                                        <Form.Control
                                            placeholder='Governing Law'
                                            disabled readOnly
                                            defaultValue={data?.governingLaw}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Assignments <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.assignments}
                                            name="assignments"
                                            placeholder='Assignments'
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Miscellaneous Provisions <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.miscellaneousProvisions}
                                            name="miscellaneousProvisions"
                                            placeholder='Miscellaneous Provisions'
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>
                                            Force Majeure <OptionalSpan />
                                        </Form.Label>
                                        <Form.Control
                                            defaultValue={data?.forceMajeure}
                                            name="forceMajeure"
                                            placeholder='Force Majeure'
                                            disabled readOnly
                                        />
                                    </Form.Group>

                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default WorkflowPreview
