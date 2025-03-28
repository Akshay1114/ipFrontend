// src/components/Tab2.js
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import { wingWiseApi } from '../../../utils/AxiosInstance';
import CommonModal from '../../CommonModal'; // Updated path to CommonModal
import Loader from '../../loader/Loader';
import './Tab2.css';
import '../../../pages/FlightSchedule.css';

function Tab2() {
  const [pilots, setPilots] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date('2025-03-16')); // Start date from the image
  const [viewMode, setViewMode] = useState('day'); // 'day' or 'week'

  // Fetch pilot and flight data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await wingWiseApi.get(`/schedule/allSchedule`);
        console.log('API Response:', response.data);

        const flightData = response.data.data?.getFlight || [];
        const crewData = response.data.data?.getCrewSchedule || [];

        // Filter pilots from crew data
        const pilotsData = crewData.filter((crew) => 
          crew.designation?.toLowerCase().includes('pilot') || crew.role?.toLowerCase().includes('pilot')
        );

        // Apply search filter
        const filteredPilots = searchQuery
          ? pilotsData.filter((pilot) =>
              (pilot.crewName || pilot.firstName || pilot.lastName || '')
              .toLowerCase().includes(searchQuery.toLowerCase())
            )
          : pilotsData;

        // Apply pagination (client-side for simplicity; adjust if API supports server-side pagination)
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const paginatedPilots = filteredPilots.slice(startIndex, startIndex + pageSize);

        // Transform pilots data for FullCalendar resources
        const resourcesData = paginatedPilots.map((pilot) => ({
          id: pilot.employee_ID?.toString() || Math.random().toString(),
          title: pilot.crewName || `${pilot.firstName || ''} ${pilot.lastName || ''}`.trim() || 'Unknown Pilot',
          role: pilot.designation || pilot.role || 'Pilot',
          imageUrl: pilot.profilePicture || 'https://via.placeholder.com/40',
          email: pilot.email || 'N/A',
          phone: pilot.phone || 'N/A',
        }));

        // Create a map of flightId to flight details for quick lookup
        const flightMap = flightData.reduce((map, flight) => {
          map[flight.flightId] = flight;
          return map;
        }, {});

        // Create events for each pilot
        const eventsData = [];
        paginatedPilots.forEach((pilot) => {
          // Add flight events
          if (pilot.assignedFlights && pilot.assignedFlights.length > 0) {
            pilot.assignedFlights.forEach((flightId) => {
              const flight = flightMap[flightId];
              if (flight) {
                const start = new Date(flight.departure);
                const end = new Date(flight.arrival);

                // Check if the flight is within the current view's date range
                const viewStart = new Date(currentDate);
                viewStart.setHours(0, 0, 0, 0);
                
                const viewEnd = new Date(currentDate);
                if (viewMode === 'week') {
                  viewEnd.setDate(viewEnd.getDate() + 6);
                }
                viewEnd.setHours(23, 59, 59, 999);

                if (start >= viewStart && start <= viewEnd) {
                  eventsData.push({
                    resourceId: pilot.employee_ID?.toString() || Math.random().toString(),
                    title: `Flight #${flightId} ${flight.departureLocation}-${flight.arrivalLocation}`,
                    start: start,
                    end: end,
                    backgroundColor: '#3788d8',
                    borderColor: '#3788d8',
                    extendedProps: {
                      flightDetails: {
                        flightId: flightId,
                        departure: flight.departure,
                        arrival: flight.arrival,
                        route: `${flight.departureLocation}-${flight.arrivalLocation}`,
                        fleet: flight.category || flight.aircraft || 'A320neo',
                      },
                      pilotInfo: {
                        name: pilot.crewName || `${pilot.firstName || ''} ${pilot.lastName || ''}`.trim(),
                        id: pilot.employee_ID || 'N/A',
                        role: pilot.designation || pilot.role || 'Pilot',
                      }
                    },
                  });
                }
              }
            });
          } else {
            // If no flights are assigned, check for unavailability reasons
            if (pilot.reasons && Object.keys(pilot.reasons).length > 0) {
              Object.entries(pilot.reasons).forEach(([flightId, reason]) => {
                // Since reasons are tied to flight IDs, we'll check if the flight exists
                const flight = flightMap[flightId];
                if (flight) {
                  const unavailableDate = new Date(flight.departure);
                  const start = new Date(unavailableDate);
                  start.setHours(0, 0, 0, 0); // Start of the day
                  const end = new Date(unavailableDate);
                  end.setHours(23, 59, 59, 999); // End of the day

                  eventsData.push({
                    resourceId: pilot.employee_ID?.toString() || Math.random().toString(),
                    title: `Unavailable: ${reason}`,
                    start: start,
                    end: end,
                    backgroundColor: '#ff4d4f',
                    borderColor: '#ff4d4f',
                    allDay: true,
                    extendedProps: {
                      reason: reason,
                      flightId: flightId,
                      pilotInfo: {
                        name: pilot.crewName || `${pilot.firstName || ''} ${pilot.lastName || ''}`.trim(),
                        id: pilot.employee_ID || 'N/A',
                        role: pilot.designation || pilot.role || 'Pilot',
                      }
                    }
                  });
                }
              });
            }
          }
        });

        setPilots(resourcesData);
        setEvents(eventsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch schedule data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchQuery, currentDate, viewMode]);

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

  // Format time for display
  const formatTime = (timeStr) => {
    if (!timeStr) return 'N/A';
    
    try {
      const date = new Date(timeStr);
      if (isNaN(date.getTime())) {
        return 'Invalid time';
      }
      
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    } catch (e) {
      console.error("Error formatting time:", e);
      return 'Invalid time';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="tab2-container">
      <div className="tab2-header">
        
          
          <div className="navigation">
            <button onClick={handlePrev}>&lt; Previous </button>

            <h1 className="tab2-title">Pilot Schedule</h1>
            
            <div className='crew_header_3'>
                <button onClick={handleToday}>Today</button>
                <button
                  onClick={() => handleViewChange('week')}
                  className={viewMode === 'week' ? 'active' : ''}
                >
                  Week
                </button>
                
                <button onClick={handleNext}>Next &gt;</button>
            </div>
            
            

            {/* <div className="search-container">
            <input
              type="text"
              placeholder="Search pilots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div> */}
            {/* <span>{formatDateRange()}</span> */}
            {/* <button
              onClick={() => handleViewChange('day')}
              className={viewMode === 'day' ? 'active' : ''}
            >
              day
            </button> */}
            
          </div>
          {/* <div className="pagination">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div> */}
        
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
            {/* <img
              src={resource.resource.extendedProps.imageUrl || 'https://via.placeholder.com/40'}
              alt={resource.resource.title}
              className="pilot-image"
            /> */}
            
              <h3>{resource.resource.title}</h3>
              {/* <div className="pilot-role">{resource.resource.extendedProps.role}</div> */}
            
          </div>
        )}
        eventContent={(eventInfo) => (
          <div className="event-content">
            <div>{eventInfo.event.title}</div>
            <CommonModal btnText="Details" title="Event Details" btnClassName="details-btn">
              <div className="event-details-content">
              <h3>Item Details</h3>
                <p>
                  <strong>Title:</strong> {eventInfo.event.title}
                </p>
                <p>
                  <strong>Start:</strong> {eventInfo.event.start.toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong> {eventInfo.event.end?.toLocaleString() || 'All Day'}
                </p>
                
                {/* Pilot Information */}
                {eventInfo.event.extendedProps.pilotInfo && (
                  <>
                    <h3>Pilot Information</h3>
                    <p>
                      <strong>Name:</strong> {eventInfo.event.extendedProps.pilotInfo.name}
                    </p>
                    <p>
                      <strong>ID:</strong> {eventInfo.event.extendedProps.pilotInfo.id}
                    </p>
                    <p>
                      <strong>Role:</strong> {eventInfo.event.extendedProps.pilotInfo.role}
                    </p>
                  </>
                )}
                
                {/* Flight Details */}
                {eventInfo.event.extendedProps.flightDetails && (
                  <>
                    <h3>Flight Information</h3>
                    <p>
                      <strong>Flight ID:</strong> {eventInfo.event.extendedProps.flightDetails.flightId}
                    </p>
                    <p>
                      <strong>Route:</strong> {eventInfo.event.extendedProps.flightDetails.route}
                    </p>
                    <p>
                      <strong>Departure:</strong> {formatTime(eventInfo.event.extendedProps.flightDetails.departure)}
                    </p>
                    <p>
                      <strong>Arrival:</strong> {formatTime(eventInfo.event.extendedProps.flightDetails.arrival)}
                    </p>
                    <p>
                      <strong>Fleet:</strong> {eventInfo.event.extendedProps.flightDetails.fleet}
                    </p>
                  </>
                )}
                
                {/* Unavailability Reason */}
                {eventInfo.event.extendedProps.reason && (
                  <>
                    <h3>Unavailability Information</h3>
                    <p>
                      <strong>Reason:</strong> {eventInfo.event.extendedProps.reason}
                    </p>
                    <p>
                      <strong>Related Flight:</strong> {eventInfo.event.extendedProps.flightId || 'N/A'}
                    </p>
                  </>
                )}
                
                {/* <div className="modal-actions">
                  <button className="modifySchedule-btn">Modify Schedule</button>
                </div> */}
              </div>
            </CommonModal>
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
    </div>
  );
}

export default Tab2;