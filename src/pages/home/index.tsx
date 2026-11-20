import { Social } from "../../components/social"
import{FaFacebook,FaInstagram,FaYoutube} from 'react-icons/fa'
import {db} from '../../services/firebaseConnection'
import { collection,query,orderBy,doc,getDocs,getDoc, }
 from 'firebase/firestore'
 import { useEffect,useState } from "react"



interface LinksProp{
    id:string;
    name:string;
    url:string;
    bg:string;
    color:string;
}

interface SocialLinkProps{
    facebook:string;
    youtube:string;
    instagram:string;
}

export function Home(){

    const [socialLinks,setSocialLinks] = useState<SocialLinkProps>()
    const [links,setLinks] = useState<LinksProp[]>([])

    useEffect(()=>{
        function loadLink(){
            const linkRef = collection(db,'Links')
            const queyRef =  query(linkRef,orderBy('created','asc'))

            getDocs(queyRef)
            .then((snapshot)=>{
                let lista = [] as LinksProp[]
                snapshot.forEach((doc)=>{
                    lista.push({
                        id:doc.id,
                        name:doc.data().name,
                        url:doc.data().url,
                        bg:doc.data().bg,
                        color:doc.data().color,
                    })
                })
               setLinks(lista)
            })
        }
        loadLink()
    },[])


    useEffect(()=>{

        function loadSocialLinks(){
            const docRef = doc(db,'social','link')
            getDoc(docRef)
            .then((snapshot)=>{
            if(snapshot.data() !== undefined){
                setSocialLinks({
                    facebook:snapshot.data()?.facebook,
                    instagram:snapshot.data()?.instagram,
                    youtube:snapshot.data()?.youtube,
                })
            }
        })
    }
    loadSocialLinks()
        
    },[])
    
    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className= "md:text-4xl text-3xl text-white font-bold mt-20">Gabriel Reis</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇🏻</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link)=>(
                    <section
                    key={link.id}
                    className="link-card-hostinger mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
                    style={{backgroundColor:link.bg}}
                    >
                    <a href={link.url} target="_blank" className="">
                        <p className="text-base md:text-lg" style={{color:link.color}}>
                            {link.name}
                        </p>
                    </a>
                </section>
                ))}

              {socialLinks && Object.keys(socialLinks).length > 0 && (

                  <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.facebook}>
                        <FaFacebook size={35} color="white"/>
                    </Social>
                    <Social url={socialLinks?.youtube}>
                        <FaYoutube size={35} color="white"/>
                    </Social>
                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={35} color="white"/>
                    </Social>
                </footer>
              )}
            </main>
        </div>
    )
}