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
}

// Initial state
const initialState: LocationState = {
  currentLocation: null,
  pickupLocation: null,
  dropLocation: null,
  selectedLocationType: null,
  routeCoordinates: [], // Initialize as empty array
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
    clearLocations(state) {
      state.pickupLocation = null;
      state.dropLocation = null;
      state.routeCoordinates = [];
    },
  },
});

// Export actions and reducer
export const {
  setCurrentLocation,
  setPickupLocation,
  setDropLocation,
  setSelectedLocationType,
  setRouteCoordinates, // <- export new action
  clearLocations,
} = userLocationSlice.actions;

export default userLocationSlice.reducer;
