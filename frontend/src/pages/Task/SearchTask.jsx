import { useState } from "react";
import { FIND_TASK_API, TASK_LIST_BY_STATUS_API } from "../../api/API_REQUEST";

const SearchTask = () => {
  // state
  const [searchKeyword, setSearchKeyword] = useState("0");

  // handle search input
  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
    if (event.target.value.length === 0) {
      setSearchKeyword("0");
      TASK_LIST_BY_STATUS_API("New");
      TASK_LIST_BY_STATUS_API("Completed");
      TASK_LIST_BY_STATUS_API("Canceled");
      TASK_LIST_BY_STATUS_API("Progress");
    }
  };

  // handle search btn
  const handleSearchBtn = () => {
    FIND_TASK_API(searchKeyword);
  };

  return (
    <div className="col-12 float-end col-md-6 col-lg-4 px-2">
      <div className="row">
        <div className="col-8">
          <input onChange={handleSearch} className="form-control w-100" />
        </div>
        <div className="col-4">
          <button onClick={handleSearchBtn} className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchTask;
