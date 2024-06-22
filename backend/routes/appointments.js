const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Modelo de agendamento

// Rota para criar um novo agendamento
router.post('/appointments', async (req, res) => {
  const { clientName, date, time } = req.body;

  try {
    const appointment = new Appointment({
      clientName,
      date,
      time,
    });
    await appointment.save();
    res.status(201).json({ message: 'Agendamento criado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;