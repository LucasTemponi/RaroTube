import React, { useEffect, useState } from 'react';
import { ComentarioProps } from '../../components/Comentario/ComentarioProps';
import ListaComentarios from '../../components/ListaComentarios/ListaComentarios';
import Navbar from '../../components/Navbar/Navbar';
import { VideoList } from '../../components/VideoList/VideoList';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { videoProps } from '../../components/VideoPlayer/VideoProps';
import apiClient from '../../services/api-client';

const VideoPage = () => {
  const [recomendados, setRecomendados] = useState<videoProps[]>();
  const [video, setVideo] = useState<videoProps>();
  const [comentarios, setComentarios] = useState<ComentarioProps[]>();

  const loadRecomendados = async () => {
    const response = await apiClient.get(
      '/videos/60a24002-efd8-4078-831f-f158730c36cf/recomendacoes',
      {
        headers: {
          Authorization:
            'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI4ZWViYjc2ZC02YWJjLTQyMTgtYmYwOS00MGYyNTVmMzNiYjAiLCJhZG1pbiI6ZmFsc2UsIm5vbWUiOiJNYXVyaWNpbyIsImVtYWlsIjoibWF1cmljaW9zcHRhQGdtYWlsLmNvbSIsImZvdG8iOiJodHRwczovL2Nsb3VkZmxhcmUtaXBmcy5jb20vaXBmcy9RbWQzVzVEdWhnSGlyTEhHVml4aTZWNzZMaENrWlV6NnBuRnQ1QUpCaXl2SHllL2F2YXRhci8zMDkuanBnIn0sImlhdCI6MTY1MDU0NjMyOSwiZXhwIjoxNjUwNTY3OTI5fQ.U59MQS_Kcavg2EhY1H2yIYfJRvZE7bFVgWCjFz42Phg',
        },
      }
    );
    setRecomendados(response.data);
  };

  const loadVideo = async () => {
    const response = await apiClient.get(
      '/videos/60a24002-efd8-4078-831f-f158730c36cf',
      {
        headers: {
          Authorization:
            'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI4ZWViYjc2ZC02YWJjLTQyMTgtYmYwOS00MGYyNTVmMzNiYjAiLCJhZG1pbiI6ZmFsc2UsIm5vbWUiOiJNYXVyaWNpbyIsImVtYWlsIjoibWF1cmljaW9zcHRhQGdtYWlsLmNvbSIsImZvdG8iOiJodHRwczovL2Nsb3VkZmxhcmUtaXBmcy5jb20vaXBmcy9RbWQzVzVEdWhnSGlyTEhHVml4aTZWNzZMaENrWlV6NnBuRnQ1QUpCaXl2SHllL2F2YXRhci8zMDkuanBnIn0sImlhdCI6MTY1MDU0NjMyOSwiZXhwIjoxNjUwNTY3OTI5fQ.U59MQS_Kcavg2EhY1H2yIYfJRvZE7bFVgWCjFz42Phg',
        },
      }
    );
    setVideo(response.data);
  };

  const loadComentarios = async () => {
    const response = await apiClient.get(
      '/videos/60a24002-efd8-4078-831f-f158730c36cf/comentarios',
      {
        headers: {
          Authorization:
            'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI4ZWViYjc2ZC02YWJjLTQyMTgtYmYwOS00MGYyNTVmMzNiYjAiLCJhZG1pbiI6ZmFsc2UsIm5vbWUiOiJNYXVyaWNpbyIsImVtYWlsIjoibWF1cmljaW9zcHRhQGdtYWlsLmNvbSIsImZvdG8iOiJodHRwczovL2Nsb3VkZmxhcmUtaXBmcy5jb20vaXBmcy9RbWQzVzVEdWhnSGlyTEhHVml4aTZWNzZMaENrWlV6NnBuRnQ1QUpCaXl2SHllL2F2YXRhci8zMDkuanBnIn0sImlhdCI6MTY1MDU0NjMyOSwiZXhwIjoxNjUwNTY3OTI5fQ.U59MQS_Kcavg2EhY1H2yIYfJRvZE7bFVgWCjFz42Phg',
        },
      }
    );
    setComentarios(response.data);
  };

  useEffect(() => {
    loadRecomendados();
    loadVideo();
    loadComentarios();
  }, []);

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-4 gap-4 mx-6 mt-10 p-6'>
        <div className='col-span-3'>
          {video && <VideoPlayer {...video} />}
          <div className='mt-16'>
            {comentarios && <ListaComentarios comentarios={comentarios} />}
          </div>
        </div>
        <div>
          <p>Relacionados</p>
          <div className='mx-auto'>
            <VideoList videos={recomendados} vertical={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
