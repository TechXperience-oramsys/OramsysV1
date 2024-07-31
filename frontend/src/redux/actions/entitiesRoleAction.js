import { ApiDelete, ApiGet, ApiPost } from '../../helper/API/ApiData'
import {
    ENTITYROLE,
    ENTITYROLE_ADD,
    ENTITYROLE_ADD_ERROR,
    ENTITYROLE_ADD_LOADING, ENTITYROLE_DELETE, ENTITYROLE_DELETE_ERROR, ENTITYROLE_DELETE_LOADING,
    ENTITYROLE_ERROR,
    ENTITYROLE_LOADING,
    ENTITYROLE_UPDATE,
    ENTITYROLE_UPDATE_ERROR,
    ENTITYROLE_UPDATE_LOADING,
    IS_LOADING,
} from '../types'

export const entitiesRoleAction = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITYROLE_LOADING,
            payload: true
        })
        await ApiGet('entities/get-roles')
            .then((res) => {
                console.log("==res", res)
                dispatch({
                    type: ENTITYROLE,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ENTITYROLE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITYROLE_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITYROLE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const entityRoleAddAction = (entityRoleAdd) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITYROLE_ADD_LOADING,
            payload: true
        })
        await ApiPost('entities/add-role', entityRoleAdd)
            .then((res) => {
                dispatch({
                    type: ENTITYROLE_ADD,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ENTITYROLE_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITYROLE_ADD_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITYROLE_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const entityRoleUpdateAction = (entityRoleUpdate, id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITYROLE_UPDATE_LOADING,
            payload: true
        })
        await ApiPost(`entities/edit-role/${id}`, entityRoleUpdate)
            .then((res) => {
                dispatch({
                    type: ENTITYROLE_UPDATE,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ENTITYROLE_UPDATE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITYROLE_UPDATE_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITYROLE_UPDATE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const entityRoleDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITYROLE_DELETE_LOADING,
            payload: true
        })
        await ApiDelete(`entities/remove-role/${id}`)
            .then((res) => {
                dispatch({
                    type: ENTITYROLE_DELETE,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ENTITYROLE_DELETE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITYROLE_DELETE_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITYROLE_DELETE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}