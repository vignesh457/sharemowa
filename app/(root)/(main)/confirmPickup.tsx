import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { icons } from '@/constants'
import DarkTheme from '@/utils/darkTheme.json'
import { router } from 'expo-router'
import MapView from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import * as Location from 'expo-location';
import { setPickupLocation, setSelectedLocationType } from '@/redux/slice/userLocationSlice'

const ConfirmPickup = () => {
  const { currentLocation, pickupLocation } = useAppSelector((state) => state.userLocation);
  const dispatch = useAppDispatch();
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: currentLocation?.lat ?? 0,
    longitude: currentLocation?.log ?? 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const handleRegionChangeComplete = async (newRegion: any) => {
    setRegion(newRegion);
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });
      if (address[0]) {
        dispatch(setPickupLocation({
          lat: newRegion.latitude,
          log: newRegion.longitude,
          address: address[0].formattedAddress || `${address[0].name}, ${address[0].city}`,
        }));
      }
    } catch (err) {
      console.warn("Reverse geocoding failed:", err);
    }
  };

  return (
    <SafeAreaView className="bg-secondary-400 flex-1">
      {/* Map and Marker */}
      <View className='w-full h-[70%]'>
        <MapView
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
          initialRegion={region}
          onRegionChangeComplete={handleRegionChangeComplete}
          showsUserLocation={!!currentLocation}
          showsMyLocationButton={true}
          customMapStyle={DarkTheme}
        />
        {/* Fixed Marker */}
        <View className="absolute top-1/2 mt-[-24px] left-1/2 ml-[-12px]">
          <Image source={icons.startPoint} className="w-12 h-12" />
        </View>
      </View>

      {/* Bottom Address Card */}
      <View className='w-full h-[30%] rounded-t-[20px] bg-secondary-400 mt-[-28px] flex gap-5 pt-4 justify-start items-center'>
        <Text className='text-secondary-100 text-[18px] font-JakartaBold text-center mb-4'>
          Confirm Pickup Location
        </Text>

        <View className='bg-secondary-300 w-4/5 h-[80px] rounded-lg flex flex-row justify-center items-center'>
          <View className='w-[12%] pl-2 h-full flex justify-center items-center'>
            <Image source={icons.startPoint} className='w-12 h-12' />
          </View>
          <View className=' w-[70%] h-full justify-center flex  p-3'>
            <Text numberOfLines={2} ellipsizeMode="tail" className='text-secondary-100 text-[15px] font-JakartaMedium leading-7'>
              {pickupLocation?.address ?? 'Detecting address...'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {
            router.back();
            dispatch(setSelectedLocationType("pickup"));
          }} className='w-[18%] h-full flex justify-center items-center'>
            <Image source={icons.edit} className='w-10 h-10' />
          </TouchableOpacity>
        </View>

        <CustomButton onPress={() => router.push("/(root)/(main)/loadingBiker")} title={'Confirm Location'} />
      </View>
    </SafeAreaView>
  )
}

export default ConfirmPickup;
