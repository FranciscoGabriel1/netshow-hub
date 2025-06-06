'use client';
import React from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useVideosByCategory } from '@/features/videos/hooks/useVideosByCategory';
import { VideoCard } from '@/components/VideoCard';
import { useCategories } from '@/features/videos/hooks/useCategories';

export default function HomePage() {
  const { data: categories, loading: loadingCats, error: errorCats } = useCategories();
  const { data: videosGrouped, loading: loadingVids, error: errorVids } =
    useVideosByCategory(categories);

  const loading = loadingCats || loadingVids;
  const error = errorCats || errorVids;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vídeos por Categoria
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && error && (
        <Typography variant="h6" color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      {!loading &&
        !error &&
        categories.map((cat) => {
          const listDeVideos = videosGrouped?.[cat.id] || [];

          return (
            <Box key={cat.id} sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {cat.title}
              </Typography>

              {listDeVideos.length === 0 ? (
                <Typography color="text.secondary">Sem vídeos nesta categoria.</Typography>
              ) : (
                <Box
                  component="div"
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: {
                      xs: '1fr',             
                      sm: 'repeat(2, 1fr)',   
                      md: 'repeat(3, 1fr)',   
                      lg: 'repeat(4, 1fr)',   
                    },
                  }}
                >
                  {listDeVideos.map((video) => (
                    <Box key={video.id}>
                      <VideoCard
                        id={video.id}
                        title={video.title}
                        thumbnail={video.thumbnail}
                        category={cat.title}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          );
        })}
    </Container>
  );
}
