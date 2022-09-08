/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityById } from "../../API/activity-data-api";
import { getHabitByID } from "../../API/habit-data-api";
import "./ActivityDisplay.css";

export default function ActivityDisplay() {
  const [userDetails, setUserDetails] = useState({
    sliderVal: 50,
  });
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const [habit, setHabit] = useState({});
  function setSlider(e) {
    const val = e.target.value;
    setUserDetails({
      sliderVal: val,
    });
  }

  useEffect(() => {
    console.log("use effect running and sending id: " + id);
    getActivityById(id).then((res) => {
      console.log(res.data);
      setActivity(res.data);
    });
  }, []);

  useEffect(() => {
    getHabitByID(activity.habit.id).then((res) => {
      setHabit(res.data);
      console.log("habit is " + habit);
    });
  }, [activity]);

  return (
    <React.Fragment>
      <h1>Hi, welcome from activity display!</h1>
      <form className="activity-display">
        <div className="activity-details-heading">
          <label className="amount">
            Amount recorded
            {activity.amountDone && (
              <input type="number" value={activity.amountDone} />
            )}
          </label>
          <label className="units">
            units
            <input type="number" />
          </label>
        </div>
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
