import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import EventList from "../components/EventList";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Home() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`http://localhost:5000/api/events?search=${searchTerm}`)
        .then((response) => setEvents(response.data))
        .catch((error) => {
          toast.error("Error fetching events");
          console.error(error);
        });
    }
  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-center mb-4">Find Local Events</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city (e.g., Seattle)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          Search
        </button>
      </div>
      <EventList events={events} user={user} />
    </div>
  );
}

export default Home;