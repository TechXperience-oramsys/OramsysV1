import { ApiGet } from "../../helper/API/ApiData";
import {
  // GET_ADMIN_BY_ID,
  GET_ADMIN_BY_ID_ERROR,
  GET_ADMIN_BY_ID_LOADING,
  GET_ADMIN_DATA,
  GET_ADMIN_DATA_ERROR,
  GET_ADMIN_DATA_LOADING,
  IS_LOADING,
} from "../types";

export const adminGetAction = () => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    dispatch({
      type: GET_ADMIN_DATA_LOADING,
      payload: true,
    });

    ApiGet("admin/getAdmins")
      .then((res) => {
        dispatch({
          type: GET_ADMIN_DATA,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch({
      type: GET_ADMIN_DATA_LOADING,
      payload: false,
    });
    dispatch({
      type: IS_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_DATA_ERROR,
      payload: error,
    });

    dispatch({
      type: GET_ADMIN_DATA_LOADING,
      payload: false,
    });

    dispatch({
      type: IS_LOADING,
      payload: false,
    });
  }
};

export const adminGetByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    dispatch({
      type: GET_ADMIN_DATA_LOADING,
      payload: true,
    });
    await ApiGet(`admin/get-admin-by/${id}`)
      .then((res) => {
        dispatch({
          type: GET_ADMIN_DATA,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch({
      type: GET_ADMIN_BY_ID_LOADING,
      payload: false,
    });

    dispatch({
      type: IS_LOADING,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: GET_ADMIN_BY_ID_ERROR,
      payload: err,
    });

    dispatch({
      type: GET_ADMIN_DATA_LOADING,
      payload: false,
    });

    dispatch({
      type: IS_LOADING,
      payload: false,
    });
  }
};
