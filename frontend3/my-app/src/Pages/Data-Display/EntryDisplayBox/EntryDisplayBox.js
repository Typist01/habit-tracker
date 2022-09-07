/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EntryDisplayBox.css";

export default function EntryDisplayBox(props) {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  let navigate = useNavigate();

  function deleteModeToggle() {
    setDeleteCheck((v) => !v);
    return;
  }
  function confirmedDelete() {
    setIsDeleted(true);
    props.onDelete(props.entry.id);
  }

  return (
    <React.Fragment>
      <div
        className={`display-entry-container-box 
        ${deleteCheck ? "big-habit-container-box" : null}
        ${isDeleted ? "entry-hidden" : null}`}
      >
        <div className="date entry-display-margin-auto">
          <div className="entry-textbox" style={{ textAlign: "left" }}>
            <h3>Date: {props.entry.dateRecorded}</h3>
          </div>
        </div>

        <div className="amount entry-display-margin-auto">
          <div className="entry-textbox" style={{ textAlign: "left" }}>
            <h3>Amount: {props.entry.amountDone}</h3>
          </div>
        </div>

        <button
          className="edit entry-display-margin-auto"
          onClick={() => {
            navigate("/activity-details/" + props.entry.id);
          }}
        >
          {/* <Link to={"/activity-data/" + props.entry.id}> */}
          <div>
            <div className="entry-textbox">
              <h3>edit</h3>
            </div>
          </div>
          {/* </Link> */}
        </button>

        <button
          className={"delete entry-display-margin-auto"}
          onClick={deleteModeToggle}
        >
          <div
            className="entry-textbox"
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            <h3>X</h3>
          </div>
        </button>

        <button
          className={`delete-confirm ${deleteCheck ? null : "hidden"}`}
          onClick={confirmedDelete}
        >
          <div className="textbox">
            <h3>Delete</h3>
          </div>
        </button>

        <button
          className={`delete-cancel ${deleteCheck ? null : "hidden"}`}
          onClick={deleteModeToggle}
        >
          <div className="textbox">
            <h3>cancel</h3>
          </div>
        </button>
      </div>
    </React.Fragment>
  );
}
