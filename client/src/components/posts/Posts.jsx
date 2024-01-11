import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import axios from "axios";

const Posts = () => {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get('http://localhost:5000/api/post/timeline/659e379b942f96a15216ca5a')
      // setPosts(res)

      setPosts(res.data.sort((p1, p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);}))
    }
    // console.log(posts)
    fetchPosts();
  },[])

  return <div className="posts">
    {posts.map((post) => (
      <Post post={post} key={post._id} />
    ))}
  </div>;
};

export default Posts;