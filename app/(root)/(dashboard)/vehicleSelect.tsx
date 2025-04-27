import { View,TouchableOpacity, Image, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import { router, useLocalSearchParams } from 'expo-router'
import MascotTalk from '@/components/MascotTalk'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setUserVehicleType } from '@/redux/slice/userSlice'

const vehicleSelect = () => {
  const {role} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       router.replace('/(root)/(dashboard)/roleSelect'); 
  //       return true; // prevent default back behavior
  //     }
  //   );

  //   return () => backHandler.remove();
  // }, []);
  function handleClick(vehicle: 'bike' | 'car') {
    router.push("/(root)/(main)/(drawer)/home");
    dispatch(setUserVehicleType(vehicle));
  }

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
      <View className='w-full h-[60%] flex justify-end items-center'>
          <MascotTalk text={role == "rider" ? "Which vechicle are you looking for ?" : "Which vehicle are you offering ?"} image={images.foxMascot} />
      </View>
      <View className='bg-secondary-400 w-full h-[40%] flex justify-start items-center'>
        <View className='w-[85%] h-[70%] m-5 rounded-xl flex flex-row justify-between items-center'>
            <TouchableOpacity onPress={() => handleClick("bike")}>
              <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md border-[1px] border-secondary-200'>
                  <Image source={images.bike} className='w-[100px] h-[100px]' />    
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClick("car")}>
              <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md border-[1px] border-secondary-200'>
                  <Image source={images.car} className='w-[100px] h-[105px]' />
              </View>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default vehicleSelect