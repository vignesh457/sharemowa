import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for coordinates
interface Coordinates {
  lat: number;
  log: number;
}

interface LatLng {
  latitude: number;
  longitude: number;
}

interface LocationState {
  currentLocation: (Coordinates & { address: string }) | null;
  pickupLocation: (Coordinates & { address: string }) | null;
  dropLocation: (Coordinates & { address: string }) | null;
  selectedLocationType: 'pickup' | 'drop' | null;
  routeCoordinates: LatLng[]; // New: stores the decoded polyline route
  locationGranted: boolean;
}

// Initial state
const initialState: LocationState = {
  currentLocation: null,
  pickupLocation: null,
  dropLocation: null,
  selectedLocationType: null,
  routeCoordinates: [], // Initialize as empty array
  locationGranted: false,
};

// Create the slice
const userLocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation(state, action: PayloadAction<Coordinates & { address: string }>) {
      state.currentLocation = action.payload;
    },
    setPickupLocation(state, action: PayloadAction<Coordinates & { address: string }>) {
      state.pickupLocation = action.payload;
    },
    setDropLocation(state, action: PayloadAction<Coordinates & { address: string }>) {
      state.dropLocation = action.payload;
    },
    setSelectedLocationType(state, action: PayloadAction<'pickup' | 'drop' | null>) {
      state.selectedLocationType = action.payload;
    },
    setRouteCoordinates(state, action: PayloadAction<LatLng[]>) {
      state.routeCoordinates = action.payload;
    },
    setLocationGranted(state, action: PayloadAction<boolean>) {
      state.locationGranted = action.payload;
    },
    updateLiveLocation: (state, action) => {
      state.currentLocation!.lat = action.payload.lat;
      state.currentLocation!.log = action.payload.log;
    },
    clearLocations(state) {
      state.pickupLocation = null;
      state.dropLocation = null;
      state.routeCoordinates = [];
      state.locationGranted = false;
    },
  },
});

// Export actions and reducer
export const {
  setCurrentLocation,
  setPickupLocation,
  setDropLocation,
  setSelectedLocationType,
  setRouteCoordinates,
  setLocationGranted,
  updateLiveLocation,
  clearLocations,
} = userLocationSlice.actions;

export default userLocationSlice.reducer;
