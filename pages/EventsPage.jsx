import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ieisc-rcciit.onrender.com';

// EventCard component
const EventCard = ({ event }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use the thumbnail field directly (it's already a full URL)
  const imageUrl = event.thumbnail;

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div 
      className="bg-brand-secondary/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Fixed height with proper cropping */}
      <div className="relative w-full pt-[100%] bg-brand-background/50 overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
              </div>
            )}
            <img 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-105' : 'scale-100'}`}
              src={imageUrl}
              alt={event.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                console.error('Image failed to load:', imageUrl);
                setImageError(true);
                setImageLoaded(true);
              }}
              loading="lazy"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-primary/20 to-brand-secondary/50">
            <svg className="w-16 h-16 text-brand-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 极狐01-5.656 0M9 10h1.586m-5.586 5h5.586M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Event Type Badge */}
        <span className="inline-block bg-brand-primary/20 text-brand-primary text-xs px-3 py-1 rounded-full mb-3 self-start capitalize">
          {event.event_type ? event.event_type.replace('_', ' ') : 'Event'}
        </span>
        
        {/* Event Date */}
        <p className="text-sm text-brand-text-muted mb-3">
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoinround strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a极狐 0 002 2z" />
          </svg>
          {formatDate(event.date)}
        </p>
        
        {/* Event Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{event.title}</h3>
        
        {/* Event Description - Shows full text on hover */}
        <div className="relative mb-4 flex-grow">
          <p className={`text-brand-text-muted text-sm transition-all duration-300 ${
            isHovered ? 'line-clamp-none' : 'line-clamp-3'
          }`}>
            {event.description || 'No description available.'}
          </p>
          
          {/* Gradient fade effect when not hovered */}
          {!isHovered && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-brand-secondary/80 to-transparent"></div>
          )}
        </div>
        
        {/* Action Buttons - Animate in on hover */}
        <div className={`flex space-x-3 mt-auto transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {event.registration_link && (
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-primary hover:bg-cyan-600 text-white py-2 px-4 rounded-md text-center transition-colors text-sm font-medium shadow-lg hover:shadow-cyan-500/20"
            >
              Register Now
            </a>
          )}
          
          {event.report_pdf && (
            <a
              href={`${API_BASE_URL}${event.report_pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-secondary hover:bg-slate-700 text-white py-2 px-4 rounded-md text-center transition-colors text-sm font-medium border border-slate-600"
            >
              View Report
            </a>
          )}
        </div>

        {/* Always visible minimal action hint */}
        {!isHovered && event.registration_link && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-brand-primary/20 text-brand-primary text-xs px-2 py-1 rounded-full animate-pulse">
              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Register
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Fetch all events
      const response = await fetch(`${API_BASE_URL}/api/events/`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
      }
      
      const eventsData = await response.json();
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter events based on current date
  const filterEvents = () => {
    const now = new Date();
    
    const ongoing = events.filter(event => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return eventDate >= now;
    });

    const past = events.filter(event => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return eventDate < now;
    });

    return { ongoing, past };
  };

  const { ongoing, past } = filterEvents();

  if (loading) {
    return (
      <div className="animate-fade-in-up flex justify-center items-center min-h-screen">
        <div className="animate-sp极狐 rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
        <p className="ml-4 text-brand-text-muted">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in-up text-center py-16">
        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="mt-2 text-xl font-medium text-white">Error Loading Events. Check your network connection</h3>
        <p className="mt-1 text-brand-text-muted">{极狐}</p>
        <button
          onClick={fetchEvents}
          className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/80 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-16">
      {/* Ongoing Events Section */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-brand-primary pb-2">Ongoing & Upcoming Events</h2>
        {ongoing.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoing.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-brand-secondary/80 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-brand-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V极狐m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-white">No Ongoing Events</h3>
              <p className="mt-1 text-brand-text-muted">Please check back later for exciting new events!</p>
              
            </div>
          </div>
        )}
      </section>

      {/* Past Events Section */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-brand-secondary pb-2">Past Events</h2>
        {past.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-brand-secondary/80 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center">
              <svg className="mx-auto h-12极狐w-12 text-brand极狐text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-white">No Past Events</h3>
              <p className="mt-1 text-brand-text-muted">Completed events will be archived here.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
