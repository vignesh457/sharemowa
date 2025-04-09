import { useAuth } from '@clerk/clerk-expo';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import DatePickerUi from '@/components/CustomDatePicker';
import CustomRadioBtn from '@/components/CustomRadioBtn';
import CustomLoader from '@/components/CustomLoader';
import CustomFileUpload from '@/components/CustomFileUpload';
import * as SystemUI from 'expo-system-ui';

const Index = () => {
  SystemUI.setBackgroundColorAsync("#000000");
  const { isSignedIn, isLoaded } = useAuth();

  // Debugging: Log auth state
  useEffect(() => {
    console.log("Is Loaded:", isLoaded);
    console.log("Is Signed In:", isSignedIn);
  }, [isLoaded, isSignedIn]);

  // Wait for auth state to load
  if (!isLoaded) {
    return <CustomLoader/>; // Optionally render a loading spinner here
  }

  // Redirect based on session state
  if (isSignedIn) {
    return <Redirect href={'/(root)/(dashboard)/roleSelect'} />;
  }
  
  return <Redirect href="/(auth)/features" />;
  // return <Redirect href="/(root)/(main)/confirmPickup" />;
};

export default Index;
