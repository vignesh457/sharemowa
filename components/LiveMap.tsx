// LiveMap.tsx
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useAppSelector } from '@/redux/hook';
import { View, StyleSheet, Image } from 'react-native';
import DarkTheme from '@/utils/darkTheme.json';
import { icons } from '@/constants';
import CustomLoader from './CustomLoader';
import { startLocationUpdates, stopLocationUpdates } from '@/utils/locationTracking';

const Map = ({...props}: any) => {
  const { currentLocation, locationGranted } = useAppSelector((state) => state.userLocation);
  const mapRef = useRef<MapView>(null);

  if (!currentLocation?.lat || !currentLocation?.log) {
    return <CustomLoader />; // Optionally show a loading spinner
  }

  useEffect(() => {
    startLocationUpdates();

    return () => {
        stopLocationUpdates();
    };
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.log) {
      mapRef.current?.animateToRegion({
        latitude: currentLocation.lat,
        longitude: currentLocation.log,
        latitudeDelta: props.zoomLevel,
        longitudeDelta: props.zoomLevel,
      }, 1000); 
    }
  }, [currentLocation]);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: currentLocation.lat,
          longitude: currentLocation.log,
          latitudeDelta: props.zoomLevel,
          longitudeDelta: props.zoomLevel,
        }}
        showsUserLocation={locationGranted}
        showsMyLocationButton={true}
        customMapStyle={DarkTheme}
        {...props}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.lat,
            longitude: currentLocation.log,
          }}
          image={icons.endPoint}
        />
      </MapView>
    </View>
  );
};

export default Map;
