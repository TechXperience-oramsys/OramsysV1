import { SECTOR, SECTOR_ERROR, SECTOR_LOADING, } from "../types";

const initialState = {
    sectorLoading: false,
    sector: [],
    sectorError: []
};

export const sectorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SECTOR_LOADING:
            return {
                ...state,
                sectorLoading: action.payload,
            };

        case SECTOR:
            return {
                ...state,
                sector: action.payload,
            };

        case SECTOR_ERROR:
            return {
                ...state,
                sectorError: action.payload,
            };

        default:
            return state;
    }
};
