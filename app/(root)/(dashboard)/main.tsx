import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import SpeechBubble from '@/components/SpeechBubble'
import { images } from '@/constants'
import { router } from 'expo-router'

const main = () => {
  const isPresent = false;
  const handleRiderClick = () => {
    //check if user is already present and set the status
    (isPresent)? router.push('/(root)/(dashboard)/vehicleSelect') : router.push('/(root)/(dashboard)/profileInfo');
  }

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
      <View className='w-full h-[60%] flex justify-center items-center'>
        <View className='flex justify-center items-center gap-7'>
          <SpeechBubble
            text="Hello Suresh, Are you here to offer a ride or take a ride ?"
          />
          <Image source={images.foxMascot} className='w-[130px] h-[130px]' />
        </View>
      </View>
      <View className='bg-secondary-400 w-full h-[40%] flex justify-start items-center'>
        <View className='w-[85%] h-[70%] m-5 rounded-xl flex flex-row justify-between items-center'>
            <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md'>
                <Image source={images.biker} className='w-[100px] h-[100px]' />    
            </View>
            <TouchableOpacity onPress={handleRiderClick}>
              <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md'>
                  <Image source={images.rider} className='w-[100px] h-[105px]' />
              </View>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default main