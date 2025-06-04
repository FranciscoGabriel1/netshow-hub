'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  category?: string;
  chip?: { label: string; variant: 'ao-vivo' | 'em-breve' };
}

export function VideoCard({ id, title, thumbnail, category, chip }: VideoCardProps) {
  const theme = useTheme();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/videos/${id}`);
  };

  const chipSx =
    chip?.variant === 'ao-vivo'
      ? {
          bgcolor: theme.palette.error.main,
          color: theme.palette.common.white,
          fontWeight: 500,
        }
      : {
          bgcolor: theme.palette.grey[800],
          color: theme.palette.grey[300],
          fontWeight: 500,
        };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: '100%',
        bgcolor: theme.palette.background.paper,
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.16)',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.28)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
        }}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{
            objectFit: 'cover',
            filter: 'brightness(0.92)',
          }}
          sizes="(max-width: 600px) 100vw, 320px"
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.44) 64%, rgba(0,0,0,0.95) 100%)',
          }}
        />
        {chip && (
          <Chip
            label={chip.label}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              px: 1.5,
              fontSize: 13,
              height: 26,
              borderRadius: 2,
              zIndex: 2,
              letterSpacing: 0.1,
              ...chipSx,
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          p: 2,
          pb: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {category && (
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.grey[300],
              fontSize: 15,
              fontWeight: 400,
              mb: 0.5,
              letterSpacing: 0.01,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {category}
          </Typography>
        )}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.common.white,
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.18,
            mt: 0,
            mb: 0,
            fontFamily: theme.typography.fontFamily,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
