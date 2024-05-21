import React, { useState } from 'react';
import { TextInput, Button, Container, Title, Group, Alert } from '@mantine/core';
import axios from 'axios';

function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');

  const sendCode = async () => {
    try {
      await axios.post('/api/user/signup', { phone_number: phone });
      setIsCodeSent(true);
    } catch (error) {
      setError('Error sending code. Please try again.');
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post('/api/user/login', { phone_number: phone, code });
      localStorage.setItem('token', response.data.token);
      // Redirect to profile or home page after successful login
    } catch (error) {
      setError('Error verifying code. Please try again.');
    }
  };

  return (
    <Container size="xs" style={{ marginTop: '2rem' }}>
      <Title order={2}>Login</Title>
      {error && <Alert color="red">{error}</Alert>}
      {!isCodeSent ? (
        <Group direction="column" grow>
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
          <Button onClick={sendCode}>Send Code</Button>
        </Group>
      ) : (
        <Group direction="column" grow>
          <TextInput
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
          <Button onClick={verifyCode}>Verify Code</Button>
        </Group>
      )}
    </Container>
  );
}

export default Login;
