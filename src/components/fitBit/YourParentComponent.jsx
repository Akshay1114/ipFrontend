import React, { useState } from 'react';
import Fatigue from './Fatigue'; // Import the component that renders the grid
import './FatigueGrid.css'; // Import the grid CSS

const YourParentComponent = () => {
  const [activeTab, setActiveTab] = useState('Fatigue Risk'); // Or your state management

  return (
    <div>
      {/* Tab switching logic */}
      {/* ... */}

      {activeTab === 'Fatigue Risk' && (
        <div className="tab-content">
          {/* Render the Fatigue component which contains the 4-card grid */}
          <Fatigue />
        </div>
      )}

      {/* Other tabs... */}
    </div>
  );
};

export default YourParentComponent;