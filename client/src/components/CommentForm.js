import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";

function CommentForm({ eventbriteId }) {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to comment");
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comments`,
        { eventbriteId, text },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setText("");
      toast.success("Comment added!");
      window.location.reload(); // Refresh to show new comment
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;