import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OneWaySearch from "./Pages/OneWaySearch";
import RoundTripSearch from "./Pages/RoundTripSearch";
import MultiWaySearch from "./Pages/MultiWaySearch";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp/SignUp";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Status from "./Pages/Status";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { FlightContext } from "./FlightContext";
import nightImage from "./night.webp";

function App() {
  const { darkMode } = useContext(FlightContext);
  return (
    <BrowserRouter>
      <Helmet>
        {darkMode === true && (
          <style type="text/css">
            {`
        .App {
          background-image: url('${nightImage}');
        }
          .header{
            background: rgba(0, 0, 0, 0.6); 
            color:white;
            }
            .dark{
            color:black;
            }
            .mincontainer{
              background: rgba(0, 0, 0, 0.6); 
            }
              .from,.to {
              color: white;
              border: 0.1em solid white;
              }
              .swap{
              color:white
              }
              .trip{
                color: white
                }
              .class{
                border: 0.1em solid white;
                color: white;
              }
              .traveller-summary{
                color: white;
                border: 1px solid white;
              }
              .time{
              border: 0.1em solid white;
              color: white;
              }
              .date-section.half + .date-section.half {
              border-left: 2px solid white;
            }
            .multicontainer1,.multicontainer2,.multicontainer3,.multicontainer{
            background: rgba(0, 0, 0, 0.6);
            }
            .last1,.last2,.last3,.last4,.last5,.last6,.last7,.last8,.last9{
            border: 1px solid white;
            background: rgba(0, 0, 0, 0.6);
            color:white;
            }
            .lastouter1,.lastouter2,.lastouter3,.lastouter4,.lastouter5,.lastouter6,.lastouter7,.lastouter8,.lastouter9{
            border: 1px solid white;
            background: rgba(0, 0, 0, 0.6);
            color:white;
            }
            .time:hover{
            background: rgba(0, 0, 0, 0.8);
            border-radius: 30px;
            border: 0.1em solid white;
            color: white;
            }
            .traveller-summary:hover {
              background: rgba(0, 0, 0, 0.8);
              border-radius: 30px;
              border: 1px solid white;
              color: white;
            }
            .from:hover,.to:hover{
             background: rgba(0, 0, 0, 0.8);
             color: white;
             border: 0.1em solid white;
            }
             .swap:hover{
             background: rgba(0, 0, 0, 0.8);
             }

             .a,.b{
             border:1px solid black;
             }
             .bookingDetails{
               color: black;
             }
              .singlediv{
              color:white
             }
             .searchone{
             background: rgba(0, 0, 0, 0.8);
             color:white
            }
             .checkone{
             background: rgba(0, 0, 0, 0.8);
             color:white;
             }
             .checkround{
              background: rgba(0, 0, 0, 0.8);
              color:white
             }
              .searchround{
              background: rgba(0, 0, 0, 0.8);
              }
              .singleround{
              background: rgba(0, 0, 0, 0.5);
              color:white
              }
              .singleround1{
              background: rgba(0, 0, 0, 0.5);
              color:white
              }
              .dropdown{
              background: rgba(0, 0, 0, 0.2);
              color:rgba(255, 255,255, 0.9)
              }
              .location-input {
              background: rgba(0, 0, 0, 0.8);
            }
              .dropdown-item:hover {
              background: rgba(255, 255, 255, 0.1);
            }
            .iconsearch,.iconsearch1{
            color:white;
            }
            .dropdown-multi {
              background: rgba(0, 0, 0, 0.2);
            }
            .dropdown-item-multi {
              color:rgba(255, 255,255, 0.9)
            }
              .dropdown-item-multi:hover {
              background: rgba(255, 255, 255, 0.1);
            }
            .location-input-multi {
              background: rgba(0, 0, 0, 0.8);
            }
            .react-datepicker__day {
            color:white
            }
            .react-datepicker__day:hover {
            color:black
            }
            .react-datepicker {
              background: rgba(0, 0, 0, 0.8);
            }
              .react-datepicker__day--disabled {
              color: rgba(255, 255, 255, 0.3); 
              }
              .search-dropdown{
              background: rgba(0, 0, 0, 0.2);
              }
              .search-dropdown-item{
              color:rgba(255, 255,255, 0.9);
              }
              .search-location-input {
              background: rgba(0, 0, 0, 0.8);
            }
               .search-dropdown-item:hover {
              background: rgba(255, 255, 255, 0.1);
            }
              .multisearch{
              background-color: rgba(0, 0, 0, 0.8);
              }
              .maindiv{
              background-color: rgba(0, 0, 0, 0.5);
            }
              .checkmulti{
              background-color: rgba(0, 0, 0, 0.8);
              color:rgba(255, 255, 255, 0.8);
              }
      `}
          </style>
        )}
      </Helmet>

      <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/onewaysearch" Component={OneWaySearch} />
        <Route path="/roundtripsearch" Component={RoundTripSearch} />
        <Route path="/multiwaysearch" Component={MultiWaySearch} />
        <Route path="/loginpage" Component={LoginPage} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/status" Component={Status} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
