import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
} from '@mui/material';

const Paragraph = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery('(min-width: 1000px)');

  const [text, setText] = useState('');
  const [para, setPara] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const requestUrl = `${API_URL}/api/v1/openai/paragraph`;

      console.log('Sending POST to:', requestUrl, 'with data:', { text });
      const response = await axios.post(requestUrl, { text });
      console.log('Response:', response.data);

      if (response.data.success) {
        setPara(response.data.data); // Extract 'data' from response
      } else {
        setError(response.data.message || 'Failed to generate paragraph');
      }
    } catch (err) {
      console.error('Request error:', err);
      const responseData = err.response?.data;
      console.error('Error response:', {
        status: err.response?.status,
        data: responseData,
      });

      if (err.response?.status === 429) {
        setError('OpenAI quota exceeded. Please check your plan and billing details.');
      } else if (responseData?.message) {
        setError(responseData.message);
      } else {
        setError('Failed to connect to the server. Please try again.');
      }

      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: '#001f3d',
      }}
    >
      <Box
        width={isNotMobile ? '40%' : '80%'}
        p={'2rem'}
        m={'2rem auto'}
        borderRadius={5}
        sx={{
          boxShadow: 8,
          bgcolor: 'white',
          transition: '0.4s',
          '&:hover': {
            boxShadow: 12,
            transform: 'scale(1.02)',
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
            Generate Paragraph
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
              fontWeight: 'bold',
              textTransform: 'none',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.02)',
              },
            }}
          >
            Generate Paragraph
          </Button>

          <Typography mt={2} textAlign="center">
            Not this tool?{' '}
            <Link
              to="/"
              style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
            >
              Go Back
            </Link>
          </Typography>
        </form>

        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 3,
            height: '500px',
            borderRadius: 5,
            p: 2,
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.default,
            overflowY: 'auto',
          }}
        >
          {para ? (
            <Typography>{para}</Typography>
          ) : (
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                lineHeight: '450px',
              }}
            >
              Your Paragraph Will Appear Here
            </Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default Paragraph;