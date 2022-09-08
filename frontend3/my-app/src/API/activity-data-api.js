/** @format */

import axios from "axios";

export async function getActivityById(id) {
  console.log("id passed was " + id);
  return axios
    .get(
      process.env.REACT_APP_GET_ACTIVITY +
        id +
        "?key=" +
        process.env.REACT_APP_API_KEY
    )
    .then((res) => {
      //   console.log(res.data);
      return { result: "success", data: res.data };
    })
    .catch((err) => {
      //   console.log(err);
      return { result: "fail", error: err.response };
    });
}
