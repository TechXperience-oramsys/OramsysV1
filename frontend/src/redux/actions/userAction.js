import { ApiGet, ApiPost } from '../../helper/API/ApiData'
import { GET_USER_DATA, GET_USER_DATA_ERROR, GET_USER_DATA_LOADING, IS_LOADING, USER_GET_BY_ID, USER_GET_BY_ID_ERROR, USER_UPDATE, USER_UPDATE_ERROR } from '../types'

export const userGetAction = () => async (dispatch) => {
    // Set initial loading states
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: GET_USER_DATA_LOADING, payload: true });
  
    try {
      // Get user ID and role from local storage
      const id = localStorage.getItem('userId');
      const role = localStorage.getItem('roles');
  
      // Fetch user data from the API
      const response = await ApiGet(`user/get?id=${id}&role=${role}`);
      
      // Dispatch the user data to the store
      dispatch({ type: GET_USER_DATA, payload: response });
      
    } catch (error) {
      // Dispatch the error to the store
      console.error('Error fetching user data:', error);
      dispatch({ type: GET_USER_DATA_ERROR, payload: error });
  
    } finally {
      // Reset loading states
      dispatch({ type: GET_USER_DATA_LOADING, payload: false });
      dispatch({ type: IS_LOADING, payload: false });
    }
  };


export const userGetByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_USER_DATA_LOADING,
            payload: true
        })
        await ApiGet(`user/getById/${id}`)
            .then((res) => {
                dispatch({
                    type: USER_GET_BY_ID,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_USER_DATA_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: USER_GET_BY_ID_ERROR,
            payload: err
        })

        dispatch({
            type: GET_USER_DATA_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const userUpdateAction = (userUpdate, id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_USER_DATA_LOADING,
            payload: true
        })

        await ApiPost(`user/edit/${id}`, userUpdate)
            .then((res) => {
                dispatch({
                    type: USER_UPDATE,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_USER_DATA_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: USER_UPDATE_ERROR,
            payload: err
        })

        dispatch({
            type: GET_USER_DATA_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
