import { COUNTRIES, COUNTRIES_ERROR, COUNTRIES_LOADING } from "../types";

const initialState = {
    countryLoading: false,
    country: [],
    countryError: []
};

export const countrieReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRIES_LOADING:
            return {
                ...state,
                countryLoading: action.payload,
            };

        case COUNTRIES:
            return {
                ...state,
                country: action.payload,
            };

        case COUNTRIES_ERROR:
            return {
                ...state,
                countryError: action.payload,
            };

        default:
            return state;
    }
};
