/** @format */
// import logo from './logo.svg';
import "./App.css";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import { useEffect, useState, useContext, createContext } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";

export const AuthContext = createContext();

export default function App() {
  
  function loginHandler() {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storageState = localStorage.getItem("isLoggedIn");
    if (storageState == "false") {
      setIsLoggedIn(false);
    } else if (storageState == "true") {
      setIsLoggedIn(true);
    }
  }, []);

  function logoutHandler() {
    // console.log("logout handler")
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  }



  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, handleLogin:loginHandler,handleLogout:logoutHandler }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/login"
          element={
            <Login
            />
          }
        />
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} handleLogin={loginHandler} />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}

        />
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

// export default App;
