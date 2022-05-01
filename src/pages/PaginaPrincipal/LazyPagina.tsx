import { LazyThumbList } from "../../components/LazyThumbList/LazyThumbList"
import { useAuthContext } from "../../context/authContext"

export const LazyPrincipal = () => {

    const authContext = useAuthContext();

    return (
        <>
            {
                authContext.estaAutenticado &&
                (<>
                    <h1 className=" font-extrabold underline decoration-raro-rosa text-2xl ml-7 py-4 text-left text-raro-cobalto" >Vídeos favoritos</h1>
                    <LazyThumbList items={5} />

                </>)
            }
            <h1 className=" font-extrabold underline decoration-raro-rosa text-2xl  ml-7 py-4 text-left text-raro-cobalto">Adicionados recentemente</h1>
            <LazyThumbList items={20} />
        </>
    )
}

export default LazyPrincipal
