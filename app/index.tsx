import { useAuth } from '@clerk/clerk-expo';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import DatePickerUi from '@/components/CustomDatePicker';
import CustomRadioBtn from '@/components/CustomRadioBtn';

const Index = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Debugging: Log auth state
  useEffect(() => {
    console.log("Is Loaded:", isLoaded);
    console.log("Is Signed In:", isSignedIn);
  }, [isLoaded, isSignedIn]);

  // Wait for auth state to load
  if (!isLoaded) {
    return null; // Optionally render a loading spinner here
  }

  // Redirect based on session state
  if (isSignedIn) {
    return <Redirect href={'/(root)/(dashboard)/main'} />;
  }
  
  return <Redirect href="/(auth)/features" />;
  // return <Redirect href="/(root)/(dashboard)/vehicleSelect" />;
  // return <CustomRadioBtn/>
};

export default Index;
