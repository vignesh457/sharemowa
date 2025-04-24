import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { icons } from '@/constants';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

// Define the theme
const theme = {
  colors: {
    background: '#000000',
    card: '#262626',
  },
};


const DrawerContent = (props: any) => {
  const { state, navigation, descriptors } = props;
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/sign-up');  // Navigate to sign-up page after sign out
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View className='flex flex-row items-center p-1 bg-secondary-300 w-[100%] h-[100px]'>
        <View className='w-[25%] h-full flex gap-1 items-center justify-center '>
            <Image source={icons.profile} className="w-16 h-16 border-[2px] border-secondary-400 rounded-full" />
        </View>
        <View className="w-[60%] h-full flex items-start justify-center gap-1 px-2">
            <Text numberOfLines={1} ellipsizeMode="tail" className='w-full text-[18px] font-JakartaSemiBold text-secondary-100'>
                Vignesh
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className='w-full text-[15px] font-JakartaMedium text-secondary-200'>
                +91 9999999999
            </Text>
        </View>
        <TouchableOpacity onPress={() => {}} className='w-[15%] h-full flex gap-1 items-center justify-center '>
            <Image source={icons.edit} className="w-10 h-10" />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route: { key: any; name: any; }, index: any) => {
          const focused = state.index === index;
          const { title, drawerIcon } = descriptors[route.key].options;

          return (
            <DrawerItem
              key={route.key}
              label={title ?? route.name}
              focused={focused}
              activeTintColor="#dfdfdf"
              inactiveTintColor="#dfdfdf"
              labelStyle={styles.drawerItemListText}
              style={[{ backgroundColor: focused ? theme.colors.card : theme.colors.background },styles.drawerItemListContainer]}
              onPress={() => navigation.navigate(route.name)}
              icon={() => (
                <Image
                  source={drawerIcon}
                  className="w-7 h-7 mr-2"
                />
              )}
            />
          );
        })}
      </DrawerContentScrollView>

      <View className='flex items-center justify-evenly w-full h-[150px] border-t-[2px] border-secondary-300'>
        <TouchableOpacity onPress={handleSignOut} className='flex flex-row items-center justify-start w-full gap-5 py-5 px-8'>
          <Image source={icons.logout} className="w-7 h-7" />
          <Text className='text-[18px] font-JakartaMedium text-secondary-100'>Logout</Text>
        </TouchableOpacity>
        <Text className='w-full text-[12px] py-2 text-center font-JakartaLight text-secondary-200'>{'\u00A9 '} {new Date().getFullYear()} Sharemowa | All Rights Reserved</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRightColor: '#262626',
    borderRightWidth: 1,
    padding: 10,
  },
  drawerItemListContainer: {
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 5,
  },
  drawerItemListText: {
    fontFamily: "Jakarta-Medium",
    fontSize: 18,
  },
  logoutContainer: {
    borderTopWidth: 2,
    borderTopColor: '#262626',
    marginVertical: 10,
    paddingVertical: 5,
  },
  logoutDrawerItemContainer: {
    borderRadius: 10,
    margin: 10,
    paddingTop: 30,
    paddingBottom: 30,
  },
  logoutDrawerItemText: {
    color: '#dfdfdf',
    fontFamily: "Jakarta-Medium",
    fontSize: 18,
  },
});

export default DrawerContent;