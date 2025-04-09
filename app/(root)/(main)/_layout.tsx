import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MainLayout() {
  
  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' }, animation: 'slide_from_right' }}>
        <Stack.Screen name="home" options={{ gestureEnabled: false }} />
        <Stack.Screen name="selectLocation" options={{ gestureEnabled: false }} />
        <Stack.Screen name="confirmPickup" options={{ gestureEnabled: false }} />
        <Stack.Screen name="loadingBiker" options={{ gestureEnabled: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}