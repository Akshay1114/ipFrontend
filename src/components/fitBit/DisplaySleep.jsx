import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import * as d3 from "d3";
import { motion } from "framer-motion";
import Loader from "../loader/Loader"; // Adjust path as needed
import HeartRate from "./HeartRate"; // Adjust path as needed
import noDataImage from "../../assets/images/no-data.png"; // Adjust path as needed
import "./DisplaySleep.css"; // Ensure this CSS file exists
import { wingWiseApi } from "../../utils/AxiosInstance"; // Adjust path as needed
import Fatigue from "./Fatigue";

const DisplaySleep = () => {
  // State declarations
  const [sleepData, setSleepData] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Sleep");
  const [timeFrame, setTimeFrame] = useState("Day");
  const [currentIndex, setCurrentIndex] = useState(0); // For navigating days
  const [selectedStage, setSelectedStage] = useState(null); // For popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // For popup visibility

  // Refs for D3 charts
  const svgRef = useRef(null); // Sleep stages graph
  const pieSvgRef = useRef(null); // Pie chart

  // Fetch sleep and heart rate data from the backend
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
      const response = await wingWiseApi.post("/sleepData/fetch-sleep-data", { accessToken });
      const { sleep, heartRate } = response.data;
      const sortedSleep = Array.isArray(sleep)
        ? sleep.sort((a, b) => new Date(b.dateOfSleep) - new Date(a.dateOfSleep))
        : sleep && sleep.dateOfSleep
        ? [sleep]
        : [];
      const sortedHeartRate = heartRate
        ? Array.isArray(heartRate)
          ? heartRate.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
          : [heartRate]
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
    fetchData();
  }, []);

  // Helper functions
  const formatDuration = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatMinutesToHM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

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
          color = "#ff812e";
          name = "Awake";
          break;
        case "light":
          level = 3;
          color = "#93C5FD";
          name = "Light";
          break;
        case "rem":
          level = 2;
          color = "#3B82F6";
          name = "REM";
          break;
        case "deep":
          level = 1;
          color = "#1E3A8A";
          name = "Deep";
          break;
        default:
          return null;
      }
      return { start: stageStart.toDate(), end: stageEnd.toDate(), level, color, name };
    }).filter((d) => d !== null);
    return { stages: stageData, startTime, endTime };
  };

  const processSleepSummary = (summary, totalMinutes) => {
    if (!summary) return [];
    return [
      { x: "Deep", y: (summary?.deep?.minutes / totalMinutes) * 100, color: "#1E3A8A" },
      { x: "REM", y: (summary?.rem?.minutes / totalMinutes) * 100, color: "#3B82F6" },
      { x: "Light", y: (summary?.light?.minutes / totalMinutes) * 100, color: "#93C5FD" },
      { x: "Awake", y: (summary?.wake?.minutes / totalMinutes) * 100, color: "#ff812e" },
    ];
  };

  // D3 sleep stages graph
  useEffect(() => {
    if (!svgRef.current || !sleepData.length || !sleepData[currentIndex]) return;
    const currentSleep = sleepData[currentIndex];
    const { stages, startTime, endTime } = processSleepStages(currentSleep.levels);
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
    const xScale = d3.scaleTime().domain([startTime.toDate(), endTime.toDate()]).range([0, width]);
    const yScale = d3.scaleBand().domain([4, 3, 2, 1]).range([0, height]).padding(0.2);
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
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${d.name.toUpperCase()} (${moment(d.start).format("h:mm A")} – ${moment(d.end).format("h:mm A")})`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 1);
        tooltip.transition().duration(500).style("opacity", 0);
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
  }, [sleepData, currentIndex]);

  // D3 pie chart for sleep summary
  useEffect(() => {
    if (!pieSvgRef.current || !sleepData.length || !sleepData[currentIndex]) return;
    const currentSleep = sleepData[currentIndex];
    const sleepSummary = currentSleep.levels && currentSleep.levels.summary
      ? processSleepSummary(currentSleep.levels.summary, currentSleep.minutesAsleep + currentSleep?.levels?.summary?.wake?.minutes)
      : [];
    if (!sleepSummary.length) return;
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    d3.select(pieSvgRef.current).selectAll("*").remove();
    const svg = d3.select(pieSvgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    const pie = d3.pie().value((d) => d.y).sort(null);
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);
    const arcs = svg.selectAll(".arc").data(pie(sleepSummary)).enter().append("g").attr("class", "arc");
    arcs.append("path").attr("d", arc).attr("fill", (d) => d.data.color);
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .style("font-size", "20px")
      .style("fill", "#333")
      .text(formatDuration(currentSleep.duration));
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("Total Sleep");
  }, [sleepData, currentIndex]);

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex < sleepData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleNext = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Popup handlers
  const openPopup = (stageName) => {
    setSelectedStage(stageName);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedStage(null);
  };

  // Sleep stage descriptions for popup
  const getStageInfo = (stageName) => {
    switch (stageName) {
      case "Awake":
        return "The Awake stage represents time spent restless or fully awake during the night. It shows how often your sleep was interrupted. Reducing awake time can lead to better sleep quality.";
      case "REM":
        return "REM (Rapid Eye Movement) sleep is when most dreaming occurs. It’s vital for memory consolidation, learning, and emotional balance. A healthy amount of REM sleep indicates good cognitive recovery.";
      case "Light":
        return "Light sleep is the transition stage between wakefulness and deeper sleep. It supports mental and physical recovery. Spending a significant portion of the night in light sleep is normal and shows a balanced sleep cycle.";
      case "Deep":
        return "Deep sleep is the most restorative stage, crucial for physical healing, immune function, and energy restoration. It reflects how well your body recovers overnight—a higher amount means better physical rejuvenation.";
      default:
        return "";
    }
  };

  // Loading and error states
  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error}</div>;

  // Current sleep data
  const currentSleep = sleepData[currentIndex] || {};
  const sleepSummary = currentSleep.levels && currentSleep.levels.summary
    ? processSleepSummary(currentSleep.levels.summary, currentSleep.minutesAsleep + currentSleep?.levels?.summary?.wake?.minutes)
    : [];
  const sleepStages = [
    { name: "Awake", duration: formatMinutesToHM(currentSleep?.levels?.summary?.wake?.minutes || 0), color: "#ff812e" },
    { name: "REM", duration: formatMinutesToHM(currentSleep?.levels?.summary?.rem?.minutes || 0), color: "#3B82F6" },
    { name: "Light", duration: formatMinutesToHM(currentSleep?.levels?.summary?.light?.minutes || 0), color: "#93C5FD" },
    { name: "Deep", duration: formatMinutesToHM(currentSleep?.levels?.summary?.deep?.minutes || 0), color: "#1E3A8A" },
  ];
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
        <button className={`tab ${activeTab === "Sleep" ? "active" : ""}`} onClick={() => setActiveTab("Sleep")}>
          Sleep
        </button>
        <button className={`tab ${activeTab === "Fatigue Risk" ? "active" : ""}`} onClick={() => setActiveTab("Fatigue Risk")}>
          Fatigue Risk
        </button>
        <button className={`tab ${activeTab === "Heart Rate" ? "active" : ""}`} onClick={() => setActiveTab("Heart Rate")}>
          Heart Rate
        </button>
      </div>

      {activeTab === "Sleep" && (
        <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="date-navigation">
            <button onClick={handlePrevious} disabled={currentIndex >= sleepData.length - 1}>
              Previous
            </button>
            <span>
              {sleepData[currentIndex]
                ? moment(sleepData[currentIndex].dateOfSleep).format("MMMM D, YYYY")
                : "No Data"}
            </span>
            <button onClick={handleNext} disabled={currentIndex <= 0}>
              Next
            </button>
          </div>
          <div className="cards-container">
            <motion.div
              className="card sleep-duration"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2>Sleep Duration</h2>
              <div className="time-frame-tabs">
                {["Day", "Weekly", "Monthly", "Yearly"].map((tf) => (
                  <button
                    key={tf}
                    className={`time-frame-tab ${timeFrame === tf ? "active" : ""}`}
                    onClick={() => setTimeFrame(tf)}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="duration-info">
                {sleepData.length > 0 && currentSleep.startTime ? (
                  <>
                    <p className="sleep-date">
                      {moment(currentSleep.dateOfSleep).format("MMMM D, YYYY")}
                    </p>
                    <p className="sleep-time">
                      {moment(currentSleep.startTime).format("h:mm A")} – {moment(currentSleep.endTime).format("h:mm A")}
                    </p>
                  </>
                ) : (
                  <p className="sleep-time">No Sleep Data Available</p>
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

          {/* Four Sleep Stage Cards in a Row */}
          <div className="sleep-stage-cards">
            {["Awake", "REM", "Light", "Deep"].map((stage, index) => (
              <motion.div
                key={index}
                className="stage-card"
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
                onClick={() => openPopup(stage)}
              >
                <h3>{stage}</h3>
              </motion.div>
            ))}
          </div>

          {/* Popup for Sleep Stage Details */}
          {isPopupOpen && (
            <motion.div
              className="popup"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="popup-content">
                <h2>{selectedStage}</h2>
                <p>{getStageInfo(selectedStage)}</p>
                <button onClick={closePopup}>Close</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {activeTab === "Fatigue Risk" && (
        <div className="tab-content">
          <h2>Fatigue Risk</h2>
         <Fatigue />
        </div>
      )}

      {activeTab === "Heart Rate" && (
        <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <HeartRate heartRateData={heartRateData} />
        </motion.div>
      )}
    </div>
  );
};

export default DisplaySleep;