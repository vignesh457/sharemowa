import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';
import { icons, images } from '@/constants';
import DarkTheme from '@/utils/darkTheme.json';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Enable location permission from settings');
        return;
      }
      setLocationGranted(true);
    })();
  }, []);
  
  return (
    <SafeAreaView className="bg-secondary-400 flex-1 pt-14">
      {/* Header */}
      <LinearGradient
        colors={['#000000', 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0.8, 1]} 
        style={{ width: '100%', height: 100, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 20, position: 'absolute', top: 0, left: 0, zIndex: 1 }}

      >
        <TouchableOpacity onPress={() => {}} className='w-[20%] h-full justify-center items-center'>
          <Image source={icons.menu} className="w-[30px] h-[30px] ml-7 mr-10" />
        </TouchableOpacity>
        <View className='w-[80%] h-full flex-row justify-center items-center gap-3 pl-4'>
          <Image source={images.icon} className="w-[45px] h-[45px]" />
          <Text className="text-secondary-100 text-[25px] font-NunitoBold flex-1">ShareMowa</Text>
        </View>
      </LinearGradient>

      {/* Map and Address */}
      <View className='w-full h-[35%]'>
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: 17.385044,
            longitude: 78.486671,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={locationGranted}
          showsMyLocationButton={true}
          customMapStyle={DarkTheme}
        />
      </View>
      <View className='w-full h-[65%]'>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => {router.push("/(root)/(main)/selectLocation")}}
            className="flex flex-row items-center p-1 mt-1 bg-primary-100 w-4/5 h-[65px] rounded-[10px] mb-7 border-secondary-400 border-4 absolute top-[-30px] left-[10%]"
          >
              <View className='w-[17%] h-[90%] flex items-center justify-center'>
                  <Image source={icons.search} className="w-7 h-7" />
              </View>
              <Text className='w-full px-4 tracking-widest rounded-[10px] text-[17px] font-JakartaBold text-secondary-400'>
                Where are you going
              </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

export default Home;