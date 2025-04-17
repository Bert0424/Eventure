import React from "react";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const { user } = useContext(AuthContext);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please log in to save events");
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/events`,
        {
          eventbriteId: event.id,
          title: event.name.text,
          description: event.description.text,
          date: event.start.local,
          location: event.venue?.address?.localized_multi_line_address_display?.join(", "),
          category: event.category?.name || "General",
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Event saved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save event");
    }
  };

  return (
    <div className="event-card card mb-3">
      <img
        src={event.logo?.url || "https://via.placeholder.com/300x200"}
        className="card-img-top"
        alt={event.name.text}
      />
      <div className="card-body">
        <h5 className="card-title">{event.name.text}</h5>
        <p className="card-text">
          {new Date(event.start.local).toLocaleDateString()} |{" "}
          {event.venue?.address?.city || "Unknown location"}
        </p>
        <p className="card-text">{event.category?.name || "General"}</p>
        <button onClick={handleSave} className="btn btn-primary me-2">
          Save Event
        </button>
        <Link to={`/event/${event.id}`} className="btn btn-outline-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;