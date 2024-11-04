// app/login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AssignmentsApi, AuthenticationApi, Configuration } from "@/core/modules/openapi";
import { useAuth } from '@/core/contexts/AuthenticationContext';

const Index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth();  // Access login function from the context

    const authenticationApi = new AuthenticationApi();

    const handleLogin = () => {
        authenticationApi.loginUserV1({
            username: email,
            password: password
        }).then((response) => {
            const { accessToken } = response.data;
            if (!accessToken) {
                console.error("No accessToken received");
                return;
            }
            login(accessToken);  // Store the accessToken in the context
            router.dismissAll();
            router.push("/(tabs)");  // Navigate to the home screen or authenticated area
        }).catch((error) => {
            console.error("Login failed:", error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
});

export default Index;
