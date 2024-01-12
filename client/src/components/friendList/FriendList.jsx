import React, { useContext, useEffect, useState } from "react";
import "./friendList.scss";
import img from "./vecteezy_profile-icon-design-vector_5544718.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:5000/api/user/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
//   console.log(friends)


  return (
    <>
      <div className="friend-list-container">
        <div className="friend-list-header">
          {/* <Link to={"/"} style={{textDecoration:'none'}}>
            <button className="back-button">Back</button>
          </Link> */}
          <h2>My Friends</h2>
        </div>
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend._id} className="friend-item">
              <Link to={`/profile/${friend.username}`}>
                <img
                  src={friend.profilePicture ? `http://localhost:5000/images/${friend?.profilePicture}`:img}
                  alt={friend.name}
                  className="profile-picture"
                />
              </Link>
              <span className="friend-name">{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendList;
