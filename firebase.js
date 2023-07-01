import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcm4K0hHiMax7b6CyL3Jj8z-Dg4ec2ukE",
    authDomain: "whatsapp-6b9ca.firebaseapp.com",
    projectId: "whatsapp-6b9ca",
    storageBucket: "whatsapp-6b9ca.appspot.com",
    messagingSenderId: "506128406373",
    appId: "1:506128406373:web:9feb4b6d24decd9f80338c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}