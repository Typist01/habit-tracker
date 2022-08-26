/** @format */
import React, { useEffect } from "react";
import "./NewHabitBox.css";
export default function NewHabitBox() {
  return (
    <div class="magestic-mode">
      <form>
        <input type="text" id="activity-name" value="I want to..." />
        <input type="submit" value="Add New Activity" />
      </form>
    </div>
  );
}
