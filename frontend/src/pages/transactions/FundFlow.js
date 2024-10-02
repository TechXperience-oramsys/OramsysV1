import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import LCPartiesModal from '../../component/Modal/LCPartiesModal'
import TextEditerModal from '../../component/Modal/TextEditerModal'
import { useDispatch, useSelector } from 'react-redux';
import { countrieAction } from '../../redux/actions/countrieAction'
import { entityGetAction } from '../../redux/actions/entityAction'
import { CurrencyOptions } from '../../helper/common'
import { transactionDataAction } from '../../redux/actions/transactionDataAction'
// import { formatCurrency } from '../../helper/utils'
import { useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'
import { Table, Button, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { beneficiaryAtom, contractDetailAtom, countryAtom, editeRowDataAtom, fundFlowAtom, lettersOfCreditAtom, selectedNameAtom, showTextEditorAtom } from './Helpers/atoms';


const FundFlow = ({ hendelCancel, hendelNext, getTrans }) => {
    console.log(getTrans)

    const dispatch = useDispatch()

    const [fundFlow, setFundFlow] = useAtom(fundFlowAtom)

    const [ setContractDetails] = useAtom(contractDetailAtom)
    const [selectedName] = useAtom(selectedNameAtom)
    const [country, setCountry] = useAtom(countryAtom)
    const [beneficiary, setbeneficiary] = useAtom(beneficiaryAtom)
    const [lettersOfCredit, setLettersOfCredit] = useAtom(lettersOfCreditAtom)

    const [showTextEditor, setShowTextEditor] = useAtom(showTextEditorAtom)
    const [editeRowData, setEditeRowData] = useAtom(editeRowDataAtom)

    const location = useLocation()
    const isView = location?.state[2]?.isView

    const [showEditModal, setShowEditModal] = useState(false)
    const [type] = useState('')

    const [error, setError] = useState({})

    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const paymentOrigin = useSelector(state => state.countryData.country)
    const beneficiaries = useSelector(state => state.entityData.entity)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

    useEffect(() => {
        dispatch(countrieAction('all'))
        dispatch(entityGetAction('Company'))
    }, [dispatch])

    // useEffect(() => {
    //     console.log('transactionData', transactionData)
    //     setFundFlow({
    //         ...fundFlow,
    //         contractCurrency: transactionData?.details?.contractDetails?.contractCurrency,
    //         contractValue: transactionData?.details?.contractDetails?.contractValue,
    //         _id: transactionData?.details.contractDetails?._id
    //     })
    // }, [transactionData])


    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            setFundFlow({
                _id: getTransactionByIdData.data?.fundFlow?._id,
                contractCurrency: getTransactionByIdData.data?.fundFlow?.contractCurrency,
                contractValue: getTransactionByIdData.data?.fundFlow?.contractValue,

                paymentMethod: getTransactionByIdData.data?.fundFlow?.paymentMethod,
                openAccount: getTransactionByIdData.data?.fundFlow?.openAccount,

                paymentDate: getTransactionByIdData.data?.fundFlow?.paymentDate,
                terms: getTransactionByIdData.data?.fundFlow?.terms,
                paymentOrigin: getTransactionByIdData.data?.fundFlow?.paymentOrigin?._id,
                beneficiary: getTransactionByIdData.data?.fundFlow?.beneficiary?._id,
                additonalCharges: getTransactionByIdData.data?.fundFlow?.additonalCharges,

                payer: getTransactionByIdData.data?.fundFlow?.payer?._id,
                dutiesCurrency: getTransactionByIdData.data?.fundFlow?.dutiesCurrency,
                dutiesValue: getTransactionByIdData.data?.fundFlow?.dutiesValue,
                taxesCurrency: getTransactionByIdData.data?.fundFlow?.taxesCurrency,
                taxesValue: getTransactionByIdData.data?.fundFlow?.taxesValue,
                certificationCurrency: getTransactionByIdData.data?.fundFlow?.certificationCurrency,
                certificationValue: getTransactionByIdData.data?.fundFlow?.certificationValue,
                leviesCurrency: getTransactionByIdData.data?.fundFlow?.leviesCurrency,
                leviesValue: getTransactionByIdData.data?.fundFlow?.leviesValue,
            })
            setLettersOfCredit(getTransactionByIdData.data?.fundFlow?.lettersOfCredit.map((ele) => {
                return {
                    applicant: { value: ele?.applicant?._id, label: ele?.applicant?.details?.name },
                    issuingBank: { value: ele?.issuingBank?._id, label: ele?.issuingBank?.details?.name },
                    beneficiary: { value: ele?.beneficiary?._id, label: ele?.beneficiary?.details?.name },
                    advisingBank: { value: ele?.advisingBank?._id, label: ele?.advisingBank?.details?.name },
                    conformingBank: { value: ele?.conformingBank?._id, label: ele?.conformingBank?.details?.name },
                    negotiatingBank: { value: ele?.negotiatingBank?._id, label: ele?.negotiatingBank?.details?.name },
                    secondBeneficiary: { value: ele?.secondBeneficiary?._id, label: ele?.secondBeneficiary?.details?.name },
                    reimbursingBank: { value: ele?.reimbursingBank?._id, label: ele?.reimbursingBank?.details?.name },
                }
            }))
            // setContractDetails({
            //     currency: getTrans.currency,
            //     value: getTrans.value,
            // })
        }
    }, [getTransactionByIdData, setContractDetails, setFundFlow, setLettersOfCredit])

    const handleChange = (event) => {
        setFundFlow({
            ...fundFlow,
            [event.target.name]: event.target.value
        });
    }

    // const handleChnages = (e) => {
    //     setContractDetails({
    //         ...contractDetails,
    //         [e.target.name]: e.target.value,
    //     })
    // }

    const hadleChangeModal = (e) => {
        setFundFlow({
            ...fundFlow,
            [e.name]: e.value
        });
    }

    const setdata = (data) => {
        console.log("data====", data)
        setLettersOfCredit([data])
    }

    useEffect(() => {
        if (paymentOrigin && paymentOrigin.data) {
            setCountry(paymentOrigin?.data)
        }
    }, [paymentOrigin, setCountry])

    useEffect(() => {
        if (beneficiaries && beneficiaries.data && beneficiaries.status === 200) {
            setbeneficiary(beneficiaries.data)
        }
        console.log('BENEFICIARIS', beneficiaries)
    }, [beneficiaries, setbeneficiary])

    const termsOptions = [
        'At sight',
        '30 Day',
        '45 Days',
        '60 Days',
        '90 Days',
        '180 Days',
    ]

    const additonalChargesOption = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
    ]

    const paymentMethodOption = [
        'Cash against documents (CAD)',
        'Documents against acceptance (DAA)',
        'Letter of Credit (LC)',
        'Open account',
        'Electronic Bill of Laden'
    ]

    const handleChangeNumber = (e, name) => {
        if (name === "taxesValue" || name === "certificationValue" || name === "leviesValue") {
            setFundFlow({ ...fundFlow, [name]: e.target.value })
        }
    }

    const handleChnage = (e) => {
        setFundFlow({
            ...fundFlow,
            [e.target.name]: e.target.value
        })
    }

    const next = () => {
        if (validation()) {
            return
        }
        let body = {
            ...transactionData,
            fundFlow: {
                ...fundFlow,
                lettersOfCredit
            }
        }
        dispatch(transactionDataAction(body))
        hendelNext()
    }

    const validation = () => {
        let flag = false
        let error = {}

        // if (!fundFlow.contractCurrency) {
        //     flag = true
        //     error.contractCurrency = ' Please enter contract currency!'
        // }

        // if (!fundFlow.contractValue) {
        //     flag = true
        //     error.contractValue = ' Please enter contract value!'
        // }

        if (!fundFlow.paymentMethod) {
            flag = true
            error.paymentMethod = ' Please enter payment method!'
        }

        if (fundFlow.paymentMethod === 'Open account' && !fundFlow.openAccount) {
            flag = true
            error.openAccount = ` Please enter for 'Open account', specify terms as per contract!`
        }

        if (!fundFlow.paymentDate) {
            flag = true
            error.paymentDate = 'Please enter payment date'
        }

        if (!fundFlow.terms) {
            flag = true
            error.terms = 'Please enter terms'
        }

        if (!fundFlow.paymentOrigin) {
            flag = true
            error.paymentOrigin = 'Please enter payment origin'
        }

        if (!fundFlow.beneficiary) {
            flag = true
            error.beneficiary = 'Please enter beneficiary'
        }

        if (fundFlow.additonalCharges === "") {
            flag = true
            error.additonalCharges = 'Please enter additonal charges'
        }

        if (fundFlow.additonalCharges && !fundFlow.payer) {
            flag = true
            error.payer = 'Please enter payer'
        }

        if (fundFlow.additonalCharges && !fundFlow.dutiesCurrency) {
            flag = true
            error.dutiesCurrency = 'Please enter duties currency'
        }

        if (fundFlow.additonalCharges && !fundFlow.dutiesValue) {
            flag = true
            error.dutiesValue = 'Please enter duties value'
        }

        if (fundFlow.additonalCharges && !fundFlow.taxesCurrency) {
            flag = true
            error.taxesCurrency = 'Please enter taxes currency'
        }

        if (fundFlow.additonalCharges && !fundFlow.taxesValue) {
            flag = true
            error.taxesValue = 'Please enter taxes value'
        }

        if (fundFlow.additonalCharges && !fundFlow.certificationCurrency) {
            flag = true
            error.certificationCurrency = 'Please enter Certification currency'
        }

        if (fundFlow.additonalCharges && !fundFlow.certificationValue) {
            flag = true
            error.certificationValue = 'Please enter Certification value'
        }

        if (fundFlow.additonalCharges && !fundFlow.leviesCurrency) {
            flag = true
            error.leviesCurrency = 'Please enter levies Certification'
        }

        if (fundFlow.additonalCharges && !fundFlow.leviesValue) {
            flag = true
            error.leviesValue = 'Please enter levies value'
        }
        setError(error)
        return flag

    }

    const formateCurrencyValue = (data) => {
        if (data) {
            let value = data.replace(
                /\D/g,
                '',
            ).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
            );
            // let prefix = CurrencyOptions.find((ele) => ele.label === fundFlow?.dutiesCurrency)?.prefix
            // let suffix = CurrencyOptions.find((ele) => ele.label === fundFlow?.dutiesCurrency)?.suffix
            // return prefix ? (prefix + value) : suffix ? (value + suffix) : value
            return value
        } else {
            return data
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: ['applicant', 'label'], // Nested field access
            key: 'name',
        },
        {
            title: 'Label',
            dataIndex: ['issuingBank', 'label'],
            key: 'label',
        },
        {
            title: 'Countries',
            dataIndex: ['beneficiary', 'label'],
            key: 'countries',
        },
        {
            title: 'Advising Bank',
            dataIndex: ['advisingBank', 'label'],
            key: 'advisingBank',
        },
        {
            title: 'Conforming Bank',
            dataIndex: ['conformingBank', 'label'],
            key: 'conformingBank',
        },
        {
            title: 'Negotiating Bank',
            dataIndex: ['negotiatingBank', 'label'],
            key: 'negotiatingBank',
        },
        {
            title: 'Reimbursing Bank',
            dataIndex: ['reimbursingBank', 'label'],
            key: 'reimbursingBank',
        },
        {
            title: 'Second Beneficiary',
            dataIndex: ['secondBeneficiary', 'label'],
            key: 'secondBeneficiary',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    {isView ? (
                        <Tooltip title="View LC Party">
                            <Button
                                type="default"
                                shape="circle"
                                icon={<EyeOutlined />}
                                onClick={() => setShowEditModal((prev) => !prev)}
                            />
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="Edit LC Party">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        setShowEditModal((prev) => !prev);
                                        setEditeRowData(record);
                                    }}
                                    style={{ marginRight: 8 }}
                                />
                            </Tooltip>
                            <Tooltip title="View LC Party">
                                <Button
                                    type="default"
                                    shape="circle"
                                    icon={<EyeOutlined />}
                                    onClick={() => setShowEditModal((prev) => !prev)}
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
            <div className='add-edit-product'>
                <div className='form'>
                    <h4 className="text-muted fs-5 fw-bold mb-4 title-admin">CONTRACT DETAILS</h4>
                    <Row>
                        <Form.Group as={Col} lg={6} controlId="formGridZip">
                            <Form.Label className='text-muted'>Contract Currency</Form.Label>
                            <Form.Control
                                className='text-muted'
                                value={getTrans.currency}
                                name="currency"
                                disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} lg={6} controlId="formGridZip">
                            <Form.Label className='text-muted'>Contract Value</Form.Label>
                            <Form.Control
                                className='text-muted'
                                value={formateCurrencyValue(getTrans.value)}
                                name="value"
                                onChange={handleChange}
                                disabled={true} />
                        </Form.Group>


                    </Row>
                </div>


                <div className='add-edit-product p-0'>
                    <div className='form' style={{ backgroundColor: "#F4F4F4", border: "none" }}>
                        <h4 className='fs-5 fw-bold mb-4 title-admin'>PAYMENT METHOD</h4>
                        <div>
                            <Row>
                                <Form.Group as={Col} lg={fundFlow.paymentMethod === 'Open account' ? 6 : 12} controlId="formGridZip">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Select
                                        onChange={(event, newValue) => {
                                            setFundFlow({
                                                ...fundFlow, paymentMethod: event.target.value, openAccount: '',
                                                terms: event.target.value === 'Cash against documents (CAD)' ? 'At sight' : fundFlow.terms
                                            });
                                            setLettersOfCredit([])
                                        }}
                                        disabled={isView}
                                        value={fundFlow.paymentMethod}
                                        defaultValue="Choose...">
                                        <option>Choose...</option>
                                        {paymentMethodOption.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.paymentMethod && <span style={{ color: 'red' }}>{error.paymentMethod}</span>}
                                </Form.Group>


                                {fundFlow.paymentMethod === 'Open account' &&
                                    <Form.Group as={Col} lg={6} controlId="formGridZip">
                                        <Form.Label>For 'Open account', specify terms as per contract</Form.Label>
                                        <Form.Control
                                            name='openAccount'
                                            value={fundFlow.openAccount}
                                            onChange={(e) => handleChnage(e)} />
                                        {error?.openAccount && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.openAccount}</span>)}
                                    </Form.Group>
                                }
                                {
                                    fundFlow.paymentMethod === 'Letter of Credit (LC)' &&
                                    <>
                                        <div className='product'>
                                            <div className='mb-3 d-flex justify-content-between align-items-center'>
                                                <h5 className="fs-5 mb-2 title-admin">Letters of credit</h5>
                                                {/* <button className={`add_btn me-3 ${lettersOfCredit.length && 'd-none'} ${isView ? 'd-none' : 'd-block'}`} onClick={() => setShowEditModal(!showEditModal)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button> */}

                                                <Button onClick={() => setShowEditModal(!showEditModal)} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-1'>
                                                    <span class=' pe-2'><i class="bi bi-plus pe-1 "></i></span>
                                                    <span className='fw-bold'>Add</span>
                                                </Button>
                                            </div>
                                            {lettersOfCredit.length > 0 ? (
                                                <Table
                                                    columns={columns}
                                                    dataSource={lettersOfCredit}
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
                                min={transactionData.details.contractDetails.contractDate ? new Date(transactionData.details.contractDetails.contractDate).toISOString().split("T")[0] : ""}
                                value={fundFlow.paymentDate}
                                onChange={handleChange}
                                required
                            />
                            {error && error?.paymentDate && <span style={{ color: 'red' }}>{error.paymentDate}</span>}
                        </Form.Group>



                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Terms</Form.Label>
                            <Form.Select
                                onChange={(event, newValue) => {
                                    setFundFlow({ ...fundFlow, terms: event.target.value });
                                }}
                                disabled={fundFlow.paymentMethod === 'Cash against documents (CAD)' || isView}
                                value={fundFlow.terms}
                                defaultValue="Choose...">
                                <option>Choose...</option>
                                {termsOptions.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}

                            </Form.Select>
                            {error && error?.terms && <span style={{ color: 'red' }}>{error.terms}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Payment Origin</Form.Label>
                            <Form.Select
                                onChange={(event, newValue) => {
                                    setFundFlow({ ...fundFlow, paymentOrigin: event.target.value });
                                }}
                                disabled={isView}
                                value={fundFlow.paymentOrigin}
                                defaultValue="Choose...">
                                <option>Choose...</option>
                                {country.map((item) => (
                                    <option value={item._id}>{item.name}</option>
                                ))}

                            </Form.Select>
                            {error && error.paymentOrigin && <span style={{ color: 'red' }}>{error.paymentOrigin}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Beneficiary</Form.Label>
                            <Form.Select
                                onChange={(event, newValue) => {
                                    setFundFlow({ ...fundFlow, beneficiary: event.target.value });
                                }}
                                disabled={isView}
                                value={fundFlow.beneficiary}
                                defaultValue="Choose...">
                                <option>Choose...</option>
                                {beneficiary.map((item) => (
                                    <option value={item._id}>{item.details?.name}</option>
                                ))}

                            </Form.Select>
                            {error && error?.beneficiary && <span style={{ color: 'red' }}>{error.beneficiary}</span>}
                        </Form.Group>

                    </Row>
                    <Row>
                        <Form.Group as={Col} lg={12} controlId="formGridZip">
                            <Form.Label>Additional Charges?</Form.Label>
                            <Form.Select
                                onChange={(e) => {
                                    const newValue = e.target.value === 'true'; // Convert to boolean
                                    setFundFlow({
                                        ...fundFlow,
                                        additonalCharges: newValue,
                                        payer: newValue ? fundFlow.payer : "",
                                        dutiesCurrency: newValue ? fundFlow.dutiesCurrency : "",
                                        dutiesValue: newValue ? fundFlow.dutiesValue : "",
                                        taxesCurrency: newValue ? fundFlow.taxesCurrency : "",
                                        taxesValue: newValue ? fundFlow.taxesValue : "",
                                        certificationCurrency: newValue ? fundFlow.certificationCurrency : "",
                                        certificationValue: newValue ? fundFlow.certificationValue : "",
                                        leviesCurrency: newValue ? fundFlow.leviesCurrency : "",
                                        leviesValue: newValue ? fundFlow.leviesValue : "",
                                    });
                                }}
                                disabled={isView}
                                value={fundFlow.additonalCharges.toString()}
                                defaultValue="Choose...">
                                <option>Choose...</option>
                                {additonalChargesOption.map((item) => (
                                    <option value={item.value}>{item.label}</option>
                                ))}

                            </Form.Select>
                            {error && error?.additonalCharges && <span style={{ color: 'red' }}>{error.additonalCharges}</span>}
                        </Form.Group>

                    </Row>
                </div>
                {
                    fundFlow.additonalCharges &&
                    <>
                        <div className='add-edit-product p-0'>
                            <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                                <h3 className='fs-5 fw-bold mb-4'>ADDITIONAL CHARGES</h3>
                                <div>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Payer</Form.Label>
                                            <Form.Select
                                                onChange={(event, newValue) => {
                                                    setFundFlow({ ...fundFlow, payer: event.target.value });
                                                }}
                                                disabled={isView}
                                                value={fundFlow.payer}
                                                defaultValue="Choose...">
                                                <option>Choose...</option>
                                                {beneficiary.map((item) => (
                                                    <option value={item._id}>{item.details?.name}</option>
                                                ))}

                                            </Form.Select>
                                            {error && error?.payer && <span style={{ color: 'red' }}>{error.payer}</span>}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Duties Currency</Form.Label>
                                            <Form.Select
                                                onChange={(e, newVal) => {
                                                    setFundFlow({ ...fundFlow, dutiesCurrency: e.target.value });
                                                }}
                                                value={fundFlow.dutiesCurrency}
                                                disabled={isView}
                                                defaultValue="Choose...">
                                                <option>Choose...</option>
                                                {CurrencyOptions.map((item) => (
                                                    <option value={item.label}>{item.label}</option>
                                                ))}

                                            </Form.Select>
                                            {error && error?.dutiesCurrency && <span style={{ color: 'red' }}>{error.dutiesCurrency}</span>}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Duties Value</Form.Label>
                                            <Form.Control
                                                name="dutiesValue"
                                                value={formateCurrencyValue(fundFlow.dutiesValue)}
                                                onChange={(e) => handleChange(e)}
                                                disabled={isView} />
                                            {error?.dutiesValue && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.dutiesValue}</span>)}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Taxes currency</Form.Label>
                                            <Form.Select
                                                onChange={(e, newVal) => {
                                                    setFundFlow({ ...fundFlow, taxesCurrency: e.target.value });
                                                }}
                                                value={fundFlow.taxesCurrency}
                                                disabled={isView}
                                                defaultValue="Choose...">
                                                <option>Choose...</option>
                                                {CurrencyOptions.map((item) => (
                                                    <option value={item.label}>{item.label}</option>
                                                ))}

                                            </Form.Select>
                                            {error && error?.taxesCurrency && <span style={{ color: 'red' }}>{error.taxesCurrency}</span>}
                                        </Form.Group>

                                    </Row>



                                    <Row className='mt-3'>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Taxes Value</Form.Label>
                                            <Form.Control
                                                name="taxesValue"
                                                value={formateCurrencyValue(fundFlow.taxesValue)}
                                                onChange={(e) => handleChangeNumber(e, 'taxesValue')}
                                                disabled={isView} />
                                            {error?.taxesValue && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.taxesValue}</span>)}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Certification Currency</Form.Label>
                                            <Form.Select
                                                onChange={(e, newVal) => {
                                                    setFundFlow({ ...fundFlow, certificationCurrency: e.target.value });
                                                }}
                                                value={fundFlow.certificationCurrency}
                                                disabled={isView}
                                                defaultValue="Choose...">
                                                <option>Choose...</option>
                                                {CurrencyOptions.map((item) => (
                                                    <option value={item.label}>{item.label}</option>
                                                ))}

                                            </Form.Select>
                                            {error && error?.certificationCurrency && <span style={{ color: 'red' }}>{error.certificationCurrency}</span>}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Certification Value</Form.Label>
                                            <Form.Control
                                                name='certificationValue'
                                                value={formateCurrencyValue(fundFlow.certificationValue)}
                                                onChange={(e) => handleChangeNumber(e, 'certificationValue')}
                                                disabled={isView}
                                            />
                                            {error?.certificationValue && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.certificationValue}</span>)}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Levies Currency</Form.Label>
                                            <Form.Select
                                                onChange={(e, newVal) => {
                                                    setFundFlow({ ...fundFlow, leviesCurrency: e.target.value });
                                                }}
                                                value={fundFlow.leviesCurrency}
                                                disabled={isView}
                                                defaultValue="Choose...">
                                                <option>Choose...</option>
                                                {CurrencyOptions.map((item) => (
                                                    <option value={item.label}>{item.label}</option>
                                                ))}

                                            </Form.Select>
                                            {error && error?.leviesCurrency && <span style={{ color: 'red' }}>{error.leviesCurrency}</span>}
                                        </Form.Group>


                                    </Row>

                                    <Row className='mt-3'>
                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Levies Value</Form.Label>
                                            <Form.Control
                                                name='leviesValue'
                                                value={formateCurrencyValue(fundFlow.leviesValue)}
                                                onChange={(e) => handleChangeNumber(e, 'leviesValue')}
                                                disabled={isView} />
                                            {error?.leviesValue && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.leviesValue}</span>)}
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
                                                value={fundFlow.dutiesValue ? fundFlow.taxesValue ? formateCurrencyValue(JSON.stringify(parseInt(fundFlow.taxesValue.replace(",", "")) + parseInt(fundFlow.dutiesValue.replace(",", "")))) : formateCurrencyValue(fundFlow.dutiesValue) : (fundFlow.taxesValue ? formateCurrencyValue(fundFlow.taxesValue) : formateCurrencyValue(fundFlow.dutiesValue))}
                                                disabled />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label className='text-muted'>Taxes Currency</Form.Label>
                                            <Form.Control className='text-muted'
                                                value={fundFlow.taxesCurrency}
                                                disabled />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label className='text-muted'>Receiver Payout</Form.Label>
                                            <Form.Control className='text-muted'
                                                value={fundFlow.certificationValue ? fundFlow.leviesValue ? formateCurrencyValue(JSON.stringify(parseInt(fundFlow.leviesValue.replace(",", "")) + parseInt(fundFlow.certificationValue.replace(",", "")))) : formateCurrencyValue(fundFlow.certificationValue) : (fundFlow.leviesValue ? formateCurrencyValue(fundFlow.leviesValue) : formateCurrencyValue(fundFlow.certificationValue))}
                                                disabled />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label className='text-muted'>Receiver Payout Currency</Form.Label>
                                            <Form.Control className='text-muted'
                                                value={fundFlow.certificationCurrency}
                                                disabled />
                                        </Form.Group>

                                    </Row>
                                </div>
                            </div>
                        </div>
                    </>
                }
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">Back</button>
                    <button onClick={() => { next() }} className='footer_next_btn'> Next</button>
                </div>
            </div>

            {showEditModal && <LCPartiesModal show={showEditModal} onHide={() => setShowEditModal(false)} addParties={(e) => setdata(e)} data={editeRowData} />}
            {showTextEditor && <TextEditerModal show={showTextEditor} onHide={() => setShowTextEditor(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={fundFlow.openAccount} />}
        </>
    )
}

export default FundFlow