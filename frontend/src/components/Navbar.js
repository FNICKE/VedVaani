import React from 'react';
import { Box, Typography, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      p="1rem 6%"
      sx={{
        background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
        boxShadow: 4,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Typography
        variant="h3"
        fontWeight="bold"
        color="white"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        VedVaani
      </Typography>

      {/* Auth Buttons */}
      <Stack direction="row" spacing={2}>
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
      </Stack>
    </Box>
  );
};

export default Navbar;
