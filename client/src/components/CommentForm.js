import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../graphql/comments/mutations";
import { AuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";

function CommentForm({ eventId, refetchComments }) {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      toast.success("Comment added!");
      setText("");
      if (refetchComments) refetchComments(); 
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add comment");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to comment");
      return;
    }

    if (!text.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    await createComment({
      variables: {
        input: {
          eventId,
          text
        }
      },
      context: {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    });
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