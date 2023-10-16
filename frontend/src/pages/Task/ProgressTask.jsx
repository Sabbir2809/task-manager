import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { TASK_LIST_BY_STATUS_API } from "../../api/API_REQUEST";
import { DeleteTask } from "../../helpers/DeleteAlert";
import { UpdateTaskStatus } from "../../helpers/UpdateAlert";
import SearchTask from "./SearchTask";

const ProgressTask = () => {
  const progressList = useSelector((state) => state.task.progressTask);

  useEffect(() => {
    TASK_LIST_BY_STATUS_API("Progress");
  }, []);

  // handle delete
  const deleteItem = async (_id) => {
    const result = await DeleteTask(_id);
    if (result === true) {
      TASK_LIST_BY_STATUS_API("Progress");
    }
  };

  // handle update
  const updateItem = async (_id, status) => {
    const result = await UpdateTaskStatus(_id, status);
    if (result === true) {
      TASK_LIST_BY_STATUS_API("Progress");
    }
  };

  return (
    <Container fluid={true} className="content-body">
      <div className="row p-0 m-0">
        <div className="col-12 col-md-6 col-lg-8 px-3">
          <h5>Task In Progress </h5>
        </div>
        <SearchTask></SearchTask>
      </div>
      <div className="row p-0 m-0">
        {progressList &&
          progressList.map((item) => (
            <div key={item._id} className="col-12 col-lg-4 col-sm-6 col-md-4  p-2">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="animated fadeInUp">{item.title}</h6>
                  <p className="animated fadeInUp">{item.description}</p>
                  <p className="m-0 animated fadeInUp p-0">
                    <AiOutlineCalendar /> {item.createdAt}
                    <a
                      onClick={() => updateItem(item._id, item.status)}
                      className="icon-nav text-primary mx-1">
                      <AiOutlineEdit />
                    </a>
                    <a onClick={() => deleteItem(item._id)} className="icon-nav text-danger mx-1">
                      <AiOutlineDelete />
                    </a>
                    <a className="badge float-end bg-primary">{item.status}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default ProgressTask;
