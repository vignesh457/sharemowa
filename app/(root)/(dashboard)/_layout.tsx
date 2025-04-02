import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" options={{ gestureEnabled: false }} />
            <Stack.Screen name="profileInfo" options={{ gestureEnabled: false }} />
            <Stack.Screen name="profileInfoForm" options={{ gestureEnabled: false }} />
            <Stack.Screen name="vehicleSelect" options={{ gestureEnabled: false }} />
        </Stack>
        <StatusBar style='auto' />
    </>
  )
}

export default _layout