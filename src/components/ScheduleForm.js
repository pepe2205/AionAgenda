import React, { useState } from "react";
import axios from "axios";

function ScheduleForm() {
    const [clientName, setClientName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointment = {
            clientName,
            date,
            time,
        };
        
        try {
            const response = await axios.post('http://localhost:5000/api/appointments', appointment);
            alert('Horario agendado com sucesso!');
        } catch (error) {
            console.error('Erro ao agendar horario:', error);
            alert('Erro ao agendar horario:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Agendar horario</h3>
            <input
                type="text"
                placeholder="Nome do cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <button type="submit">Agendar</button>
        </form>

    );
}

export default ScheduleForm;