const BASE_URL = `https://task-manager-jcwd.onrender.com/api`;
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helpers/FormHelper";
import { getEmail, getToken, setEmail, setOTP, setToken, setUserDetails } from "../helpers/SessionHelper";
import store from "../redux/app/store";
import { setProfileDetails } from "../redux/features/profileSlice";
import { hideLoader, showLoader } from "../redux/features/settingSlice";
import { setSummary } from "../redux/features/summarySlice";
import { setCanceledTask, setCompletedTask, setNewTask, setProgressTask } from "../redux/features/taskSlice";

// REGISTRATION API
export const REGISTRATION_API = async (email, fullName, password) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // request
    const URL = `${BASE_URL}/user-registration`;
    const postBody = { email, fullName, password };
    const { data } = await axios.post(URL, postBody);

    // hide loader
    store.dispatch(hideLoader());

    // true response
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
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/user-login`;
    const postBody = { email, password };
    const { data } = await axios.post(URL, postBody);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      // set email, token in localStorage
      setToken(data.token);
      setUserDetails(data.data);
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
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/create-task`;
    const postBody = { title, description, status: "New", email: getEmail() };
    const Headers = { headers: { token: getToken() } };
    const { data } = await axios.post(URL, postBody, Headers);

    // hide loader
    store.dispatch(hideLoader());

    // true response
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
export const TASK_LIST_BY_STATUS_API = async (taskStatus) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/list-task-by-status/${taskStatus}`;
    const Headers = { headers: { token: getToken() } };
    const { data } = await axios.get(URL, Headers);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      if (taskStatus === "New") {
        store.dispatch(setNewTask(data.data));
      } else if (taskStatus === "Progress") {
        store.dispatch(setProgressTask(data.data));
      } else if (taskStatus === "Canceled") {
        store.dispatch(setCanceledTask(data.data));
      } else if (taskStatus === "Completed") {
        store.dispatch(setCompletedTask(data.data));
      }
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// TaskStatusCount
export const TASK_STATUS_COUNT_API = async () => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/task-status-count`;
    const Headers = { headers: { token: getToken() } };
    const { data } = await axios.get(URL, Headers);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      store.dispatch(setSummary(data.data));
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// Delete Task
export const DELETE_TASK_API = async (_id) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/delete-task/${_id}`;
    const Headers = { headers: { token: getToken() } };
    const { data } = await axios.delete(URL, Headers);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      SuccessToast("Deleted Successful");
      return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// Update Task Status
export const UPDATE_TASK_STATUS_API = async (_id, status) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/update-task-status/${_id}/${status}`;
    const Headers = { headers: { token: getToken() } };
    const { data } = await axios.get(URL, Headers);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      SuccessToast("Task Status Updated");
      return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// Profile Details
export const PROFILE_DETAILS_API = async () => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/get-user-profile`;
    const Headers = { headers: { token: getToken() } };
    const { data } = await axios.get(URL, Headers);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      store.dispatch(setProfileDetails(data.data[0]));
      return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// Profile Update
export const PROFILE_UPDATE_API = async (photo, email, fullName) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/user-profile-update`;
    const postBody = { photo, email, fullName };
    const userDetails = { photo, email, fullName };
    const Headers = { headers: { token: getToken() } };
    const { data } = await axios.put(URL, postBody, Headers);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      SuccessToast("User Profile Updated Successful");
      setUserDetails(userDetails);
      return true;
    }
  } catch (error) {
    if (error.response.data.success === false) {
      store.dispatch(hideLoader());
      ErrorToast(error.response.data.message);
    }
  }
};

// Verify Recover Email (Step-1)
export const VERIFY_RECOVER_EMAIL_API = async (email) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/verify-email/${email}`;
    const { data } = await axios.get(URL);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      setEmail(email);
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

// Verify Recover OTP (Step-2)
export const VERIFY_RECOVER_OTP_API = async (email, OTP) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/verify-otp/${email}/${OTP}`;
    const { data } = await axios.get(URL);

    // hide loader
    store.dispatch(hideLoader());

    // true response
    if (data.status) {
      setOTP(OTP);
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

// Recover Reset Password (Step-3)
export const RECOVER_RESET_PASSWORD_API = async (email, OTP, password) => {
  try {
    // show loader
    store.dispatch(showLoader());

    // api request
    const URL = `${BASE_URL}/reset-password`;
    const postBody = { email, otp: OTP, password };
    const { data } = await axios.post(URL, postBody);

    // hide loader
    store.dispatch(hideLoader());

    // true response
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
