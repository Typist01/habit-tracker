
import "./DataDisplay.css"
import { getAllDataByHabit } from "../../API/habit-data-api";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios";

export default function DataDisplay(){
    const {habitID} = useParams();

    const [habitData, setHabitData] = useState([]);
    
    const path = (process.env.REACT_APP_GET_DATA_BY_HABIT +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&habitID=" +
        habitID)
        console.log(path)

    useEffect(() => {
        console.log("use effect running");
        getAllDataByHabit(habitID).then((res) => {
            console.log(res);
            setHabitData(res.data);
          })

        // axios.get(path).then((data) =>{
        //   console.log(data)
        //     return data
        // }).catch(error =>{
        //   console.log(error)
        //     return error
        // })
      }, []);

    

    return(
        <React.Fragment>
          <h1>{habitID}</h1>
        <div className="data-display-table">
        Table function yet to be implemented...
        </div>
        {habitData.map((entry) => {return <div key={entry.id}>{entry.id}</div>})}

        </React.Fragment>
    )
}