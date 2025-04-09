import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' }, animation: 'slide_from_right' }}>
            <Stack.Screen name="biker" options={{ gestureEnabled: false  }} />
            <Stack.Screen name="bikerForm" options={{ gestureEnabled: false  }} />
            <Stack.Screen name="rider" options={{ gestureEnabled: false  }} />
            <Stack.Screen name="vehicleTypeSelect" options={{ gestureEnabled: false  }} />
            <Stack.Screen name="mascotPrompt" options={{ gestureEnabled: false  }} />
        </Stack>
        <StatusBar style='auto' />
    </>
  )
}

export default _layout