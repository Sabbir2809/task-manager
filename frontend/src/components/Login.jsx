import { useRef } from "react";
import { Link } from "react-router-dom";
import { LOGIN_API } from "../api/API_REQUEST";
import { ErrorToast, IsEmail, IsEmpty } from "../helpers/FormHelper";

const Login = () => {
  let emailRef,
    passwordRef = useRef();

  const handleLogin = async () => {
    let email = emailRef.value;
    let password = passwordRef.value;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required");
    } else if (IsEmpty(password)) {
      ErrorToast("Valid Password Required");
    } else {
      const res = await LOGIN_API(email, password);
      if (res) {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90 p-4">
            <div className="card-body">
              <h2 className="text-center">Login</h2>
              <br />
              <input
                ref={(input) => (emailRef = input)}
                placeholder="Enter Your Valid Email Address"
                className="form-control animated fadeInUp"
                type="email"
              />
              <br />
              <input
                ref={(input) => (passwordRef = input)}
                placeholder="Enter Your Valid Password"
                className="form-control animated fadeInUp"
                type="password"
              />
              <br />
              <button onClick={handleLogin} className="btn w-100 animated fadeInUp float-end btn-primary">
                Login
              </button>
              <hr />
              <div className="float-end mt-3">
                <span>
                  <Link className="text-center ms-3 h6 animated fadeInUp" to="/registration">
                    Registration{" "}
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

export default Login;
