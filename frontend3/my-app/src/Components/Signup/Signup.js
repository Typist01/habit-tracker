/** @format */
import "./Signup.css";
import { useState, useEffect } from "react";
export default function Signup() {
  const [passwordEntered, setPasswordEntered] = useState("");

  const weakSecurityStyle = {
    color: "red",
    backgroundColor: "magenta",
  };

  const strongSecurityStyle = {
    color: "green",
    backgroundColor: "magenta",
  };

  const [isValid, setValid] = useState(false);

  function passwordChangeHandler(event) {
    const value = event.target.value;
    setPasswordEntered(value);
  }

  useEffect(() => {
    passwordEntered.length > 4 ? setValid(true) : setValid(false);
    console.log(passwordEntered);
    console.log(isValid);
  }, [passwordEntered]);

  useEffect(() => {
    document.body.style = "background:black; color:white;";
  }, []);

  return (
    <div class="signup-container">
      <div>
        <h1> Hi from signup </h1>
      </div>
      <form>
        <div>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="text" name="email" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              value={passwordEntered}
              type="password"
              name="password"
              onChange={passwordChangeHandler}
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
