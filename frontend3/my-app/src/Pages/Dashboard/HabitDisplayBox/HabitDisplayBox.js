/** @format */

import "./HabitDisplayBox.css";

export default function HabitDisplayBox(props) {
  return (
    <div class="display-habit-container-box ">
      <div class="habit margin-auto">
        <div class="textbox">
          {/* todo change props  */}
          <h3>props.habitname</h3>
        </div>
      </div>
      <div class="generic-add margin-auto">
        <div class="textbox">
          {/* todo use prop of users chosen number(if exists) */}
          {/* on click, something something data input to database using user chosen number */}
          <h1>+usernum</h1>
        </div>
      </div>
      <div class="custom-add margin-auto ">
        <div class="textbox">
          {/* todo box appears to enter custom number MUST be a number */}
          <h1>Custom</h1>
        </div>
      </div>
    </div>
  );
}
