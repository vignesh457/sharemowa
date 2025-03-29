import { useAuth } from '@clerk/clerk-expo';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';

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
    return <Redirect href={'/(root)/home'} />;
  }
  
  return <Redirect href="/(auth)/features" />;
};

export default Index;
