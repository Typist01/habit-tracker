/** @format */
import React, { useEffect } from "react";
import "./Dashboard.css";
import HabitDisplayBox from "./HabitDisplayBox/HabitDisplayBox";
import NewHabitBox from "./NewHabitBox/NewHabitBox";
export default function Dashboard() {
  useEffect(() => {
    document.body.style = "magestic-mode-background";
  }, []);
  const arr = ["", "", ""];
  return (
    <React.Fragment>
      <div class="magestic-mode">
        {/* <h1> hi from dashboard </h1> */}
        <div id="habitDisplayBox">
          <HabitDisplayBox />
        </div>
        <br />
        <div id="newHabitBox">
          <NewHabitBox />
        </div>
      </div>
    </React.Fragment>

    /*{ <form>
        {arr.map((element) => {
          return <h1>A heading</h1>;
        })}
        <input type="text" id="activity-name" value="I want to..." />
        <input type="submit" value="Add New Activity" />
      </form>
    </div> }*/
  );
}
