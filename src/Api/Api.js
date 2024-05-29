import { createAxiosInstance, fileInstance } from './ApiInstances';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const api = createAxiosInstance();
const file = fileInstance();
// auth
export const login = (values) => {
  return api.post('/user/login', values);
};
export const register = (values) => {
  return file.post('/user/signup', values);
};
export const sendOTP = (values) => {
  return api.post('/user/forgetPassword/sendOtpToEmail', values);
};
export const checkOTP = async (values, token) => {
  try {
    const response = await axios.post(`${url}/user/forgetPassword/checkOTP`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const updatePassword =async (values,token) => {
  try {
    const response = await axios.patch(`${url}/user/forgetPassword/setNewPassword`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = (id) => {
  return api.get(`/user/getUser/${id}`);
};

//transaction
export const cashDeposit = (values) => {
  return file.post('/transaction/createCashDeposit', values);
};
export const checkWallet = (values) => {
  return api.post('/transaction/checkWalletAddress', values);
};