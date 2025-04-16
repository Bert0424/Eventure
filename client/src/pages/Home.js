import { useState } from "react";
import axios from "axios";
import EventList from "../components/EventList";
import { toast } from "react-toastify";

function Home() {
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/search`, {
        params: { city },
      });
      setEvents(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch events");
    }
  };

  return (
    <div className="fade-in">
      <h1 className="text-center mb-4">Find Local Events</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city (e.g., Seattle)"
            required
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <EventList events={events} />
    </div>
  );
}

export default Home;