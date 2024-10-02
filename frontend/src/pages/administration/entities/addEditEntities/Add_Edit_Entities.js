import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Steps, Button, Typography } from 'antd';
import Details from './Details'
import Financials from './Financials'
import Licences from './Licences'
import Ratings from './Ratings'
import Warehouse from './Warehouse'
import Roles from './Roles'
import {Box} from '@mui/material';
import IndividualDetail from '../individual/Details'
import IndividualAddress from '../individual/Address'
import { useDispatch } from 'react-redux'
import { entityGetByIdAction } from '../../../../redux/actions/entityAction'
import { useSelector } from 'react-redux'
import { companydataAction } from '../../../../redux/actions/companydataAction'
import { FaCheckCircle,  FaMoneyCheckAlt, FaThLarge, FaWarehouse } from 'react-icons/fa';
import { FaSheetPlastic } from "react-icons/fa6";
import { FcRatings } from "react-icons/fc";



const { Step } = Steps;
const { Title } = Typography;

const Add_Edit_Entities = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const entityType = location.state?.length > 0 ? location.state[0].type : null;
    let steps = entityType === "Company"
  ? ['Details', 'Financials', 'Licences', 'Ratings', 'Warehouse', 'Roles']
  : ['Details', "Address"];
    const [activeStep, setActiveStep] = React.useState(0);
    const [individualDetailData, setIndividualDetailData] = React.useState({});
    const [common, setCommon] = React.useState({});

    const entityGetById = useSelector((state) => state.entityData.getEntityById)

    useEffect(() => {
        if (id) {
            dispatch(entityGetByIdAction(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        console.log('entityType', entityType)
    }, [entityType])


    useEffect(() => {
        if (entityGetById && entityGetById.data && entityGetById.status === 200) {
            const address = entityGetById.data.addresses.map((ele) => {
                return {
                    _id: ele?._id,
                    type: ele?.type,
                    flatNumber: ele?.flatNumber,
                    addressLine1: ele?.addressLine1,
                    addressLine2: ele?.addressLine2,
                    addressLine3: ele?.addressLine3,
                    postcode: ele?.postcode,
                    billingCountryCode: ele?.billingCountryCode,
                    shippingCountryCode: ele?.shippingCountryCode,
                    state: ele?.state,
                    city: ele?.city,
                    country: ele?.country?._id,
                    mobile: ele?.mobile,
                    telephone: ele?.telephone,
                    fax: ele?.fax,
                    email: ele?.email,
                }
            })

            const details = {
                _id: entityGetById?.data?.details?._id,
                name: entityGetById?.data?.details?.name,
                country: entityGetById?.data?.details?.country?._id,
                registrationNumber: entityGetById?.data?.details?.registrationNumber,
                dateOfIncorporation: entityGetById?.data?.details?.dateOfIncorporation,
                sector: entityGetById?.data?.details?.sector,
                subSector: entityGetById?.data?.details?.subSector,
                mainActivity: entityGetById?.data?.details?.mainActivity,
            }

            const financialData = {
                _id: entityGetById?.data?.financial?._id,
                netProfitMargin: entityGetById?.data?.financial?.netProfitMargin,
                ROE: entityGetById?.data?.financial?.ROE,
                ROA: entityGetById?.data?.financial?.ROA,
                operatingCashFlow: entityGetById?.data?.financial?.operatingCashFlow,
                debtServiceCoverageRatio: entityGetById?.data?.financial?.debtServiceCoverageRatio,
                interestCoverageRatio: entityGetById?.data?.financial?.interestCoverageRatio,
                netGearingRatio: entityGetById?.data?.financial?.netGearingRatio,
                totalDebtToTotalCapital: entityGetById?.data?.financial?.totalDebtToTotalCapital,
                currentRatio: entityGetById?.data?.financial?.currentRatio,
                quickRatio: entityGetById?.data?.financial?.quickRatio,
                cashFlowBeforeFinancingSales: entityGetById?.data?.financial?.cashFlowBeforeFinancingSales,
            }

            const licencesData = entityGetById.data.licenses.map((ele) => {
                return {
                    _id: ele._id,
                    type: ele.type,
                    number: ele.number,
                    authority: ele.authority,
                    country: ele.country,
                    dateofrating: ele.dateOfRating,
                    expirydate: ele.expiryDate,
                    evidence: ele.evidence,
                }
            })

            const ratingData = entityGetById.data.ratings.map((ele) => {
                return {
                    _id: ele._id,
                    agency: ele.agency,
                    rating: ele.rating,
                    dateOfRating: ele.dateOfRating,
                    expiryDate: ele.expiryDate,
                }
            })

            const warehouseData = entityGetById.data.warehouses.map((ele) => {
                return {
                    _id: ele._id,
                    nature: ele.nature,
                    name: ele.name,
                    type: ele.type,
                    city: ele.city,
                    country: ele.country,
                    governingLaw: ele.governingLaw,
                }
            })

            const roleData = entityGetById.data.roles.map((ele) => {
                return {
                    _id: ele._id,
                    roles: ele.roleId?._id,
                    justification: ele.justification
                }
            })

            let companydata = {
                email: entityGetById.data.email,
                password: entityGetById.data.password,
                type: entityGetById.data.type,
                detail: details,
                addresses: address,
                financial: financialData,
                licenses: licencesData,
                ratings: ratingData,
                warehouses: warehouseData,
                roles: roleData,
                isLicense: entityGetById.data?.isLicense || false,
                isRatings: entityGetById.data?.isRatings || false,
                isWarehouse: entityGetById.data?.isWarehouse || false,
            }
            dispatch(companydataAction(companydata))
        }
    }, [entityGetById, dispatch])

    useEffect(() => {
        console.log('entityType', entityType)
    }, [entityType])


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const getIndividualDetailData = (e) => {
        setIndividualDetailData(e)
    }

    const getStepIcon = (label) => {
        switch (label) {
            case 'Details':
                return <FaCheckCircle />;
            case 'Financials':
                return <FaMoneyCheckAlt />;
            case 'Licences':
                return <FaSheetPlastic />;
            case 'Ratings':
                return <FcRatings />;
            case 'Warehouse':
                return <FaWarehouse />;
            case 'Roles':
                return <FaThLarge />;
            default:
                return null;
        }
    };
    return (
        <>

            <div className='add-edit-product'>
                <Box sx={{ width: '100%' }}>
                    <Steps  className='container mb-5' current={activeStep} direction="horizontal">
                        {steps.map((label, index) => (
                            <Step key={label} title={label} icon={getStepIcon(label)} />
                        ))}
                    </Steps>
                    {activeStep === steps.length ? (
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <Title level={4}>All steps completed - you&apos;re finished</Title>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div style={{ marginTop: 20 }}>
                            {entityType === "Company" ? (
                                <>
                                    {activeStep === 0 && <Details handleNext={handleNext} entityType="Company" />}
                                    {activeStep === 1 && <Financials handleNext={handleNext} handleBack={handleBack} />}
                                    {activeStep === 2 && <Licences handleNext={handleNext} handleBack={handleBack} />}
                                    {activeStep === 3 && <Ratings handleNext={handleNext} handleBack={handleBack} />}
                                    {activeStep === 4 && <Warehouse handleNext={handleNext} handleBack={handleBack} />}
                                    {activeStep === 5 && <Roles handleNext={handleNext} handleBack={handleBack} />}
                                </>
                            ) : (
                                <>
                                    {activeStep === 0 && (  <IndividualDetail handleNext={handleNext} getDetailData={getIndividualDetailData} getCommonData={setCommon} entityType="Individual"
                                        />
                                    )}
                                    {activeStep === 1 && (
                                        <IndividualAddress
                                            handleNext={handleNext}
                                            handleBack={handleBack}
                                            sendDetailData={individualDetailData}
                                            common={common}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    </Box>
            </div>
        </>
    )
}

export default Add_Edit_Entities