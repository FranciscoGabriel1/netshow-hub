export interface Video {
  id: string; 
  title: string;
  thumbnail: string;
  description: string | null;
  hls_path: string;
  created_at: string;
  category: number;
  site_id: number;
  views: number;
  likes: number;
}
