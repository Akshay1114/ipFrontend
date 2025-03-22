
import React, { useState } from "react";
import Wrapper from "./common/Wrapper";
import Tab from "./common/Tab";
// import Tab1 from "./admin/Tab1";
import Tab1 from "./admin/schedule/Tab1";
import Tab2 from "./admin/schedule/Tab2";
import CreateSchedule from "./admin/schedule/CreateSchedule";

function AdminSchedule() {
    const [activeTab, setActiveTab] = useState("Monitoring");


    const items = [
        {
            key: "1",
            label: "Flight",
            children: <Tab1 />,
        },
        {
            key: "2",
            label: "Crew",
            children: <Tab2 />,
        },
        {
            key: "3",
            label: "Requests",
            children: <CreateSchedule />,
        },
    ];

    const formattedClassName = activeTab.replace(/\s+/g, "-");

    return (
        <div className={`AdminSchedule ${formattedClassName}`}>
            <Wrapper>
              <div className="schedule-header">
                <h2>Schedule</h2>
                <button type="submit" className="search-Schedule"><i class="fa fa-plus"></i><input type="text" placeholder="Create Schedule" className="search-bar"/></button>
              </div>
              

                <Tab items={items} onChange={(key) => setActiveTab(items.find(i => i.key === key).label)} />
            </Wrapper>
        </div>
    );
}

export default AdminSchedule;
