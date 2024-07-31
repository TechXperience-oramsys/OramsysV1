import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { ADD_RISK_ASSESSMENT, ADD_RISK_ASSESSMENT_ERROR, ADD_RISK_ASSESSMENT_LOADING, GET_RISK_ASSESSMENT, GET_RISK_ASSESSMENT_ERROR, GET_RISK_ASSESSMENT_LOADING, IS_LOADING, RISK_ASSESSMENT_DATA } from '../types';

export const riskAssessmentAction = (value) => (dispatch) => {
    dispatch({
        type: RISK_ASSESSMENT_DATA,
        payload: value,
    });
}

export const addRiskAssessment = (body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_RISK_ASSESSMENT_LOADING,
            payload: true
        })
        await ApiPost(`riskAssessment/add`, body)
            .then((res) => {
                dispatch({
                    type: ADD_RISK_ASSESSMENT,
                    payload: res
                })
                dispatch({
                    type: RISK_ASSESSMENT_DATA,
                    payload: null,
                });
            })
            .catch((error) => {
                console.log(error.response.data);
            })
        dispatch({
            type: ADD_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_RISK_ASSESSMENT_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}


export const getRiskAssessment = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_RISK_ASSESSMENT_LOADING,
            payload: true
        })
        await ApiGet(`riskAssessment/getByTransactionId/${id}`)
            .then((res) => {
                dispatch({
                    type: GET_RISK_ASSESSMENT,
                    payload: res
                })
                if (res.data) {
                    let body = {
                        ...res.data,
                        priceHedge: {
                            ...res.data.priceHedge,
                            counterparty: res.data.priceHedge?.counterparty ? res.data.priceHedge?.counterparty?._id : null,
                        },
                        acceptableCMA: { ...res.data.acceptableCMA, party: res.data?.acceptableCMA ? res.data.acceptableCMA?.party?._id : null },
                        creditInsurers: {
                            ...res.data.creditInsurers,
                            broker: res.data.creditInsurers?.broker ? res.data.creditInsurers?.broker?._id : null,
                            insuredParty: res.data.creditInsurers?.insuredParty ? res.data.creditInsurers?.insuredParty?._id : null,
                            insurer: res.data.creditInsurers?.insurer ? res.data.creditInsurers?.insurer?._id : null,
                            reInsurer: res.data.creditInsurers?.reInsurer ? res.data.creditInsurers?.reInsurer?._id : null,
                            underwriter: res.data.creditInsurers?.underwriter ? res.data.creditInsurers?.underwriter?._id : null,
                        },
                        currencyHedge: {
                            ...res.data.currencyHedge,
                            counterparty: res.data.currencyHedge?.counterparty ? res.data.currencyHedge?.counterparty?._id : null
                        },
                        goodCreditStanding: {
                            ...res.data.goodCreditStanding,
                            party: res.data.goodCreditStanding?.party ? res.data.goodCreditStanding?.party?._id : null
                        },
                        internationalCreditStanding: {
                            ...res.data?.internationalCreditStanding,
                            party: res.data.internationalCreditStanding ? res.data.internationalCreditStanding?.party?._id : null
                        },
                        localCreditStanding: {
                            ...res.data.localCreditStanding,
                            advisingBank: res.data.localCreditStanding?.advisingBank ? res.data.localCreditStanding?.advisingBank?._id : null,
                            applicant: res.data.localCreditStanding?.applicant ? res.data.localCreditStanding?.applicant?._id : null,
                            beneficiary: res.data.localCreditStanding?.beneficiary ? res.data.localCreditStanding?.beneficiary?._id : null,
                            conformingBank: res.data.localCreditStanding?.conformingBank ? res.data.localCreditStanding?.conformingBank?._id : null,
                            issuingBank: res.data.localCreditStanding?.issuingBank ? res.data.localCreditStanding?.issuingBank?._id : null,
                            negotiatingBank: res.data.localCreditStanding?.negotiatingBank ? res.data.localCreditStanding?.negotiatingBank?._id : null,
                            reimbursingBank: res.data.localCreditStanding?.reimbursingBank ? res.data.localCreditStanding?.reimbursingBank?._id : null,
                            secondBeneficiary: res.data.localCreditStanding?.secondBeneficiary ? res.data.localCreditStanding?.secondBeneficiary?._id : null,
                        },
                    }
                    dispatch({
                        type: RISK_ASSESSMENT_DATA,
                        payload: body,
                    });
                } else {
                    dispatch({
                        type: RISK_ASSESSMENT_DATA,
                        payload: null,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_RISK_ASSESSMENT_ERROR,
            payload: err
        })

        dispatch({
            type: GET_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
