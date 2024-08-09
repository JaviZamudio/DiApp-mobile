// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG } from "./configs";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDUG6YqahtoMts0D8-E2P9Ynw2e48l9oyI",
//   authDomain: "diapp-19bd4.firebaseapp.com",
//   projectId: "diapp-19bd4",
//   storageBucket: "diapp-19bd4.appspot.com",
//   messagingSenderId: "252458627663",
//   appId: "1:252458627663:web:a298b3f417e5f911ae703a",
//   measurementId: "G-T0GDTE3QMR"
// };

const firebaseConfig = FIREBASE_CONFIG;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);

// collections 
export const usuariosCollection = "usuarios";