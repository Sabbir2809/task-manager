import toast from "react-hot-toast";
const EmailRegExr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }

  IsEmail(value) {
    return !EmailRegExr.test(value);
  }

  ErrorToast(msg) {
    toast.error(msg, { position: "top-center" });
  }

  SuccessToast(msg) {
    toast.success(msg, { position: "top-center" });
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const { IsEmpty, IsEmail, ErrorToast, SuccessToast, getBase64 } = new FormHelper();
