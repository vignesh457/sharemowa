import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '@/constants'
import { router } from 'expo-router'
import MascotTalk from '@/components/MascotTalk'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setIsOnboarded, setPersonalInfo, setUserRole } from '@/redux/slice/userSlice'
import { supabase } from '@/lib/supabase'
import CustomLoader from '@/components/CustomLoader'

const main = () => {
  const dispatch = useAppDispatch();
  const { phoneNumber } = useAppSelector((state) => state.user);

  const checkUserInDB = async (role: 'biker' | 'rider') => {
    dispatch(setUserRole(role));
    try {
      console.log("db called");
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', phoneNumber)
        .single();
      if (data && role == "biker") {
        dispatch(setPersonalInfo(data));
        if(data.document_id){
          router.push('/(root)/(dashboard)/vehicleSelect');
        }
        else{
          router.push('/(root)/(dashboard)/(registration)/mascotPrompt');
        }
      } 
      else if (data && role == "rider") {
        dispatch(setPersonalInfo(data));
        router.push('/(root)/(dashboard)/vehicleSelect');
      }
      else {
        router.push('/(root)/(dashboard)/(registration)/mascotPrompt');
      }
    } catch (err) {
      console.error("Error checking user data:", err);
      router.push('/(root)/(dashboard)/(registration)/mascotPrompt');
    } 
  };

  const handleRiderClick = () => checkUserInDB("rider");
  const handleBikerClick = () => checkUserInDB("biker");

  // return (
  //   <SplashScreen/>
  // )

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-secondary-400'>
      <View className='w-full h-[60%] flex justify-end items-center'>
        <MascotTalk text="Hello, Are you here to offer a ride or take a ride ?" image={images.foxMascot} />
      </View>
      <View className='bg-secondary-400 w-full h-[40%] flex justify-start items-center'>
        <View className='w-[85%] h-[70%] m-5 rounded-xl flex flex-row justify-between items-center'>
          <TouchableOpacity onPress={handleBikerClick}>
            <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md border-[1px] border-secondary-200'>
              <Image source={images.biker} className='w-[100px] h-[100px]' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRiderClick}>
            <View className='w-[145px] h-[145px] bg-secondary-300 flex justify-center items-center rounded-md border-[1px] border-secondary-200'>
              <Image source={images.rider} className='w-[100px] h-[105px]' />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default main
