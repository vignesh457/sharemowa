import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import React, { useState } from 'react'
import InputFeild from '@/components/InputFeild'
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { icons, images } from '@/constants';


const signUp = () => {  
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignUp = () => {
    sendOTP(phoneNumber);
    router.push('/(auth)/otp');
  };

  async function sendOTP(phoneNumber: string) {
    // Implement your logic to send the OTP to the user's phone number
  }
  

  return (
    <SafeAreaView className="flex-1 items-center bg-secondary-400">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="w-full h-full justify-center items-center"> 
          <Image source={images.phoneSvg} className="h-80 w-80 mb-10 mt-[-100px]" /> 
          <Text className="text-secondary-100 text-2xl mb-1 font-JakartaBold">Enter Your Mobile Number</Text>
          <Text className="text-secondary-200 text-md font-JakartaRegular mb-7">We will send you a verification code</Text>
          <InputFeild   
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            icon={icons.indiaFlag}
          />
          <CustomButton active={phoneNumber.length === 10} title="Get OTP" onPress={handleSignUp} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default signUp;
