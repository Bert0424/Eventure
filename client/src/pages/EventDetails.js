import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { toast } from "react-toastify";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/search`, {
          params: { city: "" }, // Broad search to find event
        });
        const foundEvent = res.data.find((e) => e.id === id);
        setEvent(foundEvent);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch event");
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch comments");
      }
    };

    fetchEvent();
    fetchComments();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="fade-in">
      <h1>{event.name.text}</h1>
      <img
        src={event.logo?.url || "https://via.placeholder.com/600x300"}
        alt={event.name.text}
        className="img-fluid mb-3"
      />
      <p>
        <strong>Date:</strong> {new Date(event.start.local).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong>{" "}
        {event.venue?.address?.localized_multi_line_address_display?.join(", ") ||
          "Unknown"}
      </p>
      <p>
        <strong>Category:</strong> {event.category?.name || "General"}
      </p>
      <p>{event.description.text || "No description available."}</p>
      <CommentForm eventbriteId={id} />
      <CommentList comments={comments} />
    </div>
  );
}

export default EventDetails;