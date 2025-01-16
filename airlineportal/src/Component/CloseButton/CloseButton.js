import React, { useContext } from "react";
import "./CloseButton.css"; // Optional CSS for styling
import { FlightContext } from "../../FlightContext";

const CloseButton = ({ count, updateValue }) => {
  const{
    setSelectedFrom4,
    setSelectedTo4,
    setSelectedFrom3,
    setSelectedTo3,
    setSelectedFrom2,
    setSelectedTo2,
  }=useContext(FlightContext)
  const remove = () => {
    if(count==4){
      setSelectedFrom4({
        name: "",
        city: "",
        code: "",
        country: "",
      })
      setSelectedTo4({
        name: "",
        city: "",
        code: "",
        country: "",
      })
      updateValue(count - 1);
      return
    }
    if(count==3){
      setSelectedFrom3({
        name: "",
        city: "",
        code: "",
        country: "",
      })
      setSelectedTo3({
        name: "",
        city: "",
        code: "",
        country: "",
      })
      updateValue(count - 1);
      return
    }
    if(count==2){
      setSelectedFrom2({
        name: "",
        city: "",
        code: "",
        country: "",
      })
      setSelectedTo2({
        name: "",
        city: "",
        code: "",
        country: "",
      })
      updateValue(count - 1);
      return
    }
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "14px", marginLeft: "160px" }}
    >
      <button className="close-button" onClick={remove}>
        X
      </button>
    </div>
  );
};

export default CloseButton;
