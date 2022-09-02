/** @format */

/** @format */

const axios = require("axios").default;

const signUpURL =
  "localhost:8080/users?key=pqw8efj231908hjr12unr10721j2f908h124f";

const API_KEY = "pqw8efj231908hjr12unr10721j2f908h124f";

function getUsers() {
  axios
    .get("http://localhost:8080/users?" + "key=" + API_KEY)
    .then((response) => {
      // handle success
      console.log(response.status);
    })
    .catch(function (error) {
      // handle error
      console.log(error.code);
    });
  //   .then(function () {
  //     // always executed
  //   });
}
// getUsers();

export async function signUp(email, username, password) {
  return axios
    .post("http://localhost:8080/users?" + "key=" + API_KEY, {
      email: email,
      username: username,
      passwordToken: password,
    })
    .then(function (response) {
      return { result: "success", response };
    })
    .catch(function (error) {
      return { result: "fail", response: error.response };
    });
}

signUp("email2@email.com", "user102", "password").then((data) =>
  console.log(data)
);

function loginUser(username, password) {
  // TODO if successful return true
  return axios
    .get(
      "http://localhost:8080/users/authorise?" +
        "key=" +
        API_KEY +
        "&username=" +
        username +
        "&password=" +
        password
    )
    .then((response) => {
      return { result: "success", response };
    })
    .catch(function (error) {
      return { result: "fail", response: error.response };
    });
}

// loginUser("user102", "password").then((data) => {
//   const dataStatus = data.status;
//   console.log(dataStatus);
// });
// const response = loginUser("user102", "password");
// console.log(response);

// loginUser("user102", "password").then((data) =>
//   console.log("data is: \n" + data.status)
// );

// if (signUp("email", "username", "paasdfassaawordd") == "success"){

// }

// async function handleSignUp(email, username, password) {
//   try {
//     await signUp(email, username, password).then((result) => {
//       console.log("logging result");
//       // console.log(result.);
//     });
//   } catch (e) {
//     return "caught";
//   }
// }

// console.log(signUp("user15@userdomain.com", "user15", "Password1234"));
// handleSignUp("user26@userdomain.com", "user26", "Password1234");
// function myFunction(a, b) {
//   return a(b);
// }
