import { getVideoById } from '@/services/videoService';
import type { Metadata } from 'next';
import ClientVideoDetail from './ClientVideoDetail';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = params;
  const { data: vid } = await getVideoById(id);
  if (!vid) {
    return {
      title: 'Vídeo não encontrado',
    };
  }
  return {
    title: vid.title,
    description: vid.description || '',
  };
}

export default async function VideoDetailServer({ params }: Params) {
  const { id } = params;
  const { data: vid, error } = await getVideoById(id);

  if (error || !vid) {
    return (
      <div style={{ padding: 16 }}>
        <h1>404 – Vídeo não encontrado</h1>
        <p>{error || 'Este vídeo não existe.'}</p>
      </div>
    );
  }

  return <ClientVideoDetail initialVideo={vid} />;
}
