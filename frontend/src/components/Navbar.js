<<<<<<< HEAD
import React from 'react';
import { Box, Typography, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
=======
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const [user, setUser] = useState(null); // { username } or null

  // Check login status and fetch user data
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        return;
      }

      try {
        // Try to fetch user profile from backend
        const response = await axios.get('http://localhost:5000/api/v1/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ username: response.data.username });
      } catch (error) {
        console.error('Failed to fetch user:', error.response?.data || error.message);
        // Fallback: Check local storage for username
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUser({ username: storedUsername });
        } else {
          localStorage.removeItem('accessToken');
          setUser(null);
        }
      }
    };
    checkUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear refreshToken cookie
      await axios.get('http://localhost:5000/api/v1/auth/logout', {
        withCredentials: true, // Send cookies
      });
      // Clear client-side auth state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd

  return (
    <Box
      width="100%"
      p="1rem 6%"
      sx={{
<<<<<<< HEAD
        background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
        boxShadow: 4,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
=======
        background: 'linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)',
        boxShadow: 4,
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
      }}
    >
      {/* Logo */}
      <Typography
        variant="h3"
        fontWeight="bold"
        color="white"
<<<<<<< HEAD
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
=======
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
      >
        VedVaani
      </Typography>

      {/* Auth Buttons */}
      <Stack direction="row" spacing={2}>
<<<<<<< HEAD
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "#4e54c8",
              borderColor: "#4e54c8",
              transform: "scale(1.05)",
            },
            transition: "0.3s",
            borderRadius: 3,
          }}
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>

        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "#8f94fb",
              borderColor: "#8f94fb",
              transform: "scale(1.05)",
            },
            transition: "0.3s",
            borderRadius: 3,
          }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
=======
        {user ? (
          <>
            {/* Username */}
            <Typography
              variant="h6"
              color="white"
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {user.username}
            </Typography>
            {/* Log Out button */}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#4e54c8',
                  borderColor: '#4e54c8',
                  transform: 'scale(1.05)',
                },
                transition: '0.3s',
                borderRadius: 3,
              }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            {/* Sign Up button */}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#4e54c8',
                  borderColor: '#4e54c8',
                  transform: 'scale(1.05)',
                },
                transition: '0.3s',
                borderRadius: 3,
              }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
            {/* Sign In button */}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#8f94fb',
                  borderColor: '#8f94fb',
                  transform: 'scale(1.05)',
                },
                transition: '0.3s',
                borderRadius: 3,
              }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </>
        )}
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
      </Stack>
    </Box>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
