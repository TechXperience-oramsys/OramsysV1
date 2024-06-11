import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import LoanPurposeRiskModal from '../../../component/Modal/LoanPurposeRiskModal'
import CurrencyHedgeDetailsModal from '../../../component/Modal/CurrencyHedgeDetailsModal'
import FinancingSufficientlyModal from '../../../component/Modal/FinancingSufficientlyModal'
import { addRiskAssessment, getRiskAssessment, riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'
import { ADD_RISK_ASSESSMENT } from '../../../redux/types'


const MarketPriceRisk = ({ hendelNext, hendelCancel }) => {

    const location = useLocation()
    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')
    const [pricingType, setPricingType] = useState('')
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [currencyHedgeDetailsModal, setCurrencyHedgeDetailsModal] = useState(false)
    const [financingSufficientlyModal, setFinancingSufficientlyModal] = useState(false)
    const [selected, setSelected] = useState('')
    const dispatch = useDispatch()
    const [marketPriceRisk, setMarketPriceRisk] = useState({
        contractsBasis: {
            justification: ''
        },
        priceHedge: {
            hedgingMethod: '',
            counterparty: ''
        },
        financingSufficiently: {
            contractCurrency: "",
            contractValue: "",
            facilityCurrency: "",
            facilityAmount: "",
        },
    })
    const [loading, setLoading] = useState(false)

    const modalData = (e) => {
        if (e.name === 'internationalCreditStanding') {
            setMarketPriceRisk({ ...marketPriceRisk, internationalCreditStanding: e.value })
        }
    }

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)
    const addRiskAssessmentData = useSelector(state => state.riskAssessmentData.addRiskAssessment)
    const getRiskAssessmentId = useSelector(state => state.riskAssessmentData.getRiskAssessment)

    useEffect(() => {
        if (addRiskAssessmentData && addRiskAssessmentData.data && addRiskAssessmentData.status === 200) {
            dispatch({
                type: ADD_RISK_ASSESSMENT,
                payload: []
            })

            navigate('/transactions')
            toast.success(addRiskAssessmentData.message)

        }
    }, [addRiskAssessmentData])

    useEffect(() => {
        if (getRiskAssessment && getRiskAssessment.data && getRiskAssessment.status === 200) {
            setMarketPriceRisk({
                ...marketPriceRisk,
                contractsBasis: getRiskAssessment.data.details?.contractsBasis,
                priceHedge: getRiskAssessment.data.details?.priceHedge,
                financingSufficiently: getRiskAssessment.data.details?.financingSufficiently,
            })
        }
    }, [getRiskAssessment])

    useEffect(() => {
        if (riskAssessment) {
            setMarketPriceRisk({
                ...riskAssessment,
                contractsBasis: {
                    justification: riskAssessment?.contractsBasis?.justification
                },
                priceHedge: {
                    hedgingMethod: riskAssessment?.priceHedge?.hedgingMethod,
                    counterparty: riskAssessment?.priceHedge?.counterparty,
                },
                financingSufficiently: {
                    contractCurrency: riskAssessment?.financingSufficiently?.contractCurrency,
                    contractValue: riskAssessment?.financingSufficiently?.contractValue,
                    facilityCurrency: riskAssessment?.financingSufficiently?.facilityCurrency,
                    facilityAmount: riskAssessment?.financingSufficiently?.facilityAmount,
                },
            })
        }
    }, [riskAssessment])


    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

    const getModalData = (e) => {
        // if (e.name) {
        //     setMarketPriceRisk({
        //         ...marketPriceRisk,
        //         [e.name]: e.value
        //     })
        if (e.name === 'contractsBasis') {
            setMarketPriceRisk({
                ...marketPriceRisk,
                contractsBasis: e.value
            })
        } else if (e.name === 'priceHedge') {
            setMarketPriceRisk({
                ...marketPriceRisk,
                priceHedge: e.value
            })
        } else if (e.name === 'financingSufficiently') {
            setMarketPriceRisk({
                ...marketPriceRisk,
                financingSufficiently: e.value
            })
        } else if (e.name === 'priceHedge') {
            setMarketPriceRisk({
                ...marketPriceRisk,
                priceHedge: e.value
            })
        } else if (e.name === 'financingSufficiently') {
            setMarketPriceRisk({
                ...marketPriceRisk,
                financingSufficiently: e.value
            })
        }
    }

    const saveData = async () => {
        // if (marketPriceRisk?.contractsBasis && marketPriceRisk?.priceHedge && marketPriceRisk?.financingSufficiently) {

        let body = {
            ...riskAssessment,
            ...marketPriceRisk,
            // contractsBasis: marketPriceRisk?.contractsBasis,
            // priceHedge: marketPriceRisk?.priceHedge,
            // financingSufficiently: marketPriceRisk?.financingSufficiently,
            transactionId: id
        }
        console.log('body final =================>', body)
        // navigate('/transactions')
        // console.log('body', body)
        setLoading(true)
        await dispatch(addRiskAssessment(body));
        setLoading(false)
        // navigate('/transactions');
        // }
    }


    return (
        <>
            <div className='add-edit-product'>
                <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                    <img src={`../../../assets/img/about/${marketPriceRisk?.contractsBasis?.justification || marketPriceRisk?.priceHedge?.hedgingMethod || marketPriceRisk?.financingSufficiently?.justification ? "error-info-success.png" : "error-info.png"}`} className='me-3' />
                    {marketPriceRisk?.contractsBasis?.justification || marketPriceRisk?.priceHedge?.hedgingMethod || marketPriceRisk?.financingSufficiently?.contractValue ?
                        <p className='success'>Risks are acceptable due to mitigants</p> :
                        <p className='error'>The below risks require your attention</p>
                    }
                </div>
                <div className='form'>
                    <div>
                        <h2 className='mb-3'>Market/Price risk</h2>
                        {marketPriceRisk?.contractsBasis?.justification && marketPriceRisk?.priceHedge?.hedgingMethod && marketPriceRisk?.financingSufficiently?.contractValue ? <p>No risk</p> :
                            <div>
                                {getTransactionByIdData.data?.details?.pricingDetails.pricingType != "Firm fixed price" ? <><div className='risk-tab' onClick={() => { setShowModal(true); setSelected('contractsBasis') }}>
                                    <h3>Finance only on Firm Fixed Price contracts basis</h3>
                                    <img src={`../../../assets/img/about/${marketPriceRisk?.contractsBasis?.justification ? "correct-success.png" : "correct (1).png"}`} />
                                </div></> : ''}
                                <div className='risk-tab' onClick={() => { setCurrencyHedgeDetailsModal(true); setSelected('priceHedge') }}>
                                    <h3>Enter a price hedge</h3>
                                    <img src={`../../../assets/img/about/${marketPriceRisk?.priceHedge?.hedgingMethod ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                                <div className='risk-tab' onClick={() => { setFinancingSufficientlyModal(true); setSelected('financingSufficiently') }}>
                                    <h3>Margin the financing sufficiently</h3>
                                    <img src={`../../../assets/img/about/${marketPriceRisk?.financingSufficiently?.contractValue ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => hendelCancel()} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { saveData() }} className='footer_next_btn'>
                    {!loading ? <>Save </> : null}
                    {loading && <div class="d-flex justify-content-center">
                        <strong className='me-2'>Saving...</strong>
                        <div className="spinner-border spinner-border-sm mt-1" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                </button>
            </div>

            {showModal && <LoanPurposeRiskModal show={showModal} onHide={() => setShowModal(false)} getModalData={(e) => getModalData(e)} types={selected} data={marketPriceRisk?.contractsBasis} />}
            {currencyHedgeDetailsModal && <CurrencyHedgeDetailsModal show={currencyHedgeDetailsModal} onHide={() => setCurrencyHedgeDetailsModal(false)} getModalData={(e) => setMarketPriceRisk({ ...marketPriceRisk, priceHedge: e })} types={selected} data={marketPriceRisk?.priceHedge} />}
            {financingSufficientlyModal && <FinancingSufficientlyModal show={financingSufficientlyModal} onHide={() => setFinancingSufficientlyModal(false)} getModalData={(e) => setMarketPriceRisk({ ...marketPriceRisk, financingSufficiently: e })} data={marketPriceRisk?.financingSufficiently} />}

        </>
    )
}

export default MarketPriceRisk