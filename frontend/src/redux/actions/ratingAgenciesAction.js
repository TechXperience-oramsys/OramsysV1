import React from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData'
import { IS_LOADING, RATINGAGENCIES, RATINGAGENCIES_ADD, RATINGAGENCIES_ADD_ERROR, RATINGAGENCIES_ADD_LOADING, RATINGAGENCIES_ERROR, RATINGAGENCIES_GET_BY_ID, RATINGAGENCIES_GET_BY_ID_ERROR, RATINGAGENCIES_GET_BY_ID_LOADING, RATINGAGENCIES_LOADING, RATINGAGENCY_UPDATE, RATINGAGENCY_UPDATE_ERROR, RATINGAGENCY_UPDATE_LOADING } from '../types'

export const ratingAgenciesAction = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: RATINGAGENCIES_LOADING,
            payload: true
        })
        await ApiGet('ratingAgencies/get/all')
            .then((res) => {
                dispatch({
                    type: RATINGAGENCIES,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: RATINGAGENCIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: RATINGAGENCIES_ERROR,
            payload: err
        })

        dispatch({
            type: RATINGAGENCIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const ratingAgencyAddAction = (ratingAgencyAdd) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: RATINGAGENCIES_ADD_LOADING,
            payload: true
        })
        await ApiPost('ratingAgencies/add', ratingAgencyAdd)
            .then((res) => {
                dispatch({
                    type: RATINGAGENCIES_ADD,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: RATINGAGENCIES_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: RATINGAGENCIES_ADD_ERROR,
            payload: err
        })

        dispatch({
            type: RATINGAGENCIES_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const ratingAgencyGetByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: RATINGAGENCIES_GET_BY_ID_LOADING,
            payload: true
        })
        await ApiGet(`ratingAgencies/getById/${id}`)
            .then((res) => {
                dispatch({
                    type: RATINGAGENCIES_GET_BY_ID,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: RATINGAGENCIES_GET_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: RATINGAGENCIES_GET_BY_ID_ERROR,
            payload: err
        })

        dispatch({
            type: RATINGAGENCIES_GET_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const ratingAgencyUpdateAction = (ratingAgencyUpdate, id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: RATINGAGENCY_UPDATE_LOADING,
            payload: true
        })
        await ApiPost(`ratingAgencies/edit/${id}`, ratingAgencyUpdate)
            .then((res) => {
                dispatch({
                    type: RATINGAGENCY_UPDATE,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: RATINGAGENCIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: RATINGAGENCY_UPDATE_ERROR,
            payload: err
        })

        dispatch({
            type: RATINGAGENCIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
