import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, email, password});
            alert('Usuario registrado com sucesso');
        } catch (error) {
            alert('Erro ao registrar usuario');
        }
     };

     return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
                <button type='submit'>Submit</button>
            </form>
        </div>
     )
}

export default Register;