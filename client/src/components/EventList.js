import React from "react";
import EventCard from "./EventCard";
function EventList({ events }) {
  return (
    <div className="row fade-in">
      {events.map((event) => (
        <div key={event.id} className="col-md-4">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}

export default EventList;