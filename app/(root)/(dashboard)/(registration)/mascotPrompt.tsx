import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import MascotTalk from '@/components/MascotTalk'
import { useAppSelector } from '@/redux/hook'
import { useUser } from '@clerk/clerk-expo'

const mascotMessage = () => {
  const {role} = useAppSelector((state) => state.user);

  return (
  <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
    <View className=' w-full h-[65%] flex justify-end items-center'>
        <MascotTalk text={role == "rider" ? "Please continue filling you personal information" : "Please continue to submit all required documents and personal information"} image={images.foxMascot} />
    </View>
    <View className='w-full h-[35%] flex justify-end items-center pb-10'>
      <CustomButton active={true} title="Continue" onPress={() => router.push(`/(root)/(dashboard)/(registration)/${role}` as RelativePathString)} />
    </View>
  </SafeAreaView>
  )
}

export default mascotMessage;