import React, { useState, useEffect } from 'react';
import { wingWiseApi } from '../utils/AxiosInstance';
import Loader from '../components/loader/Loader';
import CommonModal from '../components/CommonModal'; // Updated path to CommonModal
import './FlightSchedule.css';

function FlightSchedule() {
  const [selectedWeekStart, setSelectedWeekStart] = useState(new Date()); // Default to current date
  const [flights, setFlights] = useState([]);
  const [crewSchedules, setCrewSchedules] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the week to start on the current day but at the beginning of the week
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to the previous Sunday
    setSelectedWeekStart(startOfWeek);
  }, []);

  // Fetch flight and crew data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await wingWiseApi.get('/schedule/allSchedule');
        console.log("API Response:", response.data);
        
        // Access data properly - using the correct path to the data
        const flightData = response.data.data?.getFlight || [];
        const crewData = response.data.data?.getCrewSchedule || [];

        setFlights(flightData);
        setCrewSchedules(crewData);
        filterFlights(flightData, selectedWeekStart, searchQuery);
      } catch (err) {
        console.error('Error fetching flight data:', err);
        setError('Failed to fetch flight data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedWeekStart]);

  // Filter flights by week and search query
  const filterFlights = (flightData, weekStart, query) => {
    if (!weekStart || !flightData?.length) return;

    try {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6); // End of the week (7 days total)

      const filtered = flightData.filter((flight) => {
        // Ensure departure exists and is a valid date string
        if (!flight.departure) return false;
        
        try {
          const flightDate = new Date(flight.departure);
          
          if (isNaN(flightDate.getTime())) {
            return false;
          }
          
          const matchesWeek = flightDate >= weekStart && flightDate <= weekEnd;
          
          // Handle different possible field names for flight ID/number
          const flightId = flight.flightId || flight.flightNumber || '';
          const matchesQuery = query
            ? flightId.toLowerCase().includes(query.toLowerCase())
            : true;
            
          return matchesWeek && matchesQuery;
        } catch (e) {
          console.error("Error filtering flight:", e);
          return false;
        }
      });

      // Group flights by date
      const groupedByDate = filtered.reduce((acc, flight) => {
        try {
          const flightDate = new Date(flight.departure);
          const dateStr = flightDate.toISOString().split('T')[0];
          
          if (!acc[dateStr]) {
            acc[dateStr] = [];
          }
          acc[dateStr].push(flight);
        } catch (e) {
          console.error("Error grouping flight by date:", e);
        }
        return acc;
      }, {});

      // Convert grouped flights to an array for rendering
      const sortedDates = Object.keys(groupedByDate).sort();
      const flightsByDate = sortedDates.map((date) => ({
        date: new Date(date),
        flights: groupedByDate[date],
      }));

      setFilteredFlights(flightsByDate);
    } catch (err) {
      console.error("Error in filterFlights:", err);
      setFilteredFlights([]);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterFlights(flights, selectedWeekStart, query);
  };

  // Handle week navigation
  const handlePreviousWeek = () => {
    const newWeekStart = new Date(selectedWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    setSelectedWeekStart(newWeekStart);
  };

  const handleNextWeek = () => {
    const newWeekStart = new Date(selectedWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    setSelectedWeekStart(newWeekStart);
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString('en-US', {
      
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDate_day = (date) => {
    if (!date || isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // Returns only the weekday
  };

  // Format week range for display
  const formatWeekRange = (weekStart) => {
    if (!weekStart || isNaN(weekStart.getTime())) {
      return 'Invalid Date Range';
    }
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
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

  // Calculate duration
  const calculateDuration = (departure, arrival) => {
    if (!departure || !arrival) return 'N/A';
    
    try {
      const dep = new Date(departure);
      const arr = new Date(arrival);
      const diffMs = arr - dep;
      
      if (isNaN(diffMs)) return 'N/A';
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch (e) {
      console.error("Error calculating duration:", e);
      return 'N/A';
    }
  };

  return (
    <div className="flightSchedule-container">
      {/* <header className="flightSchedule-header">
        <div className="flightSchedule-date">{formatWeekRange(selectedWeekStart)}</div>
        <h2>Weekly Flight Schedule</h2>
        <div className="flightSchedule-search">
          <input
            type="text"
            placeholder="Search by flight number"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </header>

      <div className="flightSchedule-navigation">
        <button className="flightSchedule-prev" onClick={handlePreviousWeek}>
          &lt; Previous Week
        </button>
        <button className="flightSchedule-next" onClick={handleNextWeek}>
          Next Week &gt;
        </button>
      </div> */}

      <div className='header-flight'>
                <div className='date-flight'>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long'})}</div>
                <div className='search-flight-container'>
                    <button type="submit" className="SearchFlight"><i class="fa fa-search"></i><input type="text" placeholder="Search" className="search-bar" value={searchQuery} onChange={handleSearch}/></button>
                    <button type="submit" className="SearchFlight searchfilter"><i class="fa fa-filter"></i><input type="text" placeholder="Filter" className="search-bar"/></button>
                </div>
            </div>
            <div className='dateFlight-year'>{new Date().toLocaleDateString('en-GB', {year: 'numeric' })}</div>
            <div className='today-flight-schedule'>
                    <h3><button className="flightSchedule-prev" onClick={handlePreviousWeek}>
                          &lt; Previous Week
                        </button>
                    </h3>
                    <h2>{formatWeekRange(selectedWeekStart)}</h2>
                    <h3><button className="flightSchedule-next" onClick={handleNextWeek}>
                          Next Week &gt;
                        </button>
                    </h3>
            </div>

      {loading && <Loader />}
      {error && <div className="error">{error}</div>}

      <div className="flightSchedule-content">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((day) => (
            <div key={day.date.toISOString()} className="flightSchedule-day">
              <h3>{formatDate_day(day.date)}</h3>
              <div className="flightSchedule-list">
                {day.flights.map((flight) => (
                  <div className="flightSchedule-card" key={flight.flightId || flight.flightNumber || Math.random()}>
                    <div className="flightSchedule-flightHeader">
                      <span className="flightSchedule-flightNumber">
                        Flight: <br></br>{flight.flightId || flight.flightNumber || 'Unknown'}
                      </span>
                      <span className="flightSchedule-fleet">
                        Fleet: <br></br>{flight.aircraft || flight.category || 'A320neo'}
                      </span>
                    </div>
                    <div className="flightSchedule-time">
                      <span className="flightSchedule-departure">{formatTime(flight.departure)}</span>
                      <span className="flightSchedule-divider"> --✈-- </span>
                      <span className="flightSchedule-arrival">{formatTime(flight.arrival)}</span>
                    </div>
                    <div className="flightSchedule-route">
                      {flight.departureLocation || 'Unknown'} 
                      <span className="flightSchedule-arrow"> → </span> 
                      {flight.arrivalLocation || 'Unknown'}
                    </div>
                    <div className="flightSchedule-duration">
                      {calculateDuration(flight.departure, flight.arrival)}
                    </div>
                    <CommonModal btnText="Crew Info" title="Flight Details" btnClassName="flightSchedule-crewInfo">
                      <div>
                        <p>
                          <strong>Flight:</strong> #{flight.flightId || flight.flightNumber || 'Unknown'}
                        </p>
                        <p>
                          <strong>Fleet:</strong> {flight.aircraft || flight.category || 'A320neo'}
                        </p>
                        <p>
                          <strong>Departure:</strong> {formatTime(flight.departure)} ({flight.departureLocation || 'Unknown'})
                        </p>
                        <p>
                          <strong>Arrival:</strong> {formatTime(flight.arrival)} ({flight.arrivalLocation || 'Unknown'})
                        </p>
                        <p>
                          <strong>Total Travel Time:</strong> {calculateDuration(flight.departure, flight.arrival)}
                        </p>

                        {/* Crew Information Section */}
                        <div className="flightDetails-crew">
                          <h3>Crew Info:</h3>
                          {(() => {
                            const assignedCrew = crewSchedules.filter(schedule => 
                              schedule.assignedFlights && 
                              schedule.assignedFlights.includes(flight.flightId || flight.flightNumber)
                            );

                            // Default crew if none are found in the API
                            const defaultCrew = [
                              { role: 'Captain', name: 'John Reynolds', id: 'CAP-4521', dutyStarts: '8:00 AM' },
                              { role: 'First Officer', name: 'Emily Carter', id: 'FO-3789', dutyStarts: '8:00 AM' },
                              { role: 'Flight Attendant', name: 'Mark Davis', id: 'FA-2914', dutyStarts: '7:30 AM' },
                              { role: 'Flight Attendant', name: 'Sophia Martinez', id: 'FA-5832', dutyStarts: '7:30 AM' }
                            ];

                            // Use assigned crew if available, otherwise use default
                            const crew = assignedCrew.length > 0 
                              ? assignedCrew.map(member => ({
                                  role: member.designation || 'Crew Member',
                                  name: member.crewName || `${member.firstName || ''} ${member.lastName || ''}`.trim(),
                                  id: member.employee_ID || 'N/A',
                                  dutyStarts: member.dutyTime || 'N/A'
                                }))
                              : defaultCrew;

                            return (
                              <table className="crewTable">
                                <thead>
                                  <tr>
                                    <th>Role</th>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Duty Starts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {crew.map((member, index) => (
                                    <tr key={index}>
                                      <td>{member.role}</td>
                                      <td>{member.name}</td>
                                      <td>{member.id}</td>
                                      <td>{member.dutyStarts}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            );
                          })()}
                        </div>
                        
                        <div className="modal-actions">
                          <button className="modifySchedule-btn">Modify Schedule</button>
                        </div>
                      </div>
                    </CommonModal>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-flights">
            {loading ? 'Loading flights...' : 'No flights scheduled for this week.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightSchedule;
