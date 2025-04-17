import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch events");
      }
    };
    if (user) fetchEvents();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents(events.filter((event) => event._id !== id));
      toast.success("Event removed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className="fade-in">
      <h1>My Saved Events</h1>
      {events.length === 0 ? (
        <p>No saved events yet.</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-md-4">
              <div className="event-card card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="card-text">{event.location}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(event._id)}
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