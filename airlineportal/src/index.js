import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FlightProvider } from "./FlightContext";

ReactDOM.render(
  <FlightProvider>
    <App />
  </FlightProvider>,
  document.getElementById("root")
);
