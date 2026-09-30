'use client';

import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Spoiler Safe
        </Typography>
        <Typography variant="body1">
          A spoiler-aware RAG chatbot for TV show discussions.
        </Typography>
      </Box>
    </Container>
  );
}
