/** @format */

import "./NavBar.css"
import WestIcon from '@mui/icons-material/West';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
export default function(){
    return (
        <div className="navbar-style">
            <ul>
                <li><a href="#">Habits</a></li>
                <WestIcon/>
                <li className="li-logout"><a href="#">Logout</a> </li>
            </ul>
        </div>
    );
}
