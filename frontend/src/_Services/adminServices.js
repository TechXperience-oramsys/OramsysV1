import axios from "axios";
import { API } from "../config/API/api.config";
export const admin = { createAdmin, sendOtp, verifyOtp, setPassword, adminLogin };
// const API_URL = 'http://localhost:5003';



async function createAdmin(data) {
  return await axios.post(`${API}admin/create-admin`, { ...data });
}

async function sendOtp(data) {
  return await axios.post(`${API}admin/send-otp`, data);
}

async function verifyOtp(data) {
  return await axios.post(`${API}admin/verify-otp`, data);
}

async function setPassword(data) {
  return await axios.post(`${API}admin/set-password`, data);
}

async function adminLogin(data) {
  return await axios.post(`${API}admin/login`, data);
}
