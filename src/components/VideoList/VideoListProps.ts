import { VideoProps } from "../VideoPlayer/VideoProps";

export type videoListProps = {
    vertical?:boolean,
    videos:Array<VideoProps> | undefined,
}