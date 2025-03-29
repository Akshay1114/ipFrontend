import React from 'react';
import styles from './AdminInsight.module.css';

function AdminInsight() {
  return (
    <div className={styles.insightsContainer}>
      <header className={styles.header}>
        <h1>Health Insights</h1>
        {/* <button className={styles.addUserButton}>Add New Crew Member</button> */}
      </header>

      {/* <div className={styles.searchBar}>
        <input type="text" placeholder="Search crew members..." className={styles.searchInput} />
        <span className={styles.searchIcon}>🔍</span>
      </div> */}

      <table className={styles.crewTable}>
        <thead>
          <tr>
            <th></th> {/* For the checkboxes */}
            <th>Crew Name</th>
            <th>Employee Id</th>
            <th>Role</th>
            <th>Fatigue Level</th>
            <th>Duty Status</th>
            <th>Last Rest Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>John Reynolds</td>
            <td>CAP - 4521</td>
            <td>Captain</td>
            <td><span className={`${styles.status} ${styles.low}`}>Low</span></td>
            <td>Stand By</td>
            <td>8 hours</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Sienna Graves</td>
            <td>363549</td>
            <td>Flight Attendant</td>
            <td><span className={`${styles.status} ${styles.moderate}`}>Moderate</span></td>
            <td>Available</td>
            <td>6 hours</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Caleb Dawson</td>
            <td>342153</td>
            <td>First Officer</td>
            <td><span className={`${styles.status} ${styles.high}`}>High</span></td>
            <td>Resting</td>
            <td>4 hours</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Jasper Flynn</td>
            <td>362159</td>
            <td>Flight Attendant</td>
            <td><span className={`${styles.status} ${styles.moderate}`}>Moderate</span></td>
            <td>Resting</td>
            <td>6.5 hours</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Felix Donovan</td>
            <td>345219</td>
            <td>Pilot</td>
            <td><span className={`${styles.status} ${styles.low}`}>Low</span></td>
            <td>On Duty</td>
            <td>7.5 hours</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Ivy Thornton</td>
            <td>97R46Y</td>
            <td>Flight Attendant</td>
            <td><span className={`${styles.status} ${styles.low}`}>Low</span></td>
            <td>Stand By</td>
            <td>8 hours</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Lena Montgomery</td>
            <td>028756</td>
            <td>Flight Attendant</td>
            <td><span className={`${styles.status} ${styles.moderate}`}>Moderate</span></td>
            <td>Available</td>
            <td>6 hours</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Elliot Harper</td>
            <td>673546</td>
            <td>Flight Attendant</td>
            <td><span className={`${styles.status} ${styles.high}`}>High</span></td>
            <td>Resting</td>
            <td>4 hours</td>
          </tr>
        </tbody>
      </table>

      <footer className={styles.footer}>
        <button className={styles.modifyButton}>Modify</button>
        <button className={styles.backButton}>Back to dashboard</button>
      </footer>
    </div>
  );
}

export default AdminInsight;
