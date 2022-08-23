/** @format */
import "./Login.css";
import { useState, useEffect } from "react";

export default function Login() {
  const [magesticMode, setMagesticMode] = useState(false);
  const [username, setUsername] = useState("");
  const [nameLongEnough, setNameLongEnough] = useState(false);
  const [password, setPassword] = useState("");

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

  return (
    <div class={`login-content-box ${magesticMode ? "magestic-mode" : null}`}>
      <div class="login-wrapper">
        <h1> Login</h1>
        <h2>Username</h2>
        <input className={magesticMode ? "magestic-mode" : null}
        value={username} onChange={userLengthCheck}></input>
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

        <button className={magesticMode ? "magestic-mode" : null} onClick={toggleMagestic}>Login</button>
      </div>
    </div>
  );
}
