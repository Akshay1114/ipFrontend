// GraphCard.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'; // Import D3
import './GraphCard.css';
import '../FatigueGrid.css';

const GraphCard = () => {
  const d3Container = useRef(null); // Ref to the div where SVG will be appended

  // Sample static data for the graph (replace with actual data later)
  // Format: [{ time: hour_of_day (0-23), value: stress_level (e.g., 0-100) }]
  const [data] = useState([
    { time: 0, value: 30 }, // 12 AM
    { time: 3, value: 25 }, // 3 AM
    { time: 6, value: 40 }, // 6 AM
    { time: 9, value: 75 }, // 9 AM
    { time: 10, value: 60 }, // 10 AM
    { time: 11, value: 85 }, // 11 AM - Peak like in image
    { time: 12, value: 50 }, // 12 PM
    { time: 15, value: 45 }, // 3 PM
    { time: 18, value: 40 }, // 6 PM
    { time: 21, value: 35 }, // 9 PM
    { time: 23, value: 30 }, // 11 PM
  ]);

  useEffect(() => {
    if (data && d3Container.current) {
      const container = d3Container.current;
      // Get container dimensions dynamically
      const width = container.clientWidth;
      // Ensure minimum height or calculate based on aspect ratio
      const height = Math.max(container.clientHeight, 120); // Use clientHeight or min height
      const margin = { top: 10, right: 15, bottom: 25, left: 25 }; // Adjusted margins

      // --- D3 Drawing Code ---

      // 1. Clear previous SVG (important for re-renders)
      d3.select(container).select('svg').remove();

      // 2. Create SVG element
      const svg = d3.select(container)
        .append('svg')
          .attr('width', width)
          .attr('height', height)
          .style('overflow', 'visible') // Allow axes labels to be seen if slightly outside
        .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      // 3. Define Scales
      const xScale = d3.scaleLinear()
        .domain([0, 23]) // 24 hours
        .range([0, width - margin.left - margin.right]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 100]) // Max value or 100
        .range([height - margin.top - margin.bottom, 0]); // Inverted for SVG coords

      // 4. Define Axes
      const xAxis = d3.axisBottom(xScale)
        .ticks(6) // Suggest number of ticks (e.g., 0, 6, 12, 18)
        .tickFormat(d => { // Format ticks as AM/PM (optional)
            if (d === 0) return '12am';
            if (d === 12) return '12pm';
            return d < 12 ? `${d}am` : `${d-12}pm`;
        });

      const yAxis = d3.axisLeft(yScale)
        .ticks(4) // Fewer ticks for stress level
        .tickSize(-(width - margin.left - margin.right)) // Extend ticks as grid lines
        .tickFormat(""); // Hide Y-axis labels if needed, or format them

      // 5. Draw Axes
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(xAxis)
        .call(g => g.select(".domain").remove()) // Remove axis line
        .selectAll(".tick line").remove(); // Remove tick marks, keep text

      const yAxisGroup = svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

      // Style grid lines
      yAxisGroup.selectAll(".tick line")
          .attr("stroke-opacity", 0.2)
          .attr("stroke-dasharray", "2,2"); // Dashed lines

      yAxisGroup.select(".domain").remove(); // Remove y-axis line


      // 6. Define Line Generator
      const lineGenerator = d3.line()
        .x(d => xScale(d.time))
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX); // Makes the line smoother

      // 7. Draw the Line
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#FFD166') // Use a color, e.g., moderate color
        .attr('stroke-width', 2.5)
        .attr('d', lineGenerator);

      // --- End D3 Drawing Code ---
    }

    // Optional: Resize observer could go here to redraw on resize
    // Cleanup function (runs when component unmounts or before effect re-runs)
    return () => {
       // Can add cleanup logic here if needed, though clearing SVG at start of effect is often sufficient
    };

  }, [data]); // Re-run effect if data changes

  return (
    <div className="grid-card graph-card">
      <h3 className="card-title">Stress through the day</h3>
      {/* Container for the D3 graph, ref is attached here */}
      <div ref={d3Container} className="graph-container">
        {/* D3 will render SVG inside this div */}
      </div>
    </div>
  );
};

export default GraphCard;