import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import CurrencyHedgeModal from '../../../component/Modal/CurrencyHedgeModal'
import FinancingSufficientlyModal from '../../../component/Modal/FinancingSufficientlyModal'
// import LoanPurposeRiskModal from '../../../component/Modal/LoanPurposeRiskModal'
import { riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'
import { PiWarningCircleLight } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";

const ExchangeRateRisk = ({ hendelNext, hendelCancel }) => {

    // const navigate = useNavigate()

    // const [showModal, setshowModal] = useState(false)
    const [currencyHedgeModal, setcurrencyHedgeModal] = useState(false)
    const [financingSufficientlyModal, setfinancingSufficientlyModal] = useState(false)
    const [selected, setSelected] = useState('')
    const [data, setData] = useState({
        currencyHedge: {
            hedgingMethod: '',
            counterparty: ''
        },
        marginFinancing: {
            contractCurrency: "",
            contractValue: "",
            facilityCurrency: "",
            facilityAmount: "",
        }
    })

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)
    // console.log('getAlltransactionData', getTransactionByIdData.data?.facility.rePaymentCurrency)
    const dispatch = useDispatch()
    const modalGetData = (e) => {
        if (e.name === 'currencyHedge') {
            setData({
                ...data,
                currencyHedge: e.value
            })
        }
    }

    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            if (getTransactionByIdData?.data?.facility?.rePaymentCurrency !== getTransactionByIdData?.data?.details?.contractDetails?.currency) {
                if (getTransactionByIdData.data?.facility?.currencyHedgeDetails?.length) {
                    setData({
                        ...data,
                        currencyHedge: {
                            hedgingMethod: getTransactionByIdData.data?.facility?.currencyHedgeDetails[0]?.hedgingMethod,
                            counterparty: getTransactionByIdData.data?.facility?.currencyHedgeDetails[0]?.counterParty?._id,
                        },
                    })
                    let body = {
                        ...riskAssessment,
                        currencyHedge: {
                            hedgingMethod: getTransactionByIdData.data.facility.currencyHedgeDetails[0]?.hedgingMethod,
                            counterparty: getTransactionByIdData.data.facility.currencyHedgeDetails[0]?.counterParty?._id,
                        },

                    }
                    dispatch(riskAssessmentAction(body))
                }
            }


            // }
            // let newData = {
            //     value: data,
            //     name: type
            // }
        }
    }, [getTransactionByIdData, data, dispatch, riskAssessment])

    // console.log("data", data)
    useEffect(() => {
        if (riskAssessment) {
            setData(riskAssessment)
        }
    }, [riskAssessment])

    const nextStep = () => {
        // if (data?.currencyHedge || data?.marginFinancing) {

        let body = {
            ...riskAssessment,
            ...data
            // currencyHedge: data?.currencyHedge,
            // marginFinancing: data?.marginFinancing
        }
        dispatch(riskAssessmentAction(body))
        hendelNext(data)
        // }
    }

    return (
        <>
            <div className='add-edit-product'>
                <div className='d-flex align-items-center justify-content-center error-info mt-5 mb-5'>
                    {/* <img alt='icon' src={`../../../assets/img/about/${data?.currencyHedge || data?.marginFinancing ? "error-info-success.png" : "error-info.png"}`} className='me-3' /> */}
                    {data?.currencyHedge || data?.marginFinancing ? <FaRegCheckCircle className='text-success fs-2 me-3' /> : <PiWarningCircleLight className='text-danger fs-2 me-3' />}

                    {data?.currencyHedge || data?.marginFinancing ?
                        <p className='success'>Risks are acceptable due to mitigants</p> :
                        <p className='error'>The below risks require your attention</p>
                    }
                </div>
                <div className='form'>
                    <h2 className='mb-3'>Exchange rate risk</h2>
                    {data?.currencyHedge && data?.marginFinancing ? <p>No risk</p> :
                        <div>
                            {getTransactionByIdData?.data?.facility?.rePaymentCurrency !== getTransactionByIdData?.data?.details?.contractDetails?.currency &&
                                <div className='risk-tab' onClick={() => { setcurrencyHedgeModal(true); setSelected("currencyHedge") }}>
                                    <h3>Enter a currency hedge</h3>
                                    {data?.currencyHedge?.counterparty || data?.currencyHedge?.hedgingMethod ? <FaRegCheckCircle className='text-success fs-2' /> : <FaRegCheckCircle className='text-secondary fs-2' />}
                                </div>}
                            <div className='risk-tab' onClick={() => setfinancingSufficientlyModal(true)}>
                                <h3>Margin the financing sufficiently</h3>
                                {data?.marginFinancing?.contractValue ? <FaRegCheckCircle className='text-success fs-2' /> : <FaRegCheckCircle className='text-secondary fs-2' />}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => hendelCancel()} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { nextStep() }} className='footer_next_btn'> Next</button>
            </div>
            {currencyHedgeModal && <CurrencyHedgeModal show={currencyHedgeModal} onHide={() => setcurrencyHedgeModal(false)} getModalData={(e) => modalGetData(e)} type={selected} data={data.currencyHedge} />}


            {financingSufficientlyModal && <FinancingSufficientlyModal show={financingSufficientlyModal} onHide={() => setfinancingSufficientlyModal(false)} getModalData={(e) => setData({ ...data, marginFinancing: e })} data={data.marginFinancing} />}
        </>
    )
}

export default ExchangeRateRisk