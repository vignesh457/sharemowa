import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" options={{ gestureEnabled: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}