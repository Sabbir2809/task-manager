import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROFILE_DETAILS_API, PROFILE_UPDATE_API } from "../../api/API_REQUEST";
import { ErrorToast, IsEmail, IsEmpty, getBase64 } from "../../helpers/FormHelper";

const Profile = () => {
  const navigate = useNavigate();
  let userPhotoRef,
    userPhotoView,
    emailRef,
    fullNameRef = useRef();

  useEffect(() => {
    PROFILE_DETAILS_API();
  }, []);

  const profileData = useSelector((state) => state.profile.info);

  const handlePhotoPreview = () => {
    const imageFile = userPhotoRef.files[0];
    getBase64(imageFile).then((base64Image) => {
      userPhotoView.src = base64Image;
    });
  };

  const handleUpdateProfile = async () => {
    let email = emailRef.value;
    let fullName = fullNameRef.value;
    let photo = userPhotoView.src;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required");
    } else if (IsEmpty(fullName)) {
      ErrorToast("Full Name is Required");
    } else {
      const res = await PROFILE_UPDATE_API(photo, email, fullName);
      if (res) {
        navigate("/");
      }
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img
                  key={Date.now()}
                  ref={(input) => (userPhotoView = input)}
                  src={profileData["photo"]}
                  className="icon-nav-img-lg"
                  alt={profileData["fullName"]}
                />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input
                      key={Date.now()}
                      ref={(input) => (userPhotoRef = input)}
                      onChange={handlePhotoPreview}
                      type="file"
                      placeholder="User Photo"
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input
                      key={Date.now()}
                      ref={(input) => (emailRef = input)}
                      defaultValue={profileData["email"]}
                      readOnly={true}
                      type="email"
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Full Name</label>
                    <input
                      key={Date.now()}
                      ref={(input) => (fullNameRef = input)}
                      defaultValue={profileData["fullName"]}
                      type="text"
                      placeholder="Full Name"
                      className="form-control animated fadeInUp"
                    />
                  </div>
                </div>
                <div className="col-4 p-2">
                  <button
                    onClick={handleUpdateProfile}
                    className="btn w-100 float-end btn-primary animated fadeInUp">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
