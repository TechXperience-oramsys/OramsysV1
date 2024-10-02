import { ApiGet, ApiPost } from '../../helper/API/ApiData'
import { IS_LOADING, PRODUCT, PRODUCTADD, PRODUCTADD_ERROR, PRODUCTADD_LOADING, PRODUCT_ERROR, PRODUCT_GET_BY_ID, PRODUCT_GET_BY_ID_ERROR, PRODUCT_LOADING, PRODUCT_UPDATE, PRODUCT_UPDATE_ERROR } from '../types'

export const productGetAction = (search) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: PRODUCT_LOADING,
            payload: true
        })
        await ApiGet(`product/get/${search}`)
            .then((res) => {
                dispatch({
                    type: PRODUCT,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: PRODUCT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err
        })

        dispatch({
            type: PRODUCT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const productAddAction = (productAdd) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: PRODUCTADD_LOADING,
            payload: true
        })
        await ApiPost('product/add', productAdd)
            .then((res) => {
                dispatch({
                    type: PRODUCTADD,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: PRODUCTADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: PRODUCTADD_ERROR,
            payload: err
        })

        dispatch({
            type: PRODUCTADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const productGetByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: PRODUCT_LOADING,
            payload: true
        })
        await ApiGet(`product/getById/${id}`)
            .then((res) => {
                dispatch({
                    type: PRODUCT_GET_BY_ID,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: PRODUCT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: PRODUCT_GET_BY_ID_ERROR,
            payload: err
        })

        dispatch({
            type: PRODUCT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const productUpdateAction = (productUpdate, id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: PRODUCT_LOADING,
            payload: true
        })
        await ApiPost(`product/edit/${id}`, productUpdate)
            .then((res) => {
                dispatch({
                    type: PRODUCT_UPDATE,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: PRODUCT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: PRODUCT_UPDATE_ERROR,
            payload: err
        })

        dispatch({
            type: PRODUCT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}