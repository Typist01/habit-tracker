/** @format */

import React, { useState } from "react";
import MoreDetails from "../MoreDetails/MoreDetails";
import "./NewHabitPage.css";

export default function NewHabitPage() {
  const [userInputs, setUserInputs] = useState({
    activity: "",
    units: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    if (name == "activity") setUserInputs((v) => ({ ...v, activity: val }));
    if (name == "units") setUserInputs((v) => ({ ...v, units: val }));
  }

  const [proceed, setProceed] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setProceed(true);
  }
  if (proceed)
    return (
      <MoreDetails activity={userInputs.activity} units={userInputs.units} />
    );

  return (
    <React.Fragment>
      <form className="create-habit" onSubmit={handleSubmit}>
        <h1> Create a new habit ... </h1>
        <label>
          Activity
          <input
            name="activity"
            value={userInputs.activity}
            onChange={handleChange}
          />
        </label>
        <label>
          Units
          <input
            name="units"
            value={userInputs.units}
            onChange={handleChange}
          />
        </label>
        <button>Next</button>
      </form>
    </React.Fragment>
  );
}
