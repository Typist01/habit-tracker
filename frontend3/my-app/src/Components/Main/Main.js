/** @format */
import { useState, useEffect } from "react";

import "./Main.css";
// import "Main.css";
// var myText = "Hello World";

export default function Main(props) {

  
  const [myText, setMyText] = useState("Hello World");
  const [isHidden, setIsHidden] = useState(false);
  function handleHiddenChange() {
    console.log("Hidden toggler activated ");
    console.log(isHidden);
  }
  // useEffect(() => console.log(myText), [myText]);
  useEffect(handleHiddenChange, [isHidden, myText]);

  // `this is my text ${myText}`
  // function evaluateTernary(){
  //   if (isHidden)
  //     return "hidden"
  //   else
  //     return null;
  // }

  function handleChange(e) {
    console.log(e.target.value);
    setUserName(e.target.value);
  }

  const [username, setUserName] = useState("");
  return (
    <div>
      
      <h1 className={`heading ${isHidden ? "hidden" : null}`}>{myText}</h1>
      <h1
        id="title"
        className="heading main-heading "
        onClick={() => {
          setMyText("something else");
          // console.log(myText);
        }}
      >
        Hi from Main
      </h1>
      <h1 className="heading">Hi from a react component</h1>
      <p>{props.text}</p>
      <button
        onClick={() => {
          // setIsHidden(!isHidden);
          setIsHidden(true);
        }}
      >
        {" "}
        This is a button in main
      </button>
      <h1> Hi {username}</h1>
      <input value={username} onChange={handleChange}></input>
    </div>
  );
}
