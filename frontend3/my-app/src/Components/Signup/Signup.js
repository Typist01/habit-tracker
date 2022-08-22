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
  return (
    <div>
      <h1> Hi from signup </h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Password:
          <input
            value={passwordEntered}
            type="password"
            name="password"
            onChange={passwordChangeHandler}
          />
        </label>
        <label style={isValid ? strongSecurityStyle : weakSecurityStyle}>
          Security
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

//   const myJsObject = {
//     num: 5,
//     text: "hello",
//     myFunction: () => {
//       console.log("hello world");
//     },
//   };
