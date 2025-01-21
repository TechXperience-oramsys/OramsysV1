import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import CounterpartiesModal from '../../../component/Modal/CounterpartiesModal'
import CreditInsurersModal from '../../../component/Modal/CreditInsurersModal'
import InternationalCreditStandingModal from '../../../component/Modal/InternationalCreditStandingModal'
import LocalCreditStandingModal from '../../../component/Modal/LocalCreditStandingModal'
import { riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'
import { PiWarningCircleLight } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";

const PaymentBuyerRisk = ({ hendelNext, hendelCancel }) => {


    // const navigate = useNavigate()
    const [internationalCreditStandingModal, setInternationalCreditStandingModal] = useState(false)
    const [counterpartiesModal, setCounterpartiesModal] = useState(false)
    // const [acceptablePartyModal, setAcceptablePartyModal] = useState(false)
    const [creditInsurersModal, setCreditInsurersModal] = useState(false)
    const [localCreditStandingModal, setLocalCreditStandingModal] = useState(false)
    const [selected, setSelected] = useState('')
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()
    const [paymentBuyesrRisk, setpaymentBuyesrRisk] = useState({
        internationalCreditStanding: {
            type: '',
            party: ''
        },
        counterparties: {
            type: '',
            instrument: '',
            evidence: '',
        },
        acceptableParty: {
            type: '',
            instrument: '',
            evidence: '',
        },
        creditInsurers: {
            type: '',
            insurer: '',
            broker: '',
            insuredParty: '',
            reInsurer: '',
            currencyOfCoverage: '',
            value: '',
            clauses: '',
            evidence: "",
            underwriter: ''


        },
        localCreditStanding: {
            applicant: '',
            advisingBank: '',
            beneficiary: '',
            confirmingBank: '',
            issuingBank: '',
            negotiatingBank: '',
            reimbursingBank: '',
            secondBeneficiary: '',
        }
    })

    const getData = (e) => {
        if (e.name === 'counterparties') {
            setpaymentBuyesrRisk({
                ...paymentBuyesrRisk,
                counterparties: e.value
            })
        }
        else if (e.name === 'acceptableParty') {
            setpaymentBuyesrRisk({
                ...paymentBuyesrRisk,
                acceptableParty: e.value
            })
        }
    }

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)
    // console.log('riskAssessment', riskAssessment)
    // console.log('paymentBuyesrRisk', paymentBuyesrRisk)

    useEffect(() => {
        if (riskAssessment) {
            setpaymentBuyesrRisk({
                ...paymentBuyesrRisk,
                internationalCreditStanding: {
                    type: riskAssessment?.internationalCreditStanding?.type,
                    party: riskAssessment?.internationalCreditStanding?.party
                },
                counterparties: {
                    type: riskAssessment?.counterparties?.type,
                    instrument: riskAssessment?.counterparties?.instrument,
                    evidence: riskAssessment?.counterparties?.evidence
                },
                acceptableParty: {
                    type: riskAssessment?.acceptableParty?.type,
                    instrument: riskAssessment?.acceptableParty?.instrument,
                    evidence: riskAssessment?.acceptableParty?.evidence
                },
                creditInsurers: {
                    type: riskAssessment?.creditInsurers?.type,
                    insurer: riskAssessment?.creditInsurers?.insurer,
                    broker: riskAssessment?.creditInsurers?.broker,
                    insuredParty: riskAssessment?.creditInsurers?.insuredParty,
                    reInsurer: riskAssessment?.creditInsurers?.reInsurer,
                    currencyOfCoverage: riskAssessment?.creditInsurers?.currencyOfCoverage,
                    value: riskAssessment?.creditInsurers?.value,
                    clauses: riskAssessment?.creditInsurers?.clauses,
                    evidence: riskAssessment?.creditInsurers?.evidence,
                    underwriter: riskAssessment?.creditInsurers?.underwriter,

                },
                localCreditStanding: {
                    applicant: riskAssessment?.localCreditStanding?.applicant,
                    advisingBank: riskAssessment?.localCreditStanding?.advisingBank,
                    beneficiary: riskAssessment?.localCreditStanding?.beneficiary,
                    confirmingBank: riskAssessment?.localCreditStanding?.confirmingBank,
                    issuingBank: riskAssessment?.localCreditStanding?.issuingBank,
                    negotiatingBank: riskAssessment?.localCreditStanding?.negotiatingBank,
                    reimbursingBank: riskAssessment?.localCreditStanding?.reimbursingBank,
                    secondBeneficiary: riskAssessment?.localCreditStanding?.secondBeneficiary,
                }
            })
        }
        // else if (riskAssessment.counterparties) {
        //     setpaymentBuyesrRisk({
        //         counterparties: {
        //             type: riskAssessment?.counterparties?.type,
        //             instrument: riskAssessment?.counterparties?.instrument,
        //             evidence: riskAssessment?.counterparties?.evidence
        //         },
        //     })
        // }
        // else if (riskAssessment.acceptableParty) {
        //     setpaymentBuyesrRisk({
        //         acceptableParty: {
        //             type: riskAssessment?.acceptableParty?.type,
        //             instrument: riskAssessment?.acceptableParty?.instrument,
        //             evidence: riskAssessment?.acceptableParty?.evidence
        //         },
        //     })
        // }
        // else if (riskAssessment.creditInsurers) {
        //     setpaymentBuyesrRisk({
        //         creditInsurers: {
        //             type: riskAssessment?.creditInsurers?.type,
        //             insurer: riskAssessment?.creditInsurers?.insurer,
        //             broker: riskAssessment?.creditInsurers?.broker,
        //             insuredParty: riskAssessment?.creditInsurers?.insuredParty,
        //             reInsurer: riskAssessment?.creditInsurers?.reInsurer,
        //             currencyOfCoverage: riskAssessment?.creditInsurers?.currencyOfCoverage,
        //             value: riskAssessment?.creditInsurers?.value,
        //             clauses: riskAssessment?.creditInsurers?.clauses,
        //             evidence: riskAssessment?.creditInsurers?.evidence,

        //         },
        //     })
        // }
        // else if (riskAssessment.localCreditStanding) {
        //     setpaymentBuyesrRisk({
        //         localCreditStanding: {
        //             applicant: riskAssessment?.localCreditStanding?.applicant,
        //             advisingBank: riskAssessment?.localCreditStanding?.advisingBank,
        //             beneficiary: riskAssessment?.localCreditStanding?.beneficiary,
        //             confirmingBank: riskAssessment?.localCreditStanding?.confirmingBank,
        //             issuingBank: riskAssessment?.localCreditStanding?.issuingBank,
        //             negotiatingBank: riskAssessment?.localCreditStanding?.negotiatingBank,
        //             reimbursingBank: riskAssessment?.localCreditStanding?.reimbursingBank,
        //             secondBeneficiary: riskAssessment?.localCreditStanding?.secondBeneficiary,
        //         }
        //     })
        // }

    }, [riskAssessment])

    const modalData = (e) => {
        if (e.name === 'internationalCreditStanding') {
            setpaymentBuyesrRisk({ ...paymentBuyesrRisk, internationalCreditStanding: e.value })
        }
    }

    const counterpartiesOptions = [
        'Guarantees'
    ]

    const acceptablePartyOptions = [
        'Assigned Receivables'
    ]

    // useEffect(() => {
    //     console.log('riskAssessment', riskAssessment)
    //     console.log('paymentBuyesrRisk', paymentBuyesrRisk)
    // }, [riskAssessment, paymentBuyesrRisk])


    const nextStep = () => {
        // if (paymentBuyesrRisk?.internationalCreditStanding || paymentBuyesrRisk?.counterparties || paymentBuyesrRisk?.acceptableParty || paymentBuyesrRisk?.creditInsurers || paymentBuyesrRisk?.localCreditStanding) {
        let body = {
            ...riskAssessment,
            ...paymentBuyesrRisk
            // internationalCreditStanding: paymentBuyesrRisk?.internationalCreditStanding,
            // counterparties: paymentBuyesrRisk?.counterparties,
            // acceptableParty: paymentBuyesrRisk?.acceptableParty,
            // creditInsurers: paymentBuyesrRisk?.creditInsurers,
            // localCreditStanding: paymentBuyesrRisk?.localCreditStanding,
        }
        console.log('body', body)
        dispatch(riskAssessmentAction(body))

        hendelNext()
        // } 
    }

    return (
        <>
            <div className='add-edit-product mt-5'>
                <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                    {paymentBuyesrRisk?.internationalCreditStanding && paymentBuyesrRisk?.counterparties && paymentBuyesrRisk?.acceptableParty && paymentBuyesrRisk?.creditInsurers && paymentBuyesrRisk?.localCreditStanding ? <FaRegCheckCircle className='text-success fs-2 me-3' /> : <PiWarningCircleLight className='text-danger fs-2 me-3' />}
                    {/* <img alt='icon' src={`../../../assets/img/about/${paymentBuyesrRisk?.internationalCreditStanding && paymentBuyesrRisk?.counterparties && paymentBuyesrRisk?.acceptableParty && paymentBuyesrRisk?.creditInsurers && paymentBuyesrRisk?.localCreditStanding ? "error-info-success.png" : "error-info.png"}`} className='me-3' /> */}
                    {paymentBuyesrRisk?.internationalCreditStanding && paymentBuyesrRisk?.counterparties && paymentBuyesrRisk?.acceptableParty && paymentBuyesrRisk?.creditInsurers && paymentBuyesrRisk?.localCreditStanding ?
                        <p className='success'>Risks are acceptable due to mitigants</p> :
                        <p className='error'>The below risks require your attention</p>
                    }
                </div>
                <div className='form'>
                    <div>
                        <h2 className='mb-3'>Payment/Buyer risk</h2>
                        {paymentBuyesrRisk?.internationalCreditStanding?.type && paymentBuyesrRisk?.counterparties?.type && paymentBuyesrRisk?.acceptableParty?.type && paymentBuyesrRisk?.creditInsurers?.type && paymentBuyesrRisk?.localCreditStanding?.applicant ? <p>No risk</p> :
                            <div>
                                <div className='risk-tab' onClick={() => { setInternationalCreditStandingModal(true); setSelected('internationalCreditStanding') }}>
                                    <h3>If international bank, use an on-lending model with a local bank with acceptable credit standing</h3>
                                    {paymentBuyesrRisk?.internationalCreditStanding?.type ? <FaRegCheckCircle className='text-success fs-2' /> : <FaRegCheckCircle className='text-body-tertiary fs-2' />}

                                </div>
                                <div className='risk-tab' onClick={() => { setCounterpartiesModal(true); setSelected('counterparties'); setOptions(counterpartiesOptions) }}>
                                    <h3>Take acceptable guarantees (from Central Banks, Corporates, other reliable counterparties)</h3>
                                    {paymentBuyesrRisk?.counterparties?.type ? <FaRegCheckCircle className='text-success fs-2' /> : <FaRegCheckCircle className='text-body-tertiary fs-2' />}

                                </div>
                                <div className='risk-tab' onClick={() => { setCounterpartiesModal(true); setSelected('acceptableParty'); setOptions(acceptablePartyOptions) }}>
                                    <h3>Transfer payment risk to another acceptable party (make loan self-liquidating)</h3>
                                    {paymentBuyesrRisk?.acceptableParty?.type ? <FaRegCheckCircle className='text-success fs-2' /> : <FaRegCheckCircle className='text-body-tertiary fs-2' />}

                                </div>
                                <div className='risk-tab' onClick={() => setCreditInsurersModal(true)}>
                                    <h3>Use credit insurance issued by acceptable credit insurers</h3>
                                    {paymentBuyesrRisk?.localCreditStanding?.applicant ? <FaRegCheckCircle className='text-success fs-2' /> : <FaRegCheckCircle className='text-body-tertiary fs-2' />}

                                </div>
                                <div className='risk-tab' onClick={() => setLocalCreditStandingModal(true)}>
                                    <h3>Use L/Cs issued by Banks with acceptable credit standing (e.g investment grade rated)</h3>
                                    {paymentBuyesrRisk?.counterparties?.type ? <FaRegCheckCircle className='text-success fs-2' /> : <FaRegCheckCircle className='text-body-tertiary fs-2' />}

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
            {internationalCreditStandingModal && <InternationalCreditStandingModal show={internationalCreditStandingModal} onHide={() => setInternationalCreditStandingModal(false)} getModalData={(e) => modalData(e)} type={selected} data={paymentBuyesrRisk?.internationalCreditStanding} from='PaymentBuyer' />}
            {counterpartiesModal && <CounterpartiesModal show={counterpartiesModal} onHide={() => setCounterpartiesModal(false)} getModalData={(e) => { console.log('e', e); getData(e) }} type={selected} modalOption={options} data={{ acceptableParty: paymentBuyesrRisk?.acceptableParty, counterparties: paymentBuyesrRisk.counterparties }} />}
            {creditInsurersModal && <CreditInsurersModal show={creditInsurersModal} onHide={() => setCreditInsurersModal(false)} getModalData={(e) => setpaymentBuyesrRisk({ ...paymentBuyesrRisk, creditInsurers: e })} data={paymentBuyesrRisk?.creditInsurers} />}
            {localCreditStandingModal && <LocalCreditStandingModal show={localCreditStandingModal} onHide={() => setLocalCreditStandingModal(false)} getModalData={(e) => setpaymentBuyesrRisk({ ...paymentBuyesrRisk, localCreditStanding: e })} data={paymentBuyesrRisk?.localCreditStanding} />}
        </>
    )
}

export default PaymentBuyerRisk