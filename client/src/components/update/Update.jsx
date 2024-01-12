import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
  });
  const [updatedUser,setUpdatedUser] = useState();

  const { user: currentUser, updateUser} = useContext(AuthContext);
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const formData = {
    email: texts.email,
    password: texts.password,
    name: texts.name,
    coverPicture: user.coverPicture,
    profilePicture: user.profilePicture,
    userId: user._id,
  };

  const uploadCover = async (file) => {
    console.log(file);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      formData.coverPicture = fileName;
      // console.log(newPost);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
  };
  const uploadProfile = async (file) => {
    console.log(file);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      formData.profilePicture = fileName;
      // console.log(newPost);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await uploadCover(cover) : user.coverPicture;
    profileUrl = profile ? await uploadProfile(profile) : user.profilePicture;

    // formData.coverPicture = coverUrl;
    // formData.profilePicture = profileUrl;

    try {
      const {data:updatedUser} = await axios.put(
        "http://localhost:5000/api/user/update-user/" + user._id,
        {
          formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      updateUser(updatedUser)
    } catch (err) {}

    // window.location.reload();
  };

  return (
    <div>
      <div className="update">
        <div className="wrapper">
          <h1>Update Your Profile</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : "/upload/" + user.coverPic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : "/upload/" + user.profilePic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <label>Email</label>
            <input
              type="text"
              value={texts.email}
              name="email"
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="text"
              value={texts.password}
              name="password"
              onChange={handleChange}
            />
            <label>Name</label>
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
            <label>Country / City</label>
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
            <label>Website</label>
            <input
              type="text"
              name="website"
              value={texts.website}
              onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
