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
// import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedDesc, setEditedDesc] = useState(post.desc);


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

  // to avoid again liking of images after refresh we need to do this
  useEffect(() => {
    // useEffect fetch data from server as it notice any changes in state of object it check is post.likes.include current user id if yes set is liked true
    setIsLiked(post.likes.includes(currentUser._id));
    // we used currentUser._id and post.Like
    // to mointer other users
    // to check regularly is there any update in post.like field
  }, [currentUser._id, post.likes]);

  // it store data only in db we need above use effect to tell the browser post is liked until we not ftech any data from server and as we are using useEffect it fetch data only when it sees any changing in the stata
  const likeHandler = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/post/like-dislike/" + post?._id,
        {
          userId: currentUser._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // all about post edit and delete
  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteClick = async () => {
    try {
      // Add your axios request to delete the post
      await axios.delete(`http://localhost:5000/api/post/delete-post/${post._id}`, 
      {
        data: { userId: currentUser._id },
      });
      
      window.location.reload();
    } catch (error) {
      // console.log(currentUser._id)
      console.log(error);
    }
  
  };

  const handleEditClick = () => {
    setShowEditForm(!showEditForm);
    setShowOptions(false);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  const handleSaveEdit = async (newDesc) => {
    try {
      // Add your axios request to update the post description
      await axios.put(`http://localhost:5000/api/post/update-post/${post._id}`, {
        userId: currentUser._id,
        desc: newDesc,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    setEditedDesc(newDesc);
    setShowEditForm(false);
  };


  return (
    <div className="post">
      <div className="container">
        {/* three sections */}
        <div className="user">
          <div className="userInfo">
            {/* don't get confuse how user fetch all user profile picture this user is not that user which stored in localstorage this is the user we fetch everytime using the userId aviable in post data check in above useEffect that's why its shows every user profile*/}
            <img src={user.profilePicture ? `http://localhost:5000/images/${user.profilePicture}`: profile} alt="" />
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
          {post.userId === currentUser._id && (
            <div className="more-options" onClick={handleOptionsClick}>
              <MoreHorizIcon />
              {showOptions && (
                <div className="options-dropdown">
                  <div onClick={handleDeleteClick}>Delete</div>
                  <hr style={{ padding: "0px 2px" }} />
                  <div onClick={handleEditClick}>Edit</div>
                </div>
              )}
              
            </div>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"http://localhost:5000/images/" + post.img} alt="" />
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
        {showEditForm && <EditForm post={post} onCancel={handleCancelEdit} onSave={handleSaveEdit} />}
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};



const EditForm = ({ post, onCancel, onSave }) => {
  const [editedDesc, setEditedDesc] = useState(post.desc);

  const handleDescChange = (e) => {
    setEditedDesc(e.target.value);
  };

  const handleSave = () => {
    onSave(editedDesc);
  };

  return (
    <div className="edit-form">
      <TextField
        label="Edit Description"
        multiline
        rows={4}
        fullWidth
        value={editedDesc}
        onChange={handleDescChange}
      />
      <div className="edit-form-buttons">
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

// export default EditForm;



export default Post;