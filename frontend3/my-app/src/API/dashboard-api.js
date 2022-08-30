/** @format */
const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

function getApiEndpointWithKey() {
  return process.env.USER_HABITS_API + "key=" + process.env.API_KEY;
}
// import {getHabitsByUser} from "../../filename.js"
function getHabitsByUser(username) {
  return axios
    .get(getApiEndpointWithKey() + "&username=" + username)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function createHabit(habit) {
  return axios
    .post(process.env.CREATE_HABIT_API, habit)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

const myHabit = {
  name: "",
  user: "422990849",
  activityName: "pushups",
  unitType: "reps",
  defaultIncrement: "10",
};
createHabit(myHabit).then((response) => console.log(response)); // works

// getHabitsByUser("user200").then((res) => console.log(res.data)); // should work
