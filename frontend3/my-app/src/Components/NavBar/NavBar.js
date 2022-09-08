/** @format */

import "./NavBar.css"
import WestIcon from '@mui/icons-material/West';



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
