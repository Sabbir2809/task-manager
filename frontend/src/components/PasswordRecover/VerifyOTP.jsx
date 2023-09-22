import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { useNavigate } from "react-router-dom";
import { VERIFY_RECOVER_OTP_API } from "../../api/API_REQUEST";
import { ErrorToast } from "../../helpers/FormHelper";
import { getEmail } from "../../helpers/SessionHelper";

const VerifyOTP = () => {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  let defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
  };

  const handleSubmitOTP = () => {
    const email = getEmail();
    console.log(OTP);
    if (OTP.length === 6) {
      const result = VERIFY_RECOVER_OTP_API(email, OTP);
      if (result) {
        navigate("/create-password");
      }
    } else {
      ErrorToast("Invalid OTP");
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90  p-4">
            <div className="card-body">
              <h4 className="text-center">OTP VERIFICATION </h4>
              <p>A 6 Digit verification code has been sent to your email address. </p>
              <ReactCodeInput onChange={(value) => setOTP(value)} inputStyle={defaultInputStyle} fields={6} />
              <br /> <br />
              <button onClick={handleSubmitOTP} className="btn w-100 animated fadeInUp float-end btn-primary">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
