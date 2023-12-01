// pages/login.tsx

import { useState } from 'react';
import Layout from '../components/Layout';
import { Typography, TextField, Button, Box } from "@mui/material";

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      // Armazenar o token no localStorage
      localStorage.setItem('jwt', token);
      // Redirecionar ou realizar outras ações necessárias após o login
    } else {
      // Lidar com erros de login
      console.error('Falha no login');
    }
  };

  return (
    <Layout>
      <div>
        <Typography variant="h6" sx={{ marginTop: '100px', marginBottom: '30px' }}>
          Login
        </Typography>
        <TextField
          fullWidth
          autoFocus
          label="Nome"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          autoFocus
          type='password'
          label="Senha"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          disabled={!name || !password}
          type="button"
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>

      </div>
    </Layout>
  );
}