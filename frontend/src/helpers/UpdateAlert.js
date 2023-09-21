import Swal from "sweetalert2";
import { UPDATE_TASK_STATUS_API } from "../api/API_REQUEST";

export function updateTaskStatus(_id, status) {
  return Swal.fire({
    title: "Change Status",
    input: "select",
    inputOptions: {
      New: "New",
      Progress: "Progress",
      Completed: "Completed",
      Canceled: "Canceled",
    },
    inputValue: status,
  }).then((result) => {
    return UPDATE_TASK_STATUS_API(_id, result.value).then((res) => {
      return res;
    });
  });
}
