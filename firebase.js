
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtwsqn4OurWpnjOi31S_a7SIBGpLyAeuc",
    authDomain: "react-scaffolding-app.firebaseapp.com",
    projectId: "react-scaffolding-app",
    storageBucket: "react-scaffolding-app.appspot.com",
    messagingSenderId: "620320523689",
    appId: "1:620320523689:web:55439bd93fa0a6b02530b8",
    measurementId: "G-4ZX7H579RJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};