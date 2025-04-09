import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  phoneNumber: string;
  role: 'biker' | 'rider' | null;
  vehicleType: 'bike' | 'car' | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  phoneNumber: '',
  role: null,
  vehicleType: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setRole: (state, action: PayloadAction<'biker' | 'rider'>) => {
      state.role = action.payload;
    },
    setVehicleType: (state, action: PayloadAction<'bike' | 'car'>) => {
      state.vehicleType = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export const {
  setPhoneNumber,
  setRole,
  setVehicleType,
  setLoggedIn,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
