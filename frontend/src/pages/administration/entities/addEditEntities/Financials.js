import React, { useEffect, useState } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { companydataAction } from '../../../../redux/actions/companydataAction';
import { OptionalSpan } from '../../../transactions/Helpers/OptionalTags';


const Financials = ({ handleNext, handleBack }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)
    // const id = queryParams.get("id")
    const isView = location.state[1]?.isView

    const companyData = useSelector((state) => state.companydata.companydata)

    const [financials, setFinancials] = useState({
        _id: '',
        netProfitMargin: '',
        ROE: '',
        ROA: '',
        operatingCashFlow: '',
        debtServiceCoverageRatio: '',
        interestCoverageRatio: '',
        netGearingRatio: '',
        totalDebtToTotalCapital: '',
        currentRatio: '',
        quickRatio: '',
        cashFlowBeforeFinancingSales: ''
    })
    const [formErrors, setFormErrors] = useState()

    useEffect(() => {
        if (companyData && companyData.financial) {
            setFinancials({
                _id: companyData.financial?._id,
                netProfitMargin: companyData.financial?.netProfitMargin,
                ROE: companyData.financial?.ROE,
                ROA: companyData.financial?.ROA,
                operatingCashFlow: companyData.financial?.operatingCashFlow,
                debtServiceCoverageRatio: companyData.financial?.debtServiceCoverageRatio,
                interestCoverageRatio: companyData.financial?.interestCoverageRatio,
                netGearingRatio: companyData.financial?.netGearingRatio,
                totalDebtToTotalCapital: companyData.financial?.totalDebtToTotalCapital,
                currentRatio: companyData.financial?.currentRatio,
                quickRatio: companyData.financial?.quickRatio,
                cashFlowBeforeFinancingSales: companyData.financial?.cashFlowBeforeFinancingSales
            })
        }
    }, [companyData])


    const handleChange = (e, name) => {
        let numberReg = /\b((100)|[1-9]\d?)\b/
        if (name === "netProfitMargin" || name === "ROE" || name === "ROA" || name === "operatingCashFlow" || name === "debtServiceCoverageRatio" || name === "interestCoverageRatio" || name === "netGearingRatio" || name === "totalDebtToTotalCapital" || name === "currentRatio" || name === "quickRatio" || name === "cashFlowBeforeFinancingSales") {
            if (e.target.value === '' || numberReg.test(e.target.value)) {
                if (e.target.value) {
                    var t = e.target.value;
                    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) < 100 ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3) : t.substr(0, t.indexOf("."))) : t
                }
                setFinancials({ ...financials, [name]: e.target.value })
            }
        }
    }

    const validation = () => {
        let flag = false
        const error = {
            Biling: {},
            Shipping: {},
        };
        // if (!financials.netProfitMargin) {
        //     error.netProfitMargin = "Please enter net profit margin!"
        //     flag = true
        // }
        // if (!financials.ROE) {
        //     error.ROE = "Please enter roe!"
        //     flag = true
        // }
        // if (!financials.ROA) {
        //     error.ROA = "Please enter roa!"
        //     flag = true
        // }
        // if (!financials.operatingCashFlow) {
        //     error.operatingCashFlow = "Please enter operating cash flow!"
        //     flag = true
        // }
        // if (!financials.debtServiceCoverageRatio) {
        //     error.debtServiceCoverageRatio = "Please enter debt service coverage ratio!"
        //     flag = true
        // }
        // if (!financials.interestCoverageRatio) {
        //     error.interestCoverageRatio = "Please enter interest coverage ratio!"
        //     flag = true
        // }
        // if (!financials.netGearingRatio) {
        //     error.netGearingRatio = "Please enter net gearing ratio!"
        //     flag = true
        // }
        // if (!financials.totalDebtToTotalCapital) {
        //     error.totalDebtToTotalCapital = "Please enter total debt to total capital!"
        //     flag = true
        // }
        // if (!financials.currentRatio) {
        //     error.currentRatio = "Please enter current ratio!"
        //     flag = true
        // }
        // if (!financials.quickRatio) {
        //     error.quickRatio = "Please enter quick ratio!"
        //     flag = true
        // }
        // if (!financials.cashFlowBeforeFinancingSales) {
        //     error.cashFlowBeforeFinancingSales = "Please enter cash flow before financing sales!"
        //     flag = true
        // }
        setFormErrors(error);
        return flag
    }

    const next = () => {
        if (validation()) {
            return;
        }
        const body = {
            ...companyData,
            financial: financials
        }
        dispatch(companydataAction(body))
        handleNext()
    }

    return (
        <>
            <div className='add-edit-product'>
                <div className='form'>
                    <h4 className='fw-bold fs-5 mb-3 title-admin'>Financials</h4>
                    <div>
                        <Row className='mt-4'>
                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Net Profit Margin <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='netProfitMargin'
                                        value={financials.netProfitMargin}
                                        onChange={(e) => handleChange(e, "netProfitMargin")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {formErrors && formErrors?.netProfitMargin && <span style={{ color: 'red' }}>{formErrors.netProfitMargin}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>ROE <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.ROE}
                                        onChange={(e) => handleChange(e, "ROE")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.ROE && <span style={{ color: 'red' }}>{formErrors.ROE}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>ROA <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.ROA}
                                        onChange={(e) => handleChange(e, "ROA")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.ROA && <span style={{ color: 'red' }}>{formErrors.ROA}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Operating cash flow <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.operatingCashFlow}
                                        onChange={(e) => handleChange(e, "operatingCashFlow")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.operatingCashFlow && <span style={{ color: 'red' }}>{formErrors.operatingCashFlow}</span>}
                            </Form.Group>
                        </Row>

                        <Row className="mt-4" class>
                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Debt service coverage ratio <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.debtServiceCoverageRatio}
                                        onChange={(e) => handleChange(e, "debtServiceCoverageRatio")}
                                        disabled={isView}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.debtServiceCoverageRatio && <span style={{ color: 'red' }}>{formErrors.debtServiceCoverageRatio}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Interest coverage ratio <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.interestCoverageRatio}
                                        onChange={(e) => handleChange(e, "interestCoverageRatio")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.interestCoverageRatio && <span style={{ color: 'red' }}>{formErrors.interestCoverageRatio}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Net gearing ratio <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.netGearingRatio}
                                        onChange={(e) => handleChange(e, "netGearingRatio")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.netGearingRatio && <span style={{ color: 'red' }}>{formErrors.netGearingRatio}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Total debt to total capital <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.totalDebtToTotalCapital}
                                        onChange={(e) => handleChange(e, "totalDebtToTotalCapital")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.totalDebtToTotalCapital && <span style={{ color: 'red' }}>{formErrors.totalDebtToTotalCapital}</span>}
                            </Form.Group>
                        </Row>

                        <Row className='mt-4'>
                            <Form.Group as={Col} lg={4} controlId="formGridZip">
                                <Form.Label>Current ratio <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.currentRatio}
                                        onChange={(e) => handleChange(e, "currentRatio")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.currentRatio && <span style={{ color: 'red' }}>{formErrors.currentRatio}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={4} controlId="formGridZip">
                                <Form.Label>Quick ratio <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.quickRatio}
                                        onChange={(e) => handleChange(e, "quickRatio")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.quickRatio && <span style={{ color: 'red' }}>{formErrors.quickRatio}</span>}
                            </Form.Group>

                            <Form.Group as={Col} lg={4} controlId="formGridZip">
                                <Form.Label>Cash flow before financing sales <OptionalSpan /></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={financials.cashFlowBeforeFinancingSales}
                                        onChange={(e) => handleChange(e, "cashFlowBeforeFinancingSales")}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                {formErrors && formErrors?.cashFlowBeforeFinancingSales && <span style={{ color: 'red' }}>{formErrors.cashFlowBeforeFinancingSales}</span>}
                            </Form.Group>
                        </Row>
                    </div>
                </div>
                <div className='footer_'>
                    <button onClick={() => { handleBack() }} className="footer_cancel_btn">Back</button>
                    <button onClick={() => { next() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
        </>
    )
}

export default Financials