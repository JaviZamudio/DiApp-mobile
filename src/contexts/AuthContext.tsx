import { createContext, useEffect, useState } from "react";
import { firebaseLogIn, firebaseSignUp } from "../services/AuthServices";
import { User } from "firebase/auth";
import { router, SplashScreen } from "expo-router";

interface AuthContextData {
    user?: User;
    isLoading: boolean;
    signup: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

SplashScreen.preventAutoHideAsync();

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadUser = () => {
        setIsLoading(true);
        // const firebaseUser = await firebaseGetCurrentUser();
        // if (!firebaseUser) {
        //     console.log("Error getting current user");
        //     alert("Error getting current user");
        //     setIsLoading(false);
        //     return;
        // }
        // setUser(firebaseUser);
        setIsLoading(false);
    };

    const signup = async (email: string, password: string) => {
        try {
            const firebaseUser = await firebaseSignUp(email, password);
            if (!firebaseUser) {
                console.log("Error signing up");
                alert("Error signing up");
                return;
            }
            setUser(firebaseUser);
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const firebaseUser = await firebaseLogIn(email, password);
            if (!firebaseUser) {
                console.log("Error logging in");
                alert("Error logging in");
                return;
            }
            setUser(firebaseUser);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(undefined);
    };

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();

            if (!user) {
                console.log("User not logged in");
                router.navigate('/login');
            } else {
                console.log("User logged in");
                router.navigate('/(tabs)');
            }
        }
    }, [isLoading, user]);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};