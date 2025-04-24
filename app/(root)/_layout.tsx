import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  
  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' }, animation: 'slide_from_right' }}>
        <Stack.Screen name="(main)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(dashboard)" options={{ gestureEnabled: false }} />
      </Stack>
      <StatusBar barStyle="light-content" backgroundColor="#000"  />
    </>
  );
}