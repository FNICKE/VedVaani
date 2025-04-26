import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'; 
import { Toaster } from 'react-hot-toast'; // 🔥 Add this
import { useMemo } from 'react';

import { themeSettings } from './theme';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster /> {/* 🔥 Add the toaster component */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Homepage */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/register" element={<Register />} /> {/* Register page */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
