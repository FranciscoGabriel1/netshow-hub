import { useState, useEffect } from 'react';
import { getAllVideos, Video } from '@/services/videoService'; 

export interface UseVideosResult {
  data: Video[];
  total: number;
  loading: boolean;
  error: string | null;
}

export function useVideos(
  page: number = 1,
  perPage: number = 10
): UseVideosResult {
  const [data, setData] = useState<Video[]>([]);   
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const { data: videosOrNull, total: count, error: serviceError } =
          await getAllVideos(page, perPage);

        if (!isMounted) return;

        if (serviceError || !Array.isArray(videosOrNull)) {
          setData([]);
          setTotal(0);
          setError(serviceError || 'Resposta inesperada do servidor');
        } else {
          setData(videosOrNull);
          setTotal(count);
        }
      } catch (err: any) {
        if (!isMounted) return;
        setData([]);
        setTotal(0);
        setError(err.message || 'Erro ao carregar vídeos');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [page, perPage]);

  return { data, total, loading, error };
}
