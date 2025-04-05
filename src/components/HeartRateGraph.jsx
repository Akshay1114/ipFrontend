import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import moment from "moment";
import "./HeartRateGraph.css"; // Assuming CSS file is for container styling

const HeartRateGraph = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null); // Ref for the container div

  // Static heart rate data (time and heart rate in bpm)
  const staticData = [
    { dateTime: "2025-03-29T00:00:00", value: 60 }, { dateTime: "2025-03-29T01:00:00", value: 62 },
    { dateTime: "2025-03-29T02:00:00", value: 65 }, { dateTime: "2025-03-29T03:00:00", value: 70 },
    { dateTime: "2025-03-29T04:00:00", value: 68 }, { dateTime: "2025-03-29T05:00:00", value: 64 },
    { dateTime: "2025-03-29T06:00:00", value: 61 }, { dateTime: "2025-03-29T07:00:00", value: 63 },
    { dateTime: "2025-03-29T08:00:00", value: 66 }, { dateTime: "2025-03-29T09:00:00", value: 69 },
  ];

  // Process the static data for D3
  const data = staticData.map((entry) => ({
    dateTime: moment(entry.dateTime).toDate(),
    value: entry.value,
  }));

  useEffect(() => {
    if (!svgRef.current || !data.length || !containerRef.current) return;

    // --- Use fixed base size for drawing, rely on viewBox for scaling
    const baseWidth = 300; // Base drawing width
    const baseHeight = 150; // Base drawing height (reduced)

    // --- Adjust margins ---
    const margin = { top: 10, right: 15, bottom: 30, left: 35 }; // Smaller margins
    const width = baseWidth - margin.left - margin.right;
    const height = baseHeight - margin.top - margin.bottom;

    // Clear previous SVG content
    const svgRoot = d3.select(svgRef.current);
    svgRoot.selectAll("*").remove();

    // --- Setup SVG with viewBox for scaling ---
    svgRoot
      .attr("viewBox", `0 0 ${baseWidth} ${baseHeight}`) // Use base dimensions for viewBox
      .attr("preserveAspectRatio", "xMidYMid meet") // Scale uniformly
      .attr("width", "100%") // Take full container width
      .attr("height", "100%"); // Take full container height

    const svg = svgRoot.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // --- Scales (use calculated width/height) ---
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.dateTime))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, (d) => d.value) - 5, d3.max(data, (d) => d.value) + 5])
      .range([height, 0]);

    // --- Line generator ---
    const line = d3.line()
      .x((d) => xScale(d.dateTime))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX); // Smoother curve

    // --- Draw line ---
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4299E1") // Blue color
      .attr("stroke-width", 1.5) // Slightly thinner line
      .attr("d", line);

    // --- Add X-axis ---
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%H:%M")) // Simpler time format
      .ticks(4); // Fewer ticks

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "#666")
      .style("font-size", "8px"); // Smaller font size

    // --- Add Y-axis ---
    const yAxis = d3.axisLeft(yScale).ticks(4); // Fewer ticks

    svg.append("g")
      .call(yAxis)
      .selectAll("text")
      .style("fill", "#666")
      .style("font-size", "8px"); // Smaller font size

    // --- Clean up domain lines ---
    svg.selectAll(".domain").remove(); // Remove axis lines

    // --- Add grid lines (optional) ---
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).ticks(4).tickSize(-width).tickFormat(""))
      .selectAll("line")
      .style("stroke", "#e0e0e0")
      .style("stroke-opacity", 0.6)
      .style("stroke-dasharray", "2,2");

    // --- Add tooltip ---
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

    // --- Add dots (optional, smaller) ---
    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.dateTime))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 2.5) // Smaller dots
      .attr("fill", "#4299E1")
      .on("mouseover", function(event, d) {
        d3.select(this).attr("r", 4).style("fill", "#2B6CB0");
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`HR: ${d.value} bpm<br/>${moment(d.dateTime).format("H:mm")}`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("r", 2.5).style("fill", "#4299E1");
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    return () => {
      tooltip.remove(); // Clean up tooltip on unmount
    };
  }, [data]); // Re-run if data changes

  // Container div controls the space available to the SVG
  return (
    <div ref={containerRef} className="heart-rate-graph-container">
      {/* Removed h2 title - assuming HeartRate component shows it */}
      <div className="heart-rate-graph">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default HeartRateGraph;