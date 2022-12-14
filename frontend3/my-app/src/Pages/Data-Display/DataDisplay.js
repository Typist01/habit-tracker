/** @format */

import "./DataDisplay.css";
import {
  getAllDataByHabit,
  getHabitByID,
  deleteDataByID,
  deleteHabitByID,
} from "../../API/habit-data-api";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import EntryDisplayBox from "./EntryDisplayBox/EntryDisplayBox";


export default function DataDisplay() {
  const { habitID } = useParams();

  const [habitData, setHabitData] = useState([]);
  const [habit, setHabit] = useState({
    name: "",
  });

  useEffect(() => {
    // console.log("use effect running");
    getAllDataByHabit(habitID).then((res) => {
      //  console.log(res);
      setHabitData(res.data);
    });
    getHabitByID(habitID).then((res) => {
      //  console.log(res);
      setHabit(res.data);
    });
    // getData();
  }, []);

  function deleteDataHandler(id) {
    deleteDataByID(id);
  }

  function deleteHabitHandler(){
    deleteHabitByID(habitID);
    window.location.replace("http://localhost:3000/");
  }

  return (
    <React.Fragment>
      {habit.name && <h1 style={{ marginLeft: "10%" , display: "inline-block"}}>{habit.name}</h1>}
      <button className="delete-habit-button" onClick={() => { if (window.confirm('Are you sure you wish to delete this habit?')) deleteHabitHandler() }  }>
        <h3>Delete habit</h3>
      </button>
      <div className="data-display-table">
        Table function yet to be implemented...
      </div>
      <h1 style={{ marginLeft: "10%" }}>Activity Data</h1>
      {habitData.map((entry, index) => {
        return (
          <EntryDisplayBox key={index} entry={entry} onDelete={deleteDataHandler} />
        );
      })}
    </React.Fragment>
  );
}
