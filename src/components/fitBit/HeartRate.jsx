import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import moment from "moment";
import "./HeartRate.css";

const HeartRate = ({ heartRateData }) => {
  const svgRef = useRef(null);

  // Render the D3.js line chart for heart rate
  useEffect(() => {
    if (!svgRef.current || !heartRateData.length) return;

    // Process heart rate data
    const data = heartRateData.map((entry) => ({
      dateTime: moment(entry.dateTime).toDate(),
      value: entry.value,
    }));

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.dateTime))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, (d) => d.value) - 5, d3.max(data, (d) => d.value) + 5])
      .range([height, 0]);

    // Create line generator
    const line = d3.line()
      .x((d) => xScale(d.dateTime))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4299E1")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add X-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%I:%M %p"))
      .ticks(3);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "#666")
      .style("font-size", "10px");

    // Add Y-axis
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);

    svg.append("g")
      .call(yAxis)
      .selectAll("text")
      .style("fill", "#666")
      .style("font-size", "10px");

    // Add Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("Heart Rate (bpm)");

    // Remove the domain line for a cleaner look
    svg.selectAll(".domain").style("stroke", "#e0e0e0");

    // Add tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "4px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Add dots for each data point
    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.dateTime))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 4)
      .attr("fill", "#4299E1")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 6).style("fill", "#2B6CB0");
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`Heart Rate: ${d.value} bpm<br/>Time: ${moment(d.dateTime).format("h:mm A")}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 4).style("fill", "#4299E1");
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    return () => {
      tooltip.remove();
    };
  }, [heartRateData]);

  if (!heartRateData.length) {
    return (
      <div className="heart-rate-container">
        <h2>Heart Rate</h2>
        <p>No heart rate data available.</p>
      </div>
    );
  }

  return (
    <div className="heart-rate-container">
      <h2>Heart Rate</h2>
      <div className="heart-rate-graph">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default HeartRate;