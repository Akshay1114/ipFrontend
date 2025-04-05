import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './SleepSummary.css'; // Create this CSS file

const SleepSummary = () => {
  const svgRef = useRef(null);
  const [activeSlice, setActiveSlice] = useState(null);

  // Static sleep data
  const sleepData = [
    { stage: 'Deep Sleep', duration: 2, color: '#3182CE' }, // Example color
    { stage: 'Light Sleep', duration: 4, color: '#63B3ED' },
    { stage: 'REM Sleep', duration: 1, color: '#F6AD55' },
    { stage: 'Awake', duration: 0.75, color: '#E53E3E' },
  ];

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.duration);
    const dataReady = pie(sleepData);

    const arc = d3.arc()
      .innerRadius(radius * 0.6) // Adjust for donut hole size
      .outerRadius(radius);

    svg.selectAll('slices')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .on('mouseover', (event, d) => {
        setActiveSlice(d.data);
      })
      .on('mouseout', () => {
        setActiveSlice(null);
      });
  }, [sleepData]);

  // Calculate total sleep time
  const totalSleep = sleepData.reduce((acc, curr) => acc + curr.duration, 0);

  return (
    <div className="employee-dashboard-sleep-card">
      <svg ref={svgRef}></svg>
      <div className="total-sleep">
        {totalSleep}h {Math.round((totalSleep % 1) * 60)}m
        <p>Total Sleep</p>
      </div>
      {activeSlice && (
        <div className="slice-info">
          {activeSlice.stage}: {activeSlice.duration}h
        </div>
      )}
    </div>
  );
};

export default SleepSummary;