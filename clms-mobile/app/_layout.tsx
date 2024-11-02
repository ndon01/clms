// RootLayout.js
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/core/hooks/useColorScheme';
import axios from "axios";
import { AuthenticationProvider } from "@/core/contexts/AuthenticationContext";
import AppNavigator from './AppNavigator';  // Import the new navigator component

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
axios.defaults.baseURL = "LOCALHOST_URL_HERE"; // todo: figure out how to get the localhost url dynamically
// open terminal > ipconfig > find the ipv4 address > use that as the localhost url:8080

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while fetching resources
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.error(e);
      } finally {
        // Tell the app to render
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appReady || !loaded) {
    return null;
  }

  return (
      <AuthenticationProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppNavigator />
        </ThemeProvider>
      </AuthenticationProvider>
  );
}
