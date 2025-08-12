import { useEffect, useState } from "react";
import heroImage from "./assets/hero-bg.jpg";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-600 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <span className="ml-4 text-gray-400 animate-pulse">Fetching events...</span>
    </div>
  );

  // Event Card Component
  const EventCard = ({ event }) => (
    <div className="group overflow-hidden bg-gray-900 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-200">
            {event.name}
          </h3>
          <div className="space-y-1 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              {/* MapPin icon */}
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-4.686-6-10a6 6 0 1112 0c0 5.314-6 10-6 10z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Calendar icon */}
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.date}</span>
            </div>
          </div>
        </div>

        {/* RSVP Button */}
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium transition-colors"
        >
          RSVP Now
          {/* ExternalLink icon */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline strokeLinecap="round" strokeLinejoin="round" points="15 3 21 3 21 9" />
            <line strokeLinecap="round" strokeLinejoin="round" x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <header
        className="relative h-80 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 15, 23, 0.8), rgba(15, 15, 23, 0.6)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-4xl px-6 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-red-400 bg-clip-text text-transparent">
            MLH Events
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover amazing hackathons and tech events happening around the world.
            Connect, code, and create with the global hacker community.
          </p>
        </div>

        {/* Decorative Pulsing Dots */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of passionate developers, designers, and innovators at these exciting events.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No events found at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon for exciting new opportunities!</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event, idx) => (
              <EventCard key={idx} event={event} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-2">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} MLH Events Dashboard. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Designed and developed with{" "}
              <span className="text-purple-400 animate-pulse">💜</span> by modesage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
