import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TASK_STATUS_COUNT_API } from "../api/API_REQUEST";

const Dashboard = () => {
  useEffect(() => {
    TASK_STATUS_COUNT_API();
  }, []);

  const summaryList = useSelector((state) => state.summary.value);
  return (
    <div className="container">
      <div className="row">
        {summaryList &&
          summaryList.map((item, index) => (
            <div key={index} className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="animated fadeInUp">
                    Total: <span className="text-primary">{item._id}</span>
                  </h5>
                  <h5 className="text-secondary animated fadeInUp">{item.sum}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
