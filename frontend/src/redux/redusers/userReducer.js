import { GET_USER_DATA, GET_USER_DATA_ERROR, GET_USER_DATA_LOADING, USER_GET_BY_ID, USER_GET_BY_ID_ERROR, USER_UPDATE, USER_UPDATE_ERROR } from '../types';


const initialState = {
    getUserDataLoadimg: false,
    getUserData: [],
    getUserDataError: [],
    userGetId: [],
    userGetIdError: [],
    userUpdate: [],
    userUpdateError: [],
};
export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USER_DATA_LOADING:
            return {
                ...state,
                getUserDataLoadimg: action.payload,
            };

        case GET_USER_DATA:
            return {
                ...state,
                getUserData: action.payload,
            };

        case GET_USER_DATA_ERROR:
            return {
                ...state,
                getUserDataError: action.payload,
            };

        case USER_GET_BY_ID:
            return {
                ...state,
                userGetId: action.payload,
            };

        case USER_GET_BY_ID_ERROR:
            return {
                ...state,
                userGetIdError: action.payload,
            };

        case USER_UPDATE:
            return {
                ...state,
                userUpdate: action.payload,
            };

        case USER_UPDATE_ERROR:
            return {
                ...state,
                userUpdateError: action.payload,
            };

        default:
            return state;
    }

}
