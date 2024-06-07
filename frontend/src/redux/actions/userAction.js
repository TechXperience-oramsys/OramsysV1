import React from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData'
import { GET_USER_DATA, GET_USER_DATA_ERROR, GET_USER_DATA_LOADING, IS_LOADING, USER_GET_BY_ID, USER_GET_BY_ID_ERROR, USER_UPDATE, USER_UPDATE_ERROR } from '../types'

export const userGetAction = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_USER_DATA_LOADING,
            payload: true
        })

        let id = localStorage.getItem('userId');
        let role = localStorage.getItem('roles')

        await ApiGet(`user/get?id=${id}&role=${role}`)
            .then((res) => {
                dispatch({
                    type: GET_USER_DATA,
                    payload: res
                })
            }).catch((error) => {
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
            type: GET_USER_DATA_ERROR,
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
