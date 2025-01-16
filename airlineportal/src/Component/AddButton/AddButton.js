import React from "react";
import "./AddButton.css";

const AddButton = ({ count, updateValue }) => {
  return (
      <button className="button1" onClick={() => updateValue(count + 1)}>
        + Add City
      </button>
  );
};

export default AddButton;
