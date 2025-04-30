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
  Card,
} from "@mui/material";

const ChatBot = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter some text");
      setTimeout(() => setError(""), 5000);
      return;
    }

<<<<<<< HEAD
    try {
      // Use environment variable or fallback to backend port
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const requestUrl = `${API_URL}/api/v1/openai/chatbot`;

      console.log("Axios base URL:", axios.defaults.baseURL); // Debug: Check for overrides
      console.log("Sending POST to:", requestUrl, "with data:", { text }); // Debug: Log full URL
      const { data } = await axios.post(requestUrl, { text });
      console.log("Response data:", data); // Debug: Log response
      setResponse(data);
    } catch (err) {
      console.error("Request error:", err); // Debug: Log error
      const responseData = err.response?.data;
      const dataSnippet = typeof responseData === "string"
        ? responseData.substring(0, 100) + "..."
        : JSON.stringify(responseData || "No data", null, 2).substring(0, 100) + "...";
      console.error("Error response:", {
        status: err.response?.status,
        data: dataSnippet, // Safely log response data
        headers: err.response?.headers,
      }); // Debug: Log detailed error

      // Check for OpenAI quota error
      if (responseData?.message?.includes("429")) {
        setError("OpenAI quota exceeded. Please check your plan and billing details.");
      } else if (responseData?.message || err.message) {
        setError(responseData?.message || err.message);
      } else {
        setError("An unexpected error occurred.");
      }

=======
    console.log("Submitting text:", text); // Debug log
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/openai/chatbot",
        { text }
      );      console.log("Response data:", data);
      setResponse(data);
    } catch (err) {
      console.error("Error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#001f3d", // Full screen navy blue background
      }}
    >
      <Box
        width={isNotMobile ? "40%" : "80%"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={5}
        sx={{
          boxShadow: 5,
          backgroundColor: "white", // Inner container is white
        }}
      >
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit}>
          <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
            Ask with Chatbot
          </Typography>

          <TextField
            placeholder="Add your text"
            type="text"
            multiline
            rows={4}
            required
            margin="normal"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "scale(1.02)",
              },
            }}
          >
            Chat
          </Button>

          <Typography mt={2} textAlign="center">
            Not this tool?{" "}
            <Link
              to="/"
              style={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              Go Back
            </Link>
          </Typography>
        </form>

        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            p: 2,
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.default,
            overflowY: "auto",
          }}
        >
          {response ? (
            <Typography>{response}</Typography>
          ) : (
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                textAlign: "center",
                lineHeight: "450px",
              }}
            >
              Bot Response
            </Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default ChatBot;