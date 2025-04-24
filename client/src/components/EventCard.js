import React from "react";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../graphql/events/mutations";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const { user } = useContext(AuthContext);

  const [createEvent] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      toast.success("Event saved!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSave = async () => {
    if (!user) {
      toast.error("Please log in to save events");
      return;
    }
    const input = {
      ticketmasterId: event.id,
      name: event.name,
      date: event.dates?.start?.localDate,
      time: event.dates?.start?.localTime,
      description: event.info || "",
      image: event.images?.[0]?.url || "",
      category: event.classifications?.[0]?.genre?.name || "General",
      venue: event._embedded?.venues?.[0]?.name || "Unknown Venue",
      city: event._embedded?.venues?.[0]?.city?.name || "Unknown City",
      url: event.url || ""
    };
    await createEvent({
      variables: { input },
      context: {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    });
  };

  return (
    <div className="event-card card mb-3">
      <img
        src={event.images?.[0]?.url || "https://via.placeholder.com/300x200"}
        className="card-img-top"
        alt={event.name}
      />
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        <p className="card-text">
          {event.dates?.start?.localDate || "Unknown date"} |{" "}
          {event._embedded?.venues?.[0]?.city?.name || "Unknown city"}
        </p>
        <p className="card-text">
          {event.classifications?.[0]?.genre?.name || "General"}
        </p>
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