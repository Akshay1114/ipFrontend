import React from "react";
import Chart from "react-apexcharts";

function Tab1({ activeTab }) {

    const monitoringData = {
        series: [
            { name: "High Fatigue Risk", data: [0, 18, 14, 12, 10, 8, 14] },
            { name: "FDTL Violation", data: [0, 5, 5, 5, 6, 5, 9] },
        ],
        options: {
            chart: { type: "line" },
            xaxis: { categories: ["January", "February", "March", "April", "May", "June", "July"] },
            stroke: { width: 3 },
            markers: { size: 6 },
            colors: ["#F4D03F", "#A29BFE"],
        },
    };

    return (

        <div className="schedule-container">
                {/* <div className="monitoring-section">
                    <div className="header-section-Schedule">
                        <h1>February</h1>
                        <button type="submit" className="search-CD"><input type="text" placeholder="Search" className="search-bar"/></button>
                    </div>
                    <p>2025</p>

                    <h3>Analytics</h3>
                    <Chart options={monitoringData.options} series={monitoringData.series} type="line" height={350} />
                </div> */}
                <div className="crew-details-section">

                    <div className="header-section-CD">
                        <h1>February</h1>
                        <button type="submit" className="search-CD"><input type="text" placeholder="Search" className="search-bar"/></button>
                    </div>
                    <p>2025</p>
                    
                    <div className="filter-section ">
                        <button type="submit" className="search-CD"><i class="fa fa-search fa-lg"></i><input type="text" placeholder="Search" className="search-bar"/></button>
                        <button className="filter-button">Filter &nbsp; <i class="fa fa-filter fa-lg"></i> </button>
                    </div>

                    <div className="table-container ">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Crew Name</th>
                                <th>Employee ID</th>
                                <th>Role</th>
                                <th>Fatigue Level</th>
                                <th>Duty Status</th>
                                <th>Last Rest Hours</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="employee-image-container">
                                    <div className="employee-image"></div>
                                </td>
                                <td>John Reynolds</td>
                                <td>CAP-4521</td>
                                <td>Captain</td>
                                <td className="fatigue-level-style">
                                    <div className="oval-border">
                                    <i class="fa fa-circle">  &nbsp; Low </i>
                                    </div>
                                </td>
                                <td className="duty-status-style">
                                    <p className="oval-border">Standby</p>
                                </td>
                                
                                <td>8 hours</td>
                                <td>Modify</td>
                            </tr>

                            <tr>
                                <td className="employee-image-container">
                                    <div className="employee-image"></div>
                                </td>
                                <td>John Reynolds</td>
                                <td>363549</td>
                                <td>Flight Attendant</td>
                                <td className="fatigue-level-style">
                                    <div className="oval-border">
                                    <i class="fa fa-circle">  &nbsp; high </i>
                                    </div>
                                </td>
                                <td className="duty-status-style">
                                    <p className="oval-border">Available</p>
                                </td>
                                
                                <td>6 hours</td>
                                <td>Modify</td>
                            </tr>

                            <tr>
                                <td className="employee-image-container">
                                    <div className="employee-image"></div>
                                </td>
                                <td>John Reynolds</td>
                                <td>456787</td>
                                <td>First Officer</td>
                                <td className="fatigue-level-style">
                                    <div className="oval-border">
                                    <i class="fa fa-circle">  &nbsp; High </i>
                                    </div>
                                </td>
                                <td className="duty-status-style">
                                    <p className="oval-border">OFF Duty</p>
                                </td>
                                
                                <td>4 hours</td>
                                <td>Modify</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    
                </div>
       

           
                <div className="reports-section">
                    <div className="header-section-Schedule">
                        <h1>February</h1>
                        <button type="submit" className="search-CD"><input type="text" placeholder="Search" className="search-bar"/></button>
                    </div>
                    <p>2025</p>
                    
                    <h2>Reports</h2>
                    <Chart options={monitoringData.options} series={monitoringData.series} type="line" height={350} />
                </div>
        
        </div>
    );
}

export default Tab1;

