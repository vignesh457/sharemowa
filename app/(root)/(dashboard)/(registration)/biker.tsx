import { View, Text, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import { router } from 'expo-router'
import CustomDocCard from '@/components/CustomDocCard'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useAppSelector } from '@/redux/hook'

const main = () => {
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const formData = useAppSelector((state) => state.biker);
    const riderFormData = useAppSelector((state) => state.rider);


    useEffect(() => {
      const fields = Object.values(formData);
      const filledFields = fields.filter((val) => val.trim() !== '').length;
      const totalFields = fields.length;
      const percent = Math.round((filledFields / totalFields) * 100);
      setCompletionPercentage(percent);
    }, [formData]);
    
    function handleClick(id: string) {
      router.push({
        pathname: '/(root)/(dashboard)/(registration)/bikerForm',
        params: {
          id: id
        },
      });
    }

    const handleSubmit = () => {
        router.push('/(root)/(dashboard)/vehicleSelect');
        console.log(formData);
    }

  return (
    <SafeAreaView className="bg-secondary-400 flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header */}
            <View className="bg-secondary-300 w-full h-[15%] flex flex-row justify-evenly items-center pt-5">
              <TouchableOpacity onPress={() => router.back()}>
                <Image source={icons.arrow} className="w-[30px] h-[30px] ml-7 mr-10" />
              </TouchableOpacity>
              <Text className="text-secondary-100 text-2xl font-JakartaBold flex-1">Upload Documents</Text>
            </View>
            {/* Main Fields */}
            <View className="w-full h-[70%] py-7 flex justify-center items-center">
                <View className="w-full h-[110px] flex flex-row justify-evenly items-center">
                    <Text className=" text-secondary-100 text-lg w-2/3 font-JakartaLight">Please complete all the steps to activate your account</Text>
                    {/* Circular Profile Completion */}
                    <AnimatedCircularProgress
                      size={80}
                      width={8}
                      fill={completionPercentage}
                      tintColor="#E27139"
                      backgroundColor="#525252"
                      rotation={0}
                    >
                      {(fill) => (
                        <Text className="text-primary-100 font-JakartaBold text-base">
                          {`${Math.round(fill)}%`}
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                </View>
                <TouchableOpacity onPress={() => handleClick('rc')}>
                    <CustomDocCard label="Vehicle RC Number" leftIcon={icons.document} status={formData.registrationCertificate != ''}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('dl')}>
                    <CustomDocCard label="Driving License" leftIcon={icons.document} status={formData.drivingLicense != ''}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>handleClick('aadhar')}>
                    <CustomDocCard label="Aadhar/Pan Card" leftIcon={icons.document} status={formData.aadharCard != ''}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => handleClick('profile')}>
                    <CustomDocCard label="Profile info" leftIcon={icons.profile} status={formData.profileInformation != ''}/>
                </TouchableOpacity>
            </View>
            {/* Submit Button */}
            <View className="w-full h-[15%] flex justify-center items-center">
              <CustomButton active={completionPercentage === 100} title="Submit" onPress={handleSubmit}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default main