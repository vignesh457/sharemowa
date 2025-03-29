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
    <SafeAreaView className="flex-1 justify-center items-center bg-secondary-400">
      <TouchableOpacity
        onPress={() => router.push('/(auth)/sign-up')}
        className=" w-20 h-9 rounded-full absolute top-12 right-2 flex items-center justify-center z-10"
      >
        <Text className="text-primary-100 text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        loop={false}
        dot={
          <View className="bg-secondary-300 w-10 h-1.5 mx-1 rounded-full"></View>
        }
        activeDot={
          <View className="bg-primary-100 w-10 h-1.5 mx-1 rounded-full"></View>
        }
        ref={ref}
        className='bg-secondary-400'
        onIndexChanged={(index)=>setIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="m-auto rounded-[10px] h-3/4 w-[90%] flex items-center justify-center bg-secondary-300 ">
            <Image 
              source={item.image}
              className="w-80 h-80 mb-10"         
            />
            <Text className="text-secondary-100 font-JakartaBold text-2xl w-80">{item.title}</Text>
            <Text className="text-secondary-200 font-JakartaRegular text-lg mt-2 w-80">{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <CustomButton onPress={handleOnPress} active={true} title={isLast?"Get Started":"Next"} className=''/>
    </SafeAreaView>
  );
};

export default Features;
