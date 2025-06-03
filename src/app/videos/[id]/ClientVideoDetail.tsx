'use client';

import React, { useEffect, useState } from 'react';
import { addLike, removeLike, incrementViews, Video } from '@/services/videoService';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  Tooltip,
} from '@mui/material';
import { ThumbUp, ThumbDown, PlaylistAdd, Share } from '@mui/icons-material';
import ReactPlayer from 'react-player';

interface ClientVideoDetailProps {
  initialVideo: Video;
}

export default function ClientVideoDetail({ initialVideo }: ClientVideoDetailProps) {
  const [video, setVideo] = useState<Video>(initialVideo);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    const incViews = async () => {
      setLoading(true);
      const { data: updated, error: err } = await incrementViews(initialVideo.id);
      if (err || !updated) {
        setError(err || 'Erro ao incrementar views');
      } else {
        setVideo(updated);
      }
      setLoading(false);
    };
    incViews();
  }, [initialVideo.id]);

  const handleLike = async () => {
    setBtnLoading(true);

    if (reaction === 'like') {
      const { data: updated, error: err } = await removeLike(initialVideo.id);
      if (err || !updated) {
        showSnackbar(err || 'Falha ao remover o like');
      } else {
        setVideo(updated);
        setReaction(null);
        showSnackbar('Você retirou seu like.');
      }
      setBtnLoading(false);
      return;
    }
    if (reaction === 'dislike') {
      setReaction(null);
    }

    const { data: updated, error: err } = await addLike(initialVideo.id);
    if (err || !updated) {
      showSnackbar(err || 'Falha ao curtir');
    } else {
      setVideo(updated);
      setReaction('like');
      showSnackbar('Você curtiu este vídeo!');
    }

    setBtnLoading(false);
  };

  const handleDislike = async () => {
    setBtnLoading(true);

    if (reaction === 'dislike') {
      setReaction(null);
      showSnackbar('Você retirou seu “Não é pra mim”.');
      setBtnLoading(false);
      return;
    }

    if (reaction === 'like') {
      const { data: updated, error: err } = await removeLike(initialVideo.id);
      if (err || !updated) {
        showSnackbar(err || 'Falha ao remover o like');
        setBtnLoading(false);
        return;
      } else {
        setVideo(updated);
      }
    }

    setReaction('dislike');
    showSnackbar('Você marcou como “Não é pra mim”.');

    setBtnLoading(false);
  };

  const handleAddToList = () => {
    showSnackbar('Vídeo adicionado à sua lista');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => showSnackbar('Link copiado com sucesso'),
      () => showSnackbar('Falha ao copiar o link')
    );
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ position: 'relative', pt: '56.25%', mb: 3 }}>
        <ReactPlayer
          url={video.hls_path}
          controls
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, borderRadius: 4 }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {video.title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
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
          <Typography variant="subtitle2" color="text.secondary">
            Likes: {video.likes}
          </Typography>
        </Box>
      </Box>

      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 3,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Adicionar à lista de reprodução">
            <Button
              variant="outlined"
              startIcon={<PlaylistAdd />}
              onClick={handleAddToList}
              sx={{ textTransform: 'none' }}
            >
              Adicionar à minha lista
            </Button>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* ── Botão “Gostei” ── */}
          <Tooltip title="Curtir este vídeo">
            <Button
              variant={reaction === 'like' ? 'contained' : 'outlined'}
              color={reaction === 'like' ? 'primary' : 'inherit'}
              startIcon={<ThumbUp />}
              onClick={handleLike}
              disabled={btnLoading}
              sx={{
                textTransform: 'none',
                minWidth: 120,
                color: reaction === 'like' ? '#fff' : undefined,
              }}
            >
              Gostei
            </Button>
          </Tooltip>
          <Tooltip title="Não curtir este vídeo">
            <Button
              variant={reaction === 'dislike' ? 'contained' : 'outlined'}
              color={reaction === 'dislike' ? 'error' : 'inherit'}
              startIcon={<ThumbDown />}
              onClick={handleDislike}
              disabled={btnLoading}
              sx={{
                textTransform: 'none',
                minWidth: 140,
                color: reaction === 'dislike' ? '#fff' : undefined,
              }}
            >
              Não é pra mim
            </Button>
          </Tooltip>

          {/* ── Botão “Compartilhar” ── */}
          <Tooltip title="Copiar link para compartilhar">
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Share />}
              onClick={handleShare}
              sx={{ textTransform: 'none', minWidth: 130 }}
            >
              Compartilhar
            </Button>
          </Tooltip>
        </Box>
      </Box>

      <Divider />
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
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackbarMessage}
      />
    </Container>
  );
}
