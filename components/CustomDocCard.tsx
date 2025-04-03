import { View, Text , Image, ImageSourcePropType} from 'react-native'
import React from 'react'
import { icons } from '@/constants'

const CustomDocCard = ({label, leftIcon, status}: {label: string, leftIcon: ImageSourcePropType, status: boolean}) => {
  return (
    <View className="flex flex-row items-center p-1 mt-1 bg-secondary-300 w-[90%] h-[70px] rounded-[10px] mb-7">
        <View className='w-[15%] h-[90%] flex items-center justify-center border-r '>
            <Image source={leftIcon} className="w-8 h-8" />
        </View>
        <View className='w-[70%] h-[90%] px-4 flex items-start justify-center'>
            <Text className='tracking-widest text-lg font-JakartaMedium text-secondary-100'>{label}</Text>
        </View>
        <View className='w-[15%] h-[90%] flex items-center justify-center '>
            <Image source={status ? icons.success : icons.rightArrow} className="w-8 h-8" />
        </View>
    </View>
  )
}

export default CustomDocCard