import React, { useState } from "react";
import Wrapper from "./common/Wrapper";
import Tab from "./common/Tab";
// import Tab1 from "./admin/Tab1";
import Tab1 from "./admin/schedule/Tab1";
import Tab2 from "./admin/schedule/Tab2";
import Tab3 from "./admin/schedule/Tab3";
import CreateSchedule from "./admin/schedule/CreateSchedule";

function AdminSchedule() {
  const [activeTab, setActiveTab] = useState("Monitoring");
  const [generateSchedule, setGenerateSchedule] = useState(false);

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
      children: <Tab3/>,
    },
  ];

  const formattedClassName = activeTab.replace(/\s+/g, "-");

  const handleOpenSchedule = () => {
    console.log("Open Schedule");
    setGenerateSchedule(!generateSchedule);
  };
  return (
    <div className={`AdminSchedule ${formattedClassName}`}>
      <Wrapper>
        <div className="schedule-header">
          <h2>Schedule</h2>
          <button onClick = {handleOpenSchedule} type="submit" className="search-Schedule">
            {generateSchedule ? "Return":<><i class="fa fa-plus"></i>
            Create Schedule</>}
          </button>
        </div>

     { generateSchedule ? <CreateSchedule />: <Tab
          items={items}
          onChange={(key) =>
            setActiveTab(items.find((i) => i.key === key).label)
          }
        />}
      </Wrapper>
    </div>
  );
}

export default AdminSchedule;
