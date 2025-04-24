import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "../graphql/events/queries";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { toast } from "react-toastify";

function EventDetails() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { ticketmasterId: id },
    onError: (err) => toast.error(err.message || "Failed to fetch event"),
  });

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data?.eventByTicketmasterId;

  if (!event) return <p>No event details found.</p>;

  return (
    <div className="fade-in">
      <h1>{event.name || "Untitled Event"}</h1>
      <img
        src={event.image || "https://via.placeholder.com/600x300?text=No+Image"}
        alt={event.name || "Event"}
        className="img-fluid mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/600x300?text=No+Image";
        }}
      />
      <p>
        <strong>Date:</strong>{" "}
        {event.date ? event.date : "Date TBA"}{" "}
        {event.time && `at ${event.time}`}
      </p>
      <p>
        <strong>Location:</strong>{" "}
        {event.venue && event.city
          ? `${event.venue}, ${event.city}`
          : "Location TBA"}
      </p>
      <p>
        <strong>Category:</strong> {event.category || "General"}
      </p>
      <p>{event.description || "No description available."}</p>

      <CommentForm eventId={id} />
      <CommentList eventId={id} />
    </div>
  );
}

export default EventDetails;
