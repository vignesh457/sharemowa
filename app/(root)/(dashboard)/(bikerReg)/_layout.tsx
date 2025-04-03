import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' } }}>
            <Stack.Screen name="main" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
            <Stack.Screen name="dlForm" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
            <Stack.Screen name="identityForm" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
            <Stack.Screen name="rcForm" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
            <Stack.Screen name="vehicleType" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
        </Stack>
        <StatusBar style='auto' />
    </>
  )
}

export default _layout