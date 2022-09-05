// const axios = require("axios").default;
import axios from "axios";


export async function getAllDataByHabit(habitID){
    const path = (process.env.REACT_APP_GET_DATA_BY_HABIT +
        "key=" +
        process.env.REACT_APP_API_KEY +
        "&habitID=" +
        habitID)
        console.log(path)
        const result = await axios.get(path);
        return result;
    // return 
    //     axios.get(path).then((data) =>{
    //         return data
    //     }).catch(error =>{
    //         return error
    //     })

            // .then(res=>{ 
            //     console.log(res)
            //     if (res.status=200){
            //         return({result:"success", data:res.data})
            //     }
            // })
            // .catch((error) => {
            //     return error.response;
            //   });
}