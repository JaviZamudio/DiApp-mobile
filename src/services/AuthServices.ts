import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../configs/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const firebaseSignUp = async (email: string, password: string, name: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed in 
        const user = userCredential.user;

        const docRef = await setDoc(doc(db, "usuarios", user?.uid), {
            uid: user?.uid,
            email: user?.email,
            name: name,
            createdAt: new Date(),
            categorias: [],
            datos: [],
        });

        return user;
    } catch (error) {
        console.log(error);
    }
}

export const firebaseLogIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in 
        return userCredential.user;
    } catch (error) {
        console.log(error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});