import { videoProps } from "../VideoPlayer/VideoProps";

export type videoListProps = {
    vertical?:boolean,
    videos:Array<videoProps> | undefined,
}