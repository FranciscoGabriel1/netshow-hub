import { httpClient, HttpResponse } from './httpClient';

export interface Video {
    id: string;
    title: string;
    description: string | null;
    thumbnail: string;
    hls_path: string;
    category: number;
    site_id: number;
    views: number;
    likes: number;
    created_at: string;
}

export interface Category {
  id: string;
  title: string;
  site_id: number;
}

export async function getAllVideos(
    page = 1,
    perPage = 10
): Promise<{ data: Video[]; total: number; error: string | null }> {
    const resp: HttpResponse<Video[]> = await httpClient.get<Video[]>('/videos', {
        params: { _page: page, _limit: perPage },
    });
    if (resp.error || resp.data === null) {
        return { data: [], total: 0, error: resp.error };
    }
    const videos: Video[] = resp.data;
    const total = videos.length;
    return { data: videos, total, error: null };
}

export async function getVideoById(
    id: string
): Promise<{ data: Video | null; error: string | null }> {
    const resp: HttpResponse<Video> = await httpClient.get<Video>(`/videos/${id}`);
    if (resp.error || resp.data === null) {
        return { data: null, error: resp.error || 'Vídeo não encontrado' };
    }
    return { data: resp.data, error: null };
}


export async function getVideosAll(): Promise<{ data: Video[]; error: string | null }> {
  const resp: HttpResponse<Video[]> = await httpClient.get<Video[]>('/videos');
  if (resp.error || resp.data === null) {
    return { data: [], error: resp.error };
  }
  return { data: resp.data, error: null };
}

export async function incrementViews(
    id: string
): Promise<{ data: Video | null; error: string | null }> {
    const current = await getVideoById(id);
    if (current.error || !current.data) {
        return { data: null, error: current.error || 'Vídeo não encontrado' };
    }
    const updatedResp: HttpResponse<Video> = await httpClient.patch<Video, Partial<Video>>(
        `/videos/${id}`,
        { views: current.data.views + 1 }
    );

    if (updatedResp.error || updatedResp.data === null) {
        return { data: null, error: updatedResp.error || 'Falha ao incrementar views' };
    }

    return { data: updatedResp.data, error: null };
}


export async function toggleLike(
    id: string
): Promise<{ data: Video | null; error: string | null }> {
    const current = await getVideoById(id);
    if (current.error || !current.data) {
        return { data: null, error: current.error || 'Vídeo não encontrado' };
    }

    const updatedResp: HttpResponse<Video> = await httpClient.patch<Video, Partial<Video>>(
        `/videos/${id}`,
        { likes: current.data.likes + 1 }
    );

    if (updatedResp.error || updatedResp.data === null) {
        return { data: null, error: updatedResp.error || 'Falha ao atualizar likes' };
    }

    return { data: updatedResp.data, error: null };
}

export async function getAllCategories(): Promise<{ data: Category[]; error: string | null }> {
  const resp: HttpResponse<Category[]> = await httpClient.get<Category[]>('/categories');
  if (resp.error || resp.data === null) {
    return { data: [], error: resp.error };
  }
  return { data: resp.data, error: null };
}
