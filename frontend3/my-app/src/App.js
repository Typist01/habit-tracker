/** @format */
// import logo from './logo.svg';
import "./App.css";
import Login from "./Components/Login/Login";
import Main from "./Components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Main text="this is text sent to Main from App.js" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

// export default App;
