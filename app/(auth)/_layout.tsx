import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
  
  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' }, animation: 'slide_from_right' }}>
        <Stack.Screen name="features" options={{ gestureEnabled: false  }} />
        <Stack.Screen name="sign-up" options={{ gestureEnabled: false  }} />
      </Stack>
      <StatusBar barStyle="light-content" backgroundColor="#000"  />
    </>
  );
}