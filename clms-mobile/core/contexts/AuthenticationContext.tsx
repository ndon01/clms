import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for the context
interface AuthenticationContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

// Define props for the provider
interface AuthenticationProviderProps {
    children: ReactNode;
}

// Create the context with a default value of undefined
const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

// Create the provider component
export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // Calculate isAuthenticated based on the presence of accessToken
    const isAuthenticated = Boolean(accessToken);

    useEffect(() => {
        // Load accessToken from AsyncStorage on app load
        const loadAccessToken = async () => {
            try {
                const storedAccessToken = await AsyncStorage.getItem('accessToken');
                if (storedAccessToken) {
                    setAccessToken(storedAccessToken);
                }
            } catch (e) {
                console.error("Failed to load accessToken", e);
            }
        };
        loadAccessToken();
    }, []);

    useEffect(() => {
        // Save accessToken to AsyncStorage whenever it changes
        const saveAccessToken = async () => {
            try {
                if (accessToken) {
                    await AsyncStorage.setItem('accessToken', accessToken);
                } else {
                    await AsyncStorage.removeItem('accessToken');
                }
            } catch (e) {
                console.error("Failed to save accessToken", e);
            }
        };
        saveAccessToken();
    }, [accessToken]);

    // Define login and logout functions
    const login = (token: string) => {
        console.log("Logging in with token:", token);
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
    };

    return (
        <AuthenticationContext.Provider value={{ accessToken, isAuthenticated, login, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

// Custom hook to use the authentication context
export const useAuth = (): AuthenticationContextType => {
    const context = useContext(AuthenticationContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthenticationProvider");
    }
    return context;
};
