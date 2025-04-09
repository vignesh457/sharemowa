import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' }, animation: 'slide_from_right'  }}>
            <Stack.Screen name="roleSelect" options={{ gestureEnabled: false  }} />
            <Stack.Screen name="vehicleSelect" options={{ gestureEnabled: false }} />
            <Stack.Screen name="(registration)" options={{ gestureEnabled: false  }} />
        </Stack>
        <StatusBar style='auto' />
    </>
  )
}

export default _layout