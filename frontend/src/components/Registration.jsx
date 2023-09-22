import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTRATION_API } from "../api/API_REQUEST";
import { ErrorToast, IsEmail, IsEmpty } from "../helpers/FormHelper";

const Registration = () => {
  const navigate = useNavigate();
  let emailRef,
    fullNameRef,
    passwordRef = useRef();

  const handleRegistration = async () => {
    let email = emailRef.value;
    let fullName = fullNameRef.value;
    let password = passwordRef.value;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required");
    } else if (IsEmpty(fullName)) {
      ErrorToast("Full Name is Required");
    } else if (IsEmpty(password)) {
      ErrorToast("Password is Required");
    } else {
      const res = await REGISTRATION_API(email, fullName, password);
      if (res) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card animated fadeIn w-100 p-3">
            <div className="card-body">
              <h2 className="text-center">Registration</h2>
              <br />
              <input
                ref={(input) => (emailRef = input)}
                placeholder="Your Valid Email"
                className="form-control animated fadeInUp"
                type="email"
              />
              <br />
              <input
                ref={(input) => (fullNameRef = input)}
                placeholder="Your Full Name"
                className="form-control animated fadeInUp"
                type="text"
              />
              <br />
              <input
                ref={(input) => (passwordRef = input)}
                placeholder="Your Password"
                className="form-control animated fadeInUp"
                type="password"
              />
              <br />
              <button
                onClick={handleRegistration}
                className="btn btn-primary w-100 float-end  animated fadeInUp">
                Registration
              </button>
              <div className="float-end mt-3">
                <span>
                  <Link className="text-center ms-3 h6 animated fadeInUp" to="/login">
                    Login
                  </Link>
                  <span className="ms-1">|</span>
                  <Link className="text-center ms-3 h6 animated fadeInUp" to="/send-otp">
                    Forget Password
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
