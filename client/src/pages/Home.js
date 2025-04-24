import React, { useState, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/events/queries";
import EventList from "../components/EventList";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  const [getEvents, { data, loading, error }] = useLazyQuery(GET_EVENTS, {
    onError: () => toast.error("Error fetching events"),
  });

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    getEvents({ variables: { keyword: "", city: searchTerm } });
  };

  return (
    <div className="home-container">
      <h1 className="text-center mb-4">Find Local Events</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city (e.g., Seattle)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-danger">Error fetching events: {error.message}</p>}
      {data?.events?.length > 0 ? (
        <EventList events={data.events} user={user} />
      ) : (
        !loading && searchTerm && <p>No events found.</p>
      )}
    </div>
  );
}

export default Home;
