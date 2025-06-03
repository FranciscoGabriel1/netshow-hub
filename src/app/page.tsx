'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useVideos } from '@/features/videos/hooks/useVideos';
import { VideoCard } from '@/components/VideoCard';
import { Grid, Pagination } from '@mui/material';
import { useState } from 'react';
import BannerHeroSlider from '@/components/BannerHeroSlider';

const PER_PAGE = 10;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, loading, total } = useVideos(page, PER_PAGE);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
       <BannerHeroSlider />
      <Typography variant="h5" component="h1" gutterBottom>
        Continuar reprodução
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {data.map((video, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`${video.id}-${idx}`}>
                <VideoCard id={video.id} title={video.title} thumbnail={video.thumbnail} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(total / PER_PAGE)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </>
      )}
    </Box>
  );
};

export default HomePage;