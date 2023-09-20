const BASE_URL = `https://task-manager-jcwd.onrender.com/api`;
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helpers/FormHelper";
import { setEmail, setToken } from "../helpers/SessionHelper";

export const REGISTRATION_API = async (email, fullName, password) => {
  try {
    const URL = `${BASE_URL}/user-registration`;
    const postBody = { email, fullName, password };

    const { data } = await axios.post(URL, postBody);
    if (data.status) {
      SuccessToast(data.message);
      return true;
    }
  } catch (error) {
    if (error.response.data.status === false) {
      ErrorToast(error.response.data.message);
      return false;
    }
  }
};

export const LOGIN_API = async (email, password) => {
  try {
    const URL = `${BASE_URL}/user-login`;
    const postBody = { email, password };

    const { data } = await axios.post(URL, postBody);
    if (data.status) {
      // set email, token in localStorage
      setToken(data.token);
      setEmail(data.data.email);
      SuccessToast(data.message);
      return true;
    }
  } catch (error) {
    if (error.response.data.status === false) {
      ErrorToast(error.response.data.message);
      return false;
    }
  }
};
