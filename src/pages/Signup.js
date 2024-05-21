import React, { useState } from 'react';
import { TextInput, Button, Container, Title, Group, Alert } from '@mantine/core';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('/api/manager/signup', { email, password });
      // Redirect to manager dashboard or login page
    } catch (error) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <Container size="xs" style={{ marginTop: '2rem' }}>
      <Title order={2}>Sign Up</Title>
      {error && <Alert color="red">{error}</Alert>}
      <Group direction="column" grow>
        <TextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <TextInput
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <Button onClick={handleSignup}>Sign Up</Button>
      </Group>
    </Container>
  );
}

export default Signup;
