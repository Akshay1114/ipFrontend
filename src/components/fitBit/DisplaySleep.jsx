import React, { useEffect, useState } from "react";
import axios from "axios";
import { wingWiseApi } from "../../utils/AxiosInstance";

const DisplaySleep = () => {
    const [sleepData, setSleepData] = useState([]);

    useEffect(() => {
        const fetchSleepData = async () => {
            const accessToken = localStorage.getItem("fitbit_access_token");

            if (!accessToken) {
                console.error("No access token found.");
                return;
            }

            try {
                // const response = await axios.post("http://localhost:5001/api/sleepData/fetch-sleep-data", { accessToken });
                const response = await wingWiseApi.post("/sleepData/fetch-sleep-data", { accessToken });
                setSleepData(response.data.sleepData);
            } catch (error) {
                console.error("Error fetching sleep data:", error);
            }
        };

        fetchSleepData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Sleep Data:</h3>
            <ul>
                {sleepData.map((entry, index) => (
                    <li key={index}>
                        <strong>Date:</strong> {entry.dateOfSleep} | <strong>Duration:</strong> {entry.duration / 1000 / 60} min
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplaySleep;