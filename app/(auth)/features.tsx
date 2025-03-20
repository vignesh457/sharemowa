import { View, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboarding } from '@/constants';
import { Image } from 'react-native';
import CustomButton from '@/components/CustomButton';

const Features = () => {
  const ref = useRef<Swiper>(null);
  const [index, setIndex] = useState(0);
  const isLast = (index === onboarding.length - 1);

  const handleOnPress = () => {
    if(isLast) {
        router.push('/(auth)/sign-up')
    } else {
        ref.current?.scrollBy(1);
    }
  }
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-900">
      <TouchableOpacity
        onPress={() => router.push('/(auth)/sign-up')}
        className=" w-20 h-9 rounded-full absolute top-10 right-4 flex items-center justify-center z-10"
      >
        <Text className="text-orange-500 text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        loop={false}
        dot={
          <View className="bg-slate-600 w-10 h-1.5 mx-1 rounded-full"></View>
        }
        activeDot={
          <View className="bg-orange-500 w-10 h-1.5 mx-1 rounded-full"></View>
        }
        ref={ref}
        className=" bg-gray-900"
        onIndexChanged={(index)=>setIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="my-auto h-3/4 w-full flex items-center justify-center  bg-black ">
            <Image 
              source={item.image}
              className="w-80 h-80 mb-20"         
            />
            <Text className="text-white font-JakartaBold text-2xl">{item.title}</Text>
            <Text className="text-slate-400 font-JakartaRegular text-lg mt-2">{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <CustomButton onPress={handleOnPress} title={isLast?"Get Started":"Next"} className='w-5/6 mb-4 p-3'/>
    </SafeAreaView>
  );
};

export default Features;
