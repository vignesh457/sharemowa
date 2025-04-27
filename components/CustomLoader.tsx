import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
const CustomLoader = () => {

  return (
    <View className="w-full h-full bg-[#00000080] absolute top-0 left-0 flex justify-center items-center pt-5 z-10">
    <View className='w-full h-full flex flex-row justify-center items-center'>
      <ActivityIndicator size="large" color="orange" />
    </View>
    </View>
  );
};

export default CustomLoader;
