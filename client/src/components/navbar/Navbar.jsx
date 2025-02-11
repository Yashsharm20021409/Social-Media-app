import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import profile from "./vecteezy_profile-icon-design-vector_5544718.jpg";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socialize</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link
          to={"/friend-list"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <PersonOutlinedIcon
            className="right-icon"
            style={{ textDecoration: "none" }}
          />{" "}
        </Link>
        <EmailOutlinedIcon className="right-icon" />
        <NotificationsOutlinedIcon className="right-icon" />
        <div className="user">
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src= {user.profilePicture ? `http://localhost:5000/images/${user.profilePicture}`:profile} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
