import React from "react";
import "./RemoveDivClose.css";
import CloseIcon from "@mui/icons-material/Close";

const RemoveDivClose = ({ count, updateValue }) => {
  return (
    <div className="remove">
      <button className="closeremove" onClick={() => updateValue(count - 1)}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default RemoveDivClose;
