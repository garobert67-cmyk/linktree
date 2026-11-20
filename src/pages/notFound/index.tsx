import { Link } from "react-router";




export function NotFound(){
    return(
        <div className="flex flex-col w-full min-h-screen justify-center items-center font-bold">
            <h1 className="font-bold text-4xl mb-4 text-white"> 404</h1>
            <h1 className="font-bold text-4xl mb-4 text-white"> PÁGINA NÃO ENCONTRADA</h1>
            <Link to="/" className="btn-ghost-hostinger py-1 px-4 rounded-md text-white">
                Voltar para a Home
            </Link>
        </div>
    )
}