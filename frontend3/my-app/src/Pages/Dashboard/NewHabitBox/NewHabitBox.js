/** @format */
import React, { useEffect, useState } from "react";
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

  return (
    <React.Fragment>
      <div class="newHabitContainer">
        <form>
          <input
            type="text"
            id="activity-name"
            value={activity}
            onChange={getActivityInput}
          />
          <input
            type="submit"
            value="Add New Activity"
            onClick={submitActivity}
          />
        </form>
      </div>
    </React.Fragment>
  );
}
