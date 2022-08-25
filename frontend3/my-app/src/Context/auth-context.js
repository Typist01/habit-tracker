/** @format */

import { createContext, useContext, useState } from "react";

import { signUp } from "./authentication.js";

const AuthContext = createContext({
  user: "",
  onLogin: (username, password) => {},
  onLogout: () => {},
});

const AuthContextProvider = () => {
  const [user, setUser] = useState("");

  //   function loginHandler(username, password) {

  //   }

  function signUp(email, username, password) {
    if (signUp(email, username, password) == "success") {
      console.log("signed up successfully");
      return "success";
    } else {
      console.log("could not sign up");
      return "fail";
    }
  }

  return (
    <AuthContext.Provider value={{onSignUp:signUp}}></AuthContext.Provider>
  );
};
