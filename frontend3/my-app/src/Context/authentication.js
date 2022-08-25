/** @format */

// import fetch;
const axios = require("axios").default;

const signUpURL =
  "localhost:8080/users?key=pqw8efj231908hjr12unr10721j2f908h124f";

const API_KEY = "pqw8efj231908hjr12unr10721j2f908h124f";

function getUsers() {
  axios
    .get("http://localhost:8080/users?" + "key=" + API_KEY)
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  //   .then(function () {
  //     // always executed
  //   });
}

export function signUp(email, username, password) {
  axios
    .post("http://localhost:8080/users?" + "key=" + API_KEY, {
      email: email,
      username: username,
      passwordToken: password,
    })
    .then(function (response) {
      if (response.status == 200) {
        return "success";
      }
      console.log(response.status);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return "fail";
    });
}

function loginUser() {
  // TODO if successful return true
  // if unsuccessful return false
}

// if (signUp("email", "username", "password") == "success"){

// }

signUp();
