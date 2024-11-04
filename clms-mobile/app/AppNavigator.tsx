// AppNavigator.js
import React, { useEffect } from 'react';
import {router, Stack, useRouter} from 'expo-router';
import axios from "axios";
import { useAuth } from '@/core/contexts/AuthenticationContext';

const AppNavigator = () => {
    const { accessToken, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Clear axios authorization header if not authenticated
        if (!isAuthenticated) {
            delete axios.defaults.headers.common['Authorization'];
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            router.dismissAll();
            router.push("/(tabs)");
        }
    }, [isAuthenticated, accessToken]);

    return (
        <>
            {isAuthenticated ? (
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
            ) : (
                <Stack>
                    <Stack.Screen name="(authentication)/index" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>

            )}
        </>
    );
};

export default AppNavigator;
