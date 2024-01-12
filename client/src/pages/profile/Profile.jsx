import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Update from "../../components/update/Update";

const Profile = () => {
  // const data = {};
  const { username } = useParams();
  const [user, setUser] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/user?username=${username}`
      );
      setUser(res.data);
      setFollowed(currentUser.following?.includes(res.data?._id));
    };
    fetchUser();
  }, [username]);

  // console.log(followed);
  // console.log("user", user);
  // console.log(currentUser.following);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(
          "http://localhost:5000/api/user/unfollow/" + user?._id,
          {
            userId: currentUser?._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } 
      else {
        await axios.put("http://localhost:5000/api/user/follow/" + user?._id, 
        {
          userId: currentUser?._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
      // to set true of client side
      setFollowed(!followed);
    } catch (error) {}
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src={user.coverPicture ? `http://localhost:5000/images/${user.coverPicture}`:"https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
          alt=""
          className="cover"
        />
        <img
          src={user.profilePicture ? `http://localhost:5000/images/${user.profilePicture}`:"https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon />
            </a>
          </div>
          <div className="center">
            <span>{user.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>INDIA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>ENG</span>
              </div>
            </div>
            {username === currentUser.username ? (
              <button onClick={() => setOpenUpdate(true)}>update</button>
            ) : (
              <button onClick={handleFollow}>
                {followed ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts username={username} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={user} />}
    </div>
  );
};

export default Profile;
