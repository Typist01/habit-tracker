
import "./DataDisplay.css"
import { getAllDataByHabit, getHabitByID } from "../../API/habit-data-api";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios";
import EntryDisplayBox from "./EntryDisplayBox/EntryDisplayBox";

export default function DataDisplay(){
    const {habitID} = useParams();

    const [habitData, setHabitData] = useState([]);
    const [habit, setHabit] = useState("");
    
    useEffect(() => {
        console.log("use effect running");
        getAllDataByHabit(habitID).then((res) => {
            console.log(res);
            setHabitData(res.data);
          })
          getHabitByID(habitID).then((res) => {
          console.log(res);
          setHabit(res.data);
        })
        
      }, []);

    

    return(
        <React.Fragment>
          <h1>{habitID}</h1>
        <div className="data-display-table">
        Table function yet to be implemented...
        </div>
        {habitData.map((entry) => {return <EntryDisplayBox key={entry} entry={entry} />})}

        </React.Fragment>
    )
}