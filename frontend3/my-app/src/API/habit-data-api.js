// const axios = require("axios").default;
import axios from "axios";


export async function getAllDataByHabit(habitID){
    const path = (process.env.REACT_APP_GET_DATA_BY_HABIT_API +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&habitID=" +
        habitID)
        console.log(path)
        const result = await axios.get(path);
        return result;
}

export async function getHabitByID(habitID){
    console.log("The Id passed was this: " + habitID)
    const path = (process.env.REACT_APP_HABIT_BY_ID_API +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&habitID=" +
        habitID
        )
        console.log("the path about to use is this:" + path)
        try{
        const result = await axios.get(path);
        // axios.get(path).then(res => return res)
        return result;
        } catch(error) {
            console.log(path)
            console.log(error)
            return error;
        }
}