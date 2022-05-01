import { memo } from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { videoListProps } from './VideoListProps';


export const VideoList:React.FC<videoListProps> = (videoList) => {

    return(
        
        <ul className={`flex flex-${ videoList.vertical ? 'col justify-center' : 'row '} max-w-[95vw] lg:max-w-[85vw] mx-auto flex-wrap justify-start`} >
            {videoList.videos?.map((video) => {
                return(
                    <li className={videoList.vertical ? 'my-4' : 'mx-[0.66vw] my-4'} >
                        <Thumbnail key={video.id} video={video} hover={videoList.hover} />
                    </li>
                )
            })}
        </ul>
    )
}

export default memo(VideoList);