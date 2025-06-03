'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  PlaylistAdd,
  Share,
} from '@mui/icons-material';
import ReactPlayer from 'react-player';
import {
  getVideoById,
  incrementViews,
  toggleLike,
  Video,
} from '@/services/videoService';

export default function VideoDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    if (!id) return;

    const loadVideo = async () => {
      setLoading(true);
      setError(null);

      // 1) Buscar detalhes
      const { data: vid, error: err1 } = await getVideoById(id);
      if (err1 || !vid) {
        setError(err1 || 'Vídeo não encontrado');
        setLoading(false);
        return;
      }
      setVideo(vid);

      // 2) Incrementar views
      const { data: updated, error: err2 } = await incrementViews(id);
      if (!err2 && updated) {
        setVideo(updated);
      } else {
        console.error('Falha ao incrementar views:', err2);
      }

      setLoading(false);
    };

    loadVideo();
  }, [id]);

  const handleLike = async () => {
    if (!id || !video) return;
    setBtnLoading(true);
    const { data: updated, error: err } = await toggleLike(id);
    if (err || !updated) {
      showSnackbar(err || 'Falha ao curtir');
    } else {
      setVideo(updated);
      showSnackbar('Você curtiu este vídeo!');
    }
    setBtnLoading(false);
  };

  const handleAddToList = () => showSnackbar('Vídeo adicionado à sua lista');
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(
        () => showSnackbar('Link copiado com sucesso'),
        () => showSnackbar('Falha ao copiar o link')
      );
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !video) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error || 'Erro desconhecido'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Player HLS */}
      <Box sx={{ position: 'relative', pt: '56.25%' }}>
        <ReactPlayer
          url={video.hls_path}
          controls
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, borderRadius: 4 }}
        />
      </Box>

      {/* Informações */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          {video.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Categoria: {video.category}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(video.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Views: {video.views}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<ThumbUp />}
            onClick={handleLike}
            disabled={btnLoading}
          >
            {btnLoading ? '…' : 'Gostei'}
          </Button>
          <Button variant="outlined" startIcon={<ThumbDown />} sx={{ textTransform: 'none' }}>
            Não é pra mim
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlaylistAdd />}
            onClick={handleAddToList}
            sx={{ textTransform: 'none' }}
          >
            Adicionar à minha lista
          </Button>
          <Button
            variant="outlined"
            startIcon={<Share />}
            onClick={handleShare}
            sx={{ textTransform: 'none' }}
          >
            Compartilhar
          </Button>
        </Box>
      </Box>

      {/* Resumo */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Resumo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
          {video.description || 'Sem descrição disponível.'}
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}
