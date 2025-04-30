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

<<<<<<< HEAD
// Configure axios with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000", // Fallback to localhost
});

=======
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
<<<<<<< HEAD
  const [text, setText] = useState(""); // Fixed typo: settext -> setText
=======
  const [text, settext] = useState("");
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const { data } = await api.post("/api/v1/openai/summary", { text });
      console.log("API Response:", data);
      setSummary(data);
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error details:", err.response || err.message);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch summary. Please try again.";
      setError(errorMessage);
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
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#001f3d", // Outer background navy
      }}
    >
      <Box
        width={isNotMobile ? "40%" : "80%"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={5}
        sx={{
          boxShadow: 5,
          backgroundColor: "white", // Inner box white
        }}
      >
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit}>
          <Typography variant="h3" mb={2} fontWeight="bold" textAlign="center">
            Summarize Text
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
<<<<<<< HEAD
            onChange={(e) => setText(e.target.value)} // Fixed typo: settext -> setText
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
            Submit
          </Button>

          <Typography mt={2} textAlign="center">
            Not this tool?{" "}
            <Link to="/" style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
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
          {summary ? (
            <Typography>{summary}</Typography>
          ) : (
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                textAlign: "center",
                lineHeight: "450px",
              }}
            >
              Your Summary Will Appear Here
            </Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
};

<<<<<<< HEAD
export default Summary;
=======
export default Summary;
>>>>>>> af0f15ebde229d6077bc08d44cf1b9406c8205cd
