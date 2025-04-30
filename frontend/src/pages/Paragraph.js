import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
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

<<<<<<< HEAD
const Paragraph = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");
  const [para, setPara] = useState("");
=======
const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, settext] = useState("");
  const [summary, setSummary] = useState("");
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      // Use environment variable or fallback to backend port
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const requestUrl = `${API_URL}/api/v1/openai/paragraph`;

      console.log("Axios base URL:", axios.defaults.baseURL); // Debug: Check for overrides
      console.log("Sending POST to:", requestUrl, "with data:", { text }); // Debug: Log full URL
      const { data } = await axios.post(requestUrl, { text });
      console.log("Response data:", data); // Debug: Log response
      setPara(data);
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
      } else if (responseData?.error) {
        setError(responseData.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }

=======
      const { data } = await axios.post("http://localhost:5000/api/v1/openai/summary", { text });
      console.log(data);
      setSummary(data);
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
<<<<<<< HEAD
      flexDirection="column"
=======
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "#001f3d", // Navy blue background
      }}
    >
      <Box
        width={isNotMobile ? "40%" : "80%"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={5}
        sx={{
          boxShadow: 8,
          bgcolor: "white", // White background for the box
          transition: "0.4s",
          "&:hover": {
            boxShadow: 12,
            transform: "scale(1.02)",
          },
        }}
      >
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
<<<<<<< HEAD
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" fontWeight="bold" mb={2} textAlign="center">
            Generate Paragraph
=======

        <form onSubmit={handleSubmit}>
          <Typography variant="h3" fontWeight="bold" mb={2} textAlign="center">
            Summarize Text
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
          </Typography>

          <TextField
            placeholder="Add your text here"
            type="text"
            multiline
            rows={4}
            required
            margin="normal"
            fullWidth
            value={text}
<<<<<<< HEAD
            onChange={(e) => setText(e.target.value)}
=======
            onChange={(e) => settext(e.target.value)}
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
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
<<<<<<< HEAD
            Generate Paragraph
=======
            Submit
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
          </Button>

          <Typography mt={2} textAlign="center">
            Not this tool?{" "}
<<<<<<< HEAD
            <Link
              to="/"
              style={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
=======
            <Link to="/" style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
              Go Back
            </Link>
          </Typography>
        </form>

        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 3,
            height: "500px",
            borderRadius: 5,
            p: 2,
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.default,
            overflowY: "auto",
          }}
        >
<<<<<<< HEAD
          {para ? (
            <Typography>{para}</Typography>
=======
          {summary ? (
            <Typography>{summary}</Typography>
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
          ) : (
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                textAlign: "center",
                lineHeight: "450px",
              }}
            >
<<<<<<< HEAD
              Your Paragraph Will Appear Here
=======
              Your Summary Will Appear Here
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
            </Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
};

<<<<<<< HEAD
export default Paragraph;
=======
export default Summary;
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
