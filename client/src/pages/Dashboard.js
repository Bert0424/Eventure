import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { GET_EVENTS } from "../graphql/events/queries";
import { DELETE_EVENT } from "../graphql/events/mutations";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
    context: {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    },
    skip: !user,
  });

  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDelete = async (id) => {
    try {
      await deleteEvent({
        variables: { id },
        context: {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      });
      toast.success("Event removed");
      refetch();
    } catch (err) {
      toast.error(err.message || "Failed to delete event");
    }
  };

  if (!user) return <p>Please log in to view your events.</p>;
  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  const events = Array.isArray(data?.events) ? data.events : [];

  const validEvents = events.filter(
    (event) =>
      event &&
      event.title && 
      event.date &&
      event.location
  );

  return (
    <div className="fade-in">
      <h1>My Saved Events</h1>
      {validEvents.length === 0 ? (
        <p>No saved events yet.</p>
      ) : (
        <div className="row">
          {validEvents.map((event) => (
            <div key={event.id} className="col-md-4">
              <div className="event-card card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="card-text">{event.location}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(event.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
