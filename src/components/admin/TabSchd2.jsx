import React from 'react';
import { useSelector } from 'react-redux';

function TabSchd2({ activeTab }) {  // Accept activeTab as a prop
    const value = useSelector((state) => state.auth);
    console.log("value", value);
    console.log("Active Tab:", activeTab); // Log activeTab to verify it's received

    return (
        <div>
            <h2>Current Tab: {activeTab}</h2>
            <h1>HELLO HI </h1>
            {/* Add content based on activeTab if needed */}
        </div>
    );
}

export default TabSchd2;
