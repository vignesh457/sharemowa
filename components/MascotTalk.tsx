import { View, Image } from 'react-native'
import React from 'react'
// @ts-ignore
import TypeWriter from 'react-native-typewriter';

const MascotTalk = ({text, image}: {text: string, image: any}) => {
  return (
    <View className='flex justify-center items-center gap-7 mb-20'>
        <View className='w-[250px] p-5 bg-secondary-300 rounded-xl'>
            <TypeWriter typing={1} minDelay={0} maxDelay={10} className='text-secondary-100 text-lg font-NunitoBold'>
                {text}
            </TypeWriter>
            <View className='w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[22px] border-t-secondary-300 absolute bottom-[-22px] left-[52%]'></View>
        </View>
        <Image source={image} className='w-[130px] h-[130px]' />
    </View>
  )
}

export default MascotTalk