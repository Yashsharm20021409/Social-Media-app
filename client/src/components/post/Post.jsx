import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import profile from "./vecteezy_profile-user-icon-isolated-on-white-background-vector-eps10_.jpg";
import { AuthContext } from "../../context/authContext";
import { format } from "timeago.js";
import axios from "axios";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  // const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    /*
      // we are fetching user of each post
      // how it actually works everytime new post come from posts and first it detch user info and show all details again then new post come and same thing happen
      // other way to do so is by adding profilePic,name,etc. in post modal when you creating any post but that is not a good way to do everytime we need to update post model when we want to add something new 
      // so simply fetch the user using its userId avialable in post as post.userId
    */
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/user?userId=${post.userId}`
      );
      setUser(res.data);
    };

    fetchUser();
    // console.log(user);
  }, [post.userId]);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  // console.log(post);

  return (
    <div className="post">
      <div className="container">
        {/* three sections */}
        <div className="user">
          <div className="userInfo">
            <img src={user.profilePic ? user.profilePic : profile} alt="" />
            <div className="details">
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{user.name}</span>
              </Link>
              <span className="date">{format(post.createdAt)}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"http://localhost:5000/images/"+post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLiked ? (
              <FavoriteOutlinedIcon onClick={likeHandler} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={likeHandler} />
            )}
            {like}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
