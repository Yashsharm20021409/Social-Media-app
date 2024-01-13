import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Comments = ({ commentOpen, id, countComments, setCountComments }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  //Temporary
  useEffect(() => {
    const fetchComments = async () => {
      const postId = id;
      const commenterId = currentUser?._id;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/post/getComments/${id}`
        );

        const { comments } = response.data;

        // Update the local state with the fetched comments
        setComments(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  // console.log(comments);
  const handleCommentSubmit = async () => {
    const postId = id;
    const commenterId = currentUser?._id;
    const commenterPicture = currentUser?.profilePicture;
    const commenterUserName = currentUser?.username;
    const commenterName = currentUser?.name;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/post/comment/${postId}`,
        {
          commenterId,
          commenterName,
          commenterUserName,
          commenterPicture,
          text: newComment,
        }
      );

      const { comment } = response.data;

      // Update the local state with the new comment
      setComments((prevComments) => [...prevComments, comment]);

      // Clear the input field after successfully adding the comment
      setCountComments(countComments+1)
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const updateUIWithNewComment = (newComment) => {
    // For simplicity, let's assume you have a state for comments and update it here
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // const handleCommentClick = async () => {
  //   fetchComments();
  // };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={"http://localhost:5000/images/" + currentUser?.profilePicture}
          alt=""
        />
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Send</button>
      </div>
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <div className="comment" key={comment?._id}>
            {/* Your existing comment display code */}
            <Link to={`/profile/${comment.username}`}>
              <img
                src={"http://localhost:5000/images/" + comment.profilePicture}
                alt=""
              />
            </Link>
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.text}</p>
            </div>
            <span className="date">{format(comment.timestamp)}</span>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Does not have any comment yet</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
