/** @format */
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import "./NewHabitBox.css";
export default function NewHabitBox() {
  const [activity, setActivity] = useState("I want to ");

  function getActivityInput(e) {
    console.log(e.target.value);
    const value = e.target.value;
    setActivity(value);
  }

  function submitActivity() {
    window.alert(activity);
  }
  const buttonStyle = {
    color: "white",
    backgroundColor: "#00428D",
    width: "400px",
    borderRadius: "8px",
    height: "50px",
    margin: "20px auto",
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <button style={buttonStyle}> Add a new habit... </button>
      </div>
    </React.Fragment>
  );
}
