// const axios = require("axios").default;
import axios from "axios";


export async function getAllDataByHabit(habitID){
    const path = (process.env.REACT_APP_GET_DATA_BY_HABIT_API +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&habitID=" +
        habitID)
        // console.log(path)
        const result = await axios.get(path);
        return result;
}
// REACT_APP_HABIT_BY_ID_API
export async function getHabitByID(habitID){
    // console.log("The Id passed was this: " + habitID)
    const path2 = (process.env.REACT_APP_GETHABIT +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&habitID=" +
        habitID
        )
        try{
            // const config = {
            //     method:"get",
            //     url: path2,
            //     responseType:"stream"
            // }
        const result = await axios.get(path2);
        // axios.get(path).then(res => return res)
        return result;
        } catch(error) {
            console.log(path2)
            console.log(error)
            return error;
        }
}

export async function deleteDataByID(dataID){
    console.log("The Id passed was this: " + dataID)
    const path3 = (process.env.REACT_APP_DELETEDATA +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&deleteID=" +
        dataID
        )
        try{
            // const config = {
            //     method:"get",
            //     url: path2,
            //     responseType:"stream"
            // }
        const result = await axios.delete(path3);
        // axios.get(path).then(res => return res)
        return result;
        } catch(error) {
            console.log(path3)
            console.log(error)
            return error;
        }
}

export async function deleteHabitByID(habitID){
    console.log("The Id passed was this: " + habitID)
    const path4 = (process.env.REACT_APP_DELETEHABIT +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&deleteID=" +
        habitID
        )
        try{
            // const config = {
            //     method:"get",
            //     url: path2,
            //     responseType:"stream"
            // }
        const result = await axios.delete(path4);
        // axios.get(path).then(res => return res)
        return result;
        } catch(error) {
            console.log(path4)
            console.log(error)
            return error;
        }
}