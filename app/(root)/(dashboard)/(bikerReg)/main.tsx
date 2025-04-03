import { View, Text, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import { router } from 'expo-router'
import CustomDocCard from '@/components/CustomDocCard'
import { ActivityIndicator } from 'react-native-paper'

const main = () => {

    const handleSubmit = () => {
        router.push('/(root)/(dashboard)/vehicleSelect');
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
                    <Text className=" text-primary-100 text-lg w-2/3 font-JakartaLight">Please complete all the steps to activate your account</Text>
                    <ActivityIndicator size="large" color="#E27139" />
                </View>
                <CustomDocCard label="Vehicle RC Number" leftIcon={icons.document} status={true}/>
                <CustomDocCard label="Driving License" leftIcon={icons.document} status={false}/>
                <CustomDocCard label="Aadhar/Pan Card" leftIcon={icons.document} status={false}/>
                <CustomDocCard label="Profile info" leftIcon={icons.addProfile} status={false}/>
            </View>
            {/* Submit Button */}
            <View className="w-full h-[15%] flex justify-center items-center">
              <CustomButton active={true} title="Submit" onPress={handleSubmit}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default main