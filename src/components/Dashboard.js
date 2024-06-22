import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScheduleForm from './ScheduleForm';

function Dashboard() {
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchProtectedData = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/protected', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setMessage(response.data.message);
          } catch (error) {
            console.error('Error fetching protected data:', error);
          }
        };
    
        fetchProtectedData();
      }, []);
    

    const handleScheduleClick = () => {
        setShowForm(true);
    };

    return (
        <div>
          <h2>Dashboard</h2>
          <button onClick={handleScheduleClick}>Agendar horário</button>
          {showForm && <ScheduleForm/>}
        </div>
      );
}

export default Dashboard;