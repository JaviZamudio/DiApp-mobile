// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth, Persistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG } from "./configs";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

const firebaseConfig = FIREBASE_CONFIG;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// get os to know if set persistence
const os = Platform.OS;

export const auth = initializeAuth(app, {
    // persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    persistence: os === 'web' ? undefined : getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);

// collections 
export const usuariosCollection = "usuarios";