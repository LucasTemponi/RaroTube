import { LazyThumbnail } from "../LazyThumbnail/LazyThumbnail"

type LazyThumbListProps = {
    items: number,
    vertical?: boolean
}

export const LazyThumbList: React.FC<LazyThumbListProps> = (lazyProps) => {

    return (
        <ul className={`flex flex-${lazyProps.vertical ? 'col' : 'row'} flex-wrap justify-center`} >
            {[...Array(lazyProps.items)].map((video) => {
                return (
                    <li>
                        <LazyThumbnail />
                    </li>
                )
            })}
        </ul>
    )
}

export default LazyThumbList