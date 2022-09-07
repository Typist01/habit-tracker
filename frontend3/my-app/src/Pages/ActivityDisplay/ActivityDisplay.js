/** @format */

import React, { useState } from "react";
import "./ActivityDisplay.css";

export default function ActivityDisplay() {
  const [userDetails, setUserDetails] = useState({
    sliderVal: 50,
  });

  function setSlider(e) {
    const val = e.target.value;
    setUserDetails({
      sliderVal: val,
    });
  }

  return (
    <React.Fragment>
      <h1>Hi, welcome from activity display!</h1>
      <form className="activity-display">
        <label className="amount">
          Amount recorded
          <input type="number" />
        </label>
        <label className="time">
          Time recorded
          <div className="block">
            <input type="time" className="first" />
            <input type="date" className="second" />
          </div>
        </label>

        <label className="comment">
          Comment
          <textarea type="text" />
        </label>

        <label>
          Feeling Score
          <input />
        </label>
        <div class="slidecontainer">
          <input
            type="range"
            min="0"
            max="100"
            value={userDetails.sliderVal}
            onChange={setSlider}
            class="slider"
            id="myRange"
          />
        </div>
      </form>
    </React.Fragment>
  );
}
