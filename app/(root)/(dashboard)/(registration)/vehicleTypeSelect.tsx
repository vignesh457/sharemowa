import { View, Text, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { router } from 'expo-router'
import MascotTalk from '@/components/MascotTalk'

const vehicleType = () => {
  const handleBikeClick = () => {
    router.push("/(root)/(dashboard)/(registration)/biker");
  };
  const handleCarClick = () => {
    router.push("/(root)/(dashboard)/(registration)/biker");
  };
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
      <View className='w-full h-[60%] flex justify-end items-center'>
          <MascotTalk text="Select your vehicle type..." image={images.foxMascot} />
      </View>
      <View className='bg-secondary-400 w-full h-[40%] flex justify-start items-center'>
        <View className='w-[85%] h-[70%] m-5 rounded-xl flex flex-row justify-between items-center'>
            <TouchableOpacity onPress={handleBikeClick}>
              <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md'>
                  <Image source={images.bike} className='w-[100px] h-[100px]' />    
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCarClick}>
              <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md'>
                  <Image source={images.car} className='w-[100px] h-[105px]' />
              </View>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default vehicleType