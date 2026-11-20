import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBqQSd2BilZ24P_DJIbm5v6BD5uytfVUAM",
  authDomain: "react-links-5f868.firebaseapp.com",
  projectId: "react-links-5f868",
  storageBucket: "react-links-5f868.firebasestorage.app",
  messagingSenderId: "23487937411",
  appId: "1:23487937411:web:651bb45c556800b585d4b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db};