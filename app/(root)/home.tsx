import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { router, useLocalSearchParams } from 'expo-router';

const home = () => {
  const { signOut } = useAuth();
  const {vehicleType} = useLocalSearchParams();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/sign-up');
  }

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
      <Text className='text-primary-100 text-2xl font-JakartaBold'>Welcome, Home</Text>
      <Text className='text-secondary-100 text-lg font-JakartaLight'>vehicle type selected: {vehicleType}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text className='text-red-500 m-5 text-2xl'>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default home