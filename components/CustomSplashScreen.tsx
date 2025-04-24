import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';

const CustomSplashScreen = ({ value }: { value: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: value,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-black'>
      <Animated.Image
        source={images.icon}
        style={{ opacity: fadeAnim }}
        className='w-[200px] h-[200px] mb-[-10px]'
      />
      <Animated.Text
        style={{ opacity: fadeAnim }}
        className='text-6xl text-secondary-300 font-NunitoBold p-2 mb-[-10px]'
      >
        ShareMowa
      </Animated.Text>
    </SafeAreaView>
  );
};

export default CustomSplashScreen;
