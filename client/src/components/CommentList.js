import React from "react";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMMENTS } from "../graphql/comments/queries";
import { DELETE_COMMENT } from "../graphql/comments/mutations";
import { toast } from "react-toastify";

function CommentList({ eventId }) {
  const { user } = useContext(AuthContext);

  const { loading, error, data, refetch } = useQuery(GET_COMMENTS, {
    variables: { eventId },
    onError: (err) => {
      toast.error(err.message || "Failed to fetch comments");
    }
  });
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: () => {
      toast.success("Comment deleted!");
      refetch(); // Refetch comments after deletion
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete comment");
    },
  });
  
  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error.message}</p>;

  const comments = data?.comments || [];

  return (
    <div className="comment-section mt-4">
      <h5>Comments</h5>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="border-bottom py-2">
            <p>
              <strong>{comment.user?.username || "Unknown user"}</strong>:{" "}
              {comment.text}
            </p>
            {user && user.id === comment.user?.id && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  deleteComment({
                    variables: { id: comment.id },
                    context: {
                      headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                    },
                  })
                }
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