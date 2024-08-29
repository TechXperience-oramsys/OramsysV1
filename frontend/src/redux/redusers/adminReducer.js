import {
  GET_ADMIN_DATA,
  GET_ADMIN_DATA_ERROR,
  GET_ADMIN_DATA_LOADING,
  GET_ADMIN_BY_ID,
  GET_ADMIN_BY_ID_ERROR,
  ADMIN_UPDATE,
  ADMIN_UPDATE_ERROR,
} from "../types";

const initialState = {
  getAdminDataLoading: false,
  getAdminData: [],
  getAdminDataError: [],
  getAdminId: [],
  getAdminIdError: [],
  adminUpdate: [],
  adminUpdateError: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_DATA_LOADING:
      return {
        ...state,
        getAdminDataLoading: action.payload,
      };

    case GET_ADMIN_DATA:
      return {
        ...state,
        getAdminData: action.payload,
      };

    case GET_ADMIN_DATA_ERROR:
      return {
        ...state,
        getAdminDataError: action.payload,
      };

    case GET_ADMIN_BY_ID:
      return {
        ...state,
        getAdminId: action.payload,
      };

    case GET_ADMIN_BY_ID_ERROR:
      return {
        ...state,
        getAdminIdError: action.payload,
      };

    case ADMIN_UPDATE:
      return {
        ...state,
        adminUpdate: action.payload,
      };

    case ADMIN_UPDATE_ERROR:
      return {
        ...state,
        adminUpdateError: action.payload,
      };
    default:
      return state;
  }
};
