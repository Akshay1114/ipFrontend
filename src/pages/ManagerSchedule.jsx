import React from 'react';
// import { useState } from "react";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import CommonModal from "/src/components/CommonModal.jsx";
// import CommonTable from "/src/components/CommonTable.jsx";
// import MakeRequest from "/src/components/MakeRequest.jsx";

function TabSchd1({ activeTab }) {  // Accept activeTab as a prop
    const value = useSelector((state) => state.auth);
    console.log("value", value);
    console.log("Active Tab:", activeTab); // Log activeTab to verify it's received


    return (
        <div>
            <div className='header-flight'>
                <div className='date-flight'>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long'})}</div>
                <div className='search-flight-container'>
                    <button type="submit" className="SearchFlight"><i class="fa fa-search"></i><input type="text" placeholder="Search" className="search-bar"/></button>
                    <button type="submit" className="SearchFlight searchfilter"><i class="fa fa-filter"></i><input type="text" placeholder="Filter" className="search-bar"/></button>
                </div>
            </div>
            <div className='dateFlight-year'>{new Date().toLocaleDateString('en-GB', {year: 'numeric' })}</div>
            <div className='today-flight-schedule'>
                    <h3>&lt; Previous</h3>
                    <h2>Today's Flight <i class="fa fa-calendar fa-lg"></i></h2>
                    <h3>Next &gt;</h3>
            </div>
            <div className='TodayFlightSchedule'>
                <div className='PlaneDeparture_container'>
                    <p> <img src="/Plane_departure.png" alt="Plane_arrival"/>Departure from YVR </p>

                    {/* -------------1---------------- */}
                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                {/* <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button> */}
                                <CommonModal title="Crew Info" btnText="Crew Info" oktext="Modify Schedule">
                                <div>
                                    <hr/>
                                    <table className='crew-info-table'>
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>ID</th>
                                            <th>Start Time</th>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> Captain</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> First Officer</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> Purser(lead Fa)</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> Flight Attendant</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                    </table>
                                </div>
                            </CommonModal>
                        </div>
                            
                    </div>
                    {/* -------------2---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------3---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        {/* <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight" ><i class="fa fa-users"> Crew Info</i></button>
                        </div> */}
                    </div>
                    {/* -------------4---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                    {/* -------------5---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                </div>

                {/* -------------center line---------------- */}
                <div className='dash_line'></div>
                {/* -------------next division---------------- */}

                <div className='PlaneArrival_container'>
                <p> <img src="/Plane_arrival.png" alt="Plane_arrival"/>Departure from YVR </p>
                    {/* -------------1---------------- */}
                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------2---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------3---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------4---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                    {/* -------------5---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                    </div>
                </div>

                <div>
            <div className='header-flight'>
                <div className='date-flight'>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long'})}</div>
                <div className='search-flight-container'>
                    <button type="submit" className="SearchFlight"><i class="fa fa-search"></i><input type="text" placeholder="Search" className="search-bar"/></button>
                    <button type="submit" className="SearchFlight searchfilter"><i class="fa fa-filter"></i><input type="text" placeholder="Filter" className="search-bar"/></button>
                </div>
            </div>
            <div className='dateFlight-year'>{new Date().toLocaleDateString('en-GB', {year: 'numeric' })}</div>
            <div className='today-flight-schedule'>
                    <h3>&lt; Previous</h3>
                    <h2>Today's Flight <i class="fa fa-calendar fa-lg"></i></h2>
                    <h3>Next &gt;</h3>
            </div>
            <div className='TodayFlightSchedule'>
                <div className='PlaneDeparture_container'>
                    <p> <img src="/Plane_departure.png" alt="Plane_arrival"/>Departure from YVR </p>

                    {/* -------------1---------------- */}
                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                {/* <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button> */}
                                <CommonModal title="Crew Info" btnText="Crew Info" oktext="Modify Schedule">
                                <div>
                                    <hr/>
                                    <table className='crew-info-table'>
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>ID</th>
                                            <th>Start Time</th>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> Captain</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> First Officer</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> Purser(lead Fa)</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                        <tr>
                                            <td>Nidhi Gandhi</td>
                                            <td> Flight Attendant</td>
                                            <td>CAF4263</td>
                                            <td>7:00 am</td>
                                        </tr>
                                    </table>
                                </div>
                            </CommonModal>
                        </div>
                            
                    </div>
                    {/* -------------2---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------3---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        {/* <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight" ><i class="fa fa-users"> Crew Info</i></button>
                        </div> */}
                    </div>
                    {/* -------------4---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                    {/* -------------5---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                </div>

                {/* -------------center line---------------- */}
                <div className='dash_line'></div>
                {/* -------------next division---------------- */}

                <div className='PlaneArrival_container'>
                <p> <img src="/Plane_arrival.png" alt="Plane_arrival"/>Departure from YVR </p>
                    {/* -------------1---------------- */}
                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------2---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------3---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>
                    {/* -------------4---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                    {/* -------------5---------------- */}

                    <div className="flight-details">
                        <div className="flight-header">
                                          <span>Flight <strong>#AFO374</strong></span>
                                          <span>Fleet <strong>A320Neo</strong></span>
                        </div>
                        <div className='flightTiming'>
                            <div className="timeline">
                                            <div className="time-block">
                                                <h3>15:05</h3>
                                                <p>YVR</p>
                                            </div>
                                            <div className="duration-block">
                                                <span>- - - - - <FontAwesomeIcon icon={faPlane} />- - - - -</span>
                                                <h4>4h 55m</h4>
                                                
                                            </div>
                                            <div className="time-block">
                                                <h3>21:00</h3>
                                                <p>NYC</p>
                                            </div>
                            </div>
                        </div>
                        <div className='Crew_info-button'>
                                <button type="submit" className="SearchFlight"><i class="fa fa-users"> Crew Info</i></button>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default TabSchd1;
