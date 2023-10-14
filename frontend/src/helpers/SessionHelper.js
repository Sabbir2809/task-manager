class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }
  setOTP(OTP) {
    localStorage.setItem("otp", OTP);
  }
  getOTP() {
    return localStorage.getItem("otp");
  }
  setUserDetails(userDetails) {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem("userDetails"));
  }
  removeSession() {
    localStorage.clear();
    window.location.href = "login";
  }
}

export const {
  setToken,
  getToken,
  setEmail,
  getEmail,
  setOTP,
  getOTP,
  setUserDetails,
  getUserDetails,
  setGuestCart,
  getGuestCart,
  convertPriceStringToNumber,
  removeSession,
} = new SessionHelper();
