import { lazy, Suspense} from 'react';
import { videoListProps } from './VideoListProps';
import Thumbnails from '../Thumbnail/Thumbnail';


export const VideoList:React.FC<videoListProps> = (videoList) => {

    // const [videos,setVideos] = useState<Array<any>>([]);  
    
    // const loadVideos = async () =>{
    //     const response = await axios.get('https://3.221.159.196:3320/videos');
    //     setVideos(response.data);
    //     console.log(listProps.vertical);
    // }

    // useEffect(()=>{
    //     loadVideos();
    // },[]);

    // LISTA DE VÍDEOS PARA TESTE
//     const teste:videoProps[] = [{        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },
//     {        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },{        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },{        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },{        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },{        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },{        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },{        
//         "id": "25526467-e9d7-40cb-bc60-76bb85419915",
//         "nome": "Aulão POO",
//         "url": 'https://download.samplelib.com/mp4/sample-5s.mp4',
//         "thumbUrl": "",
//         "descricao": "Aulão POO com o Rodrigo Sol",
//         "createdAt": "2022-04-09T13:29:21.652Z",
//         "duracao": "2h",
//         "topico": "semana 1"
//     },
// ]
    return(
        
        <ul className={`flex flex-${ videoList.vertical ? 'col' : 'row'} flex-wrap justify-center`} >
            {videoList.videos?.map((video) => {
                return(
                    <li>
                        <Suspense fallback={<div>...CARREGANDO</div>}>
                            <Thumbnails key={video.id} video={video} hover={true} />
                        </Suspense>
                    </li>
                )
            })}
            {/* {teste.map((video) => {
                return(
                    <li>
                        <Thumbnails key={video.id} {...video} hover />
                    </li>
            )
            })} */}
        </ul>
    )
}