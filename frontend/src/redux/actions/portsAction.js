import { ApiGet } from '../../helper/API/ApiData'
import { AIR_PORT, AIR_PORT_ERROR, AIR_PORT_LOADING, IS_LOADING, PORT, PORT_ERROR, PORT_LOADING } from '../types'

export const portsAction = (countryName) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: PORT_LOADING,
            payload: true
        })
        await ApiGet(`port/get/${countryName}`)
            .then((res) => {
                dispatch({
                    type: PORT,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: PORT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: PORT_ERROR,
            payload: err
        })

        dispatch({
            type: PORT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const airPortsAction = (countryName) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: AIR_PORT_LOADING,
            payload: true
        })
        await ApiGet(`airBase/get/${countryName}`)
            .then((res) => {
                dispatch({
                    type: AIR_PORT,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: AIR_PORT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: AIR_PORT_ERROR,
            payload: err
        })

        dispatch({
            type: AIR_PORT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
