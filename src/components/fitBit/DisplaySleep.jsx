import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line';
import { wingWiseApi } from "../../utils/AxiosInstance";
import Loader from "../loader/Loader";
import axios from "axios";

const DisplaySleep = () => {
    const [chartData, setChartData] = useState([]);
    const [wakeLines, setWakeLines] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSleepData = async () => {
            const accessToken = localStorage.getItem("fitbit_access_token");

            if (!accessToken) {
                setError("No access token found. Please connect your Fitbit account.");
                setLoading(false);
                return;
            }

            try {
                console.log("accessToken>>>>>>>>>>>>>>>><<<<<<<<<<<");
                // const response = await wingWiseApi.post("/sleepData/fetch-sleep-data", { accessToken });
                const response = await axios.post("http://localhost:5001/api/sleepData/fetch-sleep-data", { accessToken });
                console.log("response", response.data.sleep);
                const sleepData = response.data.sleep; // Latest sleep entry
                
                if (!sleepData || !sleepData.levels) {
                    setError("No sleep data available or data format is invalid.");
                    setLoading(false);
                    return;
                }

                const levels = sleepData.levels.data || [];
                const shortData = sleepData.levels.shortData || [];
                const summaryData = sleepData.levels.summary || {};

                // Transform main sleep stages for the hypnogram
                const stages = ['wake', 'rem', 'light', 'deep'];
                const transformedData = stages.map((stage) => ({
                    id: stage,
                    data: [],
                }));

                levels.forEach((entry) => {
                    const startTime = new Date(entry.dateTime);
                    const endTime = new Date(startTime.getTime() + entry.seconds * 1000);

                    stages.forEach((stage, index) => {
                        const value = entry.level === stage ? 1 : 0; // Stack height
                        transformedData[index].data.push(
                            { x: startTime, y: value },
                            { x: endTime, y: value }
                        );
                    });
                });

                // Transform shortData for wake lines
                const wakeLineData = shortData.map((entry) => {
                    const startTime = new Date(entry.dateTime);
                    const endTime = new Date(startTime.getTime() + entry.seconds * 1000);
                    return [
                        { x: startTime, y: 0 },
                        { x: startTime, y: 0.1 }, // Small vertical line
                        { x: endTime, y: 0.1 },
                        { x: endTime, y: 0 },
                    ];
                }).flat();

                setChartData(transformedData);
                setWakeLines([{ id: 'wakeLines', data: wakeLineData }]);
                setSummary({
                    minutesAsleep: sleepData.minutesAsleep || 0,
                    timeInBed: sleepData.timeInBed || 0,
                    stages: {
                        wake: summaryData.wake?.minutes || 0,
                        rem: summaryData.rem?.minutes || 0,
                        light: summaryData.light?.minutes || 0,
                        deep: summaryData.deep?.minutes || 0,
                    },
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching sleep data:", err);
                setError("Failed to fetch sleep data. Please try again later.");
                setLoading(false);
            }
        };

        fetchSleepData();
    }, []);

    if (loading) return <div style={styles.loading}><Loader /></div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    // Calculate percentages for summary
    const totalAsleep = summary.minutesAsleep || 1;
    const stagePercentages = summary.stages
        ? {
            rem: ((summary.stages.rem / totalAsleep) * 100).toFixed(0),
            light: ((summary.stages.light / totalAsleep) * 100).toFixed(0),
            deep: ((summary.stages.deep / totalAsleep) * 100).toFixed(0),
        }
        : {};

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Sleep Insights</h2>
                </div>
                <div style={styles.content}>
                    {/* Left: Chart */}
                    <div style={styles.chartContainer}>
                        <div style={{ height: 250, position: 'relative' }}>
                            {/* Main Hypnogram Chart */}
                            <ResponsiveLine
                                data={chartData}
                                margin={{ top: 20, right: 40, bottom: 60, left: 40 }}
                                xScale={{ type: 'time', format: '%Y-%m-%dT%H:%M:%S.%L' }}
                                xFormat="time:%I:%M %p"
                                yScale={{ type: 'linear', stacked: true, min: 0, max: 1 }}
                                axisBottom={{
                                    format: '%I %p',
                                    tickValues: 'every 1 hour',
                                    legendOffset: 40,
                                    tickSize: 5,
                                    tickPadding: 5,
                                }}
                                axisLeft={null}
                                enableGridY={false}
                                enablePoints={false}
                                curve="step" // Step-like rendering
                                colors={['#ffffff', '#66b3ff', '#3399ff', '#1a53ff']} // Wake, REM, Light, Deep
                                enableArea={true}
                                areaOpacity={1}
                                motionConfig="gentle" // Smooth animations
                                useMesh={false}
                            />

                            {/* Wake Lines Overlay */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                <ResponsiveLine
                                    data={wakeLines}
                                    margin={{ top: 20, right: 40, bottom: 60, left: 40 }}
                                    xScale={{ type: 'time', format: '%Y-%m-%dT%H:%M:%S.%L' }}
                                    yScale={{ type: 'linear', min: -0.1, max: 0.1 }}
                                    axisBottom={null}
                                    axisLeft={null}
                                    enableGridY={false}
                                    enableGridX={false}
                                    enablePoints={false}
                                    colors={['#ffffff']}
                                    enableArea={false}
                                    motionConfig="gentle"
                                    useMesh={false}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary and Stages */}
                    <div style={styles.summaryContainer}>
                        <div style={styles.summary}>
                            <h3 style={styles.summaryTitle}>Time Asleep</h3>
                            <h1 style={styles.timeAsleep}>
                                {Math.floor(summary.minutesAsleep / 60)}h {summary.minutesAsleep % 60}min
                            </h1>
                            <p style={styles.totalDuration}>
                                Total duration {Math.floor(summary.timeInBed / 60)}h {summary.timeInBed % 60}min
                            </p>
                        </div>

                        <div style={styles.stages}>
                            <div style={styles.stageItem}>
                                <div style={{ ...styles.stageColor, background: '#ffffff' }}></div>
                                <span style={styles.stageLabel}>Awake {summary.stages?.wake} min</span>
                            </div>
                            <div style={styles.stageItem}>
                                <div style={{ ...styles.stageColor, background: '#66b3ff' }}></div>
                                <span style={styles.stageLabel}>REM {summary.stages?.rem} min {stagePercentages.rem}%</span>
                            </div>
                            <div style={styles.stageItem}>
                                <div style={{ ...styles.stageColor, background: '#3399ff' }}></div>
                                <span style={styles.stageLabel}>Light {summary.stages?.light} min {stagePercentages.light}%</span>
                            </div>
                            <div style={styles.stageItem}>
                                <div style={{ ...styles.stageColor, background: '#1a53ff' }}></div>
                                <span style={styles.stageLabel}>Deep {summary.stages?.deep} min {stagePercentages.deep}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Inline styles for the desktop layout
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
    },
    card: {
        background: '#1a2a44',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        width: '900px',
        padding: '30px',
        color: 'white',
    },
    header: {
        marginBottom: '20px',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '600',
        margin: 0,
    },
    content: {
        display: 'flex',
        gap: '40px',
    },
    chartContainer: {
        flex: 2,
    },
    summaryContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    summary: {
        marginBottom: '20px',
    },
    summaryTitle: {
        fontSize: '1.2rem',
        fontWeight: '500',
        marginBottom: '10px',
    },
    timeAsleep: {
        fontSize: '2.5rem',
        fontWeight: '700',
        margin: '0 0 10px 0',
    },
    totalDuration: {
        fontSize: '1rem',
        color: '#a3bffa',
        margin: 0,
    },
    stages: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    stageItem: {
        display: 'flex',
        alignItems: 'center',
    },
    stageColor: {
        width: '24px',
        height: '24px',
        marginRight: '12px',
        borderRadius: '4px',
    },
    stageLabel: {
        fontSize: '1rem',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
    },
    error: {
        color: '#ff6b6b',
        fontSize: '1.2rem',
        textAlign: 'center',
        padding: '40px',
        background: '#1a2a44',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '0 auto',
    },
};

export default DisplaySleep;