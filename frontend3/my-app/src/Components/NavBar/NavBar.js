/** @format */

import "./NavBar.css";
import WestIcon from "@mui/icons-material/West";
import { useContext } from "react";
import { AuthContext } from "../../App";

export default function () {
  const ctx = useContext(AuthContext);

  return (
    <div className="navbar-style">
      <ul>
        <li>
          <a href="/">Habits</a>
        </li>
        <WestIcon />
        <li className="li-logout">
          <a onClick={ctx.handleLogout} href="/login">
            {ctx.isLoggedIn ? "Logout" : "Login"}
          </a>{" "}
        </li>
      </ul>
    </div>
  );
}
