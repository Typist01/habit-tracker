/** @format */
// import logo from './logo.svg';
import "./App.css";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import { useEffect, useState, useContext, createContext } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DataDisplay from "./Pages/Data-Display/DataDisplay";
import { loginUser } from "./API/authentication";
import NewHabitPage from "./Pages/Dashboard/NewHabitBox/Components/NewHabitPage/NewHabitPage";
import ActivityDisplay from "./Pages/ActivityDisplay/ActivityDisplay";
import NavBar from "./Components/NavBar/NavBar";

export const AuthContext = createContext();

export default function App() {
  async function loginHandler(username, password) {
    const result = await loginUser(username, password);
    if (result.result == "success") {
      console.log(result.response);
      console.log(result.response.data);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", result.response.data);
      setIsLoggedIn(true);
      return;
    } else {
      return;
    }
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storageState = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (storageState == null || userId == null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  function logoutHandler() {
    // console.log("logout handler")
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  }
  function appIsLoggedIn() {
    if (
      localStorage.getItem("username") == null &&
      localStorage.getItem("userId") == null
    ) {
      return false;
    } else return true;
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        handleLogin: loginHandler,
        handleLogout: logoutHandler,
      }}
    >
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={appIsLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <Signup isLoggedIn={isLoggedIn} handleLogin={loginHandler} />
            }
          />
          <Route
            path="/dashboard"
            element={appIsLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="add-new-habit"
            element={
              appIsLoggedIn() ? <NewHabitPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="activity-details/:id"
            element={
              appIsLoggedIn() ? <ActivityDisplay /> : <Navigate to="/login" />
            }
          />
          <Route
            path="data-display/:habitID"
            element={
              appIsLoggedIn() ? <DataDisplay /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

// export default App;
