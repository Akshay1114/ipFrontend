// StatusCard.js
import React from 'react';
import './StatusCard.css';
import '../FatigueGrid.css';

const StatusCard = () => {
  const status = "Moderate";
  const lastUpdated = "Latest 11:07 am";
  const segments = [
    { label: "Relaxed", color: "#ADD8E6", flex: 1 },   // Light Blue
    { label: "Daily avg", color: "#90EE90", flex: 1 }, // Light Green <- Target segment
    { label: "High", color: "#FFD166", flex: 1 },      // Yellow-Orange
  ];

  // --- Calculate the position for the indicator ---
  // Find the index of the target segment
  const targetLabel = "Daily avg";
  const targetIndex = segments.findIndex(seg => seg.label === targetLabel);
  let indicatorPositionPercent = 50; // Default fallback

  if (targetIndex !== -1) {
    const totalFlex = segments.reduce((sum, seg) => sum + seg.flex, 0);
    const flexBeforeTarget = segments.slice(0, targetIndex).reduce((sum, seg) => sum + seg.flex, 0);
    const targetFlex = segments[targetIndex].flex;

    // Position = (flex before / total flex) + (half of target flex / total flex)
    indicatorPositionPercent = ((flexBeforeTarget + targetFlex / 2) / totalFlex) * 100;
  }
  // -----------------------------------------------

  return (
    <div className="grid-card status-card">
      <div className="status-header">
        <h2 className="status-main">{status}</h2>
        <span className="status-info-icon">ⓘ</span>
      </div>
      <p className="status-time">{lastUpdated}</p>

      {/* Wrap bar, icon, and labels in a relative container */}
      <div className="status-bar-area">
        {/* The Indicator Icon */}
        <div
          className="status-bar-indicator"
          style={{ left: `${indicatorPositionPercent}%` }}
          title={`Current average: ${targetLabel}`} // Tooltip for the indicator
        ></div>

        {/* The Status Bar */}
        <div className="status-bar">
          {segments.map((seg, index) => (
            <div
              key={index}
              className="status-bar-segment"
              style={{ backgroundColor: seg.color, flexGrow: seg.flex }}
            ></div> // Removed title here, added to indicator
          ))}
        </div>

        {/* The Labels */}
        <div className="status-bar-labels">
          {segments.map((seg, index) => (
            <span key={index} style={{ flexGrow: seg.flex }}>{seg.label}</span>
          ))}
        </div>
      </div> {/* End of status-bar-area */}
    </div>
  );
};

export default StatusCard;