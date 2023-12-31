import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import useAuthContext from '../hooks/useAuthContext';
import ButtonAppBar from '../ui_elements/Navbar';
import '../stylesheets/App.css';

const LifeTimeUserMetrics = () => {
  const { user } = useAuthContext();
  const [userMetricsLifetime, setUserMetricsLifetime] = useState(0);
  const [userMetricsWeekly, setUserMetricsWeekly] = useState(0);
  const [userMetricsMonthly, setUserMetricsMonthly] = useState(0);
  const [userMetricsYearly, setUserMetricsYearly] = useState(0);
  const fetchData = async () => {
    const user_id = localStorage.getItem('id');
    console.log(user_id);
    const user_metrics = axios.get(`http://localhost:8000/user_metrics/${user_id}`)
      .then((result) => {
        console.log(result.data.users_tasks);
        setUserMetricsLifetime(result.data.users_tasks.tasksCompleted);
        setUserMetricsWeekly(result.data.users_tasks.user_metrics_weekly.tasksCompleted);
        setUserMetricsMonthly(result.data.users_tasks.user_metrics_monthly.tasksCompleted);
        setUserMetricsYearly(result.data.users_tasks.user_metrics_yearly.tasksCompleted);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // Update the document title using the browser API

    fetchData();
  }, []);
  return (
    <>
      <ButtonAppBar />
      {userMetricsLifetime > 0 ? (
        <div className="metrics_flex_container">
          <div className="metric_container">
            <h3>Total Time User Metrics</h3>
            <div>
              <h3>Tasks Completed</h3>
              <p>{userMetricsLifetime}</p>
            </div>
          </div>
          <div className="metric_container">
            <h3>Weekly User Metrics</h3>
            <h3>Tasks Completed</h3>
            <p>{userMetricsWeekly}</p>
          </div>
          <div className="metric_container">
            <h3>Monthly User Metrics</h3>
            <h3>Tasks Completed</h3>
            <p>{userMetricsMonthly}</p>
          </div>
          <div className="metric_container">
            <h3>Yearly User Metrics</h3>
            <h3>Tasks Completed</h3>
            <p>{userMetricsYearly}</p>
          </div>
        </div>
      ) : (
        <h1>There are no metrics to display 🚀 </h1>
      )}
    </>
  );
};

export default LifeTimeUserMetrics;
