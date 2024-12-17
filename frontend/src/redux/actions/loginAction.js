import STORAGEKEY from '../../config/APP/app.config'
import { ApiPostNoAuth } from '../../helper/API/ApiData'
import AuthStorage from '../../helper/AuthStorage'
import { toast } from 'sonner'
import { CHANGE_LOGIN_STATE, IS_LOADING, LOGIN, LOGIN_ERROR, LOGIN_LOADING } from '../types'

export const loginAction = (body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: LOGIN_LOADING,
            payload: true
        })
        await ApiPostNoAuth(`user/login`, body)
            .then((res) => {

                console.log(res, 'response is here');

                dispatch({
                    type: LOGIN,
                    payload: { res: res, is_loggedin: true }
                })
                if (res.status === 200 && res.data.token) {
                    toast.success(res.message);
                    AuthStorage.setStorageData(STORAGEKEY.token, res.data.token, true)
                    AuthStorage.setStorageData(STORAGEKEY.roles, "user", true)
                    AuthStorage.setStorageData(STORAGEKEY.userId, res.data.id, true)
                    return AuthStorage.setStorageData(STORAGEKEY.userData, JSON.stringify(res.data), true)
                } else {
                    toast.error(res.message);
                }
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: LOGIN_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: LOGIN_ERROR,
            payload: err
        })

        dispatch({
            type: LOGIN_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const changeLoginState = (value) => (dispatch) => {
    dispatch({
        type: CHANGE_LOGIN_STATE,
        payload: value
    })
}