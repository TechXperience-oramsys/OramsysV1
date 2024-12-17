import axios from "axios";
import { API } from "../config/API/api.config";

const token = localStorage.getItem('token')

export const transactionServices = { detailsUpdate, updateKeyParties, updateDocumentFlow, updateFundFlow, updateFacility,getEntityDetails }

async function detailsUpdate(data) {
    data.details.flowVerified = false
    console.log(data, '"67583dc1556637febf6bd88e"')
    return await axios.put(`${API}transaction/details/${data.details._id}`, data, {
        headers: {
            Authorization: token,
            'Content-Type': "application/json",
        }
    })
}

async function updateKeyParties(data) {
    data.flowVerified = false
    return await axios.put(`${API}transaction/key-party/${data._id}`, data, {
        headers: {
            Authorization: token,
            'Content-Type': "application/json",
        }
    })
}

async function updateDocumentFlow(data) {
    data.flowVerified = false
    return await axios.put(`${API}transaction/document-flow/${data._id}`, data, {
        headers: {
            Authorization: token,
            'Content-Type': "application/json",
        }
    })
}

async function updateFundFlow(data) {
    return await axios.put(`${API}transaction/fund-flow/${data._id}`, data, {
        headers: {
            Authorization: token,
            'Content-Type': "application/json"
        }
    })
}

async function updateFacility(data) {
    return await axios.put(`${API}transaction/facility/${data._id}`, data, {
        headers: {
            Authorization: token,
            'Content-Type': "application/json"
        }
    })
}

async function getEntityDetails(id) {
    return await axios.get(`${API}entities/getByEntityId/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}
