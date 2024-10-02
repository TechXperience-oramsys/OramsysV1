import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoanPurposeRiskModal from '../../../component/Modal/LoanPurposeRiskModal'
import { getRiskAssessment, riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'
import { getTransactionById } from '../../../redux/actions/transactionDataAction'

const LoanPurposeRisk = ({ hendelNext }) => {

    const navigate = useNavigate()
    const [showModal, setshowModal] = useState(false)
    const [setCancel] = useState(false)
    const [selected, setSelected] = useState('')

    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')
    const [data, setData] = useState({
        justification: null
    })
    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)

    const dispatch = useDispatch()

    const getData = (e) => {
        if (e.name === 'justification') {
            setData({
                ...data,
                justification: e.value
            })
        }
    }

    useEffect(() => {
        console.log('riskAssessment === 22', riskAssessment)
        if (riskAssessment) {
            setData({
                ...data,
                justification: riskAssessment?.justification
            })
        } else {
            // if (!cancel) {
            dispatch(getRiskAssessment(id))
            dispatch(getTransactionById(id))
            // }
        }
    }, [riskAssessment, id, data, dispatch])

    const nextStep = () => {
        let body = {
            ...riskAssessment,
            ...data
            // justification: data.justification
        }
        dispatch(riskAssessmentAction(body))
        // if (data.justification) {          
        hendelNext()
        // }
    }
    return (
        <>
            <div className='add-edit-product'>
                <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                    <img alt='icon' src={`../../../assets/img/about/${data.justification ? "error-info-success.png" : "error-info.png"}`} className='me-3' />
                    {data.justification ?
                        <p className='success'>Risks are acceptable due to mitigants</p> :
                        <p className='error'>The below risks require your attention</p>
                    }
                </div>
                <div className='form'>
                    <h2 className='mb-3'>Loan purpose risk</h2>
                    {
                        data.justification ?
                            <p>No risk</p> :
                            <div className='risk-tab' onClick={() => { setshowModal(true); setSelected('justification') }}>
                                <h3>No mitigant possible. Provide a justification</h3>
                                <img alt='icon' src={`../../../assets/img/about/${data.justification ? "correct-success.png" : "correct (1).png"}`} />
                            </div>
                    }
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => { dispatch(riskAssessmentAction(null)); setCancel(true); navigate('/transactions') }} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { nextStep() }} className='footer_next_btn'> Next</button>
            </div>

            {showModal && <LoanPurposeRiskModal show={showModal} onHide={() => setshowModal(false)} getModalData={(e) => getData(e)} types={selected} />}
        </>
    )
}

export default LoanPurposeRisk