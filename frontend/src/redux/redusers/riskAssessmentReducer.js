import { ADD_RISK_ASSESSMENT, ADD_RISK_ASSESSMENT_ERROR, GET_RISK_ASSESSMENT, GET_RISK_ASSESSMENT_ERROR, RISK_ASSESSMENT_DATA } from '../types';

const initialState = {
    riskAssessment: null,

    addRiskAssessment: [],
    addRiskAssessmentError: [],

    getRiskAssessment: [],
    getRiskAssessmentError: [],

}

export const riskAssessmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case RISK_ASSESSMENT_DATA:
            return {
                ...state,
                riskAssessment: action.payload,
            };

        case ADD_RISK_ASSESSMENT:
            return {
                ...state,
                addRiskAssessment: action.payload,
            };

        case ADD_RISK_ASSESSMENT_ERROR:
            return {
                ...state,
                addRiskAssessmentError: action.payload,
            };
        case GET_RISK_ASSESSMENT:
            return {
                ...state,
                getRiskAssessment: action.payload,
            };

        case GET_RISK_ASSESSMENT_ERROR:
            return {
                ...state,
                getRiskAssessmentError: action.payload,
            };
        default:
            return state
    }
}
