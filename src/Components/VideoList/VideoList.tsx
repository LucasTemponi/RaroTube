import {Thumbnails} from '../Thumbnail/Thumbnail';
import axios from 'axios'
import { useEffect, useState } from 'react';


export interface videoProps{
    id:string,
    nome:string,
    url:string,
    thumbUrl:string,
    descricao:string,
    createdAt:string,
    duracao:string,
    topico:string,
}

export const VideoList = () => {

    const [videos,setVideos] = useState<Array<any>>([]);  
    const loadVideos = async () =>{
        const response = await axios.get('https://3.221.159.196:3320/videos');
        setVideos(response.data);
        console.log(response.data)
    }

    useEffect(()=>{
        loadVideos();
    },[]);

    const teste:videoProps = {
        
        "id": "25526467-e9d7-40cb-bc60-76bb85419915",
        "nome": "Aulão POO",
        "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
        "thumbUrl": "",
        "descricao": "Aulão POO com o Rodrigo Sol",
        "createdAt": "2022-04-09T13:29:21.652Z",
        "duracao": "2h",
        "topico": "semana 1"
    }

    return(
        <>
            {videos.map((video) => {
                return(
                    <Thumbnails key={video.id} {...{...video,url:`${video.url}`}}/>
                )
            })}
            <Thumbnails nome={teste.id} id={teste.id} url={teste.url} />
        </>
    )
}