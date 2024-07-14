import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Details from './Details';
import Ratingschemes from './Ratingschemes';
import { Steps, Button, Typography } from 'antd';
import Box from '@material-ui/core/Box';

const { Step } = Steps;
const { Title, Paragraph } = Typography;

const steps = ['Details', 'Rating agencies'];

const RatingAgenciesEdit = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState('Details');
    const [details, setDetails] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className='add-edit-product'>
            <Box sx={{ width: '100%' }}>
                <Steps className='container mb-5' current={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index} title={label} />
                    ))}
                </Steps>
                <div className='steps-content'>
                    {activeStep === steps.length ? (
                        <>
                            <Title level={3} style={{ marginTop: 16 }}>
                                All steps completed - you&apos;re finished
                            </Title>
                            <Button onClick={handleReset} style={{ marginTop: 16 }}>
                                Reset
                            </Button>
                        </>
                    ) : (
                        <>
                            {activeStep === 0 && <Details hendelNext={handleNext} getData={setDetails} />}
                            {activeStep === 1 && <Ratingschemes hendelNext={handleNext} hendelCancel={handleBack} detailData={details} />}
                        </>
                    )}
                </div>
                {/* <div className='steps-action'>
                    {activeStep > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={handleBack}>
                            Previous
                        </Button>
                    )}
                    {activeStep < steps.length - 1 && (
                        <Button type='primary' onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </div> */}
            </Box>
        </div>
    );
};

export default RatingAgenciesEdit;
