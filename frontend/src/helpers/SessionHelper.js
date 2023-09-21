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
  setUserDetails(userDetails) {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem("userDetails"));
  }
  setGuestCart(productId) {
    localStorage.setItem("guestCartItem", productId);
  }
  getGuestCart() {
    return localStorage.getItem("guestCartItem");
  }
  convertPriceStringToNumber(getStringPrice) {
    const stringPrice = getStringPrice.cartList.price;
    const price = parseInt(stringPrice);
    return price;
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
  setUserDetails,
  getUserDetails,
  setGuestCart,
  getGuestCart,
  convertPriceStringToNumber,
  removeSession,
} = new SessionHelper();
