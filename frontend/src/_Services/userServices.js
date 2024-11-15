import axios from "axios";
import { API } from "../config/API/api.config";

export const userServices = { sendOtp, verifyOtp, setPassword, getWorkflowData, updateWorkFlow };

async function sendOtp(data) {
  return await axios.post(`${API}user/send-otp`, data);
}

async function verifyOtp(data) {
  return await axios.post(`${API}user/verify-otp`, data);
}

async function setPassword(data) {
  return await axios.post(`${API}user/set-password`, data);
}

async function getWorkflowData(userMail, adminId) {
  return await axios.get(`${API}api/workflow/getuserFlow?assignedUser=${userMail}&addedBy=${adminId}`)
}

async function updateWorkFlow(data) {
  return await axios.patch(`${API}api/workFlow/update`, data)
}