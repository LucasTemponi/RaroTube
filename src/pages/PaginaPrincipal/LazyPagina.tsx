import { LazyThumbList } from "../../components/LazyThumbList/LazyThumbList"
import { useAuthContext } from "../../context/authContext"

export const LazyPrincipal = () => {

    const authContext = useAuthContext();

    return (
        <>
            <div className=" my-auto 4xl:max-w-[70vw] xl:max-w-[80vw] lg:w-[85vw] md:w-[90vw] sm:w-[95vw] m-auto" >
            {
                authContext.estaAutenticado &&
                (<>
                    <h1 className=" font-extrabold underline decoration-raro-rosa text-2xl ml-7 py-4 text-left text-raro-cobalto" >Vídeos favoritos</h1>
                    <LazyThumbList items={5} />

                </>)
            }
            <h1 className=" font-extrabold underline decoration-raro-rosa text-2xl  ml-7 py-4 text-left text-raro-cobalto">Adicionados recentemente</h1>
            <LazyThumbList items={10} />
            <h1 className=" font-extrabold underline decoration-raro-rosa text-2xl  ml-7 py-4 text-left text-raro-cobalto">Recomendados</h1>
            <LazyThumbList items={15} />
            </div>
        </>
    )
}

export default LazyPrincipal
