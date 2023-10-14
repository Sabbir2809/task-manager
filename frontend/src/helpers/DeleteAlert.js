import Swal from "sweetalert2";
import { DELETE_TASK_API } from "../api/API_REQUEST";

export function DeleteTask(_id) {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      return DELETE_TASK_API(_id).then((deleteResult) => {
        return deleteResult;
      });
    }
  });
}
