import { createContext, useEffect, useState } from "react";
import { firebaseLogIn, firebaseSignUp } from "../services/AuthServices";
import { User as FirebaseUser } from "firebase/auth";
import { router, SplashScreen, usePathname } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User extends FirebaseUser {
    name: string;
}

interface AuthContextData {
    user?: User;
    isLoading: boolean;
    signup: (email: string, password: string, name: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

SplashScreen.preventAutoHideAsync();

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const pathName = usePathname();

    const loadUser = async () => {
        setIsLoading(true);

        await AsyncStorage.getItem('user').then((user) => {
            if (user) {
                const userObj = JSON.parse(user) as User;
                setUser(userObj);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            const firebaseUser = await firebaseSignUp(email, password, name);
            if (!firebaseUser) {
                console.log("Error signing up");
                alert("Error signing up");
                return;
            }

            login(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const firebaseUser = await firebaseLogIn(email, password);
            const userRef = doc(db, 'usuarios', firebaseUser?.uid as string);
            const userDoc = await getDoc(userRef);

            if (!firebaseUser) {
                console.log("Error logging in");
                alert("Error logging in");
                return;
            }

            const userInfo = {
                ...firebaseUser,
                name: userDoc.data()?.name
            };

            await AsyncStorage.setItem('user', JSON.stringify(userInfo));

            setUser(userInfo);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(undefined);
        AsyncStorage.removeItem('user');
    };

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (!user && pathName !== '/login') {
                console.log("User not logged in");
                router.replace('/login');
            }

            if (user && pathName === '/login') {
                console.log("User logged in");
                router.replace('/(tabs)');
            }

            setTimeout(() => SplashScreen.hideAsync(), user ? 0 : 1000);
        }
    }, [isLoading, user, pathName]);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};