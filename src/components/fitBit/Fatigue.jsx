// Fatigue.jsx
import React from 'react';

// --- Import the CSS for the grid layout ---
import './FatigueGrid.css'; // Assuming FatigueGrid.css is in the same directory

// --- Import the four card components ---
// Adjust the paths if these files are in different directories (e.g., './components/StatusCard')
import StatusCard from './StatusCard';
import DailyAverageCard from './DailyAverageCard';
import GraphCard from './GraphCard';
import MindfulnessCard from './MindfulnessCard';

/**
 * Fatigue Component
 *
 * Renders a 2x2 grid displaying fatigue-related information cards:
 * 1. Current Status
 * 2. Daily Averages Breakdown
 * 3. Trend Graph (Placeholder for D3)
 * 4. Mindfulness Tip
 */
const Fatigue = () => {
  return (
    <div className="fatigue-grid-container">
      {/* Render the four imported card components in order */}
      <StatusCard />
      <DailyAverageCard />
      <GraphCard />
      <MindfulnessCard />
    </div>
  );
};

export default Fatigue;