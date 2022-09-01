/** @format */
import React, { useEffect, useState } from "react";
import { getHabitsByUser } from "../../API/dashboard-api";
import "./Dashboard.css";
import HabitDisplayBox from "./HabitDisplayBox/HabitDisplayBox";
import NewHabitBox from "./NewHabitBox/NewHabitBox";

export default function Dashboard() {
  const [userHabits, setUserHabits] = useState([]);
  const username = "username7";
  var habit_array;
  useEffect(() => {
    document.body.style = "magestic-mode-background";
    console.log("use effect running");

    getHabitsByUser(username)
      .then((data) => {
        console.log(data);
        setUserHabits(data);
      })
      .catch((error) => console.log(error.response));
  }, []);

  // habit_array = userHabits.map((element) => {
  //   return <HabitDisplayBox element={element} />;
  // });

  return (
    <React.Fragment>
      <div>
        <h1> hi from dashboard</h1>
        <div class="magestic-mode">
          <h1>hi from magestic mode div</h1>

          <HabitDisplayBox />
          <HabitDisplayBox />
          <HabitDisplayBox />
          <NewHabitBox />
        </div>
      </div>
    </React.Fragment>
    // <React.Fragment>
    //   <h1> hi</h1>
    //   {/* <div class="magestic-mode habits-modal"> */}
    //   {/* todo: get all habits from a user that is logged in */}
    //   {/* for each habit : usershabits {habitdisplaybox(habit name, constant amount) } */}
    //   {/* {habit_array} */}
    //   {/* <h1> hi from dashboard</h1> */}
    //   {/* <br /> */}
    //   {/* <div class="habits-modal-open-btn"> */}
    //   {/* <NewHabitBox /> */}
    //   {/* </div> */}
    //   {/* </div> */}
    // </React.Fragment>
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

function modalLogic() {
  // Get the modal
  var modal = document.getElementById("habits-modal");

  // Get the button that opens the modal
  var openBtn = document.getElementById("habits-modal-open-btn");

  // Get the <span> element that closes the modal
  //var closeBtn = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  openBtn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  // closeBtn.onclick = function () {
  //   modal.style.display = "none";
  // };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
