const BASE_URL = `https://task-manager-jcwd.onrender.com/api`;
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helpers/FormHelper";
import { setEmail, setToken } from "../helpers/SessionHelper";
import store from "../redux/app/store";
import { hideLoader, showLoader } from "../redux/features/settingSlice";

// REGISTRATION API
export const REGISTRATION_API = async (email, fullName, password) => {
  try {
    const URL = `${BASE_URL}/user-registration`;
    const postBody = { email, fullName, password };
    store.dispatch(showLoader());

    const { data } = await axios.post(URL, postBody);

    store.dispatch(hideLoader());
    if (data.status) {
      SuccessToast(data.message);
      return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// LOGIN API
export const LOGIN_API = async (email, password) => {
  try {
    const URL = `${BASE_URL}/user-login`;
    const postBody = { email, password };
    store.dispatch(showLoader());

    const { data } = await axios.post(URL, postBody);

    store.dispatch(hideLoader());
    if (data.status) {
      // set email, token in localStorage
      setToken(data.token);
      setEmail(data.data.email);
      SuccessToast(data.message);
      return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};
