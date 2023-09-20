const BASE_URL = `https://task-manager-jcwd.onrender.com/api`;
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helpers/FormHelper";
import { getEmail, getToken, setEmail, setToken } from "../helpers/SessionHelper";
import store from "../redux/app/store";
import { hideLoader, showLoader } from "../redux/features/settingSlice";
import { setCanceledTask, setCompletedTask, setNewTask, setProgressTask } from "../redux/features/taskSlice";

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

// CREATE A NEW TASK API
export const CREATE_NEW_TASK_API = async (title, description) => {
  try {
    const URL = `${BASE_URL}/create-task`;
    const postBody = { title, description, status: "New", email: getEmail() };
    const Headers = { headers: { token: getToken() } };
    store.dispatch(showLoader());

    const { data } = await axios.post(URL, postBody, Headers);

    store.dispatch(hideLoader());
    if (data.status) {
      SuccessToast("Create New Task");
      return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// Task List By Status
export const TASK_LIST_BY_STATUS = async (taskStatus) => {
  try {
    const URL = `${BASE_URL}/list-task-by-status/${taskStatus}`;
    const Headers = { headers: { token: getToken() } };
    store.dispatch(showLoader());

    const { data } = await axios.get(URL, Headers);

    store.dispatch(hideLoader());
    if (data.status) {
      if (taskStatus === "New") {
        store.dispatch(setNewTask(data.data["data"]));
      } else if (taskStatus === "Progress") {
        store.dispatch(setProgressTask(data.data["data"]));
      } else if (taskStatus === "Canceled") {
        store.dispatch(setCanceledTask(data.data["data"]));
      } else if (taskStatus === "Completed") {
        store.dispatch(setCompletedTask(data.data["data"]));
      }
      // SuccessToast("Create New Task");
      // return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};
