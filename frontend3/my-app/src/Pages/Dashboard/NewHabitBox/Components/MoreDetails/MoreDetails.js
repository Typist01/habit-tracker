/** @format */

import axios from "axios";
import React, { useState } from "react";
import SuccessPage from "../SuccessPage/SuccessPage";
import "./MoreDetails.css";
export default function MoreDetails(props) {
  const [userInputs, setUserInputs] = useState({
    habitName: "",
    regularSize: "",
  });
  const [disableInputs, setDisableInputs] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    if (name == "habitName") setUserInputs((v) => ({ ...v, habitName: val }));
    if (name == "regularSize")
      setUserInputs((v) => ({ ...v, regularSize: val }));
  }
  const [success, setSuccess] = useState(false);
  function submitHandler(e) {
    e.preventDefault();
    setDisableInputs(true);
    const userId = localStorage.getItem("userId");
    const path =
      process.env.REACT_APP_CREATE_HABIT_API +
      "key=" +
      process.env.REACT_APP_API_KEY;
    const postBody = {
      name: userInputs.habitName,
      user: userId,
      activityName: props.activity,
      unitType: props.units,
      defaultIncrement: userInputs.regularSize,
    };
    axios.post(path, postBody).then((data) => {
      console.log(data);
      if (data.data === "habit saved successfully") {
        setSuccess(true);
      }
    });
  }

  if (success) {
    return <SuccessPage />;
  }

  return (
    <React.Fragment>
      <h1> Hi from more details!</h1>
      <form className="more-details" onSubmit={submitHandler}>
        <label>
          Habit name
          <input
            disabled={disableInputs}
            name="habitName"
            value={userInputs.habitName}
            onChange={handleChange}
          />
        </label>
        <label>
          Regular Size
          <input
            disabled={disableInputs}
            name="regularSize"
            type="number"
            placeholder="number of repetitions per set"
            value={userInputs.regularSize}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
