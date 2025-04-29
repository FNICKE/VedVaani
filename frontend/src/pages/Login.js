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

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    console.log("Submitting login:", { email: trimmedEmail, password: trimmedPassword }); // Debug log
    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login", // Use proxied path
        { email: trimmedEmail, password: trimmedPassword }
      );

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token); // Store JWT
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => setError(""), 5000);
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
          boxShadow: 5,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
            Sign In
          </Typography>

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
              color: "white",
              backgroundColor: "#0056b3",
              "&:hover": { backgroundColor: "#004494" },
            }}
          >
            Sign In
          </Button>

          <Typography mt={2} textAlign="center">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#007bff" }}>
              Register
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;