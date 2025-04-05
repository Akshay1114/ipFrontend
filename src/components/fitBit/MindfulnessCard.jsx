// MindfulnessCard.js
import React from 'react';
import './MindfulnessCard.css';
import fatiuge from "../../assets/logo/FatigueFlower.jpg";
import '../FatigueGrid.css';
// Assuming you have an image file like 'mindfulness-image.png' in your public or src folder
// import mindfulnessImage from './path/to/your/mindfulness-image.png';

const MindfulnessCard = () => {
  return (
    <div className="grid-card mindfulness-card">
      <div className="mindfulness-content">
        <h3 className="card-title">Mindfulness</h3>
        <p className="mindfulness-text">
          Practise habits that can help reduce stress.
        </p>
      </div>
      <div className="mindfulness-image-container">
         <div className="mindfulness-image-placeholder">
         <img src={fatiuge} alt="Mindfulness illustration" className="mindfulness-image"/>
         </div>
        
      </div>
    </div>
  );
};

export default MindfulnessCard;