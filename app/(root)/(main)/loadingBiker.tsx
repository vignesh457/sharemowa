import { View, Text, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons, images } from '@/constants'
import DarkTheme from '@/utils/darkTheme.json'
import { router } from 'expo-router'
import * as Location from 'expo-location';
import MapView from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'

const confirmPickup = () => {
  const [locationGranted, setLocationGranted] = useState(false);
 
   useEffect(() => {
     (async () => {
       const { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== 'granted') {
         Alert.alert('Permission Denied', 'Enable location permission from settings');
         return;
       }
       setLocationGranted(true);
     })();
   }, []);

  return (
    <SafeAreaView className="bg-secondary-400 flex-1">
     {/* Map and Address */}
      <View className='w-full h-[70%]'>
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: 17.385044,
            longitude: 78.486671,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={locationGranted}
          showsMyLocationButton={true}
          customMapStyle={DarkTheme}
        />
      </View>
      <View className='w-full h-[30%] rounded-t-[20px] bg-secondary-400 mt-[-28px] flex gap-5 pt-4 justify-start items-center'>
          <Text className='text-secondary-100 text-[18px] font-JakartaBold text-center mb-4'>
            Waiting for Biker....
          </Text>
          <View className='bg-secondary-300 w-4/5 h-[80px] rounded-lg flex flex-row justify-center items-center'>
            <View className='w-[12%] pl-2 h-full flex justify-center items-center'>
              <Image source={icons.point} className='w-12 h-12' />
            </View>
            <View className=' w-[70%] h-full flex justify-center p-3'>
              <Text className='text-secondary-100 text-[15px] font-JakartaMedium leading-7'>Sreeram Nagar Colony, Hyderabad</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className='w-[18%] h-full flex justify-center items-center'>
             <Image source={icons.edit} className='w-10 h-10' />
            </TouchableOpacity>
          </View>
          <CustomButton title={'Confirm Location'}/>
      </View>
    </SafeAreaView>
  )
}

export default confirmPickup