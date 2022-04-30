import { memo } from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { videoListProps } from './VideoListProps';


export const VideoList:React.FC<videoListProps> = (videoList) => {

    return(
        
        <ul className={`flex flex-${ videoList.vertical ? 'col' : 'row'} flex-wrap justify-center`} >
            {videoList.videos?.map((video) => {
                return(
                    <li>
                        <Thumbnail key={video.id} video={video} hover={videoList.hover} />
                    </li>
                )
            })}
        </ul>
    )
}

export default memo(VideoList);