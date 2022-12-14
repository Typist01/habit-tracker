/** @format */

import { getValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./HabitDisplayBox.css";
import { Link } from "react-router-dom";

export default function HabitDisplayBox(props) {
  const [buttonPresses, setButtonPresses] = useState(0);
  const [amount, setAmount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);

  const [customInputMode, setCustomInputMode] = useState(false);
  //const [customButtonPresses, setCustomButtonPresses] = useState(0);
  const [startCustomAnimation, setStartCustomAnimation] = useState(false);
  //const [stopCustomAnimation, setStopCustomAnimation] = useState(false);

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

  // CUSTOM BUTTON
  // useEffect(() => {
  //   if (customButtonPresses === 0) {
  //     return;
  //   }
  //   if (customButtonPresses === 1) {
  //     setStopCustomAnimation(false);
  //     setStartCustomAnimation(true);
  //   }
  //   const timerIdentity = setTimeout(() => {
  //     setStopCustomAnimation(true);
  //     setStartCustomAnimation(false);
  //     setCustomButtonPresses(0);
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timerIdentity);
  //   };

  // }, [customButtonPresses]);

  function customInputModeHandler() {
    // console.log(customInputMode);
    setCustomInputMode((v) => !v);
    setStartCustomAnimation(true);
    setTimeout(() => setStartCustomAnimation(false), 500);
  }
  
  function turnOffCustomMode(){
    setCustomInputMode(false);
  }

  const [customInputValue, setCustomInputValue] = useState("");
  // const [submitted, setIsSubmitted] = useState("submitted")
  // useEffect(() => {
  //   console.log(customInputValue)
  // }, [customInputValue])

  function handleCustomInputChange(e) {
    const val = e.target.value;
    setCustomInputValue(val);

    return;
    // console.log (val)
    // console.log(typeof val);
    // if(typeof (val) === 'number'){
    //   console.log("is a number")
    //   setCustomInputValue(val);
    //   return
    // }
    // console.log("e or - entered")
    // return;
  }

  async function customInputSubmitHandler(e) {
    turnOffCustomMode();
    e.preventDefault();
    console.log(props.habit);
    const postBody = {
      habit_id: props.habit.id,
      date_recorded: null,
      amount_done: parseInt(customInputValue),
    };
    // const postBody = JSON.stringify(myJSObject);
    const postUrl =
      process.env.REACT_APP_POST_ACTIVITY_API +
      "key=" +
      process.env.REACT_APP_API_KEY;
    const result = await axios.post(postUrl, postBody);
    console.log(result);

    return 0;
  }

  const pathName = "/data-display";
  return (
    <React.Fragment>
      {/* <h1>Adding {amount}</h1> */}
      {/* {modalShown?<ModalComponent></ModalComponent>:null} */}

      <div
        className={`display-habit-container-box 
        ${startAnimation ? "breathe-in" : null} 
        ${stopAnimation ? "breathe-out" : null}
        ${customInputMode ? "big-habit-container-box " : null}
        `}
        //  ${stopCustomAnimation ? "breathe-out" : null}
      >
        <div className="habit habit-display-margin-auto">
          <Link to={pathName + "/" + props.habit.id}>
            <div className="habit-name-box">
              {/* todo change props  */}
              <h3>{props.habit.name}</h3>
              <p className={`${amount > 0 ? null : "not-visible"}`}>
                {"Adding " + amount + " " + props.habit.unitType.id}
              </p>
            </div>
          </Link>
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
          <div
            className="generic-add habit-display-margin-auto"
            style={{ zIndex: "-1" }}
          >
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
        <button
          className={`custom-add habit-display-margin-auto ${
            startCustomAnimation ? `customAnimation` : ""
          }`}
          onClick={customInputModeHandler}
        >
          <div className={`textbox`}>
            {/* todo box appears to enter custom number MUST be a number */}
            <h1>Custom</h1>
          </div>
        </button>

        <form
          className="custom-form"
          method="post"
          onSubmit={customInputSubmitHandler}
        >
          <div
            className={`custom-input-entry ${
              customInputMode ? null : "hidden"
            }`}
          >
            <div className="textbox">
              <input
                type="number"
                value={customInputValue}
                onChange={handleCustomInputChange}
                placeholder="custom number goes here"
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className={`custom-input-submit ${
              customInputMode ? null : "hidden"
            }`}
          >
            <div className="textbox">
              <h1>Submit</h1>
            </div>
          </button>
        </form>
      </div>
      <div style={{ position: "relative", zIndex: "1" }}> </div>
    </React.Fragment>
  );
}
