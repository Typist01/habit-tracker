/** @format */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityById } from "../../API/activity-data-api";
import { getHabitByID } from "../../API/habit-data-api";
import "./ActivityDisplay.css";

export default function ActivityDisplay() {
  const [isEditable, setIsEditable] = useState(false);
  const [userDetails, setUserDetails] = useState({
    sliderVal: null,
  });
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [habit, setHabit] = useState(null);
  function setSlider(e) {
    const val = e.target.value;
    setUserDetails({
      sliderVal: val,
    });
  }

  // fetch activity
  useEffect(() => {
    console.log("use effect running and sending id: " + id);
    getActivityById(id).then((res) => {
      console.log(res.data);
      setActivity(res.data);

      // setUserDetails
      getHabitByID(res.data.habit.id).then((res) => {
        setHabit(res.data);
        console.log("habit is " + habit);
      });
    });
  }, []);

  // fetch habit from id provided by activity
  // useEffect(() => {
  //   if (activity == null) return;
  //   getHabitByID(activity.habit.id).then((res) => {
  //     setHabit(res.data);
  //     console.log("habit is " + habit);
  //   });
  // }, [activity]);

  // when activity and habit data changes set userdetails
  // useEffect();

  function handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    name == "time" &&
      setActivity((v) => ({
        ...v,
        dateRecorded: v.dateRecorded.replace(v.dateRecorded.slice(-9, -4), val),
      }));
    if (name == "date" && val != "" && val.length < 11) {
      setActivity((v) => ({
        ...v,
        dateRecorded: v.dateRecorded.replace(v.dateRecorded.slice(0, 10), val),
      }));
    }
    if (name == "comment") {
      setActivity((v) => ({ ...v, feelingComment: val }));
      console.log(activity);
    }
    if (name == "amount") setActivity((v) => ({ ...v, amountDone: val }));
    if (name == "feelingScore")
      setActivity((v) => ({ ...v, feelingScore: val }));

    const activity = {
      feelingScore: 5,
      feelingComment: null,
      someUpdatingFunction: () => {
        console.log("hello world");
      },
    };

    console.log(name);
    console.log(val);
    console.log(typeof val);
  }
  useEffect(() => {
    if (userDetails.sliderVal != null)
      setActivity((v) => ({ ...v, feelingScore: userDetails.sliderVal }));
  }, [userDetails.sliderVal]);

  function submitHandler(e) {
    setIsEditable(false);
    e.preventDefault();
    console.log(activity);
    axios
      .patch(
        process.env.REACT_APP_PATCH_ACTIVITY +
          "key=" +
          process.env.REACT_APP_API_KEY,
        activity
      )
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
    <React.Fragment>
      <h1>Hi, welcome from activity display!</h1>
      <form className="activity-display" onSubmit={submitHandler}>
        <button
          className="edit-button"
          onClick={(e) => {
            e.preventDefault();
            setIsEditable((v) => !v);
          }}
        >
          Enable edit
        </button>

        <div className="activity-details-heading">
          <label className="amount">
            Amount recorded
            {activity ? (
              <input
                name="amount"
                className={`${!isEditable ? "not-editable" : null}`}
                type="number"
                value={activity.amountDone}
                disabled={!isEditable}
                onChange={handleChange}
              />
            ) : null}
          </label>
          {habit ? (
            <label className="units">
              {habit.unitType.id}
              {/* <input type="text" value={habit.unitType.id} /> */}
            </label>
          ) : null}
        </div>
        {activity ? (
          <label className="time">
            Time recorded
            <div className="block">
              <input
                disabled={!isEditable}
                type="time"
                name="time"
                className={`first ${!isEditable ? "not-editable" : null}`}
                value={activity.dateRecorded.slice(-9, -4)}
                onChange={handleChange}
              />
              <input
                disabled={!isEditable}
                className={`second ${!isEditable ? "not-editable" : null}`}
                type="date"
                name="date"
                value={activity.dateRecorded.slice(0, 10)}
                onChange={handleChange}
              />
            </div>
          </label>
        ) : null}

        {activity && (
          <label className="comment">
            Comment{" "}
            {/* <button
              className="add-comment-button"
              onClick={(e) => e.preventDefault()}
            >
              Add comment
            </button> */}
            <textarea
              name="comment"
              value={activity.feelingComment ? activity.feelingComment : ""}
              onChange={handleChange}
              type="text"
            />
          </label>
        )}
        {activity && (
          <label>
            Feeling Score: {activity.feelingScore ? activity.feelingScore : ""}
            <div class="slidecontainer">
              <input
                name="feelingScore"
                type="range"
                min="0"
                max="100"
                value={activity.feelingScore ? activity.feelingScore : null}
                onChange={handleChange}
                class="slider"
                id="myRange"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActivity((v) => ({ ...v, feelingScore: null }));
                }}
              >
                reset
              </button>
            </div>
          </label>
        )}

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}
