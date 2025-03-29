
import React, { useState } from "react";
import Wrapper from "./common/Wrapper";
import Tab from "./common/Tab";
import Tab1 from "./admin/Tab1";
import { useSelector } from "react-redux";
import EmployeeInsight from "./employee/EmployeeInsight";
import AdminInsight from "./admin/AdminInsight";

function HealthInsights() {
    const [activeTab, setActiveTab] = useState("Monitoring");

    const getUser = useSelector((state) => state.auth.role);
    console.log("getUser", getUser);

    const items = [
        {
            key: "1",
            label: "Monitoring",
            children: <Tab1 activeTab="Monitoring" />,
        },
        {
            key: "2",
            label: "Crew Details",
            children: <Tab1 activeTab="Crew Details" />,
        },
        {
            key: "3",
            label: "Reports",
            children: <Tab1 activeTab="Reports" />,
        },
    ];

    const formattedClassName = activeTab.replace(/\s+/g, "-");

    return (
        <div className={`AdminSchedule ${formattedClassName}`}>
            <Wrapper>
              <div className="">
                {/* <h2>Health Insights</h2> */}
               {
                getUser == "employee"?
                <EmployeeInsight/>
                :
                <AdminInsight/>
               }
              </div>
              

                {/* <Tab items={items} onChange={(key) => setActiveTab(items.find(i => i.key === key).label)} /> */}
            </Wrapper>
        </div>
    );
}

export default HealthInsights;
