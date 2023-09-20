import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card animated fadeIn w-100 p-3">
            <div className="card-body">
              <h4 className="text-center">Sign Up</h4>
              <input placeholder="User Email" className="form-control animated fadeInUp" type="email" />
              <br />
              <input placeholder="First Name" className="form-control animated fadeInUp" type="text" />
              <br />
              <input placeholder="User Password" className="form-control animated fadeInUp" type="password" />
              <br />
              <button className="btn btn-primary w-100 float-end  animated fadeInUp">Registration</button>
              <div className="float-end mt-3">
                <span>
                  <Link className="text-center ms-3 h6 animated fadeInUp" to="/login">
                    Login
                  </Link>
                  <span className="ms-1">|</span>
                  <Link className="text-center ms-3 h6 animated fadeInUp" to="/forget-password">
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
