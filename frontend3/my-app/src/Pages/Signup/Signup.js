/** @format */
import "./Signup.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { signUp } from "../../API/authentication";
export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disableInputs, setDisableInputs] = useState();
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

  const [submission, setSubmission] = useState({
    success: false,
    fail: false,
  });
  async function submitHandler(e) {
    e.preventDefault();
    setDisableInputs(true);
    const response = await signUp(
      userDetails.email,
      userDetails.username,
      userDetails.password
    );
    console.log(response.result);
    console.log(response.response);
    if (response.result == "success") {
      setSubmission((v) => ({ ...v, success: true }));
    } else {
      setSubmission((v) => ({ ...v, fail: true }));
      setDisableInputs(false);
    }
  }

  if (submission.success) {
    return (
      <React.Fragment>
        <h1>Signed up successfully</h1>
      </React.Fragment>
    );
  }
  return (
    <form className="login-content-box" onSubmit={submitHandler}>
      <h1 className={submission.fail ? null : "hidden"}>
        Error, please try again
      </h1>
      <div className="login-wrapper sign-up">
        <h1> Sign up </h1>

        <label className="sign-up">
          Username:
          <input
            disabled={disableInputs}
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            disabled={disableInputs}
            type="text"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            disabled={disableInputs}
            value={userDetails.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <p style={isValid ? strongSecurityStyle : weakSecurityStyle}>
          Security
        </p>
        <button type="submit"> Submit </button>
        {/* 
        <div class="signup-button-wrapper">
          <input id="signup-submit" type="submit" value="Sign up" />
        </div> */}
      </div>
    </form>
  );
}
