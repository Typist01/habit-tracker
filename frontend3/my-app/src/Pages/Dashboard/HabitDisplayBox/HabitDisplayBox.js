/** @format */

import React, { useEffect, useState } from "react";
import "./HabitDisplayBox.css";

export default function HabitDisplayBox(props) {
  const [buttonPresses, setButtonPresses] = useState(0);
  function defaultIncrementHandler() {
    setButtonPresses((v) => (v += 1));
  }
  useEffect(() => {
    if (buttonPresses == 0) {
      return;
    }
    console.log(buttonPresses);

    const timerIdentity = setTimeout(() => {
      console.log("call the backend API here");
    }, 3000);

    return () => {
      console.log("clear method returned");
      clearTimeout(timerIdentity);
    };
  }, [buttonPresses]);

  return (
    <React.Fragment>
      {/* {modalShown?<ModalComponent></ModalComponent>:null} */}
      <div className="display-habit-container-box ">
        <div className="habit margin-auto">
          <div className="textbox">
            {/* todo change props  */}
            <h3>{props.habit.name}</h3>
          </div>
        </div>
        {/* <button className="generic-add margin-auto"> */}
        {props.habit.defaultIncrement ? (
          <button
            className="generic-add margin-auto"
            onClick={() => {
              console.log("magenta");
              defaultIncrementHandler();
            }}
          >
            <div className="textbox">
              {/* todo use prop of users chosen number(if exists) */}
              {/* on click, something something data input to database using user chosen number */}
              <h1>{props.habit.defaultIncrement}</h1>
            </div>
          </button>
        ) : (
          <div className="generic-add margin-auto" style={{ zIndex: "-1" }}>
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
        <div className="custom-add margin-auto ">
          <div className="textbox">
            {/* todo box appears to enter custom number MUST be a number */}
            <h1>Custom</h1>
          </div>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: "1" }}>
        {" "}
        You have entered X increments
      </div>
    </React.Fragment>
  );
}
