import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");


  const handleClick = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:5000/api/post/create-post", newPost);
      window.location.reload();
    } catch (err) {}
  };

  // console.log(file.name.length > 1)

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`http://localhost:5000/images/${user.profilePicture}`} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${user.name}?`}
            minLength={1}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <hr />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            {/* <button onClick={handleClick} disabled={desc.length < 6}>Share</button> */}
            {file?
            <button onClick={handleClick} >Share</button>:
            <button onClick={handleClick} disabled={desc.length < 6}>Share</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
