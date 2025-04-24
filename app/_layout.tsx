import { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import {
  useFonts as useGoogleFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_300Light,
} from '@expo-google-fonts/nunito';
import '@/global.css';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@/constants/tokenCache';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomAlert from '@/components/CustomAlert';
import CustomSplashScreen from '@/components/CustomSplashScreen';
import { useAppSelector } from '@/redux/hook';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function AppLayout() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "Nunito-Regular": Nunito_400Regular,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Nunito-Bold": Nunito_700Bold,
    "Nunito-Light": Nunito_300Light,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded || !publishableKey) return <CustomSplashScreen value={1}/>;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Always-on alert overlay */}
          <CustomAlert />

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#000' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" options={{ gestureEnabled: false }} />
            <Stack.Screen name="(auth)" options={{ gestureEnabled: false }} />
            <Stack.Screen name="(root)" options={{ gestureEnabled: false }} />
          </Stack>

          <StatusBar barStyle="light-content" backgroundColor="#000" />
        </PersistGate>
      </Provider>
    </ClerkProvider>
  );
}
