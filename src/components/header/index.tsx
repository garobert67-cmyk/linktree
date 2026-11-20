import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"


export function Header(){

  async function handleLogOut(){
    await signOut(auth);
    
}

    return(
        <header className="w-full max-w-2xl mt-4 px-1">
           <nav className="nav-hostinger w-full h-12 flex items-center justify-between rounded-md px-3">
                <div className="flex gap-4 font-medium text-hostinger-text">
                    <Link to='/'>
                        Home
                    </Link>
                    <Link to='/admin'>
                      Meus links
                    </Link>
                    <Link to='/admin/social'>
                      Redes sociais
                    </Link>
                </div>

                <button onClick={handleLogOut}>
                    <BiLogOut size={28} color="#673DE6"/>
                </button>
           </nav>
        </header>
    )
}