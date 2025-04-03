import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' } }}>
            <Stack.Screen name="main" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
            <Stack.Screen name="profileInfo" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
            <Stack.Screen name="profileInfoForm" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
            <Stack.Screen name="vehicleSelect" options={{ gestureEnabled: false, animation: 'slide_from_right'  }} />
        </Stack>
        <StatusBar style='auto' />
    </>
  )
}

export default _layout