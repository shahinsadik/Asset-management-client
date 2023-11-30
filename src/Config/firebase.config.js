// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};
// apiKey: "AIzaSyAY78d6VaTNX3UA-Xo0uETJsN8qPd3L7Uk",
// authDomain: "amsstm-60747.firebaseapp.com",
// projectId: "amsstm-60747",
// storageBucket: "amsstm-60747.appspot.com",
// messagingSenderId: "412604037039",
// appId: "1:412604037039:web:d18782dea232e52e43a15a"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;