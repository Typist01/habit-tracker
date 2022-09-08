/** @format */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHabitsByUser } from "../../API/dashboard-api";
import NavBar from "../../Components/NavBar/NavBar";
import "./Dashboard.css";
import HabitDisplayBox from "./HabitDisplayBox/HabitDisplayBox";
import NewHabitBox from "./NewHabitBox/NewHabitBox";

export default function Dashboard() {
  const [userHabits, setUserHabits] = useState([]);
  const username = localStorage.getItem("username");
  var habit_array;
  useEffect(() => {
    console.log("use effect running");
    getHabitsByUser(username)
      .then((res) => {
        console.log(res);
        setUserHabits(res.data);
      })
      .catch((error) => console.log(error.response));
  }, []);

  useEffect(() => {
    document.body.style = "background:#1E1E1E";
  }, []);
  return (
    <React.Fragment>
      {/* <div> */}
      <NavBar />
      <NewHabitBox />
      {userHabits.map((element, index) => {
        return (
          <HabitDisplayBox
            key={index}
            text="text from dashboard"
            habit={element}
          />
        );
      })}
      {/* </div> */}
    </React.Fragment>
  );
}

/*{ <form>
        {arr.map((element) => {
          return <h1>A heading</h1>;
        })}
        <input type="text" id="activity-name" value="I want to..." />
        <input type="submit" value="Add New Activity" />
      </form>
    </div> }*/
