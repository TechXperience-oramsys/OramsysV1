import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
import ExchangeRateRisk from './ExchangeRateRisk';
import LoanPurposeRisk from './LoanPurposeRisk';
import MarketPriceRisk from './MarketPriceRisk';
import PaymentBuyerRisk from './PaymentBuyerRisk';
import PerformanceRisk from './PerformanceRisk';

const steps = ['Loan purpose risk', 'Exchange rate risk', 'Payment/Buyer risk', 'Performance risk', 'Market/Price risk'];
const RiskAssessment = () => {

    // const navigate = useNavigate()
    // const [page, setPage] = useState('Details')
    // const [details, setDetails] = useState({})
    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)
    const [activeStep, setActiveStep] = useState(0);

    // const isStepOptional = (step) => {
    //     return step === 1;
    // };

    const handleNext = () => {
        console.log('Data ========= >', riskAssessment)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <>
            <div className='add-edit-product'>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {activeStep + 1 === 1 && <LoanPurposeRisk hendelNext={handleNext} />}
                            {activeStep + 1 === 2 && <ExchangeRateRisk hendelNext={handleNext} hendelCancel={handleBack} />}
                            {activeStep + 1 === 3 && <PaymentBuyerRisk hendelNext={handleNext} hendelCancel={handleBack} />}
                            {activeStep + 1 === 4 && <PerformanceRisk hendelNext={handleNext} hendelCancel={handleBack} />}
                            {activeStep + 1 === 5 && <MarketPriceRisk hendelNext={handleNext} hendelCancel={handleBack} />}
                        </React.Fragment>
                    )}
                </Box>
            </div>
        </>
    )
}

export default RiskAssessment