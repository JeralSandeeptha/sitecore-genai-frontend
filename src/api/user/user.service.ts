import axiosClient from '@/config/axiosClient';
import { envConfig } from '@/config/envConfig';
import type {
  getSingleUserProps,
  loginUserProps,
  registerUserProps,
  updateUserPreferencesProps,
  updateUserProps,
} from '@/types/functions.types';
import logger from '@/utils/logger';

const baseURL = envConfig.VITE_API_URL;
const domain = 'users';

export const registerUser = async (props: registerUserProps) => {
  props.setIsLoading(true);
  try {
    const res = await axiosClient.post(`${baseURL}/gateway/${domain}/api/v1/user`, {
      email: props.email,
      password: props.password,
    });
    logger.info(res.data.data);
    setTimeout(() => {
      props.navigate('/login');
      props.setIsLoading(false);
    }, 3000);
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
  }
};

export const loginUser = async (props: loginUserProps) => {
  props.setIsLoading(true);
  try {
    const res = await axiosClient.post(`${baseURL}/gateway/${domain}/api/v1/user/login`, {
      email: props.email,
      password: props.password,
    });
    if (res.status === 200) {
      setTimeout(() => {
        logger.info(res.data);
        props.setAuthenticated(true);
        props.setLocalStorageItem('user-id', res.data.data.id);
        props.setUser(res.data.data.id);
        props.setIsLoading(false);
        props.navigate('/chat');
      }, 3000);
    } else {
      props.setIsLoading(false);
      logger.error(res.data);
      logger.error('Something wrong with the login');
    }
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
  }
};

export const getSingleUser = async (props: getSingleUserProps) => {
  props.setIsLoading(true);
  try {
    const res = await axiosClient.get(`${baseURL}/gateway/${domain}/api/v1/user/${props.userId}`);
    logger.info(res.data.data);
    props.setIsLoading(false);
    return res.data.data;
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
  }
};

export const updateUserProfile = async (props: updateUserProps) => {
  props.setIsLoading(true);
  
  try {
    const res = await axiosClient.patch(`${baseURL}/gateway/${domain}/api/v1/user/${props.userId}/profile`, {
      fname: props.fname,
      lname: props.lname,
      bio: props.bio,
    });
    logger.info(res.data.data);
    props.setSavedMessage('Profile updated successfully!');
    props.setProfileData(res.data.data);
    props.navigate('/profile');
    props.setIsLoading(false);
    setTimeout(() => {
      props.setSavedMessage('');
    }, 3000);
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
  }
};

export const updateUserPreferences = async (props: updateUserPreferencesProps) => {
  props.setIsLoading(true);

  try {
    const res = await axiosClient.patch(`${baseURL}/gateway/${domain}/api/v1/user/${props.userId}/preferences`, {
      vo_api_key: props.vo_api_key,
    });
    logger.info(res.data.data);
    props.setSavedMessage('API Key updated successfully!');
    props.setProfileData(res.data.data);
    props.navigate('/profile');
    props.setApiKey(props.newApiKey);
    props.setNewApiKey(props.newApiKey);
    props.setShowApiKeyForm(false);
    props.setIsLoading(false);
    setTimeout(() => {
      props.setSavedMessage('');
    }, 3000);
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
  }
};