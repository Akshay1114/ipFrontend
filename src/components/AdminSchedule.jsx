
import React, { useState } from "react";
import Wrapper from "./common/Wrapper";
import Tab from "./common/Tab";
import TabSchd1 from "./admin/schedule/TabSchd1";
import TabSchd2 from "./admin/TabSchd2";
import TabSchd3 from "./admin/TabSchd3";

function AdminSchedule() {
    const [activeTab, setActiveTab] = useState("Monitoring");


    const items = [
        {
            key: "1",
            label: "Flight",
            children: <TabSchd1 activeTab="Flight" />,
        },
        {
            key: "2",
            label: "Crew",
            children: <TabSchd2 activeTab="Crew" />,
        },
        {
            key: "3",
            label: "Requests",
            children: <TabSchd3 activeTab="Requests" />,
        },
    ];

    const formattedClassName = activeTab.replace(/\s+/g, "-");

    return (
        <div className={`AdminSchedule ${formattedClassName}`}>
            <Wrapper className="schedule-wrapper">
              <div className="schedule-header">
                <h2>Schedule</h2>
                <button type="submit" className="search-Schedule"><i class="fa fa-plus"></i><input type="text" placeholder="Add Crew Member" className="search-bar create-flight"/></button>
              </div>
              

                <Tab items={items} onChange={(key) => setActiveTab(items.find(i => i.key === key).label)} />
            </Wrapper>
        </div>
    );
}

export default AdminSchedule;
