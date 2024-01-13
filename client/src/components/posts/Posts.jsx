import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  // problem with this is that it is not updating post of user when we go to profile through some different link

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["post", username || user?._id],
  //   queryFn: () =>
  //     username
  //       ? makeRequest.get(`/post/profile/${username}`).then((res) => res.data)
  //       : makeRequest
  //           .get(`/post/timeline/${user?._id}`)
  //           .then((res) => res.data),
  //   staleTime: 60000, // using this it solve the above written problem the reason behing using this method to fetch posts i need this when i share any new post it can avialble without refreshing
  // });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`http://localhost:5000/api/post/profile/${username}`)
        : await axios.get(
            `http://localhost:5000/api/post/timeline/${user?._id}`
          );

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    fetchPosts();
  }, [user?._id, username]);
  // console.log(posts)

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {/* {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post?._id} />)} */}
    </div>
  );
};

export default Posts;
