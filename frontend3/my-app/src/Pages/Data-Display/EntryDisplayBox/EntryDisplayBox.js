import React, { useEffect, useState } from "react";
import "./EntryDisplayBox.css";

export default function EntryDisplayBox(props){
    const [deleteCheck, setDeleteCheck] = useState(false);

    function deleteButtonHandler(){
      setDeleteCheck((v) => (!v));
      return;
    }


    return (
    <React.Fragment>
      <div
        className={`display-entry-container-box 
        ${deleteCheck ? "big-habit-container-box": null}`}
      >
        
        <div className="date entry-display-margin-auto">
          <div className="entry-textbox" style={{textAlign:"left"}}>
            <h3>Date: {props.entry.dateRecorded}</h3>
          </div>
        </div>

        <div className="amount entry-display-margin-auto">
            <div className="entry-textbox" style={{textAlign:"left"}}>
              <h3>Amount: {props.entry.amountDone}</h3>
            </div>
        </div>

        <button className="edit entry-display-margin-auto">
          <div className="entry-textbox">
            <h3>edit</h3>
          </div>
        </button>

        <button className={"delete entry-display-margin-auto"} onClick={deleteButtonHandler}>
          <div className="entry-textbox" style={{marginLeft:0 , marginRight:0}}>
            <h3>X</h3>
          </div>
        </button>

        <button className={`delete-confirm ${deleteCheck ? null : "hidden"}`}>
          <div className="textbox">
           <h3>Delete</h3>
          </div>
        </button>

        <button className={`delete-cancel ${deleteCheck ? null : "hidden"}`} onClick={deleteButtonHandler}>
          <div className="textbox">
            <h1>cancel</h1>
          </div>
        </button>

      </div>
    </React.Fragment>
    )
}