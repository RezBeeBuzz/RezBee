import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Sell from './pages/Sell';
import Restaurant from './pages/Restaurant';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import ForRestaurants from './pages/ForRestaurants';

function App() {
  return (
    <MantineProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/for-restaurants" element={<ForRestaurants />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
