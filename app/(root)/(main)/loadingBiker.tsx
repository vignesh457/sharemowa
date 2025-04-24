import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import DarkTheme from '@/utils/darkTheme.json';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';
import polyline from '@mapbox/polyline';
import { router } from 'expo-router';
import { setRouteCoordinates } from '@/redux/slice/userLocationSlice';
import { useSelector } from 'react-redux';

const loadingBiker = () => {
  const { pickupLocation, dropLocation } = useAppSelector((state) => state.userLocation);
  const dispatch = useAppDispatch();
  const {routeCoordinates} = useAppSelector((state) => state.userLocation);
  const [locationGranted, setLocationGranted] = useState(false);
  const apiKey = process.env.EXPO_PUBLIC_OLA_MAP_KEY;

  useEffect(() => {
    if (!pickupLocation || !dropLocation) return;

    const fetchRoute = async () => {
      try {
        const origin = `${pickupLocation.lat},${pickupLocation.log}`;
        const destination = `${dropLocation.lat},${dropLocation.log}`;
        const url = `https://api.olamaps.io/routing/v1/directions?origin=${origin}&destination=${destination}&mode=driving&alternatives=false&steps=true&overview=full&language=en&traffic_metadata=false&api_key=${apiKey}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // No body!
        });
        const data = await response.json();
        if (data.routes?.[0]?.overview_polyline) {
          const overviewPolyline = data.routes[0].overview_polyline;
          const points: [number, number][] = polyline.decode(overviewPolyline);
          const coordinates = points.map(([latitude, longitude]) => ({ latitude, longitude }));
          dispatch(setRouteCoordinates(coordinates));
        }
      } catch (err) {
        console.error('Error fetching route:', err);
        Alert.alert('Failed to load route');
      }
    };

    fetchRoute();
  }, [pickupLocation, dropLocation]);

  return (
    <SafeAreaView className="bg-secondary-400 flex-1">
      {/* Map View */}
      <View className="w-full h-[70%]">
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: pickupLocation?.lat ?? 17.385044,
            longitude: pickupLocation?.log ?? 78.486671,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={locationGranted}
          showsMyLocationButton={true}
          customMapStyle={DarkTheme}
        >
          {/* Pickup Marker */}
          {pickupLocation && (
            <Marker
              coordinate={{
                latitude: pickupLocation.lat,
                longitude: pickupLocation.log,
              }}
              title="Pickup"
            >
              <Image source={icons.startPoint} className="w-8 h-8" />
            </Marker>
          )}

          {/* Drop Marker */}
          {dropLocation && (
            <Marker
              coordinate={{
                latitude: dropLocation.lat,
                longitude: dropLocation.log,
              }}
              title="Drop"
            >
              <Image source={icons.endPoint} className="w-8 h-8" />
            </Marker>
          )}

          {/* Route Polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={2}
              strokeColor="#DFDFDF"
            />
          )}
        </MapView>
      </View>

      {/* Bottom Info */}
      <View className="w-full h-[30%] rounded-t-[20px] bg-secondary-400 mt-[-28px] flex gap-5 pt-4 justify-start items-center">
        <Text className="text-secondary-100 text-[18px] font-JakartaBold text-center mb-4">
          Waiting for Biker...
        </Text>
        <View className="bg-secondary-300 w-4/5 h-[80px] rounded-lg flex flex-row justify-center items-center">
          <View className="w-[12%] pl-2 h-full flex justify-center items-center">
            <Image source={icons.startPoint} className="w-12 h-12" />
          </View>
          <View className="w-[70%] h-full flex justify-center p-3">
            <Text className="text-secondary-100 text-[15px] font-JakartaMedium leading-7" numberOfLines={2} ellipsizeMode="tail">
              {pickupLocation?.address ?? 'Pickup Address'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.back()} className="w-[18%] h-full flex justify-center items-center">
            <Image source={icons.edit} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
        <CustomButton title={'Confirm Location'} />
      </View>
    </SafeAreaView>
  );
};

export default loadingBiker;
