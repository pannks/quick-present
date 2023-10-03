import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { StudentInfo } from "../data/type";

type AuthContextType = {
    isVerified: boolean;
    userInfo: StudentInfo | null;
    verify: (username: string, password: string) => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [storedUserInfo, setUserInfoToLocalStorage] =
        useLocalStorage<StudentInfo | null>("userInfo", null);
    const [isVerified, setIsVerified] = useState<boolean>(
        storedUserInfo !== null
    );
    const [userInfo, setUserInfo] = useState<StudentInfo | null>(
        storedUserInfo
    );
    const [loading, setLoading] = useState<boolean>(true);

    const verify = async (username: string, password: string) => {
        setLoading(true);
        try {
            const response = await axios.post(
                import.meta.env.VITE_REST_API,
                {
                    UserName: username,
                    PassWord: password,
                },
                {
                    headers: {
                        "Application-Key": import.meta.env.VITE_APPILCATION_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                setIsVerified(true);
                setUserInfo(response.data);
                setUserInfoToLocalStorage(response.data);
            }
        } catch (error) {
            console.error("Authentication failed:", error);
            // Handle error appropriately (e.g. show an error message)
        } finally {
            setLoading(false); // End the loading state
        }
    };

    return (
        <AuthContext.Provider value={{ isVerified, userInfo, verify, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
