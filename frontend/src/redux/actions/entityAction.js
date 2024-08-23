import { ApiGet, ApiPost } from "../../helper/API/ApiData"
import { EDIT_ENTITY, EDIT_ENTITY_ERROR, EDIT_ENTITY_LOADING, ENTITY, ENTITY_ADD, ENTITY_ADD_ERROR, ENTITY_ADD_LOADING, ENTITY_ERROR, ENTITY_GET_BY_ID, ENTITY_GET_BY_ID_ERROR, ENTITY_GET_BY_ID_LOADING, ENTITY_LOADING, GET_WAREHOUSE, GET_WAREHOUSE_ERROR, GET_WAREHOUSE_LOADING, IS_LOADING } from "../types"

export const entityGetAction = (type) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITY_LOADING,
            payload: true
        })
        await ApiGet(`entities/get/${type}`)
            .then(res =>
                dispatch({
                    type: ENTITY,
                    payload: res
                })
            )
            .catch(e =>
                console.log('e', e)
            )
        dispatch({
            type: ENTITY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITY_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const entityAddAction = (body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITY_ADD_LOADING,
            payload: true
        })
        await ApiPost('entities/add', body)
            .then(res =>
                dispatch({
                    type: ENTITY_ADD,
                    payload: res
                })
            )
            .catch(e =>
                console.log('e', e)
            )
        dispatch({
            type: ENTITY_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITY_ADD_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITY_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getWarehouseAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_WAREHOUSE_LOADING,
            payload: true
        })
        await ApiGet(`entities/get-warehouses${id}`)
            .then(res =>
                dispatch({
                    type: GET_WAREHOUSE,
                    payload: res
                })
            )
            .catch(e =>
                console.log('e', e)
            )
        dispatch({
            type: GET_WAREHOUSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_WAREHOUSE_ERROR,
            payload: err
        })

        dispatch({
            type: GET_WAREHOUSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const entityGetByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITY_GET_BY_ID_LOADING,
            payload: true
        })
        await ApiGet(`entities/getById/${id}`)
            .then(res =>
                dispatch({
                    type: ENTITY_GET_BY_ID,
                    payload: res
                })
            )
        dispatch({
            type: ENTITY_GET_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITY_GET_BY_ID_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITY_GET_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const editEntityAction = (id, body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: EDIT_ENTITY_LOADING,
            payload: true
        })
        await ApiPost(`entities/edit/${id}`, body)
            .then(res =>    
                dispatch({
                    type: EDIT_ENTITY,
                    payload: res
                })
            )
        dispatch({
            type: EDIT_ENTITY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: EDIT_ENTITY_ERROR,
            payload: err
        })

        dispatch({
            type: EDIT_ENTITY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
