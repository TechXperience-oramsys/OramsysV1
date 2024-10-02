import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import CounterpartiesModal from '../../../component/Modal/CounterpartiesModal'
import InternationalCreditStandingModal from '../../../component/Modal/InternationalCreditStandingModal'
import LoanPurposeRiskModal from '../../../component/Modal/LoanPurposeRiskModal'
import { riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'

const PerformanceRisk = ({ hendelNext, hendelCancel }) => {

    // const navigate = useNavigate()
    // const [internationalCreditStandingModal, setInternationalCreditStandingModal] = useState(false)
    const [sameModal, setSameModal] = useState(false)
    const [showSameModal, setShowSameModal] = useState(false)
    // const [acceptableJurisdictionModal, setAcceptableJurisdictionModal] = useState(false)
    const [showTextEditer, setShowTextEditer] = useState(false)
    const [selected, setSelected] = useState('')
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()
    const [performanceRisk, setPerformanceRisk] = useState({
        goodCreditStanding: {
            type: '',
            party: '',
        },
        acceptableJurisdiction: {
            justification: '',
            evidence:''
        },
        cashCollateral: {
            type: '',
            instrument: '',
            evidence: '',
        },
        coverageOnStock: {
            type: '',
            instrument: '',
            evidence: '',
        },
        acceptableCMA: {
            type: '',
            party: '',
        },
    })

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)

    useEffect(() => {
        if (riskAssessment) {
            setPerformanceRisk({
                ...performanceRisk,
                goodCreditStanding: {
                    type: riskAssessment?.goodCreditStanding?.type,
                    party: riskAssessment?.goodCreditStanding?.party
                },
                cashCollateral: {
                    type: riskAssessment?.cashCollateral?.type,
                    instrument: riskAssessment?.cashCollateral?.instrument,
                    evidence: riskAssessment?.cashCollateral?.evidence
                },
                coverageOnStock: {
                    type: riskAssessment?.coverageOnStock?.type,
                    instrument: riskAssessment?.coverageOnStock?.instrument,
                    evidence: riskAssessment?.coverageOnStock?.evidence
                },
                acceptableCMA: {
                    type: riskAssessment?.acceptableCMA?.type,
                    party: riskAssessment?.acceptableCMA?.party,
                },
                acceptableJurisdiction: {
                    justification: riskAssessment?.acceptableJurisdiction?.justification,
                    evidence: riskAssessment?.acceptableJurisdiction?.evidence,
                },
            })
        }
    }, [riskAssessment, performanceRisk])

    const getData = (e) => {
        if (e.name === 'cashCollateral') {
            setPerformanceRisk({
                ...performanceRisk,
                cashCollateral: e.value
            })
        }
        else if (e.name === 'coverageOnStock') {
            setPerformanceRisk({
                ...performanceRisk,
                coverageOnStock: e.value
            })
        }
    }

    const modalData = (e) => {
        if (e.name === 'goodCreditStanding') {
            setPerformanceRisk({
                ...performanceRisk,
                goodCreditStanding: e.value
            })
        } else if (e.name === 'acceptableCMA') {
            setPerformanceRisk({
                ...performanceRisk,
                acceptableCMA: e.value
            })
        }
    }

    const modalGetData = (e) => {
        if (e.name === 'acceptableJurisdiction') {
            setPerformanceRisk({
                ...performanceRisk,
                acceptableJurisdiction: e.value
            })
        }
    }

    const nextStep = () => {
        // if (performanceRisk?.goodCreditStanding || performanceRisk?.acceptableJurisdiction || performanceRisk?.cashCollateral || performanceRisk?.coverageOnStock || performanceRisk?.acceptableCMA) {
        let body = {
            ...riskAssessment,
            ...performanceRisk
            // goodCreditStanding: performanceRisk?.goodCreditStanding,
            // acceptableJurisdiction: performanceRisk?.acceptableJurisdiction,
            // cashCollateral: performanceRisk?.cashCollateral,
            // coverageOnStock: performanceRisk?.coverageOnStock,
            // acceptableCMA: performanceRisk?.acceptableCMA,
        }

        dispatch(riskAssessmentAction(body))
        hendelNext()
        // }
    }

    const cashCollateralOption = [
        'cashCollateral'
    ]

    const coverageOnStock = [
        'Proceeds from Insurance over Stock'
    ]


    return (
        <>
            <>
                <div className='add-edit-product'>
                    <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                        <img src={`../../../assets/img/about/${performanceRisk?.goodCreditStanding?.type || performanceRisk?.acceptableJurisdiction?.justification || performanceRisk?.cashCollateral?.type || performanceRisk?.coverageOnStock?.type || performanceRisk?.acceptableCMA?.type ? "error-info-success.png" : "error-info.png"}`} alt='imaaage' className='me-3' />
                        {performanceRisk?.goodCreditStanding?.type || performanceRisk?.acceptableJurisdiction?.justification || performanceRisk?.cashCollateral?.type || performanceRisk?.coverageOnStock?.type || performanceRisk?.acceptableCMA?.type ?
                            <p className='success'>Risks are acceptable due to mitigants</p> :
                            <p className='error'>The below risks require your attention</p>
                        }
                    </div>
                    <div className='form'>
                        <h2 className='mb-3'>Performance Risk</h2>
                        <div>
                            {performanceRisk?.goodCreditStanding?.type && performanceRisk?.acceptableJurisdiction?.justification && performanceRisk?.cashCollateral?.type && performanceRisk?.coverageOnStock?.type && performanceRisk?.acceptableCMA?.type.type ? <p>No risk</p> :
                                <div>
                                    <div className='risk-tab' onClick={() => { setShowSameModal(true); setSelected('goodCreditStanding') }}>
                                        <h3>Transfer risk to an entity with good credit standing (e.g the government, a Bank etc)</h3>
                                        <img alt='imaaage' src={`../../../assets/img/about/${performanceRisk?.goodCreditStanding?.type ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    <div className='risk-tab' onClick={() => { setShowTextEditer(true); setSelected('acceptableJurisdiction') }}>
                                        <h3>Charge over marketable assets of the company, located in an acceptable jurisdiction</h3>
                                        <img alt='imaaage' src={`../../../assets/img/about/${performanceRisk?.acceptableJurisdiction?.justification ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    <div className='risk-tab' onClick={() => { setSameModal(true); setSelected('cashCollateral'); setOptions(cashCollateralOption) }}>
                                        <h3>Cash Collateral</h3>
                                        <img alt='imaaage' src={`../../../assets/img/about/${performanceRisk?.cashCollateral?.type ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    <div className='risk-tab' onClick={() => { setSameModal(true); setSelected('coverageOnStock'); setOptions(coverageOnStock) }}>
                                        <h3>Take Insurance coverage on stock (in the case of theft and other related issues)</h3>
                                        <img alt='imaaage' src={`../../../assets/img/about/${performanceRisk?.coverageOnStock?.type ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    <div className='risk-tab' onClick={() => { setShowSameModal(true); setSelected('acceptableCMA') }}>
                                        <h3>Appoint an acceptable CMA</h3>
                                        <img alt='imaaage' src={`../../../assets/img/about/${performanceRisk?.acceptableCMA?.type ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='footer_'>
                    <button onClick={() => hendelCancel()} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { nextStep() }} className='footer_next_btn'> Next</button>
                </div>
                {showSameModal && <InternationalCreditStandingModal show={showSameModal} onHide={() => setShowSameModal(false)} getModalData={(e) => modalData(e)} type={selected} data={{ goodCreditStanding: performanceRisk?.goodCreditStanding, acceptableCMA: performanceRisk?.acceptableCMA }} from='' />}
                {sameModal && <CounterpartiesModal show={sameModal} onHide={() => setSameModal(false)} getModalData={(e) => { console.log('e', e); getData(e) }} type={selected} modalOption={options} data={{ cashCollateral: performanceRisk?.cashCollateral, coverageOnStock: performanceRisk?.coverageOnStock }} />}
                {showTextEditer && <LoanPurposeRiskModal show={showTextEditer} onHide={() => setShowTextEditer(false)} getModalData={(e) => { console.log('e', e); modalGetData(e) }} types={selected} />}
            </>
        </>
    )
}

export default PerformanceRisk