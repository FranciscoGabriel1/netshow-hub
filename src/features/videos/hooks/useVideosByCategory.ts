// src/features/videos/hooks/useVideosByCategory.ts

import { useState, useEffect } from 'react';
import { getVideosAll, Video } from '@/services/videoService';
import type { Category } from '@/services/videoService';

export interface VideosByCategory {
  [categoryId: string]: Video[];
}

export interface UseVideosByCategoryResult {
  data: VideosByCategory;
  loading: boolean;
  error: string | null;
}

export function useVideosByCategory(
  categories: Category[]
): UseVideosByCategoryResult {
  const [data, setData] = useState<VideosByCategory>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      const { data: videosAll, error: err } = await getVideosAll();
      if (!isMounted) return;

      if (err) {
        setData({});
        setError(err);
        setLoading(false);
        return;
      }

      // Agrupar vídeos por category (campo numérico):
      const grouped: VideosByCategory = {};
      categories.forEach((cat) => {
        grouped[cat.id] = videosAll.filter((v) => String(v.category) === String(cat.id));
      });

      setData(grouped);
      setLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, [categories]);

  return { data, loading, error };
}
