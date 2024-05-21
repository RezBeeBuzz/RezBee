import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Group, TextInput, Button, useMantineTheme } from '@mantine/core';

function Header() {
  const theme = useMantineTheme();

  return (
    <Container style={{ padding: '20px 0', borderBottom: `1px solid ${theme.colors.gray[3]}` }}>
      <Group position="apart">
        <Link to="/">
          <img src="/logo.png" alt="RezBee Logo" style={{ height: '40px' }} />
        </Link>
        <TextInput placeholder="Search..." style={{ width: '300px' }} />
        <Group>
          <Link to="/sell">
            <Button variant="outline">Sell a reservation</Button>
          </Link>
          <Link to="/for-restaurants">
            <Button variant="outline">For restaurants</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact</Button>
          </Link>
          <Link to="/login">
            <Button>Login/Sign Up</Button>
          </Link>
        </Group>
      </Group>
    </Container>
  );
}

export default Header;
