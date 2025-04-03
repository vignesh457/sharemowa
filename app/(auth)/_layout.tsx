import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  
  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' }}}>
        <Stack.Screen name="features" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
        <Stack.Screen name="sign-up" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}