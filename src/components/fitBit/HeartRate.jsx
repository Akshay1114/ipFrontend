import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import moment from "moment";
import "./HeartRate.css";

const HeartRate = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const generateTestData = () => {
      const data = [];
      let currentTime = moment("12:00 AM", "h:mm A");
      const endTime = moment("2:00 PM", "h:mm A");

      while (currentTime.isSameOrBefore(endTime)) {
        data.push({
          dateTime: currentTime.toDate(),
          value: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
        });
        currentTime.add(30, "minutes");
      }
      return data;
    };

    const data = generateTestData();

    if (!svgRef.current || !data.length) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.dateTime))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, (d) => d.value) - 5, d3.max(data, (d) => d.value) + 5])
      .range([height, 0]);

    const line = d3.line()
      .x((d) => xScale(d.dateTime))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const area = d3.area()
      .x((d) => xScale(d.dateTime))
      .y0(height)
      .y1((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "url(#gradient)")
      .attr("d", area);

    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "orange")
      .attr("stop-opacity", 0.5);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", line);

    const average = d3.mean(data, (d) => d.value);

    svg.append("circle")
      .attr("cx", xScale(data[Math.floor(data.length / 2)].dateTime))
      .attr("cy", yScale(average))
      .attr("r", 5)
      .attr("fill", "orange");

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%H:%M"))
      .ticks(5);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "#666")
      .style("font-size", "10px");

    const yAxis = d3.axisLeft(yScale)
      .ticks(5);

    svg.append("g")
      .call(yAxis)
      .selectAll("text")
      .style("fill", "#666")
      .style("font-size", "10px");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#333")

    svg.selectAll(".domain").style("stroke", "#e0e0e0");

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

    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.dateTime))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 4)
      .attr("fill", "orange")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 6).style("fill", "#D97706");
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`Heart Rate: ${d.value} bpm<br/>Time: ${moment(d.dateTime).format("HH:mm")}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 4).style("fill", "orange");
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    return () => {
      tooltip.remove();
    };
  }, []);

  return (
    <div className="heart-rate-container">
      <div className="heart-rate-graph">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default HeartRate;