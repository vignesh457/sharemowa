import React, { useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import { icons } from '@/constants';
import SearchResult from '@/components/SearchResult';

const SelectLocation = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

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
              <View className="w-[10%] justify-start items-center pt-3">
                <Image source={icons.rightArrow} className="w-6 h-6 rotate-180" />
              </View>

              <View className="w-[90%] flex-row">
                <View className="w-[10%] justify-center items-center">
                  <Image source={icons.startEndPins} className="w-[20px] h-[100px]" />
                </View>

                <View className="w-[90%] gap-2 justify-center items-center">
                  <InputField
                    value={startLocation}
                    name="start"
                    onChangeText={(name, value) => setStartLocation(value)}
                    placeholder="Pickup Location"
                    keyboardType="default"
                    className="mb-0 mt-0 w-[90%]"
                    classNameText="placeholder:text-primary-100"
                  />
                  <InputField
                    value={endLocation}
                    name="end"
                    onChangeText={(name, value) => setEndLocation(value)}
                    placeholder="Drop Location"
                    keyboardType="default"
                    className="mb-0 mt-0 w-[90%]"
                    classNameText="placeholder:text-primary-100"
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
                <SearchResult mainLocation="Patancheru" subLocation="Telangana, India" distance={2.2} />
                <SearchResult mainLocation="Patancheru" subLocation="Telangana, India" distance={2.2} />
                <SearchResult mainLocation="Patancheru" subLocation="Telangana, India" distance={2.2} />
                <SearchResult mainLocation="Patancheru" subLocation="Telangana, India" distance={2.2} />
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
