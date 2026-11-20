import { Link,useNavigate } from "react-router";
import { Input } from "../../components/input";
import { useState, type FormEvent } from "react";
import {auth} from '../../services/firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'

export function Login(){
    const [emial,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const navigate = useNavigate()
 
    function handleSubmit(e:FormEvent){
        e.preventDefault();

        if(emial === ''|| senha === ''){
            alert('preencha todos os campos');
            return
        }

        signInWithEmailAndPassword(auth,emial,senha)
        .then(()=>{
            navigate('/admin',{replace:true})
            console.log('logado com sucesso')

        })
        .catch((e)=>{
            console.log('EERRO AO FAZER O LOGIN')
            console.log(e)
        })

    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">\
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                Dev<span className="logo-hostinger">Link</span></h1>
            </Link>

            <form onSubmit={handleSubmit} action="" className="w-full max-w-xl flex flex-col px-2">
                <Input
                placeholder='Digite o seu email'
                type="email"
                value={emial}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <Input
                placeholder='******'
                type="password"
                value={senha}
                onChange={(e)=> setSenha(e.target.value)}
                />

                <button type="submit" className="btn-hostinger h-9 rounded border-0 text-lg font-medium text-white cursor-pointer">
                    Acessar
                </button>
            </form>
        </div>
    )
}