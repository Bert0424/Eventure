import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function CommentList({ comments }) {
  const { user } = useContext(AuthContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Comment deleted");
      window.location.reload(); // Refresh to update list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div className="comment-section">
      <h5>Comments</h5>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="border-bottom py-2">
            <p>
              <strong>{comment.userId.email}</strong>: {comment.text}
            </p>
            {user && user.token && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;