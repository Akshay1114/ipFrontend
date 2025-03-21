// src/components/Tab2.js
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import { wingWiseApi } from '../../../utils/AxiosInstance';
import './Tab2.css';
import Loader from '../../loader/Loader';

function Tab2() {
  const [pilots, setPilots] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date('2025-03-16')); // Start date from the image
  const [viewMode, setViewMode] = useState('day'); // 'day' or 'week'
  const [selectedEvent, setSelectedEvent] = useState(null); // For the details modal

  // Fetch pilot data from the backend
  useEffect(() => {
    const fetchPilots = () => {
      setLoading(true);

      wingWiseApi
        .get(`/user?role=pilot&page=${page}${searchQuery ? `&search=${searchQuery}` : ''}`)
        .then((res) => {
          console.log('Pilots API Response:', res.data);
          const pilotsData = res.data?.data || [];

          // Transform data for FullCalendar
          const resourcesData = pilotsData.map((pilot) => ({
            id: pilot._id.toString(),
            title: pilot.name || `${pilot.firstName || ''} ${pilot.lastName || ''}`,
            role: pilot.role || 'Pilot',
            imageUrl: pilot.profilePicture || 'https://via.placeholder.com/40',
          }));

          // Create events for each pilot
          const eventsData = [];
          pilotsData.forEach((pilot) => {
            // Since actual flight data isn't available, create sample events
            const today = new Date(currentDate);
            const startTime = new Date(today);
            startTime.setHours(Math.floor(Math.random() * 12) + 6, 0, 0); // Random start time between 6 AM and 6 PM

            const endTime = new Date(startTime);
            endTime.setHours(startTime.getHours() + 2); // 2-hour flight

            eventsData.push({
              resourceId: pilot._id.toString(),
              title: `Flight AC${Math.floor(Math.random() * 1000)}`,
              start: startTime,
              end: endTime,
              backgroundColor: '#3788d8',
              borderColor: '#3788d8',
            });

            // Sample unavailability (optional)
            if (Math.random() > 0.7) {
              const unavailableStart = new Date(today);
              unavailableStart.setHours(14, 0, 0); // 2:00 PM
              const unavailableEnd = new Date(today);
              unavailableEnd.setHours(16, 0, 0); // 4:00 PM

              eventsData.push({
                resourceId: pilot._id.toString(),
                title: 'Unavailable: Rest',
                start: unavailableStart,
                end: unavailableEnd,
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
              });
            }

            // When you have actual flight data, replace the above with:
            /*
            if (pilot.assignedFlights) {
              pilot.assignedFlights.forEach((flight) => {
                // If flight is a string like "Flight #AC101 2025-03-16 19:20-2:05 YYR-LAX"
                const [flightInfo, date, time, route] = flight.split(' ');
                const [flightNumber] = flightInfo.split('#');
                const [startTime, endTime] = time.split('-');
                const [startHour, startMinute] = startTime.split(':');
                const [endHour, endMinute] = endTime.split(':');

                eventsData.push({
                  resourceId: pilot._id.toString(),
                  title: `${flightNumber} ${route}`,
                  start: new Date(`${date}T${startHour}:${startMinute}:00`),
                  end: new Date(`${date}T${endHour}:${endMinute}:00`),
                  backgroundColor: '#3788d8',
                  borderColor: '#3788d8',
                });
              });
            }

            if (pilot.reasons) {
              Object.entries(pilot.reasons).forEach(([date, reason]) => {
                eventsData.push({
                  resourceId: pilot._id.toString(),
                  title: `Unavailable: ${reason}`,
                  start: new Date(date),
                  end: new Date(date),
                  backgroundColor: '#ff4d4f',
                  borderColor: '#ff4d4f',
                  allDay: true,
                });
              });
            }
            */
          });

          setPilots(resourcesData);
          setEvents(eventsData);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching pilots:', err);
          setError('Failed to fetch pilots data.');
          setLoading(false);
        });
    };

    fetchPilots();
  }, [page, searchQuery, currentDate]);

  // Navigation handlers
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  // Format the date range for display
  const formatDateRange = () => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } else {
      const start = new Date(currentDate);
      const end = new Date(currentDate);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} - ${end.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`;
    }
  };

  if (loading) {
    return <div className="loading">
        <Loader />
    </div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="tab2-container">
      <div className="tab2-header">
        <h1 className="tab2-title">Pilot Schedule</h1>
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search pilots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="navigation">
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleToday}>today</button>
            <span>{formatDateRange()}</span>
            <button onClick={handleNext}>&gt;</button>
            <button
              onClick={() => handleViewChange('day')}
              className={viewMode === 'day' ? 'active' : ''}
            >
              day
            </button>
            <button
              onClick={() => handleViewChange('week')}
              className={viewMode === 'week' ? 'active' : ''}
            >
              week
            </button>
          </div>
          <div className="pagination">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        </div>
      </div>
      <FullCalendar
        plugins={[resourceTimelinePlugin, dayGridPlugin]}
        initialView={viewMode === 'day' ? 'resourceTimelineDay' : 'resourceTimelineWeek'}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives" // For evaluation; replace with your license key
        resources={pilots}
        events={events}
        resourceAreaHeaderContent="Pilots"
        resourceLabelContent={(resource) => (
          <div className="pilot-info">
            <img
              src={resource.resource.extendedProps.imageUrl || 'https://via.placeholder.com/40'}
              alt={resource.resource.title}
              className="pilot-image"
            />
            <div>
              <div>{resource.resource.title}</div>
              <div className="pilot-role">{resource.resource.extendedProps.role}</div>
            </div>
          </div>
        )}
        eventContent={(eventInfo) => (
          <div className="event-content">
            <div>{eventInfo.event.title}</div>
            <button
              className="details-btn"
              onClick={() => setSelectedEvent(eventInfo.event)}
            >
              Details
            </button>
          </div>
        )}
        headerToolbar={false}
        initialDate={currentDate}
        slotMinTime="06:00:00" // Start at 6:00 AM
        slotMaxTime="21:00:00" // End at 9:00 PM
        slotDuration={viewMode === 'day' ? '01:00:00' : '1.00:00:00'} // 1 hour for day view, 1 day for week view
        slotLabelFormat={
          viewMode === 'day'
            ? {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              }
            : {
                day: 'numeric',
                month: 'short',
              }
        }
        resourceAreaWidth="200px"
        height="auto"
      />
      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h2>Event Details</h2>
            <p>Title: {selectedEvent.title}</p>
            <p>Start: {selectedEvent.start.toLocaleString()}</p>
            <p>End: {selectedEvent.end?.toLocaleString() || 'All Day'}</p>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tab2;