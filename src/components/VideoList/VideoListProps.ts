import { VideoProps } from "../VideoPlayer/VideoProps";

export type videoListProps = {
    vertical?:boolean,
    hover?:boolean,
    videos:Array<VideoProps> | undefined,
}