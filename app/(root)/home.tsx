import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router';

const home = () => {
const { signOut } = useAuth();
const handleSignOut = async () => {
  await signOut();
  router.replace('/(auth)/sign-in');
}

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
      <Text className='text-primary-100 text-2xl'>home</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text className='text-secondary-100 text-2xl'>logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default home