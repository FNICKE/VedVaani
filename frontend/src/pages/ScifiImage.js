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

const ScifiImage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, settext] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/scifi-image", { text });
      console.log(data);
      setImage(data);
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
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
          bgcolor: "white",
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

        <form onSubmit={handleSubmit}>
          <Typography variant="h3" fontWeight="bold" mb={2} textAlign="center">
            Sci-fi Image Generator
          </Typography>

          <TextField
            placeholder="Add your prompt here"
            type="text"
            multiline
            rows={4}
            required
            margin="normal"
            fullWidth
            value={text}
            onChange={(e) => settext(e.target.value)}
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
            boxShadow: 3,
            height: "500px",
            borderRadius: 5,
            p: 2,
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.default,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {image ? (
            <Box sx={{ maxHeight: "100%", maxWidth: "100%" }}>
              <img
                src={image}
                alt="Sci-fi generation"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </Box>
          ) : (
            <Typography
              variant="h5"
              color="text.secondary"
              textAlign="center"
              sx={{ lineHeight: "450px" }}
            >
              Your Sci-fi Image Will Appear Here
            </Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default ScifiImage;
