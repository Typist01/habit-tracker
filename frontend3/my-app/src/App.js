/** @format */
// import logo from './logo.svg';
import "./App.css";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import { useEffect, useState, useContext, createContext } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NewActivityPage from "./Pages/Dashboard/NewActivityPage/NewActivityPage.js";
import DataDisplay from "./Pages/Data-Display/DataDisplay";
import { loginUser } from "./API/authentication";

export const AuthContext = createContext();

export default function App() {
  async function loginHandler(username, password) {
    const result = await loginUser(username, password);
    if (result.result == "success") {
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      return;
    } else {
      return;
    }
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storageState = localStorage.getItem("username");
    if (storageState == null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  function logoutHandler() {
    // console.log("logout handler")
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        handleLogin: loginHandler,
        handleLogout: logoutHandler,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <Signup isLoggedIn={isLoggedIn} handleLogin={loginHandler} />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-activity" element={<NewActivityPage />} />
          <Route path="/data-display" element={<DataDisplay />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

// export default App;
