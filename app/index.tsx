import { useAuth } from '@clerk/clerk-expo';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import CustomSplashScreen from '@/components/CustomSplashScreen';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { setCurrentLocation, setLocationGranted, setPickupLocation } from '@/redux/slice/userLocationSlice';
import { useAppDispatch } from '@/redux/hook';

const Index = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Is Loaded:", isLoaded);
    console.log("Is Signed In:", isSignedIn);
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const setup = async () => {
      try {
        SystemUI.setBackgroundColorAsync("#000000");

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Enable location permission from settings');
          return;
        }

        dispatch(setLocationGranted(true));

        const location = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        dispatch(setCurrentLocation({
          lat: location.coords.latitude,
          log: location.coords.longitude,
          address: address[0]?.formattedAddress || '',
        }));

        dispatch(setPickupLocation({
          lat: location.coords.latitude,
          log: location.coords.longitude,
          address: address[0]?.formattedAddress || '',
        }));

      } catch (error) {
        console.error("Error setting up location:", error);
      }
    };

    setup();
  }, [dispatch]);

  // Wait for auth state to load
  if (!isLoaded) {
    return <CustomSplashScreen value={500} />;
  }

  // Redirect based on session state
  if (isSignedIn) {
    return <Redirect href="/(root)/(dashboard)/roleSelect" />;
  }

  return <Redirect href="/(auth)/features" />;
};

export default Index;
