import React from 'react';
import { useSelector } from 'react-redux';

function TabSchd3({ activeTab }) {  // Accept activeTab as a prop
    const value = useSelector((state) => state.auth);
    console.log("value", value);
    console.log("Active Tab:", activeTab); // Log activeTab to verify it's received

    return (
        <div>
            <div className='header-flight'>
                <div>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <h1>HELLO HI </h1>
            {/* Add content based on activeTab if needed */}
        </div>
    );
}

export default TabSchd3;
