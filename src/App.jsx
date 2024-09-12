import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxpSKGLkVqAkZx-WObpgXrOa1bWBAexyDFiQiHKuh2x-w3uQ0ql6I6y1mG9nq7jzPia/exec"
        );
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-customDarkGray text-white min-h-screen flex flex-col">
      <header className="hero h-72 bg-customBlack flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <h1 className="text-5xl font-bold mb-4">MLH Events</h1>
          <p className="text-lg">
            Explore the exciting array of upcoming member events spanning the
            globe!
          </p>
        </div>
      </header>
      <main
        id="events-container"
        className="flex-grow p-8 flex flex-wrap justify-center gap-8"
      >
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => <Skeleton key={index} />)
          : events.map((event) => (
              <div
                key={event.Name}
                className="card bg-customBlack rounded-lg overflow-hidden w-72"
              >
                <figure>
                  <img
                    src={event.Image}
                    alt={event.Name}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-purple-300 mb-2">
                    {event.Name}
                  </h2>
                  <p className="text-gray-300">
                    {event.Location}
                    <br />@ {event.Date}
                  </p>
                  <div className="mt-4 text-right">
                    <a
                      className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                      href={event.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RSVP
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </main>
      <footer className="bg-customBlack text-gray-300 p-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MLH Events. All rights reserved.
        </p>
        <p className="text-sm">Designed and developed with 💜 by modesage.</p>
      </footer>
    </div>
  );
};

export default App;
