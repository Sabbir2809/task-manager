import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RECOVER_RESET_PASSWORD_API } from "../../api/API_REQUEST";
import { ErrorToast, IsEmpty } from "../../helpers/FormHelper";
import { getEmail, getOTP } from "../../helpers/SessionHelper";

const CreatePassword = () => {
  const navigate = useNavigate();
  let passwordRef,
    confirmPasswordRef = useRef();

  const handleResetPassword = () => {
    let password = passwordRef.value;
    let confirmPassword = confirmPasswordRef.value;

    if (IsEmpty(password)) {
      ErrorToast("New Password Required");
    } else if (IsEmpty(confirmPassword)) {
      ErrorToast("Confirm Password Required");
    } else if (IsEmpty(password !== confirmPassword)) {
      ErrorToast("New Password and Confirm Password Not Match");
    } else {
      const email = getEmail();
      const OTP = getOTP();

      const result = RECOVER_RESET_PASSWORD_API(email, OTP, password);
      if (result) {
        navigate("/login");
      }
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90 p-4">
            <div className="card-body">
              <h4 className="text-center">SET NEW PASSWORD</h4>
              <br />
              <label>Your email address</label>
              <input
                readOnly={true}
                value={getEmail()}
                placeholder="User Email"
                className="form-control animated fadeInUp"
                type="email"
              />
              <br />
              <label>New Password</label>
              <input
                ref={(input) => (passwordRef = input)}
                placeholder="New Password"
                className="form-control animated fadeInUp"
                type="password"
              />
              <br />
              <label>Confirm Password</label>
              <input
                ref={(input) => (confirmPasswordRef = input)}
                placeholder="Confirm Password"
                className="form-control animated fadeInUp"
                type="password"
              />
              <br />
              <button
                onClick={handleResetPassword}
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

export default CreatePassword;
