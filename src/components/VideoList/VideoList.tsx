import { memo, Suspense} from 'react';
import { videoListProps } from './VideoListProps';
import Thumbnails from '../Thumbnail/Thumbnail';


export const VideoList:React.FC<videoListProps> = (videoList) => {

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
        </ul>
    )
}

export default memo(VideoList)