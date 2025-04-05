// DailyAverageCard.js
import React from 'react';
import './DailyAverageCard.css'; // Import specific CSS
import '../FatigueGrid.css'; // Import base card style

// Static data
const fatigueData = [
  { id: 1, title: 'High', value: '0%', color: '#FF6F61' },
  { id: 2, title: 'Moderate', value: '55%', color: '#FFD166' },
  { id: 3, title: 'Low', value: '20%', color: '#90EE90' },
  { id: 4, title: 'Relaxed', value: '25%', color: '#ADD8E6' },
];

const DailyAverageCard = () => {
  return (
    <div className="grid-card daily-average-card"> {/* Use base style */}
      <h3 className="card-title">Daily avg.</h3> {/* Use base title style */}
      <div className="average-list">
        {fatigueData.map((item) => (
          <div key={item.id} className="average-list-item">
            <div className="average-item-visual" style={{ backgroundColor: item.color }}></div>
            <span className="average-item-title">{item.title}</span>
            <span className="average-item-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyAverageCard;