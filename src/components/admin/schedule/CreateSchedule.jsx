import React, { useState } from 'react';
import { wingWiseApi } from '../../../utils/AxiosInstance';
import Loader from '../../../components/loader/Loader';
// Fix the import path for CommonModal
import CommonModal from '../../CommonModal';
import './CreateSchedule.css';

function CreateSchedule() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generatedSchedule, setGeneratedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to format time range
  const formatTimeRange = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };
    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  // Helper function to format date range
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    };
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  // Reusable function to fetch and format schedule data
  const fetchScheduleData = async (filterByDateRange = true) => {
    setLoading(true);
    setError(null);

    try {
      // If filtering by date range, validate dates
      let start, end;
      if (filterByDateRange) {
        if (!startDate || !endDate) {
          setError('Please fill in both Start Date and End Date.');
          setLoading(false);
          return;
        }

        start = new Date(startDate);
        end = new Date(endDate);
        if (end < start) {
          setError('End Date must be after Start Date.');
          setLoading(false);
          return;
        }
      }

      // Fetch crew schedules and flight data
      const response = await wingWiseApi.get('/schedule/allSchedule');
      console.log("Schedule API Response:", response.data);
      
      // Access data properly - note the .data property access
      const crewSchedules = response.data.data?.getCrewSchedule || [];
      const flights = response.data.data?.getFlight || [];

      // Create a map of flightId to flight details for quick lookup
      const flightMap = flights.reduce((map, flight) => {
        map[flight.flightId] = flight;
        return map;
      }, {});

      // Transform the data for display
      const formattedSchedule = crewSchedules
        .map((schedule) => {
          // Get the first assigned flight (if any)
          const flightId = schedule.assignedFlights && schedule.assignedFlights.length > 0 
            ? schedule.assignedFlights[0] 
            : null;
          const flight = flightId ? flightMap[flightId] : null;

          // If filtering by date range, check if the flight is within the range
          if (filterByDateRange && flight) {
            const flightDate = new Date(flight.departure);
            if (flightDate < start || flightDate > end) {
              return null; // Skip this schedule if the flight is outside the date range
            }
          }

          return {
            employee: {
              name: schedule.crewName || 'Unknown Crew',
              id: schedule.employee_ID || 'N/A',
              imageUrl: schedule.profilePicture || 'https://via.placeholder.com/40',
            },
            flightNumber: flightId || 'N/A',
            timeRange: flight
              ? formatTimeRange(flight.departure, flight.arrival)
              : 'No flight scheduled',
            departureArrival: flight
              ? `${flight.departureLocation || 'N/A'} - ${flight.arrivalLocation || 'N/A'}`
              : 'N/A',
            departureArrivalDates: flight
              ? formatDateRange(flight.departure, flight.arrival)
              : 'N/A',
            reasons: schedule.reasons || {}, // Include reasons for the popup
          };
        })
        .filter(schedule => schedule !== null); // Remove null entries (filtered out by date range)

      setGeneratedSchedule(formattedSchedule);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching schedule:', err);
      setError('Failed to fetch schedule. Please try again.');
      setLoading(false);
    }
  };

  // Handle "Generate Schedule" button (filtered by date range)
  const handleGenerateSchedule = async (e) => {
    e.preventDefault();
    fetchScheduleData(true);
  };

  // Handle "Display Full Schedule" button (no date range filter)
  const handleDisplayFullSchedule = () => {
    fetchScheduleData(false);
  };

  // Handle clearing the generated schedule
  const handleClearSchedule = () => {
    setGeneratedSchedule(null);
    setStartDate('');
    setEndDate('');
    setError(null);
  };

  return (
    <div className="create-schedule-container">
      {loading && <Loader />}
      
      <h1 className="create-schedule-title">Create Schedule</h1>

      <div className="form-section">
        <h2 className="section-title">General Information</h2>
        <hr />
        <form onSubmit={handleGenerateSchedule}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start-date">
                Start Date <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                style={{'background-color':'#f1f1f1', 'color':'black'}}
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="MM/DD/YYYY"
                  required
                />
                <span  className="calendar-icon"></span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="end-date">
                End Date <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  style={{'background-color':'#f1f1f1', 'color':'black'}}
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="MM/DD/YYYY"
                  required
                />
                <span className="calendar-icon"></span>
              </div>
            </div>

          </div>

          {/* <div className="form-group other-Group"> */}


          {/* /* <div className="form-group other-Group">

              <label>Other</label>
              <div className="input-with-icon other">
                <input
                  type="type"
                  id="Other"
                  colSpan="1"
                  
                />
              </div>
            </div> */ }

          <div className="button-group">
            <button type="submit" className="generate-btn" disabled={loading}>
              {loading ? 'Fetching...' : 'Generate AI Schedule'}
            </button>
            <button
              type="button"
              className="display-full-btn"
              onClick={handleDisplayFullSchedule}
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Display Full Schedule'}
            </button>
            {generatedSchedule && (
              <button
                type="button"
                className="clear-btn"
                onClick={handleClearSchedule}
              >
                Clear Schedule
              </button>
            )}
          </div>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {generatedSchedule && !loading && (
        <div className="schedule-table-section">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Employees</th>
                <th>ID</th>
                <th>Status</th>
                <th>Start time - End time</th>
                <th>Rest Period</th>
              </tr>
            </thead>
            <tbody>
              {generatedSchedule.length > 0 ? (
                generatedSchedule.map((schedule, index) => (
                  <tr key={index}>
                    <td>
                      <div className="employee-info">
                        <img
                          src={schedule.employee.imageUrl}
                          alt={schedule.employee.name}
                          className="employee-image"
                        />
                        {schedule.employee.name}
                      </div>
                    </td>
                    <td>{schedule.employee.id}</td>
                    <td className='fatigue-level-style'>
                                                <div className="oval-border">
                                                    <i className="fa fa-circle"><span> &nbsp; Approved</span></i>
                                                </div></td>
                    <td>
                      {schedule.timeRange === 'No flight scheduled' ? (
                        <CommonModal btnText="View Reasons" title="Reasons for No Flight">
                          <div>
                            {Object.entries(schedule.reasons).length > 0 ? (
                              <ul>
                                {Object.entries(schedule.reasons).map(([flightId, reason], idx) => (
                                  <li key={idx}>
                                    <strong>{flightId}:</strong> {reason}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No reasons available.</p>
                            )}
                          </div>
                        </CommonModal>
                      ) : (
                        schedule.timeRange
                      )}
                    </td>
                    <td>{schedule.departureArrival}</td>
                    {/* <td>{schedule.departureArrivalDates}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No schedules found for the selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!generatedSchedule && !loading && (
        <div className="empty-state">
          <p>Select a date range and click "Generate Schedule" to view crew schedules.</p>
        </div>
      )}
    </div>
  );
}

export default CreateSchedule;
