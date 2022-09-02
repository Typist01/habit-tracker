/** @format */

import { getValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./HabitDisplayBox.css";

export default function HabitDisplayBox(props) {
  const [buttonPresses, setButtonPresses] = useState(0);
  const [amount, setAmount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);
  const [customInputMode, setCustomInputMode] = useState(false);
  function defaultIncrementHandler() {
    setButtonPresses((v) => (v += 1));
  }
  useEffect(() => {
    setAmount(parseInt(props.habit.defaultIncrement) * buttonPresses);
    if (buttonPresses === 0) {
      return;
    }
    if (buttonPresses === 1) {
      setStopAnimation(false);
      setStartAnimation(true);
    }
    console.log(buttonPresses);
    const timerIdentity = setTimeout(() => {
      console.log("call the backend API here");
      const postBody = {
        habit_id: props.habit.id,
        date_recorded: null,
        amount_done: parseInt(props.habit.defaultIncrement) * buttonPresses,
      };
      // const postBody = JSON.stringify(myJSObject);
      const postUrl =
        process.env.REACT_APP_POST_ACTIVITY_API +
        "key=" +
        process.env.REACT_APP_API_KEY;
      console.log(postUrl);
      console.log(postBody);
      axios.post(postUrl, postBody);
      setStopAnimation(true);
      setStartAnimation(false);
      setButtonPresses(0);
    }, 2000);

    return () => {
      // console.log("clear method returned");
      clearTimeout(timerIdentity);
    };
  }, [buttonPresses]);

  function customInputModeHandler(){
    console.log(customInputMode);
    setCustomInputMode((v) => (!v));

  }

  return (
    <React.Fragment>
      {/* <h1>Adding {amount}</h1> */}
      {/* {modalShown?<ModalComponent></ModalComponent>:null} */}
      <div
        className={`display-habit-container-box 
        ${startAnimation ? "breathe-in" : null} 
        ${stopAnimation ? "breathe-out" : null}
        ${customInputMode ? "big-habit-container-box": null}`}
      >
        <div className="habit habit-display-margin-auto">
          <div className="habit-name-box">
            {/* todo change props  */}
            <h3>{props.habit.name}</h3>
            <p className={`${amount > 0 ? null : "not-visible"}`}>
              {"Adding " + amount}
            </p>
          </div>
        </div>
        {/* <button className="generic-add habit-display-margin-auto"> */}
        {props.habit.defaultIncrement ? (
          <button
            className="generic-add habit-display-margin-auto"
            onClick={() => {
              console.log("magenta");
              defaultIncrementHandler();
            }}
          >
            <div className="textbox">
              {/* todo use prop of users chosen number(if exists) */}
              {/* on click, something something data input to database using user chosen number */}
              <h1>+{props.habit.defaultIncrement}</h1>
            </div>
          </button>
        ) : (
          <div className="generic-add habit-display-margin-auto" style={{ zIndex: "-1" }}>
            {/* <input
                style={{
                  lineHeight: "40px",
                  margin: "auto",
                  width: "80%",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              ></input> */}
            {/* todo use prop of users chosen number(if exists) */}
            {/* on click, something something data input to database using user chosen number */}
            <h1>{props.habit.defaultIncrement}</h1>
          </div>
        )}
        {/* </button> */}
        <button className={"custom-add habit-display-margin-auto "} onClick={customInputModeHandler}>
          <div className="textbox">
            {/* todo box appears to enter custom number MUST be a number */}
            <h1>Custom</h1>
          </div>
        </button>
        <div className={`custom-input-entry ${customInputMode ? null : "hidden"}`}>
          <div className="textbox">
            <h1>Custom number goes here</h1>
          </div>
        </div>
        <div className={`custom-input-submit ${customInputMode ? null : "hidden"}`}>
          <div className="textbox">
            <h1>Custom number goes here</h1>
          </div>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: "1" }}> </div>
    </React.Fragment>
  );
}
