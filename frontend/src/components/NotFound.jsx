import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page-wrap d-flex flex-row align-items-center mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-2 lead">Not Found</div>
            <Link to="/" className="btn btn-link">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
