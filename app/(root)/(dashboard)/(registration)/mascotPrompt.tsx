import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SpeechBubble from '@/components/SpeechBubble'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'

const mascotMessage = () => {
  const {role} = useLocalSearchParams();

  return (
  <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
    <View className=' w-full h-[85%] flex justify-center items-center'>
      <View className='flex justify-center items-center gap-7'>
        <SpeechBubble
          text={role == "rider" ? "Please continue filling you personal information" : "Please continue to submit all required documents and personal information"}
        />
        <Image source={images.foxMascot} className='w-[130px] h-[130px]' />
      </View>
    </View>
    <View className='w-full h-[15%] flex justify-center items-center'>
      <CustomButton active={true} title="Continue" onPress={() => router.push(`/(root)/(dashboard)/(registration)/${role}` as RelativePathString)} />
    </View>
  </SafeAreaView>
  )
}

export default mascotMessage;