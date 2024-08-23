import axios from "axios";
import { API } from "../config/API/api.config";
export const admin = {
    createAdmin
};
// const API_URL = 'http://localhost:5003';


async function createAdmin(data) {
    return await axios.post(`${API}admin/create-admin`, { ...data });
  }