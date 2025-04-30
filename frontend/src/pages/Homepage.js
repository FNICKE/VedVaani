import React from "react";
import { Box, Typography, Card, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      sx={{ backgroundColor: "#001F3F" }}
    >
      {/* Middle Information Section */}
      <Box flex={1} color="white" p={4}>
        <Typography variant="h2" fontWeight="bold" mb={2}>
          Welcome to VedVaani 🚀
        </Typography>
        <Typography variant="h5" mb={4}>
          Unlock the potential of AI - Summarize texts, generate paragraphs, chat with AI, convert code, and create sci-fi images effortlessly.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: 3,
            paddingX: 4,
            paddingY: 1.5,
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={() => navigate("/summary")}
        >
          Get Started
        </Button>
      </Box>

      {/* Right Feature Cards Section */}
      <Stack spacing={4} flex={1} alignItems="center">
        {/* Text Summary */}
        <Card
          onClick={() => navigate("/summary")}
          sx={cardStyle}
        >
          <DescriptionRounded sx={iconStyle} />
          <Typography variant="h5" fontWeight="bold">
            Text Summary
          </Typography>
        </Card>

        {/* Paragraph Generator */}
        <Card
          onClick={() => navigate("/paragraph")}
          sx={cardStyle}
        >
          <FormatAlignLeftOutlined sx={iconStyle} />
          <Typography variant="h5" fontWeight="bold">
            Paragraph
          </Typography>
        </Card>

        {/* AI ChatBot */}
        <Card
          onClick={() => navigate("/chatbot")}
          sx={cardStyle}
        >
          <ChatRounded sx={iconStyle} />
          <Typography variant="h5" fontWeight="bold">
            Chatbot
          </Typography>
        </Card>

        {/* JS Converter */}
        <Card
          onClick={() => navigate("/js-converter")}
          sx={cardStyle}
        >
          <CodeRounded sx={iconStyle} />
          <Typography variant="h5" fontWeight="bold">
            JS Converter
          </Typography>
        </Card>

        {/* Sci-Fi Image Generator */}
        <Card
          onClick={() => navigate("/scifi-image")}
          sx={cardStyle}
        >
          <ImageRounded sx={iconStyle} />
          <Typography variant="h5" fontWeight="bold">
            SciFi Image
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
};

// Card and Icon Styles
const cardStyle = {
  width: 250,
  height: 100,
  display: "flex",
  alignItems: "center",
  padding: 2,
  borderRadius: 4,
  boxShadow: 4,
  backgroundColor: "#f9fafb",
  cursor: "pointer",
  "&:hover": {
    boxShadow: 8,
    transform: "scale(1.05)",
    transition: "0.3s",
  },
};

const iconStyle = {
  fontSize: 40,
  color: "primary.main",
  marginRight: 2,
};

export default Homepage;
