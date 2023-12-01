// pages/signup.tsx

import { useState } from 'react';

import Layout from '../components/Layout';


import Router from "next/router";
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) {
      Router.push("/")
    } else {
      Router.push("/signup")
    }
  };

  return (
    <Layout>
      <div>
        <Typography variant="h6" sx={{ marginTop: '100px', marginBottom: '30px' }}>
          Criar novo Usuario
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
          onClick={handleSignup}
        >
          Criar
        </Button>
      </div>
    </Layout>
  );
}