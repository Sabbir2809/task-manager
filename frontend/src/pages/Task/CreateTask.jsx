import { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CREATE_NEW_TASK_API } from "../../api/API_REQUEST";
import { ErrorToast, IsEmpty } from "../../helpers/FormHelper";

const CreateTask = () => {
  const navigate = useNavigate();
  let titleRef,
    descriptionRef = useRef();

  // handle new task
  const handleNewTask = async () => {
    const title = titleRef.value;
    const description = descriptionRef.value;

    if (IsEmpty(title)) {
      ErrorToast("Title is Required");
    } else {
      const res = await CREATE_NEW_TASK_API(title, description);
      if (res) {
        navigate("/new-task");
      }
    }
  };

  return (
    <Container fluid={true} className="content-body">
      <Row className="d-flex justify-content-center">
        <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
          <div className="card">
            <div className="card-body">
              <h4>Create a New Task</h4>
              <br />
              <input
                ref={(input) => (titleRef = input)}
                placeholder="Task Name"
                className="form-control animated fadeInUp"
                type="text"
              />
              <br />
              <textarea
                ref={(input) => (descriptionRef = input)}
                rows={5}
                placeholder="Task Description"
                className="form-control animated fadeInUp"
                type="text"
              />
              <br />
              <button onClick={handleNewTask} className="btn float-end btn-primary">
                New Task
              </button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default CreateTask;
