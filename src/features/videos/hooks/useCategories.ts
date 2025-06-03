import { useState, useEffect } from 'react';
import { getAllCategories, Category } from '@/services/videoService';

export interface UseCategoriesResult {
  data: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      const { data: cats, error: err } = await getAllCategories();
      if (!isMounted) return;

      if (err) {
        setData([]);
        setError(err);
      } else {
        setData(cats);
      }
      setLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
