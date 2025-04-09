import { View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SpeechBubble from '@/components/SpeechBubble'
import { images } from '@/constants'
import { router, useLocalSearchParams } from 'expo-router'

const vehicleSelect = () => {
  const {role} = useLocalSearchParams();
  function handleBikeClick(){
    router.push({
      pathname: "/(root)/(main)/home",
      params: {
        vehicleType: "Bike",
      },
    });
  
  }

  function handleCarClick(){
    router.push({
      pathname: "/(root)/(main)/home",
      params: {
        vehicleType: "Car",
      },
    })
  }

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
      <View className='w-full h-[60%] flex justify-center items-center'>
        <View className='flex justify-center items-center gap-7'>
          <SpeechBubble
            text={role == "Rider" ? "Which vechicle are you looking for ?" : "Which vehicle are you offering ?"}
          />
          <Image source={images.foxMascot} className='w-[130px] h-[130px]' />
        </View>
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

export default vehicleSelect