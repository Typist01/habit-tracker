/** @format */
// import logo from './logo.svg';
import "./App.css";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import { useEffect, useState, useContext, createContext } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DataDisplay from "./Pages/Data-Display/DataDisplay";
import { loginUser } from "./API/authentication";
import NewHabitPage from "./Pages/Dashboard/NewHabitBox/Components/NewHabitPage/NewHabitPage";
import ActivityDisplay from "./Pages/ActivityDisplay/ActivityDisplay";
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
          <Route path="add-new-habit" element={<NewHabitPage />} />
          <Route path="activity-details/:id" element={<ActivityDisplay />} />
          <Route path="data-display/:habitID" element={<DataDisplay />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

// export default App;
