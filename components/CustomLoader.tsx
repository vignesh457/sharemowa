import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const CustomLoader = () => {
  return (
    <View className="w-full h-full bg-[#00000080] absolute top-0 left-0 flex justify-center items-center z-10">
        <View className="w-[90%] h-[80px] flex flex-row justify-center items-center bg-primary-100 rounded-xl">
            <ActivityIndicator size="large" color="#000000" />
            <Text className="text-secondary-400 text-xl font-JakartaSemiBold ml-5">Please Wait</Text>
        </View>
    </View>
  )
}

export default CustomLoader