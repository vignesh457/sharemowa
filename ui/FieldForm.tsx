import { View, Text, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import InputFieldWithLabel from '@/components/InputFieldWithLabel';
import { icons } from '@/constants';
import CustomDatePicker from '@/components/CustomDatePicker';
import CustomRadioBtn from '@/components/CustomRadioBtn';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { PersonalInfo } from '@/redux/slice/userSlice';
import { showAlert } from '@/redux/slice/alertSlice';

const FieldForm = ({onSubmit}:{onSubmit: (value: PersonalInfo) => void}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'male',
  });
  const {role} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleChange = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    //validating form fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.dob.trim() || !formData.gender.trim()) {
      dispatch(showAlert({ type: 'warning', message: 'All fields are required.' }));
      return;
    }
    onSubmit(formData);
    // (role === 'biker') ? router.back() : router.push('/(root)/(dashboard)/vehicleSelect');
  };

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
              <Text className="text-secondary-100 text-2xl font-JakartaBold flex-1">Profile Information</Text>
            </View>

            {/* Form Fields */}
            <View className="w-full py-7 flex justify-center items-center">
              <View className="w-full h-[110px] flex justify-center items-center">
                <Image source={icons.addProfile} className="w-[85px] h-[85px]" />
              </View>

              <InputFieldWithLabel 
                label="First Name" 
                value={formData.firstName} 
                onChangeText={handleChange} 
                placeholder="Enter your first name" 
                keyboardType="default" 
                name="firstName"
              />

              <InputFieldWithLabel 
                label="Last Name" 
                value={formData.lastName} 
                onChangeText={handleChange} 
                placeholder="Enter your last name" 
                keyboardType="default" 
                name="lastName"
              />

              <CustomDatePicker date={formData.dob} setDate={handleChange} />

              <CustomRadioBtn gender={formData.gender} setGender={handleChange} />
            </View>

            {/* Submit Button */}
            <View className="w-full h-[15%] flex justify-center items-center">
              <CustomButton active={true} title="Submit" onPress={handleSubmit}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default FieldForm;
