import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import DrawerContent from '@/components/DrawerContent';
import { icons } from '@/constants';


export default function DrawerLayout() {
  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
            headerShown: false,
        }}
      >
        <Drawer.Screen name="home" options={{ title: 'Home', drawerIcon: icons.home }} />
        <Drawer.Screen name="myRides" options={{ title: 'Ride History', drawerIcon: icons.history }} />
        <Drawer.Screen name="help" options={{ title: 'Help And Support', drawerIcon: icons.headphones }} />
        <Drawer.Screen name="about" options={{ title: 'About', drawerIcon: icons.information }} />
      </Drawer>
    </GestureHandlerRootView>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    </>
  );
}
