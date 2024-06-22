const express = require('express'); // O Express é um framework minimalista e flexível para Node.js que fornece um conjunto robusto de recursos para desenvolver aplicações web e APIs.
const router = express.Router(); // Um roteador é um middleware que você pode usar para definir rotas
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

require('dotenv').config();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({username, email, password: bcrypt.hashSync(password, 10) });
        await user.save();
        res.status(201).send('Usuário criado com sucesso!' );
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }
  
    try {
      // Verificar se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }
  
      // Verificar a senha
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Senha inválida' });
      }
  
      // Gerar token JWT
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor' });
    }
});

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