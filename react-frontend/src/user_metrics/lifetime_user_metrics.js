import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import useAuthContext from '../hooks/useAuthContext';
import ButtonAppBar from '../Navbar';
import '../App.css';

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
      <div>
        <h1>Life TimeUser Metrics</h1>
        <h2>Tasks Completed</h2>
        <p>{userMetricsLifetime}</p>
      </div>
      <div>
        <h1>Weekly User Metrics</h1>
        <h2>Tasks Completed</h2>
        <p>{userMetricsWeekly}</p>
      </div>
      <div>
        <h1>Monthly User Metrics</h1>
        <h2>Tasks Completed</h2>
        <p>{userMetricsMonthly}</p>
      </div>
      <div>
        <h1>Yearly User Metrics</h1>
        <h2>Tasks Completed</h2>
        <p>{userMetricsYearly}</p>
      </div>
    </>
  );
};

export default LifeTimeUserMetrics;
