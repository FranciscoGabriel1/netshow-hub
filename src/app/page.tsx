'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useVideos } from '@/features/videos/hooks/useVideos';
import { VideoCard } from '@/components/VideoCard';
import { Grid } from '@mui/material';

const HomePage = () => {
  const { data, loading } = useVideos();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Continuar reprodução
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {data.map(video => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
              <VideoCard title={video.title} thumbnail={video.thumbnail} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default HomePage;
