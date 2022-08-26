/** @format */
import "./Login.css";
import React, { useState, useEffect, useContext } from "react";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { AuthContext } from "../../App";

export default function Login() {
  const [magesticMode, setMagesticMode] = useState(false);
  const [username, setUsername] = useState("");
  const [nameLongEnough, setNameLongEnough] = useState(false);
  const [password, setPassword] = useState("");

  const ctx = useContext(AuthContext);
  const poorUsernameEntry = {
    color: "red",
    fontSize: "12px",
  };

  function toggleMagestic() {
    setMagesticMode((oldMode) => !oldMode);
  }

  function userLengthCheck(e) {
    console.log(e.target.value);
    const value = e.target.value;
    setUsername(value);
  }
  useEffect(() => {
    console.log(ctx.isLoggedIn);
    if (username.length <= 3) {
      setNameLongEnough(false);
    } else setNameLongEnough(true);
  }, [username]);

  useEffect(() => {
    document.body.style = "background:#1E1E1E";
  }, []);

  function changeBackground() {
    document.body.style = "background:red";
  }

  useEffect(() => console.log(password), [password]);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name;
    // console.log(name);
    if (name == "login") {
      ctx.handleLogin();
    } else if (name == "logout") {
      ctx.handleLogout();
    }
    console.log(ctx.isLoggedIn);
  }

  // if (isLoggedIn) {
  //   return (
  //     <div>
  //       <h1> You're already logged in!</h1>
  //       <a href="/"> Click here to navigate to the main page</a>
  //     </div>
  //   );
  // }

  return (
    <React.Fragment>
      {ctx.isLoggedIn ? <h1>You're logged in</h1> : null}
      <form name="login" onSubmit={handleSubmit}>
        <div
          class={`login-content-box ${magesticMode ? "magestic-mode" : null}`}
        >
          <div class="login-wrapper">
            <h1> Login</h1>
            <h2>Username</h2>
            <input
              className={magesticMode ? "magestic-mode" : null}
              value={username}
              onChange={userLengthCheck}
            ></input>
            <br />
            <label
              className={nameLongEnough ? "hidden" : null}
              style={poorUsernameEntry}
            >
              A username must be 4 or more characters
            </label>

            <h2>Password</h2>
            <input
              className={magesticMode ? "magestic-mode" : null}
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
              }}
            ></input>
            <br />

            <button
              type="submit"
              className={magesticMode ? "magestic-mode" : null}
              onClick={() => {
                toggleMagestic();
              }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <form name="logout" onSubmit={handleSubmit}>
        <button type="submit">Logout</button>
      </form>
    </React.Fragment>
  );
}