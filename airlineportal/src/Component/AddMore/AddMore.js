import React from "react";
import "./AddMore.css";
import CloseIcon from "@mui/icons-material/Close";

const AddMore = ({ count, updateValue }) => {
  return (
    <div className="addmore">
      <button className="button" onClick={() => updateValue(count + 1)}>
        + Add Another City
      </button>
      <button className="close" onClick={() => updateValue(count - 1)}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default AddMore;
