import { useEffect, useState } from 'react';
import { fetchVideos } from '../api';
import type { Video } from '../types';

export function useVideos(page = 1, limit = 10) {
  const [data, setData] = useState<Video[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchVideos(page, limit)
      .then(res => {
        setData(res.data);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page, limit]);

  return { data, total, loading };
}
