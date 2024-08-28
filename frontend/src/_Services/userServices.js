import axios from "axios";
import { API } from "../config/API/api.config";

export const userServices = { sendOtp, verifyOtp, setPassword };

async function sendOtp(data) {
  return await axios.post(`${API}user/send-otp`, data);
}

async function verifyOtp(data) {
  return await axios.post(`${API}user/verify-otp`, data);
}

async function setPassword(data) {
  return await axios.post(`${API}user/set-password`, data);
}
