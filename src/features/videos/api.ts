import { httpClient } from '@/services/httpClient';
import type { Video } from './types';

export const fetchVideos = async (page = 1, limit = 10) => {
  const res = await httpClient.get('/videos', {
    params: { _page: page, _limit: limit }
  });
  return {
    data: res.data,
    total: parseInt(res.headers['x-total-count'], 10),
  };
};


