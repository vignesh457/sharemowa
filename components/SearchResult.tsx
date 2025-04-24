import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import { router } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setDropLocation, setPickupLocation, setSelectedLocationType } from '@/redux/slice/userLocationSlice'

const SearchResult = ({
    mainLocation,
    subLocation,
    distance,
    coords
}:
{
    mainLocation: string,
    subLocation: string,
    distance: number
    coords: {lat: number, lng: number}
}
) => {
    const {selectedLocationType, dropLocation} = useAppSelector((state) => state.userLocation);
    const dispatch = useAppDispatch();

    const handlePress = () => {
        if(selectedLocationType == "pickup"){
            dispatch(setPickupLocation({lat: coords.lat, log: coords.lng, address: mainLocation + ", " + subLocation}));
            dispatch(setSelectedLocationType("drop"));
        }
        else{
            dispatch(setDropLocation({lat: coords.lat, log: coords.lng, address: mainLocation + ", " + subLocation}));
            router.push("/(root)/(main)/confirmPickup");
        }
    }
  return (
    <TouchableOpacity onPress={handlePress} className="flex flex-row items-center p-1 mt-1 bg-secondary-400 w-[100%] h-[70px] rounded-[10px] mb-2">
        <View className='w-[15%] h-full flex gap-1 items-center justify-center border-r '>
            <Image source={icons.pin} className="w-7 h-7" />
            <Text className='text-[10px] tracking-tighter font-JakartaBold text-secondary-200'>{distance} km</Text>
        </View>
        <View className="w-[85%] h-full flex items-start justify-center gap-2 pb-2 px-2">
            <Text numberOfLines={1} ellipsizeMode="tail" className='w-full text-[15px] font-JakartaSemiBold text-secondary-100'>
                {mainLocation}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className='w-full text-[12px] font-JakartaMedium text-secondary-200'>
                {subLocation}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default SearchResult