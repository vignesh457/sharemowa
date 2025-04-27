// locationTracking.ts
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { store } from '@/redux/store'; // import your redux store
import { updateLiveLocation } from '@/redux/slice/userLocationSlice'; // create an action for live updates

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data , error }) => {
    if (error) {
      console.error(error);
      return Promise.resolve();
    }
    if (data) {
      const { locations } = data as any;
      const location = locations[0];
  
      if (location) {
        const { latitude, longitude } = location.coords;
        // Dispatch to Redux
        store.dispatch(updateLiveLocation({ lat: latitude, log: longitude }));
      }
    }
    return Promise.resolve();
  });

export async function startLocationUpdates() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission not granted');
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 10, // minimum meters moved to trigger update
    timeInterval: 5000, // OR every 5 seconds
    showsBackgroundLocationIndicator: true, // iOS only
    // foregroundService: {
    //   notificationTitle: 'Tracking your location',
    //   notificationBody: 'We are tracking your ride.',
    //   notificationColor: '#000',
    // },
  });
}

export async function stopLocationUpdates() {
  const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  if (isRunning) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }
}
