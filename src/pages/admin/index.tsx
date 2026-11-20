import {Header} from '../../components/header/index'
import { Input } from '../../components/input'
import { useState,useEffect, } from 'react'
import type { FormEvent } from 'react'
import {FiTrash} from 'react-icons/fi'
import {db} from '../../services/firebaseConnection'
import { addDoc,collection,onSnapshot,query,orderBy,doc,deleteDoc, }
 from 'firebase/firestore'
//import { create } from 'domain'

interface LinksProp{
    id:string;
    name:string;
    url:string;
    bg:string;
    color:string;
}


export function Admin(){
const [nameInput,setNameInput] = useState('')
const [urlInput,setUrlInput] = useState('')
const [textColorInput,SetTextColorInput] = useState("#f1f1f1")
const [bgColorInput,setBgColorInput] = useState("#121212")

const [links,setLinks] = useState<LinksProp[]>([])

useEffect(()=>{
    const linkRef = collection(db,'Links')
    const queryRef = query(linkRef,orderBy('created','asc'))

    const unsub = onSnapshot(queryRef,(snapshot)=>{
        let lista = [] as LinksProp[];
        snapshot.forEach((doc)=>{
            lista.push({
                id:doc.id,
                name:doc.data().name,
                url:doc.data().url,
                bg:doc.data().bg,
                color:doc.data().color
            })
        })

        setLinks(lista)
    })

    return ()=>{
        unsub()
    }
},[])

async function handleRegister(e:FormEvent) {
    e.preventDefault();
    if(nameInput=== '' || urlInput ===''){
        alert('Preencha todos os campos')
        return
    }

     await addDoc(collection(db,'Links'),{
        name:nameInput,
        url:urlInput,
        bg:bgColorInput,
        color:textColorInput,
        created: new Date()
    })

    setNameInput('')
    setUrlInput('')

}

 async function handleDeleteLink(id:string){
    const docRef = doc(db,'Links', id)
    await deleteDoc(docRef)
}

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <form onSubmit={handleRegister} action="" className='flex flex-col mt-8 mb-3 w-full max-w-xl'>
                <label htmlFor="" className='text-white font-medium mt-2 mb-2'>Nome do link</label>
                <Input
                    placeholder='Nome do link'
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <label htmlFor="" className='text-white font-medium mt-2 mb-2'>Nome do link</label>
                <Input
                type='url'
                    placeholder='Digite a URL'
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className='flex my-4 gap-5'>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="" className='text-white font-medium mt-2 mb-2'>Fundo do link</label>
                        <input type="color" 
                        value={textColorInput}
                        onChange={(e) => SetTextColorInput(e.target.value)}
                        />
                        
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="" className='text-white font-medium mt-2 mb-2'>Cor de fundo</label>
                        <input type="color" 
                        value={bgColorInput}
                        onChange={(e) => setBgColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className='preview-card-hostinger flex flex-col items-center justify-center mb-7 p-1'>
                    <label htmlFor="" className='text-white font-medium mt-2 mb-3'>Veja como esta ficando</label>
                        <article className='w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3'
                        style={{marginBottom:8,marginTop:8, backgroundColor: bgColorInput}}
                        >
                            <p className='font-medium' style={{color:textColorInput}}>
                                {nameInput}</p>
                        </article>
                </div>
                )}

                <button type='submit' className='btn-hostinger h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center cursor-pointer'>
                    Cadastrar
                </button>
            </form>

            <h2 className='font-bold text-white mb-4 text-2xl'>Meus links</h2>

            {links.map((link)=>(
                    <article key={link.id} style={{backgroundColor:link.bg,color:link.color}} className='flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none'>
                    <p>{link.name}</p>
                    <div>
                        <button onClick={()=> handleDeleteLink(link.id)} className='btn-delete-hostinger border-none py-1 px-2 cursor-pointer'>
                            <FiTrash size={18} color='white'/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}