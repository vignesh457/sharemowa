import React, { useEffect, useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants';
import SearchResult from '@/components/SearchResult';
import OlaMapInput from '@/components/OlaMapInput';
import { Prediction } from '@/types/type';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setPickupLocation, setSelectedLocationType } from '@/redux/slice/userLocationSlice';
import { router } from 'expo-router';
import { getDistanceInKm } from '@/utils/getHaversineDistance';

const SelectLocation = () => {
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const dispatch = useAppDispatch();
  const {currentLocation, pickupLocation, dropLocation, selectedLocationType} = useAppSelector(state => state.userLocation);

  useEffect(() => {
    dispatch(setSelectedLocationType('drop'));
  },[]);

  return (
    <SafeAreaView className="bg-secondary-400 flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#000' }}
        behavior={undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}  style={{ flex: 1, backgroundColor: '#000' }}>
          <View className="flex-1">
            {/* Header Section (Start & End Location Inputs) */}
            <View className="flex-row px-2 pt-4">
              <TouchableOpacity onPress={() => router.back()} className="w-[10%] justify-start items-center pt-3">
                <Image source={icons.rightArrow} className="w-6 h-6 rotate-180" />
              </TouchableOpacity>

              <View className="w-[90%] flex-row">
                <View className="w-[10%] justify-center items-center">
                  <Image source={icons.startEndPins} className="w-[20px] h-[100px]" />
                </View>

                <View className="w-[90%] gap-0 justify-center items-center">
                  <OlaMapInput
                    setSuggestions={setSuggestions}
                    placeholder="Pickup Location"
                    name="pickup"
                    defaultValue={pickupLocation?.address===currentLocation?.address ? 'Current Location' : pickupLocation?.address}
                    keyboardType="default"
                  />
                  <OlaMapInput
                    setSuggestions={setSuggestions}
                    name="drop"
                    placeholder="Drop Location"
                    keyboardType="default"
                    defaultValue={dropLocation?.address}
                  />
                </View>
              </View>
            </View>

            {/* Suggested Locations */}
            <View className="flex-1 flex items-center mt-4 bg-secondary-300">
              <Text className="w-[90%] text-lg font-JakartaMedium text-secondary-100 mb-2 mt-3">
                Suggested Locations
              </Text>
              <ScrollView className='w-[90%]' keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                {suggestions.map((prediction) => {

                  return (
                    <SearchResult
                      key={prediction.place_id}
                      mainLocation={prediction.structured_formatting.main_text}
                      subLocation={prediction.structured_formatting.secondary_text}
                      coords={prediction.geometry.location}
                      distance={getDistanceInKm(currentLocation?.lat!, currentLocation?.log!, prediction.geometry.location.lat, prediction.geometry.location.lng)}
                    />
                  );
                })}
              </ScrollView>
            </View>

            {/* Select on Map Footer */}
            <View className="h-[60px] w-full flex flex-row gap-2 bg-secondary-400 justify-center items-center border-t-2 border-secondary-300">
                <Image source={icons.pin} className="w-6 h-6" />
                <Text className='text-lg font-JakartaMedium text-secondary-100'>Select location on map</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SelectLocation;
