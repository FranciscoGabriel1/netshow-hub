'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { banners } from '@/app/shared/mocks/banner';

export default function BannerHeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        minHeight: { xs: 240, md: 340 },
        bgcolor: '#000',
        display: 'flex',
        alignItems: 'center',
        pl: { xs: 2, md: 12 },
        pb: { xs: 4, md: 0 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        key={banners[index].id}
        sx={{
          animation: 'fadeIn 0.7s',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(16px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Typography variant="subtitle2" color="grey.400" sx={{ mb: 1 }}>
          {banners[index].category}
        </Typography>
        <Typography variant="h4" color="#fff" sx={{ fontWeight: 600, mb: 2 }}>
          {banners[index].title}
        </Typography>
        <Typography variant="body1" color="grey.300" sx={{ mb: 3 }}>
          {banners[index].description}
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: 2, px: 3, fontWeight: 600, boxShadow: 0 }}
          onClick={banners[index].onClick}
        >
          {banners[index].button}
        </Button>
      </Box>
      {/* Dots */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 12, md: 0 },
          bottom: 24,
          display: 'flex',
          gap: 1,
        }}
      >
        {banners.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 16,
              height: 6,
              borderRadius: 6,
              cursor: 'pointer',
              bgcolor: index === i ? 'grey.100' : 'grey.800',
              opacity: index === i ? 1 : 0.6,
              transition: 'all 0.3s',
              mx: 0.5,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
