import toast from "react-hot-toast";
const EmailRegExr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
}

export const { IsEmpty, IsEmail, ErrorToast, SuccessToast } = new FormHelper();
