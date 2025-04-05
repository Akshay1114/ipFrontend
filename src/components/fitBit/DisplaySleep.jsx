import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import * as d3 from "d3";
import { motion } from "framer-motion";
import Loader from "../loader/Loader";
import HeartRate from "./HeartRate"; // Import the new HeartRate component
import noDataImage from "../../assets/images/no-data.png";
import "./DisplaySleep.css";
import { wingWiseApi } from "../../utils/AxiosInstance";

const DisplaySleep = () => {
  const [sleepData, setSleepData] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Sleep");
  const [timeFrame, setTimeFrame] = useState("Day");
  // Remove currentDate state
  // const [currentDate, setCurrentDate] = useState(moment());

  const svgRef = useRef(null); // For the sleep stages graph
  const pieSvgRef = useRef(null); // For the pie chart

  // Fetch data from the backend for the latest data
  const fetchData = async () => {
    const accessToken = localStorage.getItem("fitbit_access_token");

    if (!accessToken) {
      setError("No access token found. Please connect your Fitbit account.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await wingWiseApi.post("/sleepData/fetch-sleep-data", {
        accessToken,
        // Remove the date parameter
      });
      // const response = await axios.post("http://localhost:5001/api/sleepData/fetch-sleep-data", {
      //    accessToken,
      // });
      console.log("response", response.data);

      const { sleep, heartRate } = response.data;

      const sortedSleep = Array.isArray(sleep)
        ? sleep.sort((a, b) => new Date(b.dateOfSleep) - new Date(a.dateOfSleep))
        : sleep && sleep.dateOfSleep
        ? [sleep]
        : [];

      const sortedHeartRate = heartRate
        ? (Array.isArray(heartRate)
            ? heartRate.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
            : [heartRate])
        : [];

      setSleepData(sortedSleep);
      setHeartRateData(sortedHeartRate);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch sleep data. Please try again later.");
      setSleepData([]);
      setHeartRateData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData once on component mount
  }, []);

  // Helper function to convert milliseconds to hours and minutes
  const formatDuration = (ms) => {
    console.log("ms =>", ms);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Helper function to convert minutes to hours and minutes (e.g., "1h 19m")
  const formatMinutesToHM = (minutes) => {
    console.log("minutes =>", minutes);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Process sleep stages for the D3.js graph
  const processSleepStages = (levels) => {
    if (!levels || !levels.data) return { stages: [], startTime: null, endTime: null };

    const stages = levels.data;
    const startTime = moment(stages[0].dateTime);
    const endTime = moment(stages[stages.length - 1].dateTime).add(stages[stages.length - 1].seconds, "seconds");

    const stageData = stages.map((stage) => {
      const stageStart = moment(stage.dateTime);
      const stageEnd = moment(stage.dateTime).add(stage.seconds, "seconds");

      let level, color, name;
      switch (stage.level) {
        case "wake":
          level = 4;
          color = "#ff812e"; // Orange for Awake
          name = "Awake";
          break;
        case "light":
          level = 3;
          color = "#93C5FD"; // Light blue for Light
          name = "Light";
          break;
        case "rem":
          level = 2;
          color = "#3B82F6"; // Medium blue for REM
          name = "REM";
          break;
        case "deep":
          level = 1;
          color = "#1E3A8A"; // Dark blue for Deep
          name = "Deep";
          break;
        default:
          return null;
      }

      return {
        start: stageStart.toDate(),
        end: stageEnd.toDate(),
        level,
        color,
        name,
      };
    }).filter((d) => d !== null);

    return { stages: stageData, startTime, endTime };
  };

  // Process sleep summary for the D3.js pie chart
  const processSleepSummary = (summary, totalMinutes) => {
    if (!summary) return [];
console.log("summary=>", summary);
    return [
      { x: "Deep", y: (summary?.deep?.minutes / totalMinutes) * 100, color: "#1E3A8A" }, // Dark blue
      { x: "REM", y: (summary?.rem?.minutes / totalMinutes) * 100, color: "#3B82F6" }, // Medium blue
      { x: "Light", y: (summary?.light?.minutes / totalMinutes) * 100, color: "#93C5FD" }, // Light blue
      { x: "Awake", y: (summary?.wake?.minutes / totalMinutes) * 100, color: "#ff812e" }, // Orange
    ];
  };

  // Render the D3.js sleep stages graph
  useEffect(() => {
    if (!svgRef.current || !sleepData.length) return;

    const latestSleep = sleepData[0];
    const { stages, startTime, endTime } = processSleepStages(latestSleep.levels);

    if (!stages.length) return;

    const sortedStages = stages.sort((a, b) => a.start - b.start);

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
      .domain([startTime.toDate(), endTime.toDate()])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain([4, 3, 2, 1])
      .range([0, height])
      .padding(0.2);

    const yAxisLabels = [
      { level: 4, name: "Awake" },
      { level: 3, name: "Light" },
      { level: 2, name: "REM" },
      { level: 1, name: "Deep" },
    ];

    svg.selectAll(".y-axis-label")
      .data(yAxisLabels)
      .enter()
      .append("text")
      .attr("class", "y-axis-label")
      .attr("x", -50)
      .attr("y", (d) => yScale(d.level) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text((d) => d.name);

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

    svg.selectAll(".bar")
      .data(sortedStages)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.start))
      .attr("y", (d) => yScale(d.level))
      .attr("width", (d) => xScale(d.end) - xScale(d.start))
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => d.color)
      .attr("rx", 10)
      .attr("ry", 10)
      .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 0.8);
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`${d.name.toUpperCase()} (${moment(d.start).format("h:mm A")} – ${moment(d.end).format("h:mm A")})`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 1);
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    svg.selectAll(".connecting-line")
      .data(sortedStages.slice(0, -1))
      .enter()
      .append("line")
      .attr("class", "connecting-line")
      .attr("x1", (d, i) => xScale(d.end))
      .attr("y1", (d, i) => yScale(d.level) + yScale.bandwidth() / 2)
      .attr("x2", (d, i) => xScale(sortedStages[i + 1].start))
      .attr("y2", (d, i) => yScale(sortedStages[i + 1].level) + yScale.bandwidth() / 2)
      .style("stroke", "#666")
      .style("stroke-width", 1);

    const middleTime = moment(startTime).add(endTime.diff(startTime) / 2, "milliseconds").toDate();
    const xAxis = d3.axisBottom(xScale)
      .tickValues([startTime.toDate(), middleTime, endTime.toDate()])
      .tickFormat(d3.timeFormat("%I:%M %p"));

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "#666")
      .style("font-size", "10px");

    svg.select(".domain").remove();

    svg.selectAll(".grid-line")
      .data([4, 3, 2, 1])
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d) + yScale.bandwidth() / 2)
      .attr("y2", (d) => yScale(d) + yScale.bandwidth() / 2)
      .style("stroke", "#e0e0e0")
      .style("stroke-dasharray", "2,2");

    return () => {
      tooltip.remove();
    };
  }, [sleepData]);

  // Render the D3.js pie chart for Sleep Summary
  useEffect(() => {
    if (!pieSvgRef.current || !sleepData.length) return;

    const latestSleep = sleepData[0];
    const sleepSummary = latestSleep.levels && latestSleep.levels.summary
      ? processSleepSummary(latestSleep.levels.summary, latestSleep.minutesAsleep + latestSleep?.levels?.summary?.wake?.minutes)
      : [];

    if (!sleepSummary.length) return;

    // Set up dimensions
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Clear previous SVG content
    d3.select(pieSvgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(pieSvgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create pie generator
    const pie = d3.pie()
      .value((d) => d.y)
      .sort(null);

    // Create arc generator
    const arc = d3.arc()
      .innerRadius(radius * 0.5) // Inner radius for donut shape
      .outerRadius(radius * 0.8);

    // Generate pie chart slices
    const arcs = svg.selectAll(".arc")
      .data(pie(sleepSummary))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Draw the slices
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color);

    // Add total sleep time in the center
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .style("font-size", "20px")
      .style("fill", "#333")
      .text(formatDuration(latestSleep.duration));

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("Total Sleep");
  }, [sleepData]);

  // Remove handlePreviousDay function
  // const handlePreviousDay = () => {
  //   setCurrentDate((prevDate) => moment(prevDate).subtract(1, "day"));
  // };

  // Remove handleNextDay function
  // const handleNextDay = () => {
  //   const tomorrow = moment().add(1, "day");
  //   if (moment(currentDate).isBefore(tomorrow, "day")) {
  //     setCurrentDate((prevDate) => moment(prevDate).add(1, "day"));
  //   }
  // };

  if (loading) return <div><Loader /></div>;
  if (error) return <div className="error">Error: {error}</div>;

  const latestSleep = sleepData[0] || {};
  const sleepSummary = latestSleep.levels && latestSleep.levels.summary
    ? processSleepSummary(latestSleep.levels.summary, latestSleep.minutesAsleep + latestSleep?.levels?.summary?.wake?.minutes)
    : [];

  const sleepStages = [
    { name: "Awake", duration: formatMinutesToHM(latestSleep?.levels?.summary?.wake?.minutes || 0), color: "#ff812e" },
    { name: "REM", duration: formatMinutesToHM(latestSleep?.levels?.summary?.rem?.minutes || 0), color: "#3B82F6" },
    { name: "Light", duration: formatMinutesToHM(latestSleep?.levels?.summary?.light?.minutes || 0), color: "#93C5FD" },
    { name: "Deep", duration: formatMinutesToHM(latestSleep?.levels?.summary?.deep?.minutes || 0), color: "#1E3A8A" },
  ];

  // Sleep summary labels with percentages
  const sleepSummaryLabels = sleepSummary.map((stage) => ({
    name: stage.x,
    percentage: stage.y.toFixed(0),
    color: stage.color,
  }));

  return (
    <div className="container">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Health Insights
      </motion.h1>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "Sleep" ? "active" : ""}`}
          onClick={() => setActiveTab("Sleep")}
        >
          Sleep
        </button>
        <button
          className={`tab ${activeTab === "Fatigue Risk" ? "active" : ""}`}
          onClick={() => setActiveTab("Fatigue Risk")}
        >
          Fatigue Risk
        </button>
        <button
          className={`tab ${activeTab === "Heart Rate" ? "active" : ""}`}
          onClick={() => setActiveTab("Heart Rate")}
        >
          Heart Rate
        </button>
      </div>

      {activeTab === "Sleep" && (
        <motion.div
          className="tab-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="cards-container">
            <motion.div
              className="card sleep-duration"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2>Sleep Duration</h2>
              <div className="time-frame-tabs">
                <button
                  className={`time-frame-tab ${timeFrame === "Day" ? "active" : ""}`}
                  onClick={() => setTimeFrame("Day")}
                >
                  Day
                </button>
                <button
                  className={`time-frame-tab ${timeFrame === "Weekly" ? "active" : ""}`}
                  onClick={() => setTimeFrame("Weekly")}
                >
                  Weekly
                </button>
                <button
                  className={`time-frame-tab ${timeFrame === "Monthly" ? "active" : ""}`}
                  onClick={() => setTimeFrame("Monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`time-frame-tab ${timeFrame === "Yearly" ? "active" : ""}`}
                  onClick={() => setTimeFrame("Yearly")}
                >
                  Yearly
                </button>
              </div>
              <div className="duration-info">
                {sleepData.length > 0 ? (
                  <>
                    <p className="sleep-time">
                      {moment(latestSleep.startTime).format("h:mm A")} – {moment(latestSleep.endTime).format("h:mm A")}
                    </p>
                    
                  </>
                ) : (
                  <>
                    <p className="sleep-time">No Sleep Data Available</p>
                    
                  </>
                )}
              </div>

              {sleepData.length > 0 ? (
                <>
                  <div className="sleep-stages-graph">
                    <svg ref={svgRef}></svg>
                  </div>
                  <div className="sleep-stage-labels">
                    {sleepStages.map((stage, index) => (
                      <div key={index} className="stage-label">
                        <svg width="10" height="10" style={{ marginRight: "5px" }}>
                          <circle cx="5" cy="5" r="5" fill={stage.color} />
                        </svg>
                        <span>{stage.name} • {stage.duration}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-data-container">
                  <img src={noDataImage} alt="No Data Available" className="no-data-image" />
                </div>
              )}
            </motion.div>

            <motion.div
              className="card sleep-summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2>Sleep Summary</h2>
              {sleepData.length > 0 ? (
                <>
                  <div className="donut-chart">
                    <svg ref={pieSvgRef}></svg>
                  </div>
              
                  <div className="sleep-summary-labels">
                    {sleepSummaryLabels.map((stage, index) => (
                      <div key={index} className="summary-label">
                        <svg width="10" height="10" style={{ marginRight: "5px" }}>
                          <circle cx="5" cy="5" r="5" fill={stage.color} />
                        </svg>
                        <span>{stage.name} {stage.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>No sleep summary available.</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}

      {activeTab === "Fatigue Risk" && (
        <div className="tab-content">
          <h2>Fatigue Risk</h2>
          <p>Coming soon...</p>
        </div>
      )}

      {activeTab === "Heart Rate" && (
        <motion.div
          className="tab-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeartRate heartRateData={heartRateData} />
        </motion.div>
      )}
    </div>
  );
};

export default DisplaySleep;