import React from 'react';


function DutyLimits() {
  const dutyPercentage = 90;
  const remainingHours = '3h 30m';
  const flightDutyHours = '9h / 12h Duty';
  const restPeriods = '10h';

  return (
    <div className="duty-limits-container">
      {/* Flight Duty Time Limit and Today's Date Section */}
      <div className="dutylimits-card duty-section">
        <div>
          <h4>Flight Duty Time Limit</h4>
          <h1>{dutyPercentage}%</h1>
          <h3>Graph</h3>
        </div>
        <div>
          <h4>Today's Date</h4>
          <h1>13 February 2025</h1>
        </div>
      </div>

      {/* Quick Compliance Check Section */}
      <div className="dutylimits-card">
        <h4>Quick Compliance Check</h4>
        <p>Status: <b>Within Limits</b></p>
        <p>Remaining Duty Hours: {remainingHours}</p>
        <p>Flight Duty Hours Today: {flightDutyHours}</p>
        <div className="progress-bar-container">
          <div className="progress-bar orange" style={{ width: `${(9 / 12) * 100}%`, backgroundColor: 'var(--color-accent)' }}></div>
        </div>
        <p>Rest Periods: {restPeriods}</p>
        <div className="progress-bar-container">
          <div className="progress-bar blue" style={{ width: `${(10 / 10) * 100}%`, backgroundColor: 'var(--color-primary)' }}></div>
        </div>
      </div>

      {/* Compliance & Guidelines Section */}
      <div className="card compliance-section">
        <h4>Compliance & Guidelines</h4>
        <div className="guideline-cards">
          <div className="guideline-card">Guideline 1</div>
          <div className="guideline-card">Guideline 2</div>
          <div className="guideline-card">Guideline 3</div>
        </div>
      </div>
    </div>
  );
}

export default DutyLimits;
