import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
  
        const { token } = response.data; // Obter o token da resposta
        localStorage.setItem('token', token); // Armazenar o token no localStorage
        navigate('/dashboard'); // Redirecionar para o dashboard
      } catch (error) {
        console.error('Erro na requisição:', error.response.data); // Detalhe do erro
      }
    };

    return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      );
};

export default Login;