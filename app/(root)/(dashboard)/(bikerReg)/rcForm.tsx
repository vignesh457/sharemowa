import {
    View,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import CustomButton from '@/components/CustomButton';
  import InputFeildWithLabel from '@/components/InputFeildWithLabel';
  import { icons, images } from '@/constants';
  import { router } from 'expo-router';
  
  const RcForm = () => {
    function handleChange(name: string, text: string): void {
      throw new Error('Function not implemented.');
    }
  
    function handleSubmit(): void {
      throw new Error('Function not implemented.');
    }
  
    return (
      <SafeAreaView className="bg-secondary-400 flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          {/* Fixed Header */}
          <View className="bg-secondary-300 w-full h-[15%] flex flex-row justify-evenly items-center pt-5">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.arrow} className="w-[30px] h-[30px] ml-7 mr-10" />
            </TouchableOpacity>
            <Text className="text-secondary-100 text-2xl font-JakartaBold flex-1">
              Registration Certificate
            </Text>
          </View>
  
          {/* Scrollable Content */}
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="w-full py-7"
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled" // Add this line
          >
            <View className="w-full h-auto flex flex-col pt-10 items-center">
              <InputFeildWithLabel
                label="Enter RC Number"
                placeholder="Enter RC Number"
                value={''}
                name={''}
                onChangeText={handleChange}
                keyboardType="default"
              />
              <InputFeildWithLabel
                label="Re-enter RC Number"
                placeholder="Re-enter RC Number"
                value={''}
                name={''}
                onChangeText={handleChange}
                keyboardType="default"
              />
            </View>
  
            {/* Upload Instructions */}
            <View className="w-full flex items-center px-4">
              <Text className="text-secondary-100 text-xl font-JakartaBold text-center">
                How to upload
              </Text>
              <Text className="text-secondary-200 text-lg font-JakartaLight mt-2">
                Take a clear picture of the photo side of your Registration Certificate on a flat surface.
                Ensure that the lighting is adequate and all the details are clearly visible.
                Fit the Registeration Certificate in the marked area correctly as shown below.
               </Text>
               <Image source={images.documentInstructions} className="w-[315px] h-[200px] rounded-md mt-5 mb-10" />
            </View>
          </ScrollView>
  
          {/* Fixed Submit Button */}
          <View className="w-full h-[15%] flex justify-center items-center">
            <CustomButton active={true} title="Submit" onPress={handleSubmit} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default RcForm;