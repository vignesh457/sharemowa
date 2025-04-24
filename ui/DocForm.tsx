import { View, Text, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import InputFieldWithLabel from '@/components/InputFieldWithLabel';
import { icons, images } from '@/constants';
import { router } from 'expo-router';
import CustomFileUpload from '@/components/CustomFileUpload';
import { DocumentState } from '@/redux/slice/documentSlice';
import { useAppDispatch } from '@/redux/hook';
import { showAlert } from '@/redux/slice/alertSlice';

const DocForm = ({ title, label, onSubmit }: { title: string; label: string, onSubmit: (value: DocumentState) => void }) => {
  const [formData, setFormData] = useState({
    firstEntry: '',
    secondEntry: '',
    fileUrl: '',
  });
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, fileUrl: url }));
  };

  const handleSubmit = () => {
    const { firstEntry, secondEntry, fileUrl } = formData;

    if (!firstEntry || !secondEntry) {
      dispatch(showAlert({ type: 'warning', message: 'Please fill in both fields.' }));
      return;
    }

    if (firstEntry !== secondEntry) {
      dispatch(showAlert({ type: 'warning', message: 'Both entries must match.' }));
      return;
    }

    if (!fileUrl) {
      dispatch(showAlert({ type: 'warning', message: 'Please upload your document.' }));
      return;
    }

    dispatch(showAlert({ type: 'success', message: 'Document submitted successfully!' }));
    // You can now send formData to Supabase or your backend
    onSubmit({ number:firstEntry, url:fileUrl });
    router.back();
  };

  return (
    <SafeAreaView className="bg-secondary-400 flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View className="bg-secondary-300 w-full h-[15%] flex flex-row justify-evenly items-center pt-5 border-b-2 border-secondary-400">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.arrow} className="w-[30px] h-[30px] ml-7 mr-10" />
          </TouchableOpacity>
          <Text className="text-secondary-100 text-2xl font-JakartaBold flex-1">
            {title}
          </Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          className="w-full py-2"
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full h-auto flex flex-col pt-10 items-center">
            <InputFieldWithLabel
              label={`Enter ${label}`}
              placeholder={label}
              value={formData.firstEntry}
              name="firstEntry"
              onChangeText={handleChange}
              keyboardType="default"
            />
            <InputFieldWithLabel
              label={`Re-enter ${label}`}
              placeholder={label}
              value={formData.secondEntry}
              name="secondEntry"
              onChangeText={handleChange}
              keyboardType="default"
            />
          </View>

          {/* Upload Instructions */}
          <View className="w-full flex items-center px-4">
            <Text className="text-secondary-100 text-xl font-JakartaBold">How to upload</Text>
            <Text className="text-secondary-200 text-[15px] font-Nunito mt-2 w-[85%] text-justify">
              Take a clear picture of the photo side of your Registration Certificate on a flat surface.
              Ensure that the lighting is adequate and all the details are clearly visible.
              Fit the Registeration Certificate in the marked area correctly as shown below.
            </Text>
            <Image
              source={images.documentInstructions}
              className="w-[300px] h-[190px] rounded-md mt-5 mb-10"
            />
          </View>

          {/* Upload Button */}
          <CustomFileUpload onUploadComplete={handleFileUpload} />
        </ScrollView>

        {/* Submit Button */}
        <View className="w-full h-[15%] flex justify-center items-center">
          <CustomButton active={true} title="Submit" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DocForm;
