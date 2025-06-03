import { httpClient } from '@/services/httpClient';
import type { Video } from './types';

export const fetchVideos = async (): Promise<Video[]> => {
  const res = await httpClient.get<Video[]>('/videos');
  return res.data;
};
