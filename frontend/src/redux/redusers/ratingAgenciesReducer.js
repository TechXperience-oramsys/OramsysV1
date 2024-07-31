import { RATINGAGENCIES, RATINGAGENCIES_ADD, RATINGAGENCIES_ADD_ERROR, RATINGAGENCIES_ERROR, RATINGAGENCIES_GET_BY_ID, RATINGAGENCIES_GET_BY_ID_ERROR, RATINGAGENCIES_LOADING, RATINGAGENCY_UPDATE, RATINGAGENCY_UPDATE_ERROR } from '../types';


const initialState = {
    ratingAgenciesLoading: false,
    ratingAgencies: [],
    ratingAgenciesError: [],
    ratingAgencyAdd: [],
    ratingAgencyGetId: [],
    ratingAgencyGetIdError: [],
    ratingAgencyUpdateError: [],
    ratingAgencyUpdate: [],
};
export const ratingAgenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case RATINGAGENCIES_LOADING:
            return {
                ...state,
                ratingAgenciesLoading: action.payload,
            };

        case RATINGAGENCIES:
            return {
                ...state,
                ratingAgencies: action.payload,
            };

        case RATINGAGENCIES_ERROR:
            return {
                ...state,
                ratingAgenciesError: action.payload,
            };

        case RATINGAGENCIES_ADD:
            return {
                ...state,
                ratingAgencyAdd: action.payload,
            };

        case RATINGAGENCIES_ADD_ERROR:
            return {
                ...state,
                ratingAgencyAddError: action.payload,
            };

        case RATINGAGENCIES_GET_BY_ID:
            return {
                ...state,
                ratingAgencyGetId: action.payload,
            };

        case RATINGAGENCIES_GET_BY_ID_ERROR:
            return {
                ...state,
                ratingAgencyGetIdError: action.payload,
            };

        case RATINGAGENCY_UPDATE:
            return {
                ...state,
                ratingAgencyUpdate: action.payload,
            };

        case RATINGAGENCY_UPDATE_ERROR:
            return {
                ...state,
                ratingAgencyUpdateError: action.payload,
            };


        default:
            return state;
    }
}
