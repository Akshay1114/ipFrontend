import React, { useState } from 'react';

function FlightSchedule() {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const openModal = (flight) => {
    setSelectedFlight(flight);
  };

  const closeModal = () => {
    setSelectedFlight(null);
  };

  return (
    <div className={`flightSchedule-container ${selectedFlight ? "blur-background" : ""}`}>
      <header className="flightSchedule-header">
        <div className="flightSchedule-date">18 February 2025</div>
        <h2>Today's Flights</h2>
        <div className="flightSchedule-search"><input type="text" placeholder="Search" /></div>
      </header>
      
      <div className="flightSchedule-navigation">
        <button className="flightSchedule-prev">&lt; Previous</button>
        <button className="flightSchedule-next">Next &gt;</button>
      </div>
      
      <div className="flightSchedule-content">
        <div className="flightSchedule-section">
          <h3>Departures from YVR</h3>
          <div className="flightSchedule-list">
            {renderFlight("#05042024", "9:20 AM", "2:15 PM", "YVR", "JFK", "4h 55m", "A320neo", openModal)}
            {renderFlight("#05042464", "9:40 AM", "2:15 PM", "YVR", "SEA", "6h 05m", "A220-300", openModal)}
            {renderFlight("#052342024", "9:45 AM", "6:45 AM", "YVR", "JFK", "1h 05m", "A220-300", openModal)}
            {renderFlight("#05042024", "9:20 AM", "2:15 PM", "YVR", "JFK", "4h 55m", "A320neo", openModal)}
            {renderFlight("#05042464", "9:40 AM", "2:15 PM", "YVR", "SEA", "6h 05m", "A220-300", openModal)}
            {renderFlight("#052342024", "9:45 AM", "6:45 AM", "YVR", "JFK", "1h 05m", "A220-300", openModal)}
          </div>
        </div>
        
        <div className="flightSchedule-section">
          <h3>Arrivals to YVR</h3>
          <div className="flightSchedule-list">
            {renderFlight("#05042024", "9:20 AM", "2:05 PM", "SEA", "YVR", "4h 55m", "A320neo", openModal)}
            {renderFlight("#05042464", "9:40 AM", "2:35 PM", "SFO", "YVR", "6h 05m", "A220-300", openModal)}
            {renderFlight("#052342024", "9:45 AM", "2:50 PM", "YVK", "YVR", "1h 05m", "A220-300", openModal)}
            {renderFlight("#05042024", "9:20 AM", "2:05 PM", "SEA", "YVR", "4h 55m", "A320neo", openModal)}
            {renderFlight("#05042464", "9:40 AM", "2:35 PM", "SFO", "YVR", "6h 05m", "A220-300", openModal)}
            {renderFlight("#052342024", "9:45 AM", "2:50 PM", "YVK", "YVR", "1h 05m", "A220-300", openModal)}
          </div>
        </div>
      </div>

      {selectedFlight && <FlightDetailsModal flight={selectedFlight} closeModal={closeModal} />}
    </div>
  );
}

function renderFlight(flightNumber, departure, arrival, from, to, duration, fleet, openModal) {
  const flight = { flightNumber, departure, arrival, from, to, duration, fleet };

  return (
    <div className="flightSchedule-card" key={flightNumber}>
      <div className="flightSchedule-flightHeader">
        <span className="flightSchedule-flightNumber">Flight {flightNumber}</span>
        <span className="flightSchedule-fleet">Fleet: {fleet}</span>
      </div>
      <div className="flightSchedule-time">
        <span className="flightSchedule-departure">{departure}</span>
        <span className="flightSchedule-divider">------------------✈------------------</span>
        <span className="flightSchedule-arrival">{arrival}</span>
      </div>
      <div className="flightSchedule-route">{from} → {to}</div>
      <div className="flightSchedule-duration">{duration}</div>
      <button className="flightSchedule-crewInfo" onClick={() => openModal(flight)}>Crew Info</button>
    </div>
  );
}

function FlightDetailsModal({ flight, closeModal }) {
  return (
    <>
      <div className="flightDetails-modal">
        <div className="flightDetails-content">
          <button className="flightDetails-close" onClick={closeModal}>&times;</button>
          <h2>Flight Details</h2>
          <p><strong>Flight:</strong> {flight.flightNumber}</p>
          <p><strong>Fleet:</strong> {flight.fleet}</p>
          <p><strong>Departure:</strong> {flight.departure} ({flight.from})</p>
          <p><strong>Arrival:</strong> {flight.arrival} ({flight.to})</p>
          <p><strong>Total Travel Time:</strong> {flight.duration}</p>

{/* Crew Information Section */}
<div className="flightDetails-crew">
            <h3>Crew Info:</h3>
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
                <tr>
                  <td>Captain</td>
                  <td>John Reynolds</td>
                  <td>CAP-4521</td>
                  <td>8:00 AM</td>
                </tr>
                <tr>
                  <td>First Officer</td>
                  <td>Emily Carter</td>
                  <td>FO-3789</td>
                  <td>8:00 AM</td>
                </tr>
                <tr>
                  <td>Flight Attendant</td>
                  <td>Mark Davis</td>
                  <td>FA-2914</td>
                  <td>7:30 AM</td>
                </tr>
                <tr>
                  <td>Flight Attendant</td>
                  <td>Sophia Martinez</td>
                  <td>FA-5832</td>
                  <td>7:30 AM</td>
                </tr>
                <tr>
                  <td>Flight Attendant</td>
                  <td>Daniel Lee</td>
                  <td>FA-3249</td>
                  <td>7:30 AM</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="modifySchedule-btn">Modify Schedule</button>
        </div>

        
      </div>
      <div className="overlay" onClick={closeModal}></div>
    </>
  );
}

export default FlightSchedule;
