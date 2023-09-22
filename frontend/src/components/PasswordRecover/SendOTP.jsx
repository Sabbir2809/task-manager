import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VERIFY_RECOVER_EMAIL_API } from "../../api/API_REQUEST";
import { ErrorToast, IsEmail } from "../../helpers/FormHelper";

const SendOTP = () => {
  const navigate = useNavigate();
  let emailRef = useRef();

  const handleVerifyEmail = async () => {
    let email = emailRef.value;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required");
    } else {
      const result = await VERIFY_RECOVER_EMAIL_API(email);
      if (result) {
        navigate("/verify-otp");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90  p-4">
            <div className="card-body">
              <h4 className="text-center">EMAIL ADDRESS</h4>
              <br />
              <label>Your email address</label>
              <input
                ref={(input) => (emailRef = input)}
                placeholder="User Email"
                className="form-control animated fadeInUp"
                type="email"
              />
              <br />
              <button
                onClick={handleVerifyEmail}
                className="btn w-100 animated fadeInUp float-end btn-primary">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;
