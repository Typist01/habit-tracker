/** @format */
import "./Signup.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { signUp } from "../../API/authentication";
export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [disableInputs, setDisableInputs] = useState()

  function handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    name == "username" && setUserDetails((v) => ({ ...v, username: val }));
    name == "email" && setUserDetails((v) => ({ ...v, email: val }));
    name == "password" && setUserDetails((v) => ({ ...v, password: val }));
  }

  const weakSecurityStyle = {
    color: "red",
    backgroundColor: "magenta",
  };

  const strongSecurityStyle = {
    color: "green",
    backgroundColor: "magenta",
  };

  const [isValid, setValid] = useState(false);

  useEffect(() => {
    userDetails.password.length > 4 ? setValid(true) : setValid(false);
    console.log(isValid);
  }, [userDetails.password]);

  useEffect(() => {
    document.body.style = "background:black; color:white;";
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    const response = await signUp(
      userDetails.email,
      userDetails.username,
      userDetails.password
    );
    console.log(response.result);
    console.log(response.response);
  }

  return (
    <div class="signup-container">
      <div>
        <h1> Hi from signup </h1>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              value={userDetails.password}
              type="password"
              name="password"
              onChange={handleChange}
            />
          </label>
          <p style={isValid ? strongSecurityStyle : weakSecurityStyle}>
            Security
          </p>
        </div>
        <div class="signup-button-wrapper">
          <input id="signup-submit" type="submit" value="Sign up" />
        </div>
      </form>
    </div>
  );
}
