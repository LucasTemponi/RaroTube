import { LazyThumbList } from "../../components/LazyThumbList/LazyThumbList"
import { useAuthContext } from "../../context/authContext"

export const LazyPrincipal = () => {

    // const VideoList = lazy(()=>import('../../components/VideoList/VideoList'));
    const authContext = useAuthContext();

    return (
        <>
            <div className="4xl:max-w-[70vw] xl:max-w-[80vw] lg:w-[85vw] 
            md:w-[90vw] sm:w-[95vw] m-auto" >
            </div>
                {
                    authContext.estaAutenticado &&
                    (<>
                        <h1 className=" font-extrabold underline decoration-raro-rosa text-4xl m-4 mt-12 text-left " >Vídeos favoritos</h1>
                        <LazyThumbList items={5} />   
                    </>)
                }
                <h1 className=" font-extrabold underline decoration-raro-oceano text-4xl m-4 mt-12 text-left">Adicionados recentemente</h1>
                    <LazyThumbList items={10} />
                <h1 className=" font-extrabold underline decoration-raro-violeta text-4xl m-4 mt-12 text-left">Recomendados</h1>
                    <LazyThumbList items={15} />

                <div className="h-10" /> 
        </>
    )
}

export default LazyPrincipal