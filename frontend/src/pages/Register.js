import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle register
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", { username, email, password });
      toast.success("User Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#001F3F", // Navy blue background
      }}
    >
      <Box
        width={isNotMobile ? "40%" : "80%"}
        p={4}
        borderRadius={5}
        sx={{
          backgroundColor: "#f9fafb", // Light gray (like Tailwind's bg-gray-50)
          boxShadow: 5,
        }}
      >
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
            Sign Up
          </Typography>

          <TextField
            label="Username"
            required
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "#3b82f6", // Tailwind blue-500
              color: "white",
              "&:hover": { backgroundColor: "#2563eb" }, // Tailwind blue-600
            }}
          >
            Sign Up
          </Button>

          <Typography mt={2} textAlign="center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#2563eb", fontWeight: 500 }}>
              Please Login
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
