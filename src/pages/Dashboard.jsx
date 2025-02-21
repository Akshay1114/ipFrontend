import React, { useState } from "react";

function Dashboard() {
  return (
    <div className="grid-container">
      {/* Schedule Card */}
      <div className="schedule-card grid-span-2">
        <div className="header">
          <h2>Schedule</h2>
          <i className="fas fa-arrow-up-right"></i>
        </div>
        <div className="upcoming">Upcoming(3)</div>
        <div className="item">
          <div className="date">
            <div className="month">FEB</div>
            <div className="day">23</div>
          </div>
          <div className="details">
            <div className="details-header">
              <div className="flight">Flight #05042024</div>
              <div className="fleet">Fleet: A320neo</div>
            </div>
            <div className="times">
              <div className="time">9:20 AM</div>
              <div className="duration">4h 55m</div>
              <div className="time">2:15 PM</div>
            </div>
            <div className="airport">YVR</div>
            <div className="airport">NYC</div>
          </div>
        </div>
        <div className="item">
          <div className="date">
            <div className="month">FEB</div>
            <div className="day">25</div>
          </div>
          <div className="details">
            <div className="details-header">
              <div className="flight">Flight #05042024</div>
              <div className="fleet">Fleet: A220-300</div>
            </div>
            <div className="times">
              <div className="time">9:20 AM</div>
              <div className="duration">4h 55m</div>
              <div className="time">2:15 PM</div>
            </div>
            <div className="airport">NYC</div>
            <div className="airport">SEA</div>
          </div>
        </div>
      </div>

      {/* Fatigue Risk Indicator Card */}
      <div className="fatigue-card">
        <div className="header">
          <h2>Fatigue Risk Indicator</h2>
        </div>
        <div className="percentage">25%</div>
        <div className="risk-level">
          <div className="level">Low</div>
          <div className="level">Moderate</div>
          <div className="level">High</div>
        </div>
        <div className="risk-bar">
          <div className="risk-indicator" style={{ width: "25%" }}></div>
        </div>
        <div className="status">Good Well-rested!</div>
        <button className="details-button">See Details</button>
      </div>

      {/* Sleep Data Card */}
      <div className="sleep-card">
        <div className="header">
          <h2>Sleep Data</h2>
          <i className="fas fa-arrow-up-right"></i>
        </div>
        <div className="sleep-time">4h 2m</div>
        <div className="date">Today</div>
        <div className="hours">
          <div className="hour">11 AM</div>
          <div className="hour">12 PM</div>
          <div className="hour">1 PM</div>
          <div className="hour">2 PM</div>
          <div className="hour">3 PM</div>
        </div>
        <div className="sleep-bar">
          <div className="sleep-indicator" style={{ width: "50%" }}></div>
        </div>
      </div>

      {/* Health Insights Card */}
      <div className="health-card">
        <div className="header">
          <h2>Health Insights</h2>
        </div>
        <div className="insights-grid">
          <div className="insight">
            <div className="value">72 bpm</div>
            <div className="label">Heart Rate</div>
          </div>
          <div className="insight">
            <div className="value">32%</div>
            <div className="label">Stress Level</div>
          </div>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="recommendation-card">
        <div className="header">
          <h2>Recommendation</h2>
        </div>
        <div className="message">
          “ Your Next Shift is in 12 hours, Take Good rest before it! “
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
