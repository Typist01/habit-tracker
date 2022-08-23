/** @format */

import { useEffect } from "react";
import "./Overview.css";

export default function Overview() {
  useEffect(() => {
    document.body.style = "background:#1E1E1E";
  }, []);

  //   rgb(0,37,80)

  return (
    <div>
      <input
        className="overview-new-activity-input"
        placeholder="New activity ..."
      ></input>

      <div className="overview-activities-container"></div>
    </div>
  );
}
