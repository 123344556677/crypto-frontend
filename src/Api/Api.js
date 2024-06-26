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
  return api.post('/user/signup2', values);
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

export const updateUserInfo= (values) => {
  return api.patch('/user/updateInformation',values);
};

//transaction
export const cashDeposit = (values) => {
  return api.post('/transaction/createCashDeposit', values);
};
export const checkWallet = (values) => {
  return api.post('/transaction/checkWalletAddress', values);
};
export const cashWithdrawal= (values) => {
  return api.post('/transaction/createCashWithDrawal', values);
};
export const getAdminWallet = () => {
  return api.get('/transaction/getAdminWalletAddress');
};
export const getTransactionHistory = () => {
  return api.get('/transaction/getHistory');
};
export const getUserLevel = () => {
  return api.get('/transaction/getLevel');
};

//team
export const getTeamData = () => {
  return api.get('/team/getTeamData');
};
export const getReferalCode = () => {
  return api.get('/team/getMyReferral');
};
export const getTeamUsers = () => {
  return api.get('/team/getTeamPeople');
};
export const getTeamContribution = () => {
  return api.get('/team/getTeamContribution');
};

//settings
export const getSliderImages= () => {
  return api.get('/admin/getImageSlider');
};
export const getAbout= () => {
  return api.get('/admin/getAbout');
};
export const getAnnouncement= () => {
  return api.get('/setting/getAnnouncement');
};

//Quantiation
export const getUserClicks= () => {
  return api.get('/quantization/handleUserClick');
};
export const getUnitedHealthStockRate= () => {
  return api.get('/quantization/getUnitedHealthStockRate');
};
export const getQuantizationData= () => {
  return api.get('/quantization/getQuantizationData');
};