import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import { router } from 'expo-router'

const SearchResult = ({
    mainLocation,
    subLocation,
    distance
}:
{
    mainLocation: string,
    subLocation: string,
    distance: number
}
) => {
  return (
    <TouchableOpacity onPress={() => router.push("/(root)/(main)/confirmPickup")} className="flex flex-row items-center p-1 mt-1 bg-secondary-400 w-[100%] h-[70px] rounded-[10px] mb-2">
        <View className='w-[20%] h-full flex gap-1 items-center justify-center border-r '>
            <Image source={icons.pin} className="w-7 h-7" />
            <Text className='text-[10px] tracking-tighter font-JakartaBold text-secondary-200'>{distance} km</Text>
        </View>
        <View className="w-[80%] h-full flex items-start justify-center gap-1 pb-2 px-5">
            <Text className='text-lg font-JakartaSemiBold text-secondary-100'>
                {mainLocation}
            </Text>
            <Text className='text-sm font-JakartaMedium text-secondary-200'>
                {subLocation}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default SearchResult